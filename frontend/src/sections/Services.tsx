import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import { services } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

export default function Services() {
  return (
    <section id="services" className="section-pad border-t border-[var(--color-line)] scroll-mt-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="Everything Your Brand Needs To Show Up Better."
          description="A full-stack content system — from strategy to production — built around how your business actually grows."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden card-border bg-[var(--color-line)]">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="group relative bg-[var(--color-surface)] p-7 min-h-[220px] flex flex-col justify-between transition-colors duration-500 hover:bg-[var(--color-surface-hi)]"
            >
              <span className="text-4xl font-light text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-500 font-[var(--font-display)]">
                {service.number}
              </span>
              <div>
                <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {service.desc}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
