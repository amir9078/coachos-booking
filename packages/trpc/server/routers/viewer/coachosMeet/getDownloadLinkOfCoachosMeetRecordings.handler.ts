/// <reference types="@coachos/types/next-auth" />
import { getDownloadLinkOfCoachosMeetByRecordingId } from "@coachos/features/conferencing/lib/videoClient";
import { IS_SELF_HOSTED } from "@coachos/lib/constants";

import { TRPCError } from "@trpc/server";

import type { WithSession } from "../../../createContext";
import type { TGetDownloadLinkOfCoachosMeetRecordingsInputSchema } from "./getDownloadLinkOfCoachosMeetRecordings.schema";

type GetDownloadLinkOfCoachosMeetRecordingsHandlerOptions = {
  ctx: WithSession;
  input: TGetDownloadLinkOfCoachosMeetRecordingsInputSchema;
};

export const getDownloadLinkOfCoachosMeetRecordingsHandler = async ({
  input,
  ctx,
}: GetDownloadLinkOfCoachosMeetRecordingsHandlerOptions) => {
  const { recordingId } = input;
  const { session } = ctx;

  const isDownloadAllowed = IS_SELF_HOSTED || session?.user?.belongsToActiveTeam;

  if (!isDownloadAllowed) {
    throw new TRPCError({
      code: "FORBIDDEN",
    });
  }

  try {
    const res = await getDownloadLinkOfCoachosMeetByRecordingId(recordingId);
    return res;
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
    });
  }
};
