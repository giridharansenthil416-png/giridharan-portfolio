'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Weighted scrolling. The whole conceit of the site is that you are handling
 * paper, and paper has mass — a native wheel jump undoes that in one gesture.
 *
 * Disabled entirely on touch-only devices (phones / tablets): native momentum
 * scrolling is faster and more reliable there, and Lenis intercepting touch
 * events is the primary cause of the "stuck" feeling on mobile.
 *
 * Also off under prefers-reduced-motion, where the native scroll is the
 * correct behaviour rather than a compromise.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Touch-only devices (phones/tablets) scroll better natively.
    // `pointer: fine` is a mouse or stylus — coarse means touchscreen.
    const hasFinePonter = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePonter) return

    const lenis = new Lenis({
      lerp: 0.1,           // Smoother than duration+easing, prevents jank on wheel
      smoothWheel: true,
      syncTouch: false,    // Let native touch scroll handle mobile
      autoRaf: false,
    })

    let frame = 0
    const loop = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    /**
     * In-page links travel instead of jumping. A native hash navigation sets
     * the scroll position in one frame, which on a weighted page reads as the
     * document being yanked — and it fights the smoother, which then drags it
     * back. Handing the target to Lenis makes the floating note's "Let's
     * connect" actually carry you down to the last page.
     */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      const hash = link?.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { lerp: 0.1, duration: 1.6 })
      history.pushState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
