/**
 * @vitest-environment node
 */

import { BookingStatus, WebhookTriggerEvents } from "@coachos/prisma/enums";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { handlePaymentSuccess } from "./handlePaymentSuccess";

// Mock dependencies
vi.mock("@coachos/features/bookings/lib/payment/getBooking");
vi.mock("@coachos/features/webhooks/lib/getWebhooks");
vi.mock("@coachos/features/webhooks/lib/sendOrSchedulePayload");
vi.mock("@coachos/features/tasker");
vi.mock("@coachos/features/bookings/lib/getAllCredentialsForUsersOnEvent/getAllCredentials", () => ({
  getAllCredentialsIncludeServiceAccountKey: vi.fn().mockResolvedValue([]),
}));
vi.mock("@coachos/features/users/repositories/UserRepository", () => ({
  UserRepository: class {
    enrichUserWithItsProfile = vi.fn().mockResolvedValue({ profile: null });
  },
}));
vi.mock("@coachos/prisma", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@coachos/prisma")>();
  return {
    ...actual,
    default: {
      ...actual.default,
      payment: { update: vi.fn() },
      booking: { update: vi.fn() },
      $transaction: vi.fn(),
      profile: { findMany: vi.fn().mockResolvedValue([]) },
      credential: { findMany: vi.fn().mockResolvedValue([]) },
      team: {
        findFirst: vi.fn().mockResolvedValue(null),
        findUnique: vi.fn().mockResolvedValue(null),
      },
    },
  };
});
vi.mock("@coachos/lib/getTeamIdFromEventType");
vi.mock("@coachos/lib/CalEventParser");
vi.mock("@coachos/features/platform-oauth-client/platform-oauth-client.repository", () => ({
  PlatformOAuthClientRepository: class {
    getByUserId = vi.fn().mockResolvedValue(null);
  },
}));
vi.mock("@coachos/features/platform-oauth-client/get-platform-params");
vi.mock("@coachos/features/bookings/lib/handleConfirmation");
vi.mock("@coachos/features/bookings/lib/handleBookingRequested");
vi.mock("@coachos/emails/email-manager");
vi.mock("@coachos/lib/tracing/factory");
vi.mock("@coachos/lib/logger", () => ({
  default: {
    getSubLogger: vi.fn(() => ({
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    })),
  },
}));
// Routing forms feature removed - mocks no longer needed

vi.mock("@coachos/app-store/_utils/getCalendar", () => ({
  getCalendar: vi.fn().mockReturnValue(null),
}));

vi.mock("@coachos/app-store/delegationCredential", () => ({
  enrichHostsWithDelegationCredentials: vi.fn(),
  getUsersCredentialsIncludeServiceAccountKey: vi.fn(),
  getCredentialForSelectedCalendar: vi.fn(),
  findUniqueDelegationCalendarCredential: vi.fn(),
  getAllDelegationCredentialsForUserIncludeServiceAccountKey: vi.fn(),
  getDelegationCredentialOrFindRegularCredential: vi.fn(),
}));

vi.mock("@coachos/features/calendars/lib/CalendarManager", () => ({
  getBusyCalendarTimes: vi.fn().mockResolvedValue([]),
  createEvent: vi.fn().mockResolvedValue({}),
  updateEvent: vi.fn().mockResolvedValue({}),
  deleteEvent: vi.fn().mockResolvedValue({}),
}));

import { getBooking } from "@coachos/features/bookings/lib/payment/getBooking";
import getWebhooks from "@coachos/features/webhooks/lib/getWebhooks";
import { WebhookVersion } from "@coachos/features/webhooks/lib/interface/IWebhookRepository";
import sendPayload from "@coachos/features/webhooks/lib/sendOrSchedulePayload";
import { getTeamIdFromEventType } from "@coachos/lib/getTeamIdFromEventType";
import type { TraceContext } from "@coachos/lib/tracing";
import prisma from "@coachos/prisma";

