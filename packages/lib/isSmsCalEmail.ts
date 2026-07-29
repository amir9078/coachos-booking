export default function isSmsCalEmail(email: string) {
  return email.endsWith("@sms.coachos.internal");
}
