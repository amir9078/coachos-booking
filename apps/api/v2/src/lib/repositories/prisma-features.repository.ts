import { PrismaWriteService } from "@/modules/prisma/prisma-write.service";
import { Injectable } from "@nestjs/common";

import { PrismaFeaturesRepository as PrismaFeaturesRepositoryLib } from "@coachos/platform-libraries/repositories";
import type { PrismaClient } from "@coachos/prisma";

@Injectable()
export class PrismaFeaturesRepository extends PrismaFeaturesRepositoryLib {
  constructor(private readonly dbWrite: PrismaWriteService) {
    super(dbWrite.prisma as unknown as PrismaClient);
  }
}
