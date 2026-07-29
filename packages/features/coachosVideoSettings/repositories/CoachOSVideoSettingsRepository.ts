import { prisma } from "@coachos/prisma";

export class CoachOSVideoSettingsRepository {
  static async deleteCoachOSVideoSettings(eventTypeId: number) {
    return await prisma.coachOSVideoSettings.delete({
      where: { eventTypeId },
    });
  }

  static async createCoachOSVideoSettings({
    eventTypeId,
    coachosVideoSettings,
  }: {
    eventTypeId: number;
    coachosVideoSettings: {
      disableRecordingForGuests?: boolean | null;
      disableRecordingForOrganizer?: boolean | null;
      enableAutomaticTranscription?: boolean | null;
      enableAutomaticRecordingForOrganizer?: boolean | null;
      disableTranscriptionForGuests?: boolean | null;
      disableTranscriptionForOrganizer?: boolean | null;
      redirectUrlOnExit?: string | null;
      requireEmailForGuests?: boolean | null;
    };
  }) {
    return await prisma.coachOSVideoSettings.create({
      data: {
        disableRecordingForGuests: coachosVideoSettings.disableRecordingForGuests ?? false,
        disableRecordingForOrganizer: coachosVideoSettings.disableRecordingForOrganizer ?? false,
        enableAutomaticTranscription: coachosVideoSettings.enableAutomaticTranscription ?? false,
        enableAutomaticRecordingForOrganizer: coachosVideoSettings.enableAutomaticRecordingForOrganizer ?? false,
        disableTranscriptionForGuests: coachosVideoSettings.disableTranscriptionForGuests ?? false,
        disableTranscriptionForOrganizer: coachosVideoSettings.disableTranscriptionForOrganizer ?? false,
        redirectUrlOnExit: coachosVideoSettings.redirectUrlOnExit ?? null,
        requireEmailForGuests: coachosVideoSettings.requireEmailForGuests ?? false,
        eventTypeId,
      },
    });
  }

  static async createOrUpdateCoachOSVideoSettings({
    eventTypeId,
    coachosVideoSettings,
  }: {
    eventTypeId: number;
    coachosVideoSettings: {
      disableRecordingForGuests?: boolean | null;
      disableRecordingForOrganizer?: boolean | null;
      disableTranscriptionForGuests?: boolean | null;
      disableTranscriptionForOrganizer?: boolean | null;
      enableAutomaticTranscription?: boolean | null;
      enableAutomaticRecordingForOrganizer?: boolean | null;
      redirectUrlOnExit?: string | null;
      requireEmailForGuests?: boolean | null;
    };
  }) {
    return await prisma.coachOSVideoSettings.upsert({
      where: { eventTypeId },
      update: {
        disableRecordingForGuests: coachosVideoSettings.disableRecordingForGuests ?? false,
        disableRecordingForOrganizer: coachosVideoSettings.disableRecordingForOrganizer ?? false,
        enableAutomaticTranscription: coachosVideoSettings.enableAutomaticTranscription ?? false,
        enableAutomaticRecordingForOrganizer: coachosVideoSettings.enableAutomaticRecordingForOrganizer ?? false,
        disableTranscriptionForGuests: coachosVideoSettings.disableTranscriptionForGuests ?? false,
        disableTranscriptionForOrganizer: coachosVideoSettings.disableTranscriptionForOrganizer ?? false,
        redirectUrlOnExit: coachosVideoSettings.redirectUrlOnExit ?? null,
        requireEmailForGuests: coachosVideoSettings.requireEmailForGuests ?? false,
        updatedAt: new Date(),
      },
      create: {
        disableRecordingForGuests: coachosVideoSettings.disableRecordingForGuests ?? false,
        disableRecordingForOrganizer: coachosVideoSettings.disableRecordingForOrganizer ?? false,
        enableAutomaticTranscription: coachosVideoSettings.enableAutomaticTranscription ?? false,
        enableAutomaticRecordingForOrganizer: coachosVideoSettings.enableAutomaticRecordingForOrganizer ?? false,
        disableTranscriptionForGuests: coachosVideoSettings.disableTranscriptionForGuests ?? false,
        disableTranscriptionForOrganizer: coachosVideoSettings.disableTranscriptionForOrganizer ?? false,
        redirectUrlOnExit: coachosVideoSettings.redirectUrlOnExit ?? null,
        requireEmailForGuests: coachosVideoSettings.requireEmailForGuests ?? false,
        eventTypeId,
      },
    });
  }
}
