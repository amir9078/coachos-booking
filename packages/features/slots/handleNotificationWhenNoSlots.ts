import type { Dayjs } from "@coachos/dayjs";
import type { MembershipRepository } from "@coachos/features/membership/repositories/MembershipRepository";
import type { IRedisService } from "@coachos/features/redis/IRedisService";

type EventDetails = {
  username: string;
  eventSlug: string;
  startTime: Dayjs;
  endTime: Dayjs;
  visitorTimezone?: string;
  visitorUid?: string;
};

export interface INoSlotsNotificationService {
  teamRepo?: unknown;
  membershipRepo: MembershipRepository;
  redisClient: IRedisService;
}

export class NoSlotsNotificationService {
  constructor(public readonly dependencies: INoSlotsNotificationService) {}

  async handleNotificationWhenNoSlots(_args: {
    eventDetails: EventDetails;
    orgDetails: { currentOrgDomain: string | null };
    teamId?: number;
  }) {
    return;
  }
}
