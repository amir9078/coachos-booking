import type { TabMap } from "@coachos/features/eventtypes/lib/types";
import type { EventTypePlatformWrapperRef as EventSettingsFromRef } from "@coachos/features/eventtypes/lib/types";

export type { EventSettingsFromRef };

export type PlatformTabs = keyof Omit<TabMap, "workflows" | "webhooks" | "instant" | "ai" | "apps">;
