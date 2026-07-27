import { getAdminWatchlistQueryService } from "@coachos/features/di/watchlist/containers/watchlist";

export const pendingReportsCountHandler = async () => {
  const service = getAdminWatchlistQueryService();
  return await service.getPendingReportsCount();
};
