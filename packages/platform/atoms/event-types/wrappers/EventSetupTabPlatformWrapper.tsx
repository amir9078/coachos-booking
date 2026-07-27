import React from "react";

import type { EventSetupTabProps } from "@coachos/web/modules/event-types/components/tabs/setup/EventSetupTab";
import { EventSetupTab } from "@coachos/web/modules/event-types/components/tabs/setup/EventSetupTab";

const EventSetupTabPlatformWrapper = (props: EventSetupTabProps) => {
  return <EventSetupTab {...props} urlPrefix="" hasOrgBranding={false} />;
};

export default EventSetupTabPlatformWrapper;
