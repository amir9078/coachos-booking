export {
  getRecordingsOfCoachosMeetByRoomName,
  getDownloadLinkOfCoachosMeetByRecordingId,
  getAllTranscriptsAccessLinkFromRoomName,
  getCoachosMeetMeetingSessionsByRoomName,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "@coachos/features/conferencing/lib/videoClient";

export { FAKE_COACHOS_MEET_CREDENTIAL } from "@coachos/app-store/coachosmeet/lib/VideoApiAdapter";

export type { CalMeetingParticipant, CalMeetingSession } from "@coachos/app-store/coachosmeet/zod";
