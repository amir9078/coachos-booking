import { BookingReferenceRepository } from "@coachos/features/bookingReference/repositories/BookingReferenceRepository";
import { HttpError } from "@coachos/lib/http-error";
import logger from "@coachos/lib/logger";
import { safeStringify } from "@coachos/lib/safeStringify";

const log = logger.getSubLogger({ prefix: ["coachos-meet-webhook-handler"] });

export const getBookingReference = async (roomName: string) => {
  const bookingReference = await BookingReferenceRepository.findCoachosMeetReferenceByRoomName({ roomName });

  if (!bookingReference || !bookingReference.bookingId) {
    log.error(
      "bookingReference not found error:",
      safeStringify({
        bookingReference,
        roomName,
      })
    );

    throw new HttpError({ message: "Booking reference not found", statusCode: 200 });
  }

  return bookingReference;
};
