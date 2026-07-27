import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { i18nRouter } from "@coachos/trpc/server/routers/viewer/i18n/_router";

export default createNextApiHandler(i18nRouter, true, "i18n");
