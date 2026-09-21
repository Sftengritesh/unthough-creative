import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import { processSteps } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

export default function Process() {
  return (
    <section className="section-pad border-t border-[var(--color-line)] bg-[var(--color-bg-secondary)]">
      <div className="container-page">
        <SectionHeading eyebrow="Our Approach" title="From Idea To Impact." align="left" />

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-6 left-6 right-6 h-0.5 bg-[var(--color-line)]" />
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#05191c] border border-[var(--color-accent)]/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,187,166,0.15)]">
                  <span className="text-xs font-bold text-[var(--color-accent)]">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight font-sans">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
