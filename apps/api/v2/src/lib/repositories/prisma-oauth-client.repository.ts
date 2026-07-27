import { PrismaWriteService } from "@/modules/prisma/prisma-write.service";
import { Injectable } from "@nestjs/common";

import { PrismaOAuthClientRepository as PrismaOAuthClientRepositoryLib } from "@coachos/platform-libraries/repositories";
import type { PrismaClient } from "@coachos/prisma";

@Injectable()
export class PrismaOAuthClientRepository extends PrismaOAuthClientRepositoryLib {
  constructor(private readonly dbWrite: PrismaWriteService) {
    super(dbWrite.prisma as unknown as PrismaClient);
  }
}
