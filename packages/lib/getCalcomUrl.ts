import { WEBAPP_URL, IS_COACHOS, COACHOS_URL } from "./constants";

export const getCalcomUrl = () => {
  if (IS_COACHOS) {
    return COACHOS_URL;
  }
  return WEBAPP_URL;
};
