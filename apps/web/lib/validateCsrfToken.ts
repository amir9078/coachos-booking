import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function validateCsrfToken(csrfToken: string): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("coachos.csrf_token")?.value;

  if (!cookieToken || cookieToken !== csrfToken) {
    return NextResponse.json({ success: false, message: "Invalid CSRF token" }, { status: 403 });
  }
  cookieStore.delete("coachos.csrf_token");
  return null;
}
