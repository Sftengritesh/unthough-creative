import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { audiences } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

const gradients = [
  'from-orange-500/25 via-transparent to-transparent',
  'from-[var(--color-accent)]/30 via-transparent to-transparent',
  'from-pink-500/20 via-transparent to-transparent',
  'from-emerald-500/20 via-transparent to-transparent',
  'from-[var(--color-accent-2)]/25 via-transparent to-transparent',
  'from-sky-500/20 via-transparent to-transparent',
]

export default function Audiences() {
  return (
    <section className="section-pad border-t border-[var(--color-line)] bg-[var(--color-bg-secondary)]">
      <div className="container-page">
        <SectionHeading
          eyebrow="Who We Work With"
          title="Content That Fits Your Business."
          align="left"
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="group relative rounded-3xl overflow-hidden card-border bg-[var(--color-surface)] p-6 h-56 flex flex-col justify-between cursor-default transition-transform duration-500 hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08), transparent 60%)',
                }}
              />

              <div className="relative z-10 flex items-start justify-between">
                <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-text-muted)] font-medium">
                  {item.tag}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-[var(--color-text-secondary)] transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-medium text-[var(--color-text)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
