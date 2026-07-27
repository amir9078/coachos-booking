import { EventLimitsTab } from "@coachos/features/eventtypes/components/tabs/limits/EventLimitsTab";
import type { EventLimitsTabProps } from "@coachos/features/eventtypes/components/tabs/limits/EventLimitsTab";

const EventLimitsTabPlatformWrapper = (props: EventLimitsTabProps) => {
  return <EventLimitsTab {...props} />;
};

export default EventLimitsTabPlatformWrapper;