describe("handlePaymentSuccess", () => {
  const mockBookingId = 1;
  const mockPaymentId = 100;
  const mockTraceContext: TraceContext = {
    traceId: "test-trace-id",
    spanId: "test-span-id",
    operation: "test-operation",
  };

  const mockBooking = {
    id: mockBookingId,
    userId: 1,
    eventTypeId: 10,
    status: BookingStatus.PENDING,
    uid: "test-booking-uid",
    location: "Test Location",
    smsReminderNumber: null,
    userPrimaryEmail: "user@example.com",
    title: "Test Event",
    description: "Test Description",
    customInputs: {},
    startTime: new Date("2025-01-01T10:00:00Z"),
    endTime: new Date("2025-01-01T10:30:00Z"),
    attendees: [],
    responses: {},
    metadata: null,
    destinationCalendar: null,
    eventType: {
      id: 10,
      title: "Test Event",
      description: "Test Description",
      slug: "test-event",
      price: 1000,
      currency: "USD",
      length: 30,
      requiresConfirmation: false,
      teamId: null,
      parentId: null,
      schedulingType: null,
      hosts: [],
      owner: { hideBranding: false },
      metadata: {},
    },
  } as any;

  const mockUser = {
    id: 1,
    email: "user@example.com",
    name: "Test User",
    username: "testuser",
    timeZone: "UTC",
    isPlatformManaged: false,
    credentials: [],
    locale: "en",
    timeFormat: 12,
    destinationCalendar: null,
  } as any;

  const mockEvt = {
    type: "test-event",
    title: "Test Event",
    startTime: "2025-01-01T10:00:00Z",
    endTime: "2025-01-01T10:30:00Z",
    organizer: {
      email: "user@example.com",
      name: "Test User",
      timeZone: "UTC",
      language: { locale: "en", translate: vi.fn() },
      id: 1,
    },
    attendees: [
      {
        email: "attendee@example.com",
        name: "Attendee",
        timeZone: "UTC",
        language: { locale: "en", translate: vi.fn() },
      },
    ],
    uid: "test-booking-uid",
    bookingId: mockBookingId,
  } as any;

  const mockEventType = {
    id: 10,
    metadata: {},
  };

  const mockWebhookSubscriber = {
    id: "webhook-1",
    subscriberUrl: "https://example.com/webhook",
    secret: "webhook-secret",
    appId: "app-id",
    payloadTemplate: null,
    eventTriggers: [WebhookTriggerEvents.BOOKING_PAID],
    timeUnit: null,
    time: null,
    version: WebhookVersion.V_2021_10_20,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock getBooking
    vi.mocked(getBooking).mockResolvedValue({
      booking: mockBooking,
      user: mockUser,
      evt: mockEvt,
      eventType: mockEventType,
    });

    // Mock prisma transaction
    vi.mocked(prisma.$transaction).mockResolvedValue([
      { id: mockPaymentId, externalId: "ext-123" },
      { status: BookingStatus.ACCEPTED },
    ]);

    // Mock webhook functions
    vi.mocked(getWebhooks).mockResolvedValue([mockWebhookSubscriber]);
    vi.mocked(sendPayload).mockResolvedValue({ ok: true, status: 200 });

    // Mock utility functions
    vi.mocked(getTeamIdFromEventType).mockResolvedValue(null);
  });

  it("should trigger BOOKING_PAID webhooks with correct payload", async () => {
    await expect(
      handlePaymentSuccess({
        paymentId: mockPaymentId,
        appSlug: "stripe",
        bookingId: mockBookingId,
        traceContext: mockTraceContext,
      })
    ).rejects.toThrow(); // Function throws HttpCode 200 at the end

    // Verify webhooks were fetched
    expect(getWebhooks).toHaveBeenCalledWith({
      userId: mockBooking.userId,
      eventTypeId: mockBooking.eventTypeId,
      triggerEvent: WebhookTriggerEvents.BOOKING_PAID,
      teamId: null,
      oAuthClientId: undefined,
    });

    // Verify webhook payload was sent
    expect(sendPayload).toHaveBeenCalledWith(
      mockWebhookSubscriber.secret,
      WebhookTriggerEvents.BOOKING_PAID,
      expect.any(String),
      mockWebhookSubscriber,
      expect.objectContaining({
        bookingId: mockBookingId,
        eventTypeId: mockBooking.eventType.id,
        status: BookingStatus.ACCEPTED,
        paymentId: mockPaymentId,
        metadata: expect.objectContaining({
          identifier: "amir9078.github.io",
          bookingId: mockBookingId,
          eventTypeId: mockBooking.eventType.id,
          bookerEmail: mockEvt.attendees[0].email,
          eventTitle: mockBooking.eventType.title,
          externalId: "ext-123",
        }),
      })
    );
  });

  it("should handle webhook errors gracefully without blocking", async () => {
    const webhookError = new Error("Webhook failed");
    vi.mocked(sendPayload).mockRejectedValueOnce(webhookError);

    // Should not throw (webhook errors are caught)
    await expect(
      handlePaymentSuccess({
        paymentId: mockPaymentId,
        appSlug: "stripe",
        bookingId: mockBookingId,
        traceContext: mockTraceContext,
      })
    ).rejects.toThrow(); // Throws HttpCode 200 at the end

    // Verify webhook was still attempted
    expect(sendPayload).toHaveBeenCalled();
  });

  it("should include payment metadata in webhook payload", async () => {
    await expect(
      handlePaymentSuccess({
        paymentId: mockPaymentId,
        appSlug: "stripe",
        bookingId: mockBookingId,
        traceContext: mockTraceContext,
      })
    ).rejects.toThrow(); // Function throws HttpCode 200 at the end

    expect(sendPayload).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({
        metadata: expect.objectContaining({
          identifier: "amir9078.github.io",
          bookingId: mockBookingId,
          eventTypeId: mockBooking.eventType.id,
          bookerEmail: mockEvt.attendees[0].email,
          eventTitle: mockBooking.eventType.title,
          externalId: "ext-123",
        }),
      })
    );
  });
});
