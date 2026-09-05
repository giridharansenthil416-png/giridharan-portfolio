'use client'

import { motion, type Variants } from 'framer-motion'
import { site } from '@/config/site'
import { ease, viewportOnce } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'

export default function ProjectsSection() {
  const reduced = usePrefersReducedMotion()

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.85, delay: i * 0.15, ease: ease.paper },
    }),
  }

  return (
    <section
      id="projects"
      className="content-auto relative w-full py-[clamp(3.5rem,8vw,7rem)]"
      aria-label={site.projects.heading}
    >
      <div className="relative z-10 mx-auto max-w-[112rem] px-[max(1.5rem,7vw)]">
        {/* Section Header */}
        <div className="mb-[clamp(2rem,5vw,3.5rem)] flex items-baseline justify-between border-b border-ink/20 pb-4">
          <div>
            <span className="eyebrow text-[0.75rem] font-bold text-signal">03 · PORTFOLIO WORK</span>
            <h2
              className="display m-0 mt-1 text-ink"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)', letterSpacing: '-0.03em' }}
            >
              {site.projects.heading}
            </h2>
          </div>
          <span className="font-mono text-[0.8rem] text-graphite">RTL_TO_SILICON.FLOW</span>
        </div>

        {/* Project Cards Grid */}
        <div className="flex flex-col gap-[clamp(2.5rem,6vw,4.5rem)]">
          {site.projects.items.map((project, idx) => (
            <motion.article
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              custom={idx}
              viewport={viewportOnce}
              className="group relative rounded-[0.8rem] border border-ink/15 bg-paper/85 p-[clamp(1.5rem,3.5vw,2.5rem)] shadow-[0_12px_36px_-15px_rgba(18,18,17,0.1)] transition-all duration-300 hover:border-ink/40 hover:bg-paper"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Info Column */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="eyebrow font-mono text-[0.75rem] font-bold text-signal">
                        {project.num}
                      </span>
                      <span className="h-px w-6 bg-ink/20" />
                      <span className="font-mono text-[0.72rem] text-graphite">{project.subtitle}</span>
                    </div>

                    <h3
                      className="display m-0 mt-2 text-ink"
                      style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3rem)', letterSpacing: '-0.025em' }}
                    >
                      {project.title}
                    </h3>

                    <p className="body-copy m-0 mt-3 text-[0.95rem] leading-relaxed text-graphite">
                      {project.description}
                    </p>

                    {/* Hardware Flow Pipeline */}
                    <div className="mt-5">
                      <p className="eyebrow m-0 mb-2 font-mono text-[0.68rem] tracking-wider text-ink/70">
                        IMPLEMENTATION FLOW
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[0.72rem]">
                        {project.flow.map((step, sIdx) => (
                          <div key={step} className="flex items-center gap-1.5">
                            <span className="rounded-[3px] border border-ink/20 bg-white/90 px-2 py-1 font-bold text-ink shadow-2xs">
                              {step}
                            </span>
                            {sIdx < project.flow.length - 1 && (
                              <span className="text-signal font-bold">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tags & Action */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-[2px] bg-ink/5 px-2 py-0.5 font-mono text-[0.68rem] text-ink/80"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={project.evidence}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-4 py-2 font-mono text-[0.75rem] font-bold text-paper transition-all duration-200 hover:bg-signal hover:border-signal shadow-xs"
                      >
                        <span>{project.evidenceLabel}</span>
                      </a>
                      {'oasis' in project && project.oasis && (
                        <a
                          href={project.oasis as string}
                          download
                          className="inline-flex items-center gap-1.5 rounded-full border border-ink/30 bg-white/90 px-3 py-2 font-mono text-[0.72rem] font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-white"
                        >
                          <span>DOWNLOAD OASIS ↓</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Visual / Blueprint Frame with Interactive Schematic Preview */}
                <div className="flex flex-col justify-between overflow-hidden rounded-[0.5rem] border border-ink/30 bg-[#121211] text-paper shadow-md lg:col-span-5">
                  {/* EDA Toolbar Header */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#181816] px-3.5 py-2 font-mono text-[0.7rem] text-white/70">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
                      <span className="font-bold tracking-wider text-white/90">
                        {project.title.replace(/\s+/g, '_')}.DESIGN
                      </span>
                    </div>
                    <span className="rounded bg-signal/20 px-1.5 py-0.5 text-[0.62rem] font-bold text-signal">
                      SYNTHESIZED
                    </span>
                  </div>

                  {/* Schematic & Layout Thumbnail Preview */}
                  {project.preview && (
                    <a
                      href={project.evidence}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/img relative block aspect-video w-full overflow-hidden bg-black/60 transition-transform"
                      title="Click to view full schematic evidence"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.preview}
                        alt={`${project.title} schematic evidence`}
                        className="h-full w-full object-cover object-top opacity-90 transition-all duration-300 group-hover/img:scale-105 group-hover/img:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 md:bg-black/40 opacity-0 md:backdrop-blur-[1px] transition-opacity duration-200 group-hover/img:opacity-100">
                        <span className="rounded-full bg-ink/90 px-3 py-1.5 font-mono text-[0.7rem] font-bold text-paper border border-white/20 shadow-lg">
                          🔍 Click to Expand Schematic ↗
                        </span>
                      </div>
                    </a>
                  )}

                  {/* EDA Status Specs */}
                  <div className="space-y-1.5 p-3.5 font-mono text-[0.72rem] text-white/80 bg-[#141413]">
                    <p className="m-0 flex justify-between">
                      <span className="text-white/40">Target Tool:</span>
                      <span>Synopsys Fusion Compiler</span>
                    </p>
                    <p className="m-0 flex justify-between">
                      <span className="text-white/40">Verification:</span>
                      <span>VCS / Verdi Sim</span>
                    </p>
                    <p className="m-0 flex justify-between">
                      <span className="text-white/40">Timing / SDC:</span>
                      <span className="text-emerald-400">PASSED</span>
                    </p>
                    <p className="m-0 flex justify-between">
                      <span className="text-white/40">Status:</span>
                      <span className="text-amber-300 font-semibold">RTL → Layout Complete</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
