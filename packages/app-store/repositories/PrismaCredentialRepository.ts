import { buildNonDelegationCredentials } from "@coachos/lib/delegationCredential";
import { prisma } from "@coachos/prisma";
import type { Prisma } from "@coachos/prisma/client";  
import type { AppCategories } from "@coachos/prisma/client";
import { credentialForCalendarServiceSelect } from "@coachos/prisma/selects/credential";

export class PrismaCredentialRepository {
    constructor(private readonly prismaClient: typeof prisma){}

    async findNonDelegationCredentialsByAppCategories({
        idToSearchObject,  
        appCategories,
    }: {
        idToSearchObject: Prisma.CredentialWhereInput;  
        appCategories: AppCategories[];  
    }){

        const credentials = await this.prismaClient.credential.findMany({
            where: {
                ...idToSearchObject,
                app: {
                    categories: {
                        hasSome: appCategories
                    }
                }
            },
            select: {
                ...credentialForCalendarServiceSelect,
                team: {
                    select: {
                        name: true
                    }
                }
            }
        })


        return buildNonDelegationCredentials(credentials)
    }
}