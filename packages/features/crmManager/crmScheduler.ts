import tasker from "@coachos/features/tasker";
import { tasksConfig } from "@coachos/features/tasker/tasks";

class CRMScheduler {
  static async createEvent({ bookingUid }: { bookingUid: string }) {
    return tasker.create(
      "createCRMEvent",
      { bookingUid },
      { maxAttempts: tasksConfig.createCRMEvent?.maxAttempts ?? 5 }
    );
  }
}

export default CRMScheduler;
