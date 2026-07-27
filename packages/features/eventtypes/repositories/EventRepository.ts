import { getPublicEvent } from "@coachos/features/eventtypes/lib/getPublicEvent";
import prisma from "@coachos/prisma";

export type GetPublicEventInput = {
  username: string;
  eventSlug: string;
  isTeamEvent?: boolean;
  org: string | null;
  fromRedirectOfNonOrgLink: boolean;
};

export class EventRepository {
  static async getPublicEvent(input: GetPublicEventInput, userId?: number) {
    const event = await getPublicEvent(
      input.username,
      input.eventSlug,
      input.isTeamEvent,
      input.org,
      prisma,
      input.fromRedirectOfNonOrgLink,
      userId
    );
    return event;
  }
}
