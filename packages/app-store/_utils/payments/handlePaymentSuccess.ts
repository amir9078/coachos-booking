import { eventTypeAppMetadataOptionalSchema } from "@coachos/app-store/zod-utils";
import { sendScheduledEmailsAndSMS } from "@coachos/emails/email-manager";
import { doesBookingRequireConfirmation } from "@coachos/features/bookings/lib/doesBookingRequireConfirmation";
import EventManager, { placeholderCreatedEvent } from "@coachos/features/bookings/lib/EventManager";
import { getAllCredentialsIncludeServiceAccountKey } from "@coachos/features/bookings/lib/getAllCredentialsForUsersOnEvent/getAllCredentials";
import { handleBookingRequested } from "@coachos/features/bookings/lib/handleBookingRequested";
import { handleConfirmation } from "@coachos/features/bookings/lib/handleConfirmation";
import { getBooking } from "@coachos/features/bookings/lib/payment/getBooking";
import { getPlatformParams } from "@coachos/features/platform-oauth-client/get-platform-params";
import { PlatformOAuthClientRepository } from "@coachos/features/platform-oauth-client/platform-oauth-client.repository";
import tasker from "@coachos/features/tasker";
import getWebhooks from "@coachos/features/webhooks/lib/getWebhooks";
import sendPayload from "@coachos/features/webhooks/lib/sendOrSchedulePayload";
import type { EventPayloadType, EventTypeInfo } from "@coachos/features/webhooks/lib/sendPayload";
import { getVideoCallUrlFromCalEvent } from "@coachos/lib/CalEventParser";
import { getTeamIdFromEventType } from "@coachos/lib/getTeamIdFromEventType";
import { HttpError as HttpCode } from "@coachos/lib/http-error";
import logger from "@coachos/lib/logger";
import { safeStringify } from "@coachos/lib/safeStringify";
import type { TraceContext } from "@coachos/lib/tracing";
import { distributedTracing } from "@coachos/lib/tracing/factory";
import prisma from "@coachos/prisma";
import type { Prisma } from "@coachos/prisma/client";
import { BookingStatus, WebhookTriggerEvents } from "@coachos/prisma/enums";
import type { EventTypeMetadata } from "@coachos/prisma/zod-utils";

const log = logger.getSubLogger({ prefix: ["[handlePaymentSuccess]"] });

