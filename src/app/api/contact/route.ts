import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

/* ---------------------------------------------------------------------------
 * Validation helpers
 * -------------------------------------------------------------------------*/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(v: string) {
  return EMAIL_RE.test(v)
}

function sanitize(v: unknown, max: number): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

/* ---------------------------------------------------------------------------
 * POST /api/contact
 *
 * Expects JSON body: { name, email, subject, message }
 * Sends an email to CONTACT_TO_EMAIL via Resend.
 * Reply-To is set to the visitor's email address.
 * -------------------------------------------------------------------------*/
export async function POST(req: NextRequest) {
  /* ── 1. Parse body ── */
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const raw = body as Record<string, unknown>

  /* ── 2. Sanitise & validate ── */
  const name    = sanitize(raw.name,    120)
  const email   = sanitize(raw.email,   254)
  const subject = sanitize(raw.subject, 200)
  const message = sanitize(raw.message, 4000)

  const errors: string[] = []
  if (!name)                       errors.push('Name is required.')
  if (!email)                      errors.push('Email is required.')
  else if (!isValidEmail(email))   errors.push('Email address is not valid.')
  if (!subject)                    errors.push('Subject is required.')
  if (!message)                    errors.push('Message is required.')
  if (message.length < 10)         errors.push('Message is too short (min 10 characters).')

  if (errors.length) {
    return NextResponse.json({ error: errors.join(' ') }, { status: 422 })
  }

  /* ── 3. Env-var guard & destinations ── */
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL || 'giridharansenthil416@gmail.com'
  const fromAddr = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>'

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set.')
    return NextResponse.json(
      { error: 'RESEND_API_KEY is not configured on the server. Please add it to your environment variables.' },
      { status: 500 },
    )
  }

  /* ── 4. Send via Resend ── */
  const resend = new Resend(apiKey)

  const emailSubject = `[Portfolio Contact] ${subject} — from ${name}`

  const textBody = [
    `Name:`,
    name,
    ``,
    `Email:`,
    email,
    ``,
    `Subject:`,
    subject,
    ``,
    `Message:`,
    message,
    ``,
    `---`,
    `Submitted from portfolio contact form`,
  ].join('\n')

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,sans-serif;background:#f3f1eb;margin:0;padding:2rem;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e0ddd6;">
    <div style="background:#121211;padding:1.25rem 1.5rem;">
      <p style="margin:0;font-family:monospace;font-size:0.75rem;color:#eb1926;letter-spacing:0.12em;">PORTFOLIO CONTACT</p>
      <h1 style="margin:0.25rem 0 0;font-size:1.1rem;color:#fff;font-weight:700;letter-spacing:-0.02em;">New message from your portfolio</h1>
    </div>
    <div style="padding:1.5rem;">
      <table style="width:100%;border-collapse:collapse;font-size:0.875rem;margin-bottom:1.25rem;">
        <tr>
          <td style="padding:0.4rem 0;color:#6f6b63;font-family:monospace;width:80px;vertical-align:top;">NAME</td>
          <td style="padding:0.4rem 0;color:#121211;font-weight:600;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:0.4rem 0;color:#6f6b63;font-family:monospace;vertical-align:top;">EMAIL</td>
          <td style="padding:0.4rem 0;"><a href="mailto:${escapeHtml(email)}" style="color:#eb1926;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding:0.4rem 0;color:#6f6b63;font-family:monospace;vertical-align:top;">SUBJECT</td>
          <td style="padding:0.4rem 0;color:#121211;">${escapeHtml(subject)}</td>
        </tr>
      </table>
      <div style="border-top:1px solid #e0ddd6;padding-top:1.25rem;">
        <p style="margin:0 0 0.5rem;color:#6f6b63;font-family:monospace;font-size:0.75rem;letter-spacing:0.1em;">MESSAGE</p>
        <p style="margin:0;color:#121211;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
    </div>
    <div style="background:#f3f1eb;padding:1rem 1.5rem;border-top:1px solid #e0ddd6;">
      <p style="margin:0;font-family:monospace;font-size:0.7rem;color:#6f6b63;">
        Hit <strong>Reply</strong> to respond directly to ${escapeHtml(name)} at ${escapeHtml(email)}
      </p>
    </div>
  </div>
</body>
</html>
`

  try {
    const { error } = await resend.emails.send({
      from: fromAddr,
      to: toEmail,
      replyTo: `${name} <${email}>`,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    })

    if (error) {
      console.error('[contact] Resend API error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}

/* ── Utility ── */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
