import { env } from "cloudflare:workers";

type LeadPayload = {
  specialization?: unknown;
  experience?: unknown;
  workFormats?: unknown;
  otherFormat?: unknown;
  brands?: unknown;
  socialUrl?: unknown;
};

const GOOGLE_SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbysQd6Kbe7MrrBxxK8tv0TGVIjcj5cP9s9DCU7YDRZ1j_Fj-OO0xbXIVJ1FArQ6OXU4Ng/exec";

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "Некоректний формат даних." }, { status: 400 });
  }

  const specialization = text(payload.specialization, 180);
  const experience = text(payload.experience, 400);
  const brands = text(payload.brands, 800);
  const otherFormat = text(payload.otherFormat, 180);
  const socialUrl = text(payload.socialUrl, 500);
  const workFormats = Array.isArray(payload.workFormats)
    ? payload.workFormats
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim().slice(0, 80))
        .filter(Boolean)
        .slice(0, 5)
    : [];

  if (!specialization || !experience || !brands || workFormats.length === 0) {
    return Response.json(
      { error: "Заповніть усі обов’язкові поля." },
      { status: 400 },
    );
  }

  if (socialUrl) {
    try {
      const url = new URL(socialUrl);
      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Unsupported protocol");
      }
    } catch {
      return Response.json(
        { error: "Перевірте посилання на соціальну мережу." },
        { status: 400 },
      );
    }
  }

  try {
    const sheetsResponse = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        specialization,
        experience,
        workFormats,
        otherFormat,
        brands,
        socialUrl,
      }),
    });

    const sheetsResult = (await sheetsResponse.json()) as { ok?: boolean };

    if (!sheetsResponse.ok || !sheetsResult.ok) {
      throw new Error("Google Sheets rejected the submission");
    }
  } catch {
    return Response.json(
      { error: "Не вдалося записати заявку в таблицю." },
      { status: 502 },
    );
  }

  const db = env.DB;

  if (!db) {
    return Response.json({ ok: true }, { status: 201 });
  }

  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        specialization TEXT NOT NULL,
        experience TEXT NOT NULL,
        work_formats TEXT NOT NULL,
        other_format TEXT,
        brands TEXT NOT NULL,
        social_url TEXT,
        created_at INTEGER NOT NULL
      )
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS leads_created_at_idx
      ON leads (created_at)
    `),
  ]);

  const result = await db
    .prepare(`
      INSERT INTO leads (
        specialization,
        experience,
        work_formats,
        other_format,
        brands,
        social_url,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      specialization,
      experience,
      JSON.stringify(workFormats),
      otherFormat || null,
      brands,
      socialUrl || null,
      Date.now(),
    )
    .run();

  return Response.json({ ok: true, id: result.meta.last_row_id }, { status: 201 });
}
