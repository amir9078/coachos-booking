import { DynamicComponent } from "@coachos/app-store/_components/DynamicComponent";
import dynamic from "next/dynamic";

export const AppSetupMap = {
  alby: dynamic(() => import("@coachos/web/components/apps/alby/Setup")),
  "apple-calendar": dynamic(() => import("@coachos/web/components/apps/applecalendar/Setup")),
  exchange: dynamic(() => import("@coachos/web/components/apps/exchangecalendar/Setup")),
  "exchange2013-calendar": dynamic(() => import("@coachos/web/components/apps/exchange2013calendar/Setup")),
  "exchange2016-calendar": dynamic(() => import("@coachos/web/components/apps/exchange2016calendar/Setup")),
  "caldav-calendar": dynamic(() => import("@coachos/web/components/apps/caldavcalendar/Setup")),
  "ics-feed": dynamic(() => import("@coachos/web/components/apps/ics-feedcalendar/Setup")),
  make: dynamic(() => import("@coachos/web/components/apps/make/Setup")),
  sendgrid: dynamic(() => import("@coachos/web/components/apps/sendgrid/Setup")),
  stripe: dynamic(() => import("@coachos/web/components/apps/stripepayment/Setup")),
  paypal: dynamic(() => import("@coachos/web/components/apps/paypal/Setup")),
  hitpay: dynamic(() => import("@coachos/web/components/apps/hitpay/Setup")),
  btcpayserver: dynamic(() => import("@coachos/web/components/apps/btcpayserver/Setup")),
};

export const AppSetupPage = (props: { slug: string }) => {
  return <DynamicComponent<typeof AppSetupMap> componentMap={AppSetupMap} {...props} />;
};

export default AppSetupPage;
