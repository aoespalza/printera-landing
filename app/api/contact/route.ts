// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";
import { z } from "zod";

export const runtime = "nodejs";

const Schema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre (mín. 2 caracteres)"),
  empresa: z.string().trim().optional().nullable(),
  email: z.string().trim().email("Correo inválido"),
  telefono: z.string().trim().optional().nullable(),
  detalle: z
    .string()
    .trim()
    .min(5, "Cuéntanos un poco más sobre tu necesidad (mín. 5 caracteres)"),
  website: z.string().optional().nullable(),        // honeypot
  recaptchaToken: z.string().optional().nullable(), // opcional
});

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------- Google Sheets helpers ----------
function getJwtClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error("Credenciales de Google no configuradas (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY).");
  }
  privateKey = privateKey.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function ensureHeaders() {
  const sheetsId = process.env.GOOGLE_SHEETS_ID;
  if (!sheetsId) throw new Error("GOOGLE_SHEETS_ID no configurado.");
  const auth = getJwtClient();
  const sheets = google.sheets({ version: "v4", auth });

  // Lee A1:H1. Si está vacío (sin headers), los crea.
  const read = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetsId,
    range: "Leads!A1:H1",
  });

  const hasHeaders =
    Array.isArray(read.data.values) &&
    read.data.values.length > 0 &&
    read.data.values[0].some((v) => (v ?? "").toString().trim() !== "");

  if (hasHeaders) return;

  // Crea encabezados
  const headers = [
    "timestamp",
    "nombre",
    "empresa",
    "email",
    "telefono",
    "detalle",
    "fuente",
    "userAgent",
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetsId,
    range: "Leads!A1:H1",
    valueInputOption: "RAW",
    requestBody: { values: [headers] },
  });
}

async function appendLeadToSheet(values: any[]) {
  const sheetsId = process.env.GOOGLE_SHEETS_ID;
  if (!sheetsId) throw new Error("GOOGLE_SHEETS_ID no configurado.");
  const auth = getJwtClient();
  const sheets = google.sheets({ version: "v4", auth });

  // Asegura encabezados antes de insertar
  await ensureHeaders();

  return sheets.spreadsheets.values.append({
    spreadsheetId: sheetsId,
    range: "Leads!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values] },
  });
}

// ---------- reCAPTCHA opcional ----------
async function verifyRecaptcha(token?: string | null) {
    const secret = process.env.RECAPTCHA_SECRET;
    const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
    if (!secret) return { ok: true, score: null, reason: "no-secret" };
    if (!token)  return { ok: false, score: null, reason: "no-token" };
  
    try {
      const body = new URLSearchParams({ secret, response: token });
      const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      const json = await res.json();
      const score = typeof json.score === "number" ? json.score : null;
      const ok = Boolean(json.success) && (score === null || score >= minScore);
      return { ok, score, reason: ok ? "ok" : "low-score" };
    } catch (e) {
      return { ok: false, score: null, reason: "error" };
    }
  }

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = Schema.parse(json);

    // Honeypot
    if (data.website) return NextResponse.json({ ok: true });

    // reCAPTCHA (opcional)
    const recaptcha = await verifyRecaptcha(data.recaptchaToken ?? null);
if (!recaptcha.ok) {
  console.warn("reCAPTCHA failed:", recaptcha);
  return NextResponse.json(
    {
      ok: false,
      message:
        recaptcha.reason === "low-score"
          ? "Verificación reCAPTCHA falló (score bajo)."
          : "Verificación reCAPTCHA falló.",
    },
    { status: 400 }
  );
}

    // ---------- Email via Resend ----------
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, message: "RESEND_API_KEY no configurada" },
        { status: 500 }
      );
    }
    const FROM =
      process.env.CONTACT_FROM?.trim() || "PrinTera <onboarding@resend.dev>";
    const TO = process.env.CONTACT_TO?.trim();
    if (!TO) {
      return NextResponse.json(
        { ok: false, message: "CONTACT_TO no configurado" },
        { status: 500 }
      );
    }

    const text = [
      "Nuevo lead de la landing",
      `Nombre: ${data.nombre}`,
      `Empresa: ${data.empresa ?? "-"}`,
      `Email: ${data.email}`,
      `Teléfono: ${data.telefono ?? "-"}`,
      `Detalle: ${data.detalle}`,
    ].join("\n");

    const mailResp = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: data.email,
      subject: "Nuevo lead - PrinTera",
      text,
    });

    if ((mailResp as any)?.error) {
      return NextResponse.json(
        { ok: false, message: (mailResp as any).error?.message || "Resend error" },
        { status: 500 }
      );
    }

    // ---------- Append en Google Sheets ----------
    let saved = false;
    try {
      const ua = req.headers.get("user-agent") || "";
      const now = new Date().toISOString();
      await appendLeadToSheet([
        now,                // A: timestamp
        data.nombre,        // B
        data.empresa ?? "", // C
        data.email,         // D
        data.telefono ?? "",// E
        data.detalle,       // F
        "Landing",          // G: fuente
        ua,                 // H: user agent
      ]);
      saved = true;
    } catch (sheetErr: any) {
      console.error("SHEETS_ERROR", sheetErr?.message || sheetErr);
      // No frenamos el éxito del correo si Sheets falla
    }

    return NextResponse.json({
      ok: true,
      saved,
      message: "¡Gracias! Hemos recibido tu solicitud.",
    });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json(
        { ok: false, message: "Datos inválidos", issues: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Error enviando correo" },
      { status: 500 }
    );
  }
}
