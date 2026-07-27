import { FilterSegmentRepository } from "@coachos/features/data-table/repositories/filterSegment";
import type { TListFilterSegmentsInputSchema } from "@coachos/features/data-table/repositories/filterSegment.type";
import type { TrpcSessionUser } from "@coachos/trpc/server/types";

export const listHandler = async ({
  ctx,
  input,
}: {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TListFilterSegmentsInputSchema;
}) => {
  const repository = new FilterSegmentRepository();
  return await repository.get({
    userId: ctx.user.id,
    tableIdentifier: input.tableIdentifier,
  });
};
