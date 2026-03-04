import { NextResponse } from "next/server";

const INTERESTS = [
  "geological-rarities",
  "precious-metals",
  "historical-artifacts",
  "contemporary-innovations",
  "general",
] as const;

interface ContactPayload {
  name: string;
  email: string;
  interest: string;
  message: string;
}

function validate(data: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof data !== "object" || data === null) {
    return { ok: false, error: "Invalid request body." };
  }

  const { name, email, interest, message } = data as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
    return { ok: false, error: "Name must be between 2 and 100 characters." };
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (typeof interest !== "string" || (interest !== "" && !INTERESTS.includes(interest as typeof INTERESTS[number]))) {
    return { ok: false, error: "Invalid area of interest." };
  }
  if (typeof message !== "string" || message.trim().length < 10 || message.trim().length > 2000) {
    return { ok: false, error: "Message must be between 10 and 2000 characters." };
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      interest: interest || "general",
      message: message.trim(),
    },
  };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = validate(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // TODO: integrate email service (Resend, SendGrid, etc.)
    // For now, log the validated submission
    console.log("[contact]", result.data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}
