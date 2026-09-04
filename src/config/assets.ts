/**
 * ---------------------------------------------------------------------------
 * ASSET REGISTRY
 * ---------------------------------------------------------------------------
 * One place to swap placeholders for finals. Every entry is `null` today; the
 * component that consumes it already reserves the exact box the real asset
 * will occupy, so setting a path here changes pixels, never layout.
 *
 *   1. Drop the file into /public/assets/…
 *   2. Set the path below.
 *   3. Done. No component edits, no reflow.
 * ---------------------------------------------------------------------------
 */

export const assets = {
  /**
   * Hero face illustration living inside the word PORTFOLIO.
   *
   * `layers` is the preferred hand-off: export the illustration as four
   * transparent PNG/SVGs sharing ONE canvas (same width/height, nothing
   * re-cropped) and the blink / smile / eye-dart rig drives them directly.
   *
   *   base   — head, hair, brows, nose, beard. Everything that never moves.
   *   eyes   — the eye whites + irises only.
   *   lids   — the eyelid shape used for the blink (drawn over `eyes`).
   *   mouth  — neutral mouth only; the smile is a transform of this layer.
   *
   * `flat` is the fallback: a single image. It renders perfectly but can only
   * breathe (micro parallax + drift) — it cannot blink.
   */
  heroFace: {
    flat: null as string | null,
    layers: null as { base: string; eyes: string; lids: string; mouth: string } | null,
  },


  frame: {
    video: null as string | null,
    poster: '/assets/giridharan-suit.jpg' as string | null,
    image: '/assets/giridharan-suit.jpg' as string | null,
    fit: 'cover' as 'cover' | 'contain',
    position: '50% 20%',
    key: null,
  },


  nameCutout: {
    src: '/assets/name-cutout.webp' as string | null,
    width: 1000,
    height: 1000,
    sticker: true,
  },

  avatar: '/assets/avatar.webp' as string | null,


  /**
   * THE STU — three photographs, left to right. Drop files into
   * /public/assets/projects/ and list them here.
   *
   * The Polaroid geometry is fixed by the card, not by the image: 1.24
   * landscape, cropped with object-fit: cover. Nudge `objectPosition` in
   * site.studio.items if a subject sits off centre.
   */
  studio: [
    '/assets/projects/studio-01.webp',
    '/assets/projects/studio-02.webp',
    '/assets/projects/studio-03.webp',
  ] as (string | null)[],

  /**
   * Signature graphic for the footer — the designer signing the last page.
   * Until it arrives, the name is set in the hand font with a red tick, so
   * the page is already signed and the slot already has its place.
   */
  signature: null as string | null,
} as const
