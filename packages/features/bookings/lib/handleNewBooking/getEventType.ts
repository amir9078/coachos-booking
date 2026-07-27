import { getDefaultEvent } from "@coachos/features/eventtypes/lib/defaultEvents";
import { HttpError } from "@coachos/lib/http-error";
import { withReporting } from "@coachos/lib/sentryWrapper";

import { getBookingFieldsWithSystemFields } from "../getBookingFields";
import { getEventTypesFromDB } from "./getEventTypesFromDB";

const _getEventType = async ({
  eventTypeId,
  eventTypeSlug,
}: {
  eventTypeId: number;
  eventTypeSlug?: string;
}) => {
  if (!eventTypeId && !eventTypeSlug) {
    throw new HttpError({ statusCode: 400, message: "Either eventTypeId or eventTypeSlug must be provided" });
  }

  // handle dynamic user
  const eventType =
    !eventTypeId && !!eventTypeSlug ? getDefaultEvent(eventTypeSlug) : await getEventTypesFromDB(eventTypeId);

  const isOrgTeamEvent = !!eventType?.team && !!eventType?.team?.parentId;

  return {
    ...eventType,
    bookingFields: getBookingFieldsWithSystemFields({ ...eventType, isOrgTeamEvent }),
  };
};

export const getEventType = withReporting(_getEventType, "getEventType");
