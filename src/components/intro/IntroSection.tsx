'use client'

import { motion, type Variants } from 'framer-motion'
import { site } from '@/config/site'
import { assets } from '@/config/assets'
import { intro } from '@/config/tokens'
import { ease, viewportOnce } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'
import VideoArtFrame from './VideoArtFrame'
import SkillsGrid from './SkillsGrid'

export default function IntroSection() {
  const reduced = usePrefersReducedMotion()

  const group: Variants = {
    hidden: {},
    show: { transition: { delayChildren: reduced ? 0 : 0.05 } },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: 0 } : { duration: 0.95, delay: i * 0.13, ease: ease.paper },
    }),
  }

  const plate: Variants = {
    hidden: { opacity: 0, scale: 1.045 },
    show: {
      opacity: 1,
      scale: 1,
      transition: reduced ? { duration: 0 } : { duration: 1.5, ease: ease.paper },
    },
  }

  const heading: Variants = {
    hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: reduced ? { duration: 0 } : { duration: 0.95, delay: 0.13, ease: ease.paper },
    },
  }

  return (
    <section
      id="about"
      className="content-auto relative w-full pb-0 pt-[clamp(3.5rem,10vh,8rem)]"
      aria-label="About and Technical Stack"
    >
      <div className="relative z-10 px-[max(1.5rem,7vw)] pb-[clamp(2.5rem,6vh,4.5rem)]">
        <motion.div
          className="intro-grid mx-auto max-w-[112rem]"
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* -------------------------------------------------- HEADING */}
          <motion.div className="area-heading" variants={heading}>
            <h2
              className="display m-0 text-ink"
              style={{ fontSize: 'clamp(3.25rem, 6.4vw, 8.5rem)', letterSpacing: '-0.045em' }}
            >
              {site.intro.heading}
            </h2>
          </motion.div>

          {/* -------------------------------------------------- THE PLATE / CHIP FRAME */}
          <motion.div className="area-portrait relative z-[3] lg:-mb-[7vw]" variants={plate}>
            <VideoArtFrame
              video={assets.frame.video}
              poster={assets.frame.poster}
              image={assets.frame.image}
              aspect={intro.portraitAspect}
              objectFit={assets.frame.fit}
              objectPosition={assets.frame.position}
              keyBand={assets.frame.key}
              alt={`${site.firstName} ${site.lastName}, VLSI Engineer`}
            />
          </motion.div>

          {/* -------------------------------------------------- BIO & TERMINAL / EDUCATION */}
          <motion.div className="area-copy" variants={item} custom={2}>
            <p className="body-copy m-0 mt-[0.6em] font-bold text-ink">{site.intro.lede}</p>

            <div className="mt-[1.4em] flex flex-col gap-[1em]">
              {site.intro.paragraphs.map((para) => (
                <p key={para} className="body-copy copy m-0 text-graphite">
                  {para}
                </p>
              ))}
            </div>

            {/* Terminal Card */}
            <div className="mt-[1.6em] overflow-hidden rounded-[0.5rem] border border-ink/20 bg-[#151514] p-3 text-[#e6e4dc] shadow-sm">
              <div className="mb-2 flex items-center gap-1.5 border-b border-white/10 pb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-signal" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f4b400]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#0f9d58]" />
                <span className="ml-2 font-mono text-[0.72rem] tracking-wider text-white/50">
                  giridharan@vlsi-workstation:~$
                </span>
              </div>
              <pre className="m-0 font-mono text-[0.75rem] leading-relaxed text-white/90">
                <code>
                  identity = &quot;{site.intro.terminal.identity}&quot;{'\n'}
                  domain   = &quot;{site.intro.terminal.domain}&quot;{'\n'}
                  year     = &quot;{site.intro.terminal.year}&quot;{'\n'}
                  location = &quot;{site.intro.terminal.location}&quot;{'\n'}
                  goal     = &quot;{site.intro.terminal.goal}&quot;
                </code>
              </pre>
            </div>

            {/* Stats Row */}
            <div className="mt-[1.4em] grid grid-cols-3 gap-3 border-y border-ink/15 py-3">
              {site.intro.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="m-0 font-mono text-[clamp(1.2rem,2.2vw,1.8rem)] font-bold leading-tight text-ink">
                    {stat.value}
                  </p>
                  <p className="eyebrow m-0 text-[0.68rem] tracking-widest text-graphite">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div id="education" className="scroll-mt-24">
              <h3 className="section-head m-0 mt-[1.6em] text-ink">{site.education.heading}</h3>
              <dl className="m-0 mt-[1em] flex flex-col gap-[1.15em]">
                {site.education.items.map((edu) => (
                  <div key={edu.degree}>
                    <div className="flex items-baseline justify-between gap-2">
                      <dt className="body-copy m-0 font-bold leading-snug text-ink">{edu.degree}</dt>
                      <span className="font-mono text-[0.75rem] font-bold text-signal">{edu.grade}</span>
                    </div>
                    {edu.specialization && (
                      <p className="body-copy m-0 font-medium text-ink/80">{edu.specialization}</p>
                    )}
                    <dd className="body-copy m-0 mt-[0.2em] text-[0.88rem] leading-snug text-graphite">
                      {edu.detail} {edu.period ? `• ${edu.period}` : ''}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          {/* -------------------------------------------------- SKILLS */}
          <motion.div className="area-aside" variants={item} custom={3}>
            <div id="skills" className="scroll-mt-24">
              <h3 className="section-head m-0 mb-[0.75em] text-ink">{site.techStack.heading}</h3>
              <SkillsGrid />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

