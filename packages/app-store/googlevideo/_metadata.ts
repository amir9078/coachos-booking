import process from "node:process";
import { validJson } from "@coachos/lib/jsonUtils";
import type { AppMeta } from "@coachos/types/App";

export const metadata = {
  name: "Google Meet",
  description:
    "Google Meet is Google's web-based video conferencing platform, designed to compete with major conferencing platforms.",
  installed: !!(process.env.GOOGLE_API_CREDENTIALS && validJson(process.env.GOOGLE_API_CREDENTIALS)),
  slug: "google-meet",
  category: "conferencing",
  categories: ["conferencing"],
  type: "google_video",
  title: "Google Meet",
  variant: "conferencing",
  logo: "logo.webp",
  publisher: "CoachOS Booking",
  url: "https://amir9078.github.io/",
  isGlobal: false,
  email: "shaikhamirhussain2000@gmail.com",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:google:meet",
      label: "Google Meet",
    },
  },
  dirName: "googlevideo",
  dependencies: ["google-calendar"],
  isOAuth: false,
} as AppMeta;

export default metadata;
