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

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="group relative bg-[#05191c]/80 border border-[var(--color-line)] rounded-2xl p-7 min-h-[240px] flex flex-col justify-between transition-all duration-500 hover:border-[var(--color-accent)]/50 hover:bg-[#072328] hover:-translate-y-1 shadow-lg"
            >
              <span className="text-5xl font-normal text-[var(--color-accent)] font-[var(--font-display)]">
                {service.number}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
