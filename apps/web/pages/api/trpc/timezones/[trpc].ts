import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { timezonesRouter } from "@coachos/trpc/server/routers/publicViewer/timezones/_router";

export default createNextApiHandler(timezonesRouter, true);
