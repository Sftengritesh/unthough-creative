import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { packages } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

export default function Pricing() {
  return (
    <section id="packages" className="section-pad border-t border-[var(--color-line)] bg-[var(--color-bg-secondary)] scroll-mt-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Packages"
          title="Simple Packages. Serious Results."
          description="Choose a starting point — every package can be tailored to your business."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-start">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={`relative rounded-3xl p-8 flex flex-col h-full transition-transform duration-500 hover:-translate-y-1.5 ${
                pkg.featured
                  ? 'glass-strong shadow-[0_20px_60px_rgba(124,140,255,0.15)] md:scale-[1.04] border border-[var(--color-accent)]/40'
                  : 'card-border bg-[var(--color-surface)]'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-white text-[11px] font-semibold px-4 py-1.5 rounded-full shadow-lg">
                  <Star size={11} className="fill-white" />
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-medium text-[var(--color-text)]">{pkg.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{pkg.audience}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-medium font-[var(--font-display)] text-[var(--color-text)]">
                  {pkg.price}
                </span>
                <span className="text-sm text-[var(--color-text-muted)] mb-1">{pkg.period}</span>
              </div>

              <div className="h-px w-full bg-[var(--color-line)] my-6" />

              <ul className="space-y-3 flex-1">
                {pkg.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                    <Check size={15} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`mt-8 w-full text-center ${pkg.featured ? 'btn-primary' : 'btn-outline'}`}
              >
                Discuss Your Package
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 text-center text-sm text-[var(--color-text-muted)]"
        >
          Packages can be customized based on your business requirements.
        </motion.p>
      </div>
    </section>
  )
}
