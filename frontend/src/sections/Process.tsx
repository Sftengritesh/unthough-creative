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
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-[var(--color-line)]" />
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
                <div className="relative z-10 w-12 h-12 rounded-full glass-strong flex items-center justify-center mb-6">
                  <span className="text-sm font-semibold text-[var(--color-accent)]">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-[var(--color-text)] mb-2 font-[var(--font-display)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xs">
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
