import process from "node:process";
import { BookingRepository } from "@coachos/features/bookings/repositories/BookingRepository";
import { DefaultAdapterFactory } from "@coachos/features/calendar-subscription/adapters/AdaptersFactory";
import { CalendarSubscriptionService } from "@coachos/features/calendar-subscription/lib/CalendarSubscriptionService";
import { CalendarCacheEventRepository } from "@coachos/features/calendar-subscription/lib/cache/CalendarCacheEventRepository";
import { CalendarCacheEventService } from "@coachos/features/calendar-subscription/lib/cache/CalendarCacheEventService";
import { CalendarSyncService } from "@coachos/features/calendar-subscription/lib/sync/CalendarSyncService";
import { getFeatureRepository } from "@coachos/features/di/containers/FeatureRepository";
import { getTeamFeatureRepository } from "@coachos/features/di/containers/TeamFeatureRepository";
import { getUserFeatureRepository } from "@coachos/features/di/containers/UserFeatureRepository";
import { SelectedCalendarRepository } from "@coachos/features/selectedCalendar/repositories/SelectedCalendarRepository";
import { prisma } from "@coachos/prisma";
import { defaultResponderForAppDir } from "@coachos/web/app/api/defaultResponderForAppDir";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Cron webhook
 * Checks for new calendar subscriptions (rollouts)
 *
 * @param request
 * @returns
 */
async function getHandler(request: NextRequest) {
  const apiKey = request.headers.get("authorization") || request.nextUrl.searchParams.get("apiKey");

  if (![process.env.CRON_API_KEY, `Bearer ${process.env.CRON_SECRET}`].includes(`${apiKey}`)) {
    return NextResponse.json({ message: "Forbiden" }, { status: 403 });
  }

  // instantiate dependencies
  const bookingRepository = new BookingRepository(prisma);
  const calendarSyncService = new CalendarSyncService({
    bookingRepository,
  });
  const calendarCacheEventRepository = new CalendarCacheEventRepository(prisma);
  const calendarCacheEventService = new CalendarCacheEventService({
    calendarCacheEventRepository,
  });

  const calendarSubscriptionService = new CalendarSubscriptionService({
    adapterFactory: new DefaultAdapterFactory(),
    selectedCalendarRepository: new SelectedCalendarRepository(prisma),
    featureRepository: getFeatureRepository(),
    teamFeatureRepository: getTeamFeatureRepository(),
    userFeatureRepository: getUserFeatureRepository(),
    calendarSyncService,
    calendarCacheEventService,
  });

  // are features globally enabled
  const [isCacheEnabled, isSyncEnabled] = await Promise.all([
    calendarSubscriptionService.isCacheEnabled(),
    calendarSubscriptionService.isSyncEnabled(),
  ]);

  if (!isCacheEnabled && !isSyncEnabled) {
    return NextResponse.json({ ok: true });
  }

  try {
    await calendarSubscriptionService.checkForNewSubscriptions();
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export const GET = defaultResponderForAppDir(getHandler);
