import { handleErrorsJson } from "@coachos/lib/errors";

import { getCoachosMeetAppKeys } from "./getCoachosMeetAppKeys";

export const fetcher = async (endpoint: string, init?: RequestInit | undefined) => {
  const { api_key } = await getCoachosMeetAppKeys();
  return fetch(`https://api.daily.co/v1${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  }).then(handleErrorsJson);
};
