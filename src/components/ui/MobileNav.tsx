'use client'

import { useState, useCallback, useEffect } from 'react'
import { site } from '@/config/site'
import { assets } from '@/config/assets'

const NAV_ITEMS = [
  { label: 'HOME', hash: '#home', num: '01' },
  { label: 'ABOUT', hash: '#about', num: '02' },
  { label: 'INTERNSHIPS', hash: '#internships', num: '03' },
  { label: 'EDUCATION', hash: '#education', num: '04' },
  { label: 'SKILLS', hash: '#skills', num: '05' },
  { label: 'PROJECTS', hash: '#projects', num: '06' },
  { label: 'HIGHLIGHTS', hash: '#highlights', num: '07' },
  { label: 'CONTACT', hash: '#contact', num: '08' },
] as const

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      e.preventDefault()
      close()
      // Give the drawer close animation a head-start before scrolling
      setTimeout(() => {
        if (hash === '#home' || hash === '#hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }
        const target = document.querySelector(hash)
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    },
    [close],
  )

  return (
    <>
      {/* ─── DESKTOP CIRCULAR BLACK MENU BUTTON ─── */}
      <button
        id="desktop-nav-toggle"
        type="button"
        className="desktop-nav-toggle"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
      >
        <span className="desktop-nav-toggle__icon" aria-hidden="true">
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </span>
      </button>

      {/* ─── STICKY TOP BAR (MOBILE/TABLET) ─── */}
      <header className="mobile-nav-bar" aria-label="Mobile navigation">
        <div className="mobile-nav-bar__inner">
          {/* Brand: avatar + name */}
          <div className="mobile-nav-bar__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.avatar ?? '/assets/avatar.webp'}
              alt={`${site.firstName} ${site.lastName}`}
              className="mobile-nav-bar__avatar"
              width={36}
              height={36}
              decoding="async"
            />
            <div className="mobile-nav-bar__name-block">
              <span className="mobile-nav-bar__name">{site.firstName} {site.lastName}</span>
              <span className="mobile-nav-bar__sub">VLSI &amp; SEMICONDUCTOR</span>
            </div>
          </div>

          {/* Hamburger / Close toggle */}
          <button
            id="mobile-nav-toggle"
            type="button"
            className="mobile-nav-bar__toggle"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span className="mobile-nav-bar__toggle-icon" aria-hidden="true">
              {isOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </header>

      {/* ─── BACKDROP ─── */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={`mobile-nav-backdrop${isOpen ? ' mobile-nav-backdrop--open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ─── DRAWER ─── */}
      <nav
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer${isOpen ? ' mobile-nav-drawer--open' : ''}`}
        aria-label="Site navigation"
        aria-hidden={!isOpen}
      >
        {/* Profile header */}
        <div className="mobile-nav-drawer__header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.avatar ?? '/assets/avatar.webp'}
            alt={`${site.firstName} ${site.lastName}`}
            className="mobile-nav-drawer__avatar"
            width={72}
            height={72}
            decoding="async"
          />
          <p className="mobile-nav-drawer__name">{site.firstName} {site.lastName}</p>
          <p className="mobile-nav-drawer__role">VLSI &amp; SEMICONDUCTOR DESIGN</p>
          <span className="mobile-nav-drawer__dot" aria-hidden="true" />
        </div>

        {/* Navigation links */}
        <ul className="mobile-nav-drawer__list" role="list">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.hash} className="mobile-nav-drawer__item">
              <a
                href={item.hash}
                className="mobile-nav-drawer__link"
                onClick={(e) => handleNav(e, item.hash)}
                tabIndex={isOpen ? 0 : -1}
                style={{ transitionDelay: isOpen ? `${i * 35 + 60}ms` : '0ms' }}
              >
                <span className="mobile-nav-drawer__link-num" aria-hidden="true">
                  {item.num}
                </span>
                {item.label}
                <span className="mobile-nav-drawer__link-arrow" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer row */}
        <div className="mobile-nav-drawer__footer">
          <a
            href={site.footer.href}
            className="mobile-nav-drawer__email"
            tabIndex={isOpen ? 0 : -1}
          >
            {site.footer.href.replace('mailto:', '')}
          </a>
          <p className="mobile-nav-drawer__location">{site.footer.location}</p>
        </div>
      </nav>
    </>
  )
}
