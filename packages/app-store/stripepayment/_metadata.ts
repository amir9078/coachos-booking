import process from "node:process";
import type { AppMeta } from "@coachos/types/App";

export const metadata = {
  name: "Stripe",
  description:
    "A Saas company a payment processing software, and application programming interfaces for e-commerce websites and mobile applications.",
  installed: !!(
    process.env.STRIPE_CLIENT_ID &&
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY &&
    process.env.STRIPE_PRIVATE_KEY
  ),
  slug: "stripe",
  category: "payment",
  categories: ["payment"],
  logo: "icon.svg",
  publisher: "CoachOS Booking",
  title: "Stripe",
  type: "stripe_payment",
  url: "https://amir9078.github.io/",
  docsUrl: "https://stripe.com/docs",
  variant: "payment",
  extendsFeature: "EventType",
  email: "shaikhamirhussain2000@gmail.com",
  dirName: "stripepayment",
  isOAuth: true,
} as AppMeta;

export default metadata;
