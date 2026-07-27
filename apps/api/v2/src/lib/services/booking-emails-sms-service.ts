import { Logger } from "@/lib/logger.bridge";
import { Injectable } from "@nestjs/common";

import { BookingEmailSmsHandler } from "@coachos/platform-libraries/bookings";

@Injectable()
export class BookingEmailSmsService extends BookingEmailSmsHandler {
  constructor(logger: Logger) {
    super({
      logger,
    });
  }
}
