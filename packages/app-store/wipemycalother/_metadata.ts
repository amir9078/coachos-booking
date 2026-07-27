import type { AppMeta } from "@coachos/types/App";

export const metadata = {
  name: "WipeMyCal",
  description:
    "Wipe My Cal is a Cal.diy exclusive app that redefines what it looks like to reschedule multiple meetings at the same time. Simply install the app, and select 'Wipe' for whatever date you need to mass reschedule. Handle emergencies, unexpected sick days and last minute events with the simple click of a button.",
  installed: true,
  category: "automation",
  categories: ["automation"],
  // If using static next public folder, can then be referenced from the base URL (/).
  logo: "icon-dark.svg",
  publisher: "Cal.diy",
  slug: "wipe-my-cal",
  title: "Wipe my cal",
  type: "wipemycoachos_other",
  url: "https://amir9078.github.io/apps/wipe-my-cal",
  variant: "other",
  email: "shaikhamirhussain2000@gmail.com",
  dirName: "wipemycalother",
  isOAuth: false,
} as AppMeta;

export default metadata;
