import EventManager from "@coachos/features/bookings/lib/EventManager";

export { getPublicEvent, type PublicEventType } from "@coachos/features/eventtypes/lib/getPublicEvent";

export { getBulkUserEventTypes, getBulkTeamEventTypes } from "@coachos/app-store/_utils/getBulkEventTypes";

export { createHandler as createEventType } from "@coachos/trpc/server/routers/viewer/eventTypes/heavy/create.handler";
export { updateHandler as updateEventType } from "@coachos/trpc/server/routers/viewer/eventTypes/heavy/update.handler";

export { listWithTeamHandler } from "@coachos/trpc/server/routers/viewer/eventTypes/listWithTeam.handler";

export type { TUpdateInputSchema as TUpdateEventTypeInputSchema } from "@coachos/trpc/server/routers/viewer/eventTypes/heavy/update.schema";
export type { EventTypesPublic } from "@coachos/features/eventtypes/lib/getEventTypesPublic";
export { getEventTypesPublic } from "@coachos/features/eventtypes/lib/getEventTypesPublic";
export { parseEventTypeColor } from "@coachos/lib/isEventTypeColor";

export {
  EventTypeMetaDataSchema,
  eventTypeBookingFields,
  eventTypeLocations,
} from "@coachos/prisma/zod-utils";

export type { EventTypeMetadata } from "@coachos/prisma/zod-utils";

export { validateCustomEventName } from "@coachos/features/eventtypes/lib/eventNaming";
export { EventManager };
export { getEventTypeById } from "@coachos/features/eventtypes/lib/getEventTypeById";
export { getEventTypesByViewer } from "@coachos/features/eventtypes/lib/getEventTypesByViewer";
export type { EventType } from "@coachos/features/eventtypes/lib/getEventTypeById";
export type { EventTypesByViewer } from "@coachos/features/eventtypes/lib/getEventTypesByViewer";
export type { UpdateEventTypeReturn } from "@coachos/trpc/server/routers/viewer/eventTypes/heavy/update.handler";
export { bulkUpdateEventsToDefaultLocation } from "@coachos/app-store/_utils/bulkUpdateEventsToDefaultLocation";
export { bulkUpdateTeamEventsToDefaultLocation } from "@coachos/app-store/_utils/bulkUpdateTeamEventsToDefaultLocation";
