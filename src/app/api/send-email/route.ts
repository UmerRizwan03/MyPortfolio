// app/api/send-email/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

console.log("⦿ loading /api/send-email - env presence:",
    {
        hasApiKey: !!process.env.RESEND_API_KEY,
        hasFrom: !!process.env.RESEND_FROM_EMAIL,
        hasTo: !!process.env.RESEND_TO_EMAIL
    }
);

/** GET - safe health check (can open in browser) */
export async function GET() {
    return NextResponse.json({
        ok: true,
        env: {
            hasApiKey: !!process.env.RESEND_API_KEY,
            hasFrom: !!process.env.RESEND_FROM_EMAIL,
            hasTo: !!process.env.RESEND_TO_EMAIL
        },
        note: "Health-check only. Does not expose secret values."
    });
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, number>();

// Basic HTML escape function
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/** POST - send email via Resend */
export async function POST(request: Request) {
    try {
        // IP-based rate limiting (best effort)
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const now = Date.now();
        const lastRequest = rateLimitMap.get(ip) || 0;

        // Limit to 1 request per minute per IP
        if (now - lastRequest < 60 * 1000) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }
        rateLimitMap.set(ip, now);

        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.RESEND_FROM_EMAIL;
        const to = process.env.RESEND_TO_EMAIL;

        if (!apiKey) {
            console.error("Missing RESEND_API_KEY");
            return NextResponse.json({ error: "Server misconfiguration: missing API key" }, { status: 500 });
        }
        if (!from || !to) {
            console.error("Missing from/to env");
            return NextResponse.json({ error: "Server misconfiguration: missing from/to email" }, { status: 500 });
        }

        const body = await request.json().catch(() => null);
        if (!body) {
            console.error("Invalid JSON body");
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { name, email, message } = body;
        if (!name || !email || !message) {
            console.error("Missing fields in request body", { name, email, message });
            return NextResponse.json({ error: "Missing fields: name, email, message" }, { status: 400 });
        }

        const resend = new Resend(apiKey);
        const safeName = escapeHtml(String(name));
        const safeEmail = escapeHtml(String(email));
        const safeMessage = escapeHtml(String(message)).slice(0, 2000).replace(/\n/g, "<br>");

        const sendRes = await resend.emails.send({
            from,
            to,
            subject: `New Message from Portfolio: ${safeName}`,
            replyTo: safeEmail,
            html: `<p><strong>Name:</strong> ${safeName}</p>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>Message:</strong></p>
             <p>${safeMessage}</p>`,
        });

        if (sendRes.error) {
            console.error("Resend error:", sendRes.error);
            return NextResponse.json({ error: sendRes.error.message }, { status: 500 });
        }

        console.log("Resend send response id:", sendRes.data?.id ?? sendRes);
        return NextResponse.json({ ok: true, result: sendRes.data });
    } catch (err: unknown) {
        console.error("Server error in /api/send-email:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown server error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
