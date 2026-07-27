"use client";

import { ShellMainAppDir } from "app/(use-page-wrapper)/(main-nav)/ShellMainAppDir";

import { EventTypesSkeletonLoader } from "@coachos/web/modules/event-types/components/SkeletonLoader";
import { useLocale } from "@coachos/lib/hooks/useLocale";

export function EventTypesSkeleton() {
  const { t } = useLocale();
  return (
    <ShellMainAppDir heading={t("event_types_page_title")} subtitle={t("event_types_page_subtitle")}>
      <EventTypesSkeletonLoader />
    </ShellMainAppDir>
  );
}
