import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { audiences } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

const gradients = [
  'from-orange-500/70 via-black/40 to-black/60',
  'from-[var(--color-accent)]/60 via-black/40 to-black/60',
  'from-pink-500/60 via-black/40 to-black/60',
  'from-emerald-500/60 via-black/40 to-black/60',
  'from-[var(--color-accent-2)]/60 via-black/40 to-black/60',
  'from-sky-500/60 via-black/40 to-black/60',
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
              className="group relative rounded-3xl overflow-hidden card-border bg-[var(--color-surface)] h-56 flex flex-col justify-between cursor-default transition-transform duration-500 hover:-translate-y-1"
            >
              {/* Background photo */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              {/* Dark gradient overlay — always shown, stronger on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-80 group-hover:opacity-90 transition-opacity duration-500`}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 60%)',
                }}
              />

              <div className="relative z-10 flex items-start justify-between p-6">
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/70 font-medium">
                  {item.tag}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-white/60 transition-all duration-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>

              <div className="relative z-10 p-6">
                <h3 className="text-xl font-medium text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
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

