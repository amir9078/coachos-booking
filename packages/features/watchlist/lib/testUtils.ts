import prismock from "@coachos/testing/lib/__mocks__/prisma";

import type { WatchlistType } from "@coachos/prisma/enums";

interface WatchlistInput {
  type: WatchlistType;
  value: string;
}

export const createWatchlistEntry = async (input: WatchlistInput) => {
  await prismock.watchlist.create({
    data: {
      ...input,
    },
  });
};
