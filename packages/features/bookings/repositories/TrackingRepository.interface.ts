import type { Tracking } from "@coachos/prisma/client";

export interface TrackingRepositoryInterface {
  findByBookingUid(bookingUid: string): Promise<Tracking | null>;
}