export async function handlePaymentSuccess(params: {
  paymentId: number;
  appSlug: string;
  bookingId: number;
  traceContext: TraceContext;
}) {
  const { paymentId, bookingId, appSlug, traceContext } = params;
  const updatedTraceContext = distributedTracing.updateTrace(traceContext, {
    bookingId,
    paymentId,
  });
  log.debug(`handling payment success for bookingId ${bookingId}`);
  const { booking, user: userWithCredentials, evt, eventType } = await getBooking(bookingId);
  try {
    await tasker.cancelWithReference(booking.uid, "sendAwaitingPaymentEmail");
    log.debug(`Cancelled scheduled awaiting payment email for booking ${bookingId}`);
  } catch (error) {
    log.warn(
      { bookingId, error },
      `Failed to cancel awaiting payment task - email may still be sent but will be suppressed by task handler`
    );
  }

  if (booking.location) evt.location = booking.location;

  const bookingData: Prisma.BookingUpdateInput = {
    paid: true,
    status: BookingStatus.ACCEPTED,
  };

  const allCredentials = await getAllCredentialsIncludeServiceAccountKey(userWithCredentials, {
    ...booking.eventType,
    metadata: booking.eventType?.metadata as EventTypeMetadata,
  });

  const isConfirmed = booking.status === BookingStatus.ACCEPTED;

  const platformOAuthClientRepository = new PlatformOAuthClientRepository();
  const platformOAuthClient = userWithCredentials.isPlatformManaged
    ? await platformOAuthClientRepository.getByUserId(userWithCredentials.id)
    : null;
  const areCalendarEventsEnabled = platformOAuthClient?.areCalendarEventsEnabled ?? true;
  const areEmailsEnabled = platformOAuthClient?.areEmailsEnabled ?? true;

  if (isConfirmed) {
    const apps = eventTypeAppMetadataOptionalSchema.parse(eventType?.metadata?.apps);
    const eventManager = new EventManager({ ...userWithCredentials, credentials: allCredentials }, apps);
    const scheduleResult = areCalendarEventsEnabled
      ? await eventManager.create(evt)
      : placeholderCreatedEvent;
    bookingData.references = { create: scheduleResult.referencesToCreate };
  }

  const requiresConfirmation = doesBookingRequireConfirmation({
    booking: {
      ...booking,
      eventType,
    },
  });

  if (requiresConfirmation) {
    delete bookingData.status;
  }
  const paymentUpdate = prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      success: true,
    },
    select: {
      id: true,
      externalId: true,
    },
  });

  const bookingUpdate = prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: bookingData,
    select: {
      status: true,
    },
  });

  const [payment, updatedBooking] = await prisma.$transaction([paymentUpdate, bookingUpdate]);

  const platformClientParams = platformOAuthClient ? getPlatformParams(platformOAuthClient) : undefined;
  const teamId = await getTeamIdFromEventType({
    eventType: {
      team: { id: booking.eventType?.teamId ?? null },
      parentId: booking.eventType?.parentId ?? null,
    },
  });
  const triggerForUser = !teamId || (teamId && booking.eventType?.parentId);
  const userId = triggerForUser ? booking.userId : null;

  try {
    const paymentExternalId = payment.externalId;

    const paymentMetadata = {
      identifier: "amir9078.github.io",
      bookingId,
      eventTypeId: booking.eventType?.id ?? null,
      bookerEmail: evt.attendees[0].email,
      eventTitle: booking.eventType?.title ?? null,
      externalId: paymentExternalId ?? null,
    };

    const eventTypeInfo: EventTypeInfo = {
      eventTitle: booking.eventType?.title,
      eventDescription: booking.eventType?.description,
      requiresConfirmation: booking.eventType?.requiresConfirmation || null,
      price: booking.eventType?.price,
      currency: booking.eventType?.currency,
      length: booking.eventType?.length,
    };

    const payload: EventPayloadType = {
      ...evt,
      ...eventTypeInfo,
      bookingId,
      eventTypeId: booking.eventType?.id,
      status: updatedBooking.status,
      smsReminderNumber: booking.smsReminderNumber || undefined,
      paymentId: paymentId,
      metadata: paymentMetadata,
      ...(platformClientParams ? platformClientParams : {}),
    };

    // Trigger BOOKING_PAID webhooks
    const subscriberMeetingPaid = await getWebhooks({
      userId,
      eventTypeId: booking.eventTypeId,
      triggerEvent: WebhookTriggerEvents.BOOKING_PAID,
      teamId: booking.eventType?.teamId,
      oAuthClientId: platformClientParams?.platformClientId,
    });

    const tracingLogger = distributedTracing.getTracingLogger(updatedTraceContext);
    const bookingPaidSubscribers = subscriberMeetingPaid.map((sub) =>
      sendPayload(
        sub.secret,
        WebhookTriggerEvents.BOOKING_PAID,
        new Date().toISOString(),
        sub,
        payload
      ).catch((e) => {
        tracingLogger.error(
          `Error executing webhook for event: ${WebhookTriggerEvents.BOOKING_PAID}, URL: ${sub.subscriberUrl}, bookingId: ${evt.bookingId}, bookingUid: ${evt.uid}`,
          safeStringify(e)
        );
      })
    );

    // Wait for webhook invocations to finish before returning
    await Promise.all(bookingPaidSubscribers);
  } catch (error) {
    log.error("Error while triggering BOOKING_PAID webhook", safeStringify(error));
  }

  if (!isConfirmed) {
    if (!requiresConfirmation) {
      await handleConfirmation({
        user: { ...userWithCredentials, credentials: allCredentials },
        evt,
        prisma,
        bookingId: booking.id,
        booking,
        paid: true,
        platformClientParams,
        traceContext: updatedTraceContext,
      });
    } else {
      await handleBookingRequested({
        evt,
        booking,
      });
      log.debug(`handling booking request for eventId ${eventType.id}`);
    }
  } else if (areEmailsEnabled) {
    await sendScheduledEmailsAndSMS({ ...evt }, undefined, undefined, undefined, eventType.metadata);
  }

  throw new HttpCode({
    statusCode: 200,
    message: `Booking with id '${booking.id}' was paid and confirmed.`,
  });
}
