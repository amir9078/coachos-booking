import type BaseEmail from "@coachos/emails/templates/_base-email";
import type { CalendarEvent } from "@coachos/types/Calendar";
import { formatCalEvent } from "@coachos/lib/formatCalendarEvent";

import OrganizerCoachosMeetDownloadRecordingEmail from "./templates/organizer-coachos-meet-download-recording-email";
import AttendeeCoachosMeetDownloadRecordingEmail from "./templates/attendee-coachos-meet-download-recording-email";
import OrganizerCoachosMeetDownloadTranscriptEmail from "./templates/organizer-coachos-meet-download-transcript-email";
import AttendeeCoachosMeetDownloadTranscriptEmail from "./templates/attendee-coachos-meet-download-transcript-email";

const sendEmail = (prepare: () => BaseEmail) => {
  return new Promise((resolve, reject) => {
    try {
      const email = prepare();
      resolve(email.sendEmail());
    } catch (e) {
      reject(console.error(`${prepare.constructor.name}.sendEmail failed`, e));
    }
  });
};

export const sendCoachosMeetRecordingEmails = async (calEvent: CalendarEvent, downloadLink: string) => {
  const calendarEvent = formatCalEvent(calEvent);
  const emailsToSend: Promise<unknown>[] = [];

  emailsToSend.push(
    sendEmail(() => new OrganizerCoachosMeetDownloadRecordingEmail(calendarEvent, downloadLink))
  );

  for (const attendee of calendarEvent.attendees) {
    emailsToSend.push(
      sendEmail(() => new AttendeeCoachosMeetDownloadRecordingEmail(calendarEvent, attendee, downloadLink))
    );
  }
  await Promise.all(emailsToSend);
};

export const sendCoachosMeetTranscriptEmails = async (calEvent: CalendarEvent, transcripts: string[]) => {
  const emailsToSend: Promise<unknown>[] = [];

  emailsToSend.push(sendEmail(() => new OrganizerCoachosMeetDownloadTranscriptEmail(calEvent, transcripts)));

  for (const attendee of calEvent.attendees) {
    emailsToSend.push(
      sendEmail(() => new AttendeeCoachosMeetDownloadTranscriptEmail(calEvent, attendee, transcripts))
    );
  }
  await Promise.all(emailsToSend);
};
