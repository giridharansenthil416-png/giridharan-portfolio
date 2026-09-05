'use client'

import { useState, useId, useRef } from 'react'
import { site } from '@/config/site'

/* ---------------------------------------------------------------------------
 * Validation (client-side, mirrors the server)
 * -------------------------------------------------------------------------*/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(v: string) {
  return EMAIL_RE.test(v.trim())
}

/* ---------------------------------------------------------------------------
 * Types
 * -------------------------------------------------------------------------*/
type FormState = 'idle' | 'sending' | 'sent' | 'error'

interface FieldError {
  name?: string
  email?: string
  subject?: string
  message?: string
}

/* ---------------------------------------------------------------------------
 * Component
 * -------------------------------------------------------------------------*/
export default function ContactForm() {
  const uid        = useId()
  const [state, setState]     = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldError>({})

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  /** Prevent concurrent submissions */
  const submitting = useRef(false)

  /* ── Client-side validation ── */
  function validate(): FieldError {
    const errs: FieldError = {}
    if (!name.trim())                    errs.name    = 'Name is required.'
    if (!email.trim())                   errs.email   = 'Email is required.'
    else if (!isValidEmail(email))       errs.email   = 'Enter a valid email address.'
    if (!subject.trim())                 errs.subject = 'Subject is required.'
    if (!message.trim())                 errs.message = 'Message is required.'
    else if (message.trim().length < 10) errs.message = 'Message is too short (min 10 characters).'
    return errs
  }

  /* ── Submit handler ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting.current || state === 'sending') return

    // Client-side validation
    const errs = validate()
    setFieldErrors(errs)
    if (Object.keys(errs).length) return

    submitting.current = true
    setState('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    name.trim(),
          email:   email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      })

      const data = await res.json() as { success?: boolean; error?: string }

      if (res.ok && data.success) {
        setState('sent')
        setName(''); setEmail(''); setSubject(''); setMessage('')
        setFieldErrors({})
      } else {
        setState('error')
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setState('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    } finally {
      submitting.current = false
    }
  }

  /* ── Shared class strings (unchanged visuals) ── */
  const inputBase =
    'w-full rounded-[0.45rem] border bg-white/70 px-4 py-3 font-mono text-[0.88rem] text-ink placeholder:text-ink/35 outline-none transition-all duration-200 focus:bg-white focus:ring-2 hover:border-ink/35 min-h-[48px] text-[16px]'

  const inputClass = (err?: string) =>
    err
      ? `${inputBase} border-signal/60 focus:border-signal/80 focus:ring-signal/15`
      : `${inputBase} border-ink/20 focus:border-signal/60 focus:ring-signal/15`

  const labelClass = 'block font-mono text-[0.7rem] font-bold tracking-[0.12em] text-ink mb-1.5'

  const fieldErrorClass = 'mt-1 font-mono text-[0.7rem] text-signal'

  /* ── Render ── */
  return (
    <section
      id="send-message"
      aria-label="Send a message"
      className="mt-[clamp(2.5rem,6vw,4.5rem)] rounded-[0.75rem] border border-ink/15 bg-paper/85 md:bg-paper/70 p-[clamp(1.25rem,4vw,2.5rem)] md:backdrop-blur-[4px] shadow-sm"
    >
      {/* Header */}
      <div className="mb-[clamp(1rem,2.5vw,1.75rem)]">
        <span className="block font-mono text-[0.7rem] font-bold tracking-[0.15em] text-signal">
          DIRECT MESSAGE
        </span>
        <h3
          className="display m-0 mt-1 text-ink"
          style={{ fontSize: 'clamp(1.35rem, 2.5vw, 2rem)', letterSpacing: '-0.025em' }}
        >
          SEND A MESSAGE
        </h3>
        <p className="m-0 mt-1.5 font-mono text-[0.78rem] text-graphite">
          Reaches me directly — for internship enquiries, collaborations, or anything VLSI.
        </p>
      </div>

      {/* ─── SUCCESS STATE ─── */}
      {state === 'sent' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center" role="status" aria-live="polite">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-signal/15 text-signal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <p className="font-bold text-ink">MESSAGE SENT ✓</p>
          <p className="font-mono text-[0.8rem] text-graphite">
            Your message has been delivered to my inbox. I&apos;ll get back to you soon.
          </p>
          <button
            type="button"
            onClick={() => { setState('idle'); setErrorMsg('') }}
            className="mt-2 rounded-md border border-ink/20 px-4 py-2 font-mono text-[0.8rem] text-ink hover:border-signal/50 hover:text-signal transition-colors"
          >
            SEND ANOTHER
          </button>
        </div>
      ) : (
        /* ─── FORM ─── */
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* Name + Email row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-name`} className={labelClass}>
                NAME <span className="text-signal" aria-hidden="true">*</span>
              </label>
              <input
                id={`${uid}-name`}
                type="text"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                placeholder="Your name"
                value={name}
                onChange={(e) => { setName(e.target.value); setFieldErrors((p) => ({ ...p, name: undefined })) }}
                className={inputClass(fieldErrors.name)}
                aria-required="true"
                aria-describedby={fieldErrors.name ? `${uid}-name-err` : undefined}
                aria-invalid={!!fieldErrors.name}
                disabled={state === 'sending'}
              />
              {fieldErrors.name && (
                <p id={`${uid}-name-err`} className={fieldErrorClass} role="alert">{fieldErrors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor={`${uid}-email`} className={labelClass}>
                EMAIL <span className="text-signal" aria-hidden="true">*</span>
              </label>
              <input
                id={`${uid}-email`}
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })) }}
                className={inputClass(fieldErrors.email)}
                aria-required="true"
                aria-describedby={fieldErrors.email ? `${uid}-email-err` : undefined}
                aria-invalid={!!fieldErrors.email}
                disabled={state === 'sending'}
              />
              {fieldErrors.email && (
                <p id={`${uid}-email-err`} className={fieldErrorClass} role="alert">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor={`${uid}-subject`} className={labelClass}>
              SUBJECT <span className="text-signal" aria-hidden="true">*</span>
            </label>
            <input
              id={`${uid}-subject`}
              type="text"
              name="subject"
              maxLength={200}
              placeholder="Internship opportunity, collaboration, etc."
              value={subject}
              onChange={(e) => { setSubject(e.target.value); setFieldErrors((p) => ({ ...p, subject: undefined })) }}
              className={inputClass(fieldErrors.subject)}
              aria-describedby={fieldErrors.subject ? `${uid}-subject-err` : undefined}
              aria-invalid={!!fieldErrors.subject}
              disabled={state === 'sending'}
            />
            {fieldErrors.subject && (
              <p id={`${uid}-subject-err`} className={fieldErrorClass} role="alert">{fieldErrors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor={`${uid}-message`} className={labelClass}>
              MESSAGE <span className="text-signal" aria-hidden="true">*</span>
            </label>
            <textarea
              id={`${uid}-message`}
              name="message"
              required
              rows={5}
              maxLength={4000}
              placeholder="Tell me about the opportunity or what you have in mind…"
              value={message}
              onChange={(e) => { setMessage(e.target.value); setFieldErrors((p) => ({ ...p, message: undefined })) }}
              className={`${inputClass(fieldErrors.message)} resize-none leading-relaxed`}
              aria-required="true"
              aria-describedby={fieldErrors.message ? `${uid}-message-err` : undefined}
              aria-invalid={!!fieldErrors.message}
              disabled={state === 'sending'}
            />
            {fieldErrors.message && (
              <p id={`${uid}-message-err`} className={fieldErrorClass} role="alert">{fieldErrors.message}</p>
            )}
          </div>

          {/* API / network error banner */}
          {state === 'error' && errorMsg && (
            <div className="flex items-start gap-2 rounded-[0.4rem] border border-signal/25 bg-signal/5 px-3 py-2.5" role="alert" aria-live="assertive">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="mt-[1px] h-4 w-4 shrink-0 text-signal" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="font-mono text-[0.75rem] text-signal">
                {errorMsg}{' '}
                <a href={site.footer.href} className="underline underline-offset-2 hover:opacity-75">
                  Email me directly →
                </a>
              </span>
            </div>
          )}

          {/* Submit button */}
          <button
            id="contact-form-submit"
            type="submit"
            disabled={state === 'sending'}
            className="group mt-1 flex w-full items-center justify-center gap-2 rounded-[0.45rem] bg-ink px-6 py-3.5 font-mono text-[0.82rem] font-bold tracking-[0.1em] text-paper transition-all duration-200 hover:bg-signal active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto sm:min-w-[180px]"
          >
            {state === 'sending' ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper"
                  aria-hidden="true"
                />
                SENDING…
              </>
            ) : state === 'error' ? (
              <>
                FAILED — TRY AGAIN
                <span className="transition-transform duration-200 group-hover:translate-x-[3px]" aria-hidden="true">→</span>
              </>
            ) : (
              <>
                SEND MESSAGE
                <span className="transition-transform duration-200 group-hover:translate-x-[3px]" aria-hidden="true">→</span>
              </>
            )}
          </button>

        </form>
      )}
    </section>
  )
}
