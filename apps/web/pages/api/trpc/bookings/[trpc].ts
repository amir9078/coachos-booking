import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { bookingsRouter } from "@coachos/trpc/server/routers/viewer/bookings/_router";

export default createNextApiHandler(bookingsRouter);
