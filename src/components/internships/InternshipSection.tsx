'use client'

import { motion, type Variants } from 'framer-motion'
import { site } from '@/config/site'
import { ease, viewportOnce } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'

export default function InternshipSection() {
  const reduced = usePrefersReducedMotion()

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.85, ease: ease.paper },
    },
  }

  const exp = site.experience.items[0]

  return (
    <section
      id="internships"
      className="content-auto relative w-full py-[clamp(3.5rem,7vw,6.5rem)] scroll-mt-24"
      aria-label={site.experience.heading}
    >
      <div className="relative z-10 mx-auto max-w-[112rem] px-[max(1.5rem,7vw)]">
        {/* Section Header */}
        <div className="mb-[clamp(2rem,5vw,3.5rem)] flex items-baseline justify-between border-b border-ink/20 pb-4">
          <div>
            <span className="eyebrow text-[0.75rem] font-bold text-signal">02 · INDUSTRY EXPERIENCE</span>
            <h2
              className="display m-0 mt-1 text-ink"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)', letterSpacing: '-0.03em' }}
            >
              {site.experience.heading}
            </h2>
          </div>
          <span className="font-mono text-[0.8rem] text-graphite">PRACTICUM_CREDENTIAL.SYS</span>
        </div>

        {/* Featured Internship Card */}
        {exp && (
          <motion.article
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="group relative rounded-[0.8rem] border border-ink/15 bg-paper/85 p-[clamp(1.5rem,3.5vw,2.5rem)] shadow-[0_12px_36px_-15px_rgba(18,18,17,0.1)] transition-all duration-300 hover:border-ink/40 hover:bg-paper"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
              {/* Left Info Column */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="eyebrow font-mono text-[0.75rem] font-bold text-signal">
                      INTERNSHIP / 01
                    </span>
                    <span className="h-px w-6 bg-ink/20" />
                    <span className="font-mono text-[0.72rem] text-graphite uppercase tracking-wider">
                      {exp.company}
                    </span>
                    {exp.badge && (
                      <span className="rounded bg-ink px-2 py-0.5 font-mono text-[0.68rem] font-bold text-paper">
                        {exp.badge}
                      </span>
                    )}
                  </div>

                  <h3
                    className="display m-0 mt-2 text-ink"
                    style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3rem)', letterSpacing: '-0.025em' }}
                  >
                    {exp.role}
                  </h3>

                  <p className="eyebrow m-0 mt-1 font-mono text-[0.85rem] font-semibold text-graphite">
                    {exp.company}
                  </p>

                  <p className="body-copy m-0 mt-3.5 text-[0.95rem] leading-relaxed text-graphite">
                    {exp.description}
                  </p>

                  {/* Metadata Stats Grid: Duration, Mode, Status */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-ink/15 py-3.5">
                    <div>
                      <p className="eyebrow m-0 font-mono text-[0.65rem] tracking-wider text-graphite">DURATION</p>
                      <p className="m-0 mt-0.5 font-mono text-[0.82rem] font-bold text-ink">
                        {('duration' in exp && (exp.duration as string)) || exp.period || 'Virtual Practicum'}
                      </p>
                    </div>
                    <div>
                      <p className="eyebrow m-0 font-mono text-[0.65rem] tracking-wider text-graphite">MODE</p>
                      <p className="m-0 mt-0.5 font-mono text-[0.82rem] font-bold text-ink">
                        {('mode' in exp && (exp.mode as string)) || 'Virtual / Online'}
                      </p>
                    </div>
                    <div>
                      <p className="eyebrow m-0 font-mono text-[0.65rem] tracking-wider text-graphite">STATUS</p>
                      <p className="m-0 mt-0.5 font-mono text-[0.82rem] font-bold text-signal">
                        {('status' in exp && (exp.status as string)) || 'Completed & Verified'}
                      </p>
                    </div>
                  </div>

                  {/* Key Learning Tags */}
                  <div className="mt-5">
                    <p className="eyebrow m-0 mb-2 font-mono text-[0.68rem] tracking-wider text-ink/70">
                      KEY LEARNINGS &amp; DOMAINS
                    </p>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[0.72rem]">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[3px] border border-ink/15 bg-white/80 px-2 py-1 font-medium text-ink/90 shadow-2xs transition-transform duration-150 hover:-translate-y-0.5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Buttons at Bottom */}
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-4">
                  <a
                    href={('certificateUrl' in exp && (exp.certificateUrl as string)) || 'https://springboard.infosys.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-4 py-2 font-mono text-[0.75rem] font-bold text-paper transition-all duration-200 hover:bg-signal hover:border-signal shadow-xs"
                  >
                    <span>VIEW CERTIFICATE ↗</span>
                  </a>
                  <a
                    href={('learnMoreUrl' in exp && (exp.learnMoreUrl as string)) || 'https://springboard.infosys.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/30 bg-white/90 px-4 py-2 font-mono text-[0.75rem] font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-white"
                  >
                    <span>LEARN MORE ↗</span>
                  </a>
                </div>
              </div>

              {/* Right Visual / Engineering Console Column */}
              <div className="flex flex-col justify-between overflow-hidden rounded-[0.5rem] border border-ink/30 bg-[#121211] text-paper shadow-md lg:col-span-5 min-h-[320px]">
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-white/10 bg-[#181816] px-3.5 py-2.5 font-mono text-[0.7rem] text-white/70">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
                    <span className="font-bold tracking-wider text-white/90">
                      INFOSYS_SPRINGBOARD.PY
                    </span>
                  </div>
                  <span className="rounded bg-signal/20 px-1.5 py-0.5 text-[0.62rem] font-bold text-signal">
                    VERIFIED
                  </span>
                </div>

                {/* Console Code / Track Verification Terminal */}
                <div className="relative flex-1 p-4 sm:p-5 font-mono text-[0.74rem] bg-[#0d0d0c] text-white/90 flex flex-col justify-center">
                  <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2 text-white/50 text-[0.68rem]">
                    <span className="text-signal">$</span>
                    <span>python3 -m springboard.verify --credential</span>
                  </div>
                  <pre className="m-0 overflow-x-auto font-mono text-[0.72rem] leading-relaxed text-white/85">
                    <code>
                      <span className="text-white/40"># Professional Track &amp; Validation</span>{'\n'}
                      <span className="text-[#f4b400]">institution</span>  = <span className="text-[#0f9d58]">&quot;Infosys Springboard&quot;</span>{'\n'}
                      <span className="text-[#f4b400]">track</span>        = <span className="text-[#0f9d58]">&quot;Python &amp; Programming Track&quot;</span>{'\n'}
                      <span className="text-[#f4b400]">focus_areas</span>  = [{'\n'}
                      {'    '}<span className="text-[#4285f4]">&quot;Data Structures &amp; Algorithms&quot;</span>,{'\n'}
                      {'    '}<span className="text-[#4285f4]">&quot;OOP &amp; Modular Scripting&quot;</span>,{'\n'}
                      {'    '}<span className="text-[#4285f4]">&quot;Engineering Automation&quot;</span>{'\n'}
                      ]{'\n'}
                      <span className="text-[#f4b400]">evaluation</span>   = <span className="text-signal">&quot;Completed Successfully&quot;</span>
                    </code>
                  </pre>
                  <div className="mt-3.5 flex items-center justify-between rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[0.66rem] text-white/60">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0f9d58]" />
                      EXEC_STATUS: PASS
                    </span>
                    <span className="text-signal font-bold">100% MODULE COVERAGE</span>
                  </div>
                </div>

                {/* Console Metadata Specs Footer */}
                <div className="space-y-1.5 p-3.5 font-mono text-[0.72rem] text-white/80 bg-[#141413] border-t border-white/10">
                  <p className="m-0 flex justify-between">
                    <span className="text-white/40">Training Host:</span>
                    <span>Infosys Springboard Portal</span>
                  </p>
                  <p className="m-0 flex justify-between">
                    <span className="text-white/40">Competency:</span>
                    <span>Python Programming Logic</span>
                  </p>
                  <p className="m-0 flex justify-between">
                    <span className="text-white/40">Credential Status:</span>
                    <span className="text-signal font-bold">Certified / Completed</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        )}
      </div>
    </section>
  )
}
