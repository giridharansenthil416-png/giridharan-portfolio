'use client'

import { motion, type Variants } from 'framer-motion'
import { site } from '@/config/site'
import { ease } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'

export default function SkillsGrid() {
  const reduced = usePrefersReducedMotion()

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.6, delay: 0.35 + i * 0.08, ease: ease.paper },
    }),
  }

  return (
    <div className="flex flex-col gap-[1.1rem]">
      {/* Visual EDA & Tool Logos */}
      <motion.div
        variants={cardVariant}
        custom={0}
        className="rounded-[0.5rem] border border-ink/20 bg-paper/80 p-[0.85rem] backdrop-blur-[4px] shadow-sm"
      >
        <p
          className="eyebrow m-0 mb-[0.65rem] font-bold text-ink"
          style={{ fontSize: 'clamp(0.6875rem, 0.9vw, 0.78rem)', letterSpacing: '0.12em' }}
        >
          {site.skills.heading}
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {site.skills.items.map((tool) => (
            <div
              key={tool.label}
              className="group flex flex-col items-center justify-center gap-1.5 rounded-[0.35rem] border border-ink/10 bg-white/70 p-1.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-signal/50 hover:bg-white hover:shadow-xs"
              title={tool.label}
            >
              {tool.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tool.src}
                  alt={tool.label}
                  className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded bg-ink font-mono text-[0.65rem] font-bold text-paper">
                  {tool.short}
                </span>
              )}
              <span className="font-mono text-[0.6rem] font-medium leading-tight text-ink line-clamp-1">
                {tool.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Categorized Technical Skills */}
      {site.techStack.categories.map((cat, i) => (
        <motion.div
          key={cat.title}
          variants={cardVariant}
          custom={i + 1}
          className="rounded-[0.4rem] border border-ink/15 bg-paper/60 p-[0.75rem] backdrop-blur-[2px] transition-colors duration-300 hover:border-ink/35"
        >
          <p
            className="eyebrow m-0 mb-[0.45rem] font-bold text-ink"
            style={{ fontSize: 'clamp(0.6875rem, 0.9vw, 0.78rem)', letterSpacing: '0.12em' }}
          >
            {cat.title}
          </p>
          <div className="flex flex-wrap gap-[0.35rem]">
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className="inline-block rounded-[3px] border border-ink/10 bg-white/80 px-[0.45rem] py-[0.15rem] font-mono text-[clamp(0.6875rem,0.85vw,0.75rem)] font-medium text-ink transition-transform duration-200 hover:-translate-y-[1px] hover:border-signal/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

