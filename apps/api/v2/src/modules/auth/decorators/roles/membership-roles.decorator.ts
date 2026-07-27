import { Reflector } from "@nestjs/core";

import { MembershipRole } from "@coachos/platform-libraries";

export const MembershipRoles = Reflector.createDecorator<MembershipRole[]>();
