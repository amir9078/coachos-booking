import { getRecordingsOfCoachosMeetByRoomName } from "@coachos/features/conferencing/lib/videoClient";
import type { TrpcSessionUser } from "@coachos/trpc/server/types";

import { TRPCError } from "@trpc/server";

import type { TGetCoachosMeetRecordingsInputSchema } from "./getCoachosMeetRecordings.schema";

type GetCoachosMeetRecordingsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TGetCoachosMeetRecordingsInputSchema;
};

export const getCoachosMeetRecordingsHandler = async ({ ctx: _ctx, input }: GetCoachosMeetRecordingsOptions) => {
  const { roomName } = input;

  try {
    const res = await getRecordingsOfCoachosMeetByRoomName(roomName);
    return res;
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
    });
  }
};
