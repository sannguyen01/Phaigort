import { NextResponse } from "next/server";
import { Resend } from "resend";

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

// Simple in-memory rate limiter: max 5 requests per IP per 15 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body: unknown = await request.json();
    const result = validate(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { name, email, interest, message } = result.data;
    const recipientEmail = process.env.CONTACT_EMAIL_TO ?? "hello@phaigort.com";

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `Phaigort Contact <noreply@${process.env.RESEND_DOMAIN ?? "phaigort.com"}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `New inquiry from ${name} — ${interest}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Interest: ${interest}`,
          ``,
          `Message:`,
          message,
        ].join("\n"),
      });
    } else {
      // Fallback: log to server when Resend is not configured (dev/preview)
      console.warn("[contact] RESEND_API_KEY not set — logging submission instead of emailing");
      console.log("[contact]", result.data);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
