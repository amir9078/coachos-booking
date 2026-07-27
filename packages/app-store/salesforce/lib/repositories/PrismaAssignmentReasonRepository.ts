import { prisma } from "@coachos/prisma";

export class PrismaAssignmentReasonRepository {
  static async findLatestReasonFromBookingUid(bookingUid: string) {
    return await prisma.assignmentReason.findFirst({
      where: {
        booking: {
          uid: bookingUid,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}