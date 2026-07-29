-- Rename CalVideoSettings -> CoachOSVideoSettings (table rename only, no data change)
ALTER TABLE "CalVideoSettings" RENAME TO "CoachOSVideoSettings";

-- Rename CalAiPhoneNumber -> CoachOSAiPhoneNumber (table rename only, no data change)
ALTER TABLE "CalAiPhoneNumber" RENAME TO "CoachOSAiPhoneNumber";

-- Rename WebhookTriggerEvents enum values to fix a bad-replacement artifact from an
-- earlier rebrand pass (lowercase "coachos" mid-identifier)
ALTER TYPE "WebhookTriggerEvents" RENAME VALUE 'AFTER_HOSTS_coachos_VIDEO_NO_SHOW' TO 'AFTER_HOSTS_COACHOS_VIDEO_NO_SHOW';
ALTER TYPE "WebhookTriggerEvents" RENAME VALUE 'AFTER_GUESTS_coachos_VIDEO_NO_SHOW' TO 'AFTER_GUESTS_COACHOS_VIDEO_NO_SHOW';
