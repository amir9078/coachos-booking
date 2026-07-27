import type { EventRecurringTabProps } from "@coachos/features/eventtypes/components/tabs/recurring/EventRecurringTab";
import { EventRecurringTab } from "@coachos/features/eventtypes/components/tabs/recurring/EventRecurringTab";

const EventRecurringTabPlatformWrapper = (props: EventRecurringTabProps) => {
  return <EventRecurringTab {...props} />;
};

export default EventRecurringTabPlatformWrapper;
