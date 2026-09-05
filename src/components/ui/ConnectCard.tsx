'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '@/config/site'
import { assets } from '@/config/assets'
import { ease } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'

/**
 * A small note that arrives the moment you start scrolling and leaves once you
 * are past the introduction and it has stopped being the point.
 *
 * It is an invitation, not a recruitment widget — "available to talk", not
 * "available for hire". That is the whole difference between a personal site
 * and a job board, and it is carried almost entirely by four words.
 *
 * 560px at most, no backdrop, no blur, one shadow doing the job of lifting it
 * a few millimetres off the paper. Dismissible by button or Escape, and it
 * stays dismissed.
 *
 * Visibility is driven by TWO IntersectionObservers on sentinel <span>s placed
 * at the enter and exit scroll thresholds — NOT by a scroll event listener.
 * This means React state only updates at the two boundary crossings (card
 * appears / card disappears), never on every scroll frame. Zero RAF loops,
 * zero scroll handlers, zero mid-scroll renders.
 */
export default function ConnectCard() {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const enterRef = useRef<HTMLSpanElement>(null)
  const exitRef  = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const enter = enterRef.current
    const exit  = exitRef.current
    if (!enter || !exit) return

    let pastTop = false
    let pastBottom = false

    const update = () => {
      setVisible(pastTop && !pastBottom)
    }

    const ioEnter = new IntersectionObserver(
      ([e]) => {
        pastTop = !e.isIntersecting
        update()
      },
      { threshold: 0 }
    )
    const ioExit = new IntersectionObserver(
      ([e]) => {
        pastBottom = !e.isIntersecting
        update()
      },
      { threshold: 0 }
    )

    ioEnter.observe(enter)
    ioExit.observe(exit)
    return () => {
      ioEnter.disconnect()
      ioExit.disconnect()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDismissed(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const open = visible && !dismissed
  const rest = { opacity: 0, y: 14, scale: 0.98, x: '-50%' }
  const shown = { opacity: 1, y: 0, scale: 1, x: '-50%' }

  return (
    <>
      {/* Sentinels for IntersectionObserver — zero-size, non-interactive.
          enterRef spans the first 80px: when scrolled past 80px, it leaves the viewport.
          exitRef spans the first 145vh: when scrolled past 145vh, it leaves the viewport.
          Observers fire ONLY at these two boundary crossings, never during scrolling. */}
      <span
        ref={enterRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[80px] w-px opacity-0"
      />
      <span
        ref={exitRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[145vh] w-px opacity-0"
      />
      <AnimatePresence>
      {open && (
        <motion.aside
          key="connect"
          role="region"
          aria-label={`Contact ${site.firstName}`}
          className="fixed bottom-[clamp(1.1rem,3.4vh,2.1rem)] left-1/2 z-50 w-[min(94vw,35rem)]"
          initial={rest}
          animate={shown}
          exit={{ ...rest, y: 8 }}
          transition={reduced ? { duration: 0 } : { duration: 0.45, ease: ease.paper }}
        >
          <div
            className="on-noir relative flex items-center gap-[0.9rem] rounded-[0.7rem] py-[0.8rem] pl-[0.85rem] pr-[1rem] sm:gap-[1.15rem] sm:pr-[1.35rem]"
            style={{
              background: 'rgba(41, 40, 37, 0.94)',
              boxShadow:
                '0 20px 44px -20px rgba(24, 21, 16, 0.65), 0 1px 0 rgba(255, 255, 255, 0.06) inset',
            }}
          >
            <Avatar />

            <p className="m-0 flex-1 text-[clamp(0.8125rem,1.45vw,1rem)] leading-snug text-white">
              <span className="font-bold tracking-[-0.01em]">{site.firstName}</span>{' '}
              <span className="font-medium text-white/85">{site.connect.status}</span>
            </p>

            <a
              href={site.connect.href}
              className="group/cta eyebrow flex shrink-0 items-center gap-[0.55em] rounded-full bg-white px-[1.05rem] py-[0.62rem] text-ink transition-colors duration-300 hover:bg-paper"
              style={{ fontSize: 'clamp(0.6875rem,1.1vw,0.78rem)', letterSpacing: '0.045em' }}
            >
              <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:-translate-x-[1px]">
                {site.connect.cta}
              </span>
              <Arrow />
            </a>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="absolute right-[0.45rem] top-[0.35rem] flex h-6 w-6 items-center justify-center text-white/55 transition-colors duration-200 hover:text-white"
            >
              <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
                <path d="M1 1 L8 8 M8 1 L1 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.aside>
      )}
      </AnimatePresence>
    </>
  )
}

/** Drawn with the same slight bow as the scroll cue, so it is the same hand. */
function Arrow() {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-[3px]"
    >
      <path d="M1 5 C 5 4.8, 9 5.2, 13.2 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M9.4 1.5 C 10.7 2.7, 12.1 4.1, 13.5 5 C 12.1 5.9, 10.7 7.3, 9.4 8.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Holds the exact circle the real avatar will fill. */
function Avatar() {
  return (
    <span className="relative block h-[2.6rem] w-[2.6rem] shrink-0 overflow-hidden rounded-full bg-paper-deep ring-1 ring-white/20 sm:h-[3rem] sm:w-[3rem]">
      {assets.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={assets.avatar} alt="" className="h-full w-full object-cover" />
      ) : (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
          <circle cx="24" cy="19" r="8.5" fill="#121211" opacity="0.22" />
          <path d="M6 48 C 8 35, 15 30, 24 30 C 33 30, 40 35, 42 48 Z" fill="#121211" opacity="0.22" />
        </svg>
      )}
    </span>
  )
}
