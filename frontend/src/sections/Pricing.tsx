import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { packages } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

export default function Pricing() {
  return (
    <section id="packages" className="section-pad border-t border-[var(--color-line)] bg-[var(--color-bg-secondary)] scroll-mt-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Packages"
          title="Simple, Transparent Investment."
          description="Designed to fit your current stage and scale seamlessly as your audience expands."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={`relative rounded-2xl p-7 flex flex-col h-full transition-all duration-500 ${
                pkg.featured
                  ? 'bg-[#18181c] border-2 border-[var(--color-accent)] shadow-[0_0_40px_rgba(255,77,21,0.22)] md:-translate-y-2'
                  : 'bg-[var(--color-surface)]/80 border border-[var(--color-line)] hover:border-[var(--color-accent)]/30'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#09090b] border border-[var(--color-accent)] text-[var(--color-accent)] text-[10px] font-bold tracking-widest uppercase px-3 py-0.5 rounded-full shadow-md">
                  POPULAR
                </div>
              )}

              <h3 className="text-xl font-bold text-white tracking-tight">{pkg.name}</h3>
              <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{pkg.audience}</p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold font-sans text-white tracking-tight">
                  {pkg.price}
                </span>
                <span className="text-xs text-slate-400 font-medium">{pkg.period}</span>
              </div>

              <div className="h-px w-full bg-[var(--color-line)] my-6" />

              <ul className="space-y-3 flex-1">
                {pkg.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check size={16} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
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
                {pkg.name === 'Starter' ? 'Choose Starter' : pkg.name === 'Scale' ? 'Choose Scale' : 'Get Started'}
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
