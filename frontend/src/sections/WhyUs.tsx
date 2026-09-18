import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { whyUs } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

export default function WhyUs() {
  return (
    <section id="about" className="section-pad border-t border-[var(--color-line)] scroll-mt-24">
      <div className="container-page grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden card-border bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-bg-secondary)] to-[var(--color-bg)]">
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: 'radial-gradient(circle at 70% 20%, var(--color-accent), transparent 55%)',
            }} />
            <div className="absolute inset-6 grid grid-cols-2 grid-rows-3 gap-3">
              <div className="col-span-2 rounded-2xl glass-strong" />
              <div className="rounded-2xl glass" />
              <div className="rounded-2xl glass" />
              <div className="col-span-2 rounded-2xl glass-strong" />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 glass-strong rounded-2xl px-5 py-4 shadow-xl hidden sm:block">
            <p className="text-2xl font-medium font-[var(--font-display)] text-[var(--color-text)]">
              360°
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">Content system</p>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Why Work With Us"
            title="Creative Thinking. Consistent Execution."
          />
          <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {whyUs.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-[var(--color-accent)]" />
                </span>
                <span className="text-sm text-[var(--color-text)]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
