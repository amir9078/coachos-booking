import { usePathname } from "next/navigation";

import AppCard from "@coachos/app-store/_components/AppCard";
import useIsAppEnabled from "@coachos/app-store/_utils/useIsAppEnabled";
import type { EventTypeAppCardComponent } from "@coachos/app-store/types";
import { WEBAPP_URL } from "@coachos/lib/constants";

const EventTypeAppCard: EventTypeAppCardComponent = function EventTypeAppCard({ app, eventType, onAppInstallSuccess }) {
  const pathname = usePathname();

  const { enabled, updateEnabled } = useIsAppEnabled(app);

  return (
    <AppCard
      onAppInstallSuccess={onAppInstallSuccess}
      returnTo={`${WEBAPP_URL}${pathname}?tabName=apps`}
      app={app}
      teamId={eventType.team?.id || undefined}
      switchOnClick={(e) => {
        updateEnabled(e);
      }}
      switchChecked={enabled}
      hideAppCardOptions
    />
  );
};

export default EventTypeAppCard;
