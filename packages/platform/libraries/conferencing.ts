export {
  getRecordingsOfCalVideoByRoomName,
  getDownloadLinkOfCalVideoByRecordingId,
  getAllTranscriptsAccessLinkFromRoomName,
  getCalVideoMeetingSessionsByRoomName,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "@coachos/features/conferencing/lib/videoClient";

export { FAKE_DAILY_CREDENTIAL } from "@coachos/app-store/dailyvideo/lib/VideoApiAdapter";

export type { CalMeetingParticipant, CalMeetingSession } from "@coachos/app-store/dailyvideo/zod";
