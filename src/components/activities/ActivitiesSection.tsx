'use client'

import { motion, type Variants } from 'framer-motion'
import { site } from '@/config/site'
import { ease, viewportOnce } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'

export default function ActivitiesSection() {
  const reduced = usePrefersReducedMotion()

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.7, delay: i * 0.1, ease: ease.paper },
    }),
  }

  return (
    <section
      id="highlights"
      className="content-auto relative w-full py-[clamp(3rem,6vw,6rem)] scroll-mt-24"
      aria-label={site.activities.heading}
    >
      <span id="activities" className="sr-only" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[112rem] px-[max(1.5rem,7vw)]">
        {/* Section Title */}
        <div className="mb-[clamp(1.8rem,4vw,3rem)] border-b border-ink/20 pb-3">
          <span className="eyebrow text-[0.75rem] font-bold text-signal">05 · ENGAGEMENT</span>
          <h2
            className="display m-0 mt-1 text-ink"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.8rem)', letterSpacing: '-0.03em' }}
          >
            {site.activities.heading}
          </h2>
        </div>

        {/* 2x2 Activity Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {site.activities.items.map((item, idx) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              custom={idx}
              viewport={viewportOnce}
              className="flex flex-col justify-between rounded-[0.6rem] border border-ink/15 bg-paper/85 md:bg-paper/70 p-6 md:backdrop-blur-[2px] transition-all duration-300 hover:border-ink/40 hover:bg-paper"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-2.5">
                  <span className="eyebrow font-mono text-[0.68rem] font-bold text-signal">
                    {item.type}
                  </span>
                  <span className="font-mono text-[0.72rem] font-bold text-ink/40">#{item.num}</span>
                </div>

                <h3
                  className="display m-0 mt-3 text-ink"
                  style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)' }}
                >
                  {item.title}
                </h3>

                <p className="eyebrow m-0 mt-1 text-[0.75rem] text-graphite">{item.organization}</p>

                <p className="body-copy m-0 mt-3 text-[0.88rem] leading-relaxed text-graphite">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-2">
                <span className="font-mono text-[0.7rem] text-ink/40">CERTIFIED / ATTENDED</span>
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
