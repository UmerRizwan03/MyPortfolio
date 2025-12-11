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

/** POST - send email via Resend */
export async function POST(request: Request) {
    try {
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
        const safeMessage = String(message).slice(0, 2000).replace(/\n/g, "<br>");
        const sendRes = await resend.emails.send({
            from,
            to,
            subject: `New Message from Portfolio: ${String(name)}`,
            replyTo: String(email),
            html: `<p><strong>Name:</strong> ${String(name)}</p>
             <p><strong>Email:</strong> ${String(email)}</p>
             <p><strong>Message:</strong></p>
             <p>${safeMessage}</p>`,
        });

        console.log("Resend send response id:", sendRes?.id ?? sendRes);
        return NextResponse.json({ ok: true, result: sendRes });
    } catch (err: any) {
        console.error("Server error in /api/send-email:", err);
        return NextResponse.json({ error: err?.message || "Unknown server error" }, { status: 500 });
    }
}
