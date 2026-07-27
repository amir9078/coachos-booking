import { Reflector } from "@nestjs/core";

import { PERMISSIONS } from "@coachos/platform-constants";

export const Permissions = Reflector.createDecorator<(typeof PERMISSIONS)[number][]>();
