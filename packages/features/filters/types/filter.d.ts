import type { EventType, Team } from "@coachos/prisma/client";

export type IEventTypeFilter = Pick<EventType, "id" | "slug" | "title"> & {
  team: Pick<Team, "id" | "name"> | null;
};
