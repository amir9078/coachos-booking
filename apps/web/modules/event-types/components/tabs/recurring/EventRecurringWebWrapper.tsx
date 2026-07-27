import type { EventRecurringTabProps } from "@coachos/features/eventtypes/components/tabs/recurring/EventRecurringTab";
import { EventRecurringTab } from "@coachos/features/eventtypes/components/tabs/recurring/EventRecurringTab";

const EventRecurringWebWrapper = (props: EventRecurringTabProps) => {
  return <EventRecurringTab {...props} />;
};

export default EventRecurringWebWrapper;
