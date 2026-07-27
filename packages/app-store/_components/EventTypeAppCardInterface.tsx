import type z from "zod";

import type { GetAppData, SetAppData } from "@coachos/app-store/EventTypeAppContext";
import EventTypeAppContext from "@coachos/app-store/EventTypeAppContext";
import { EventTypeAddonMap } from "@coachos/app-store/apps.browser.generated";
import type { EventTypeMetaDataSchema } from "@coachos/prisma/zod-utils";
import { ErrorBoundary } from "@coachos/ui/components/errorBoundary";

import type { EventTypeAppCardComponentProps, AppCardApp } from "../types";
import { DynamicComponent } from "./DynamicComponent";

export type EventTypeForAppCard = EventTypeAppCardComponentProps["eventType"];

export const EventTypeAppCard = (props: {
  app: AppCardApp;
  eventType: EventTypeForAppCard;
  getAppData: GetAppData;
  setAppData: SetAppData;
  onAppInstallSuccess?: () => void;
  // For event type apps, get these props from shouldLockDisableProps
  LockedIcon?: JSX.Element | false;
  eventTypeFormMetadata: z.infer<typeof EventTypeMetaDataSchema>;
  disabled?: boolean;
}) => {
  const { app, getAppData, setAppData, LockedIcon, disabled, onAppInstallSuccess } = props;
  return (
    <ErrorBoundary message={`There is some problem with ${app.name} App`}>
      <EventTypeAppContext.Provider value={{ getAppData, setAppData, LockedIcon, disabled }}>
        <DynamicComponent
          slug={app.slug === "stripe" ? "stripepayment" : app.slug}
          componentMap={EventTypeAddonMap}
          {...props}
          onAppInstallSuccess={onAppInstallSuccess}
        />
      </EventTypeAppContext.Provider>
    </ErrorBoundary>
  );
};
