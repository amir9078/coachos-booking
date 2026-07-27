import { describe, expect, it } from "vitest";

import { getCalVideoReference } from "./get-cal-video-reference";

describe("CoachOS Meet", () => {
  it("should load latest CoachOS Meet reference", () => {
    expect(
      getCalVideoReference([
        {
          uid: "UID1",
          type: "daily_video",
          meetingUrl: "ID1",
          meetingPassword: "P1",
        },
        {
          uid: "UID2",
          type: "daily_video",
          meetingUrl: "ID2",
          meetingPassword: "P2",
        },
      ])
    ).toEqual({
      uid: "UID2",
      type: "daily_video",
      meetingUrl: "ID2",
      meetingPassword: "P2",
    });
  });
});
