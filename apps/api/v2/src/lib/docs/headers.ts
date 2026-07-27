import { ApiHeaderOptions } from "@nestjs/swagger";

import { X_coachos_CLIENT_ID, X_coachos_SECRET_KEY } from "@coachos/platform-constants";

export const OPTIONAL_X_coachos_CLIENT_ID_HEADER: ApiHeaderOptions = {
  name: X_coachos_CLIENT_ID,
  description: "For platform customers - OAuth client ID",
  required: false,
};

export const OPTIONAL_X_coachos_SECRET_KEY_HEADER: ApiHeaderOptions = {
  name: X_coachos_SECRET_KEY,
  description: "For platform customers - OAuth client secret key",
  required: false,
};

export const X_coachos_CLIENT_ID_HEADER: ApiHeaderOptions = {
  name: X_coachos_CLIENT_ID,
  description: "For platform customers - OAuth client ID",
  required: false,
};

export const X_coachos_SECRET_KEY_HEADER: ApiHeaderOptions = {
  name: X_coachos_SECRET_KEY,
  description: "For platform customers - OAuth client secret key",
  required: false,
};

export const OPTIONAL_API_KEY_HEADER: ApiHeaderOptions = {
  name: "Authorization",
  description:
    "For non-platform customers - value must be `Bearer <token>` where `<token>` is api key prefixed with coachos_",
  required: false,
};

export const API_KEY_HEADER: ApiHeaderOptions = {
  name: "Authorization",
  description: "value must be `Bearer <token>` where `<token>` is api key prefixed with coachos_",
  required: true,
};

export const API_KEY_OR_ACCESS_TOKEN_HEADER: ApiHeaderOptions = {
  name: "Authorization",
  description:
    "value must be `Bearer <token>` where `<token>` is api key prefixed with coachos_ or managed user access token",
  required: true,
};

export const OPTIONAL_API_KEY_OR_ACCESS_TOKEN_HEADER: ApiHeaderOptions = {
  name: "Authorization",
  description:
    "value must be `Bearer <token>` where `<token>` is api key prefixed with coachos_ or managed user access token",
  required: false,
};

export const ACCESS_TOKEN_HEADER: ApiHeaderOptions = {
  name: "Authorization",
  description: "value must be `Bearer <token>` where `<token>` is managed user access token",
  required: true,
};
