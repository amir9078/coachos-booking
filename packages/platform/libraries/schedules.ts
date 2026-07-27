export {
  ScheduleRepository,
  type FindDetailedScheduleByIdReturnType,
} from "@coachos/features/schedules/repositories/ScheduleRepository";

export {
  updateSchedule,
  type UpdateScheduleResponse,
} from "@coachos/features/schedules/services/ScheduleService";
export { UserAvailabilityService } from "@coachos/features/availability/lib/getUserAvailability";

export {
  createHandler as createScheduleHandler,
  type CreateScheduleHandlerReturn,
} from "@coachos/trpc/server/routers/viewer/availability/schedule/create.handler";
export { ZCreateInputSchema as CreateScheduleSchema } from "@coachos/trpc/server/routers/viewer/availability/schedule/create.schema";

export {
  listHandler as getAvailabilityListHandler,
  type GetAvailabilityListHandlerReturn,
} from "@coachos/trpc/server/routers/viewer/availability/list.handler";
export {
  duplicateHandler as duplicateScheduleHandler,
  type DuplicateScheduleHandlerReturn,
} from "@coachos/trpc/server/routers/viewer/availability/schedule/duplicate.handler";

export { getScheduleByEventSlugHandler } from "@coachos/trpc/server/routers/viewer/availability/schedule/getScheduleByEventTypeSlug.handler";
