import process from "node:process";
import type { AppMeta } from "@coachos/types/App";

export const metadata = {
  name: "CoachOS Meet",
  description:
    "CoachOS Meet is the in-house web-based video conferencing platform powered by Daily.co, which is minimalistic and lightweight, but has most of the features you need.",
  installed: !!process.env.COACHOS_MEET_API_KEY,
  type: "coachos_meet_video",
  variant: "conferencing",
  url: "https://daily.co",
  categories: ["conferencing"],
  logo: "icon.svg",
  publisher: "CoachOS Booking",
  category: "conferencing",
  slug: "coachos-meet",
  title: "CoachOS Meet",
  isGlobal: true,
  email: "shaikhamirhussain2000@gmail.com",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:coachos_meet",
      label: "CoachOS Meet",
    },
  },
  key: { apikey: process.env.COACHOS_MEET_API_KEY },
  dirName: "coachosmeet",
  isOAuth: false,
} as AppMeta;

export default metadata;
