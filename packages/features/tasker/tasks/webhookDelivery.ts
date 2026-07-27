import { getWebhookTaskConsumer } from "@coachos/features/di/webhooks/containers/webhook";
import { webhookTaskPayloadSchema } from "@coachos/features/webhooks/lib/types/webhookTask";
import logger from "@coachos/lib/logger";
import type { ILogger } from "@coachos/lib/tasker/types";

/**
 * Webhook Delivery Task Handler
 *
 * This task is queued by WebhookTaskerProducerService and processed here.
 * It delegates to WebhookTaskConsumer (via DI) which handles the heavy lifting:
 * - Fetching webhook subscribers
 * - Fetching event-specific data from database
 * - Building versioned webhook payloads
 * - Sending HTTP requests to subscriber URLs
 *
 * This handler can be deployed to trigger.dev for scalability.
 */

const log: ILogger = logger.getSubLogger({ prefix: ["webhookDelivery"] });

export async function webhookDelivery(payload: string, taskId?: string): Promise<void> {
  try {
    if (!taskId) {
      throw new Error("Task ID is required for webhook delivery consumer");
    }

    const parsedPayload = webhookTaskPayloadSchema.parse(JSON.parse(payload));
    const consumer = getWebhookTaskConsumer();
    await consumer.processWebhookTask(parsedPayload, taskId);
  } catch (error) {
    log.error("Failed to process webhook delivery task", {
      taskId,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}
