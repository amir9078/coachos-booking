import type { AppMeta } from "@coachos/types/App";

export const shouldRedirectToAppOnboarding = (appMetadata: AppMeta) => {
  const hasEventTypes = appMetadata?.extendsFeature === "EventType";
  return hasEventTypes;
};
