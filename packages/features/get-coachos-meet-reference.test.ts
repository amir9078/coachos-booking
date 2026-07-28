import { describe, expect, it } from "vitest";

import { getCoachosMeetReference } from "./get-coachos-meet-reference";

describe("CoachOS Meet", () => {
  it("should load latest CoachOS Meet reference", () => {
    expect(
      getCoachosMeetReference([
        {
          uid: "UID1",
          type: "coachos_meet_video",
          meetingUrl: "ID1",
          meetingPassword: "P1",
        },
        {
          uid: "UID2",
          type: "coachos_meet_video",
          meetingUrl: "ID2",
          meetingPassword: "P2",
        },
      ])
    ).toEqual({
      uid: "UID2",
      type: "coachos_meet_video",
      meetingUrl: "ID2",
      meetingPassword: "P2",
    });
  });
});
