import { WEBAPP_URL, IS_COACHOS } from "./constants";

export const getCalcomUrl = () => {
  if (IS_COACHOS) {
    return new URL(WEBAPP_URL).hostname.endsWith("cal.eu") ? "https://cal.eu" : "https://amir9078.github.io";
  }
  return WEBAPP_URL;
};
