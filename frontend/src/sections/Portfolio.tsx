import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { portfolioCategories, portfolioItems } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

const gradients = [
  'from-[var(--color-accent)]/25',
  'from-[var(--color-accent-2)]/25',
  'from-orange-500/20',
  'from-emerald-500/18',
  'from-pink-500/18',
  'from-sky-500/18',
]

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const items = useMemo(
    () =>
      active === 'all'
        ? portfolioItems
        : portfolioItems.filter((p) => p.category === active),
    [active]
  )

  const openItem = portfolioItems.find((p) => p.id === lightbox)

  return (
    <section id="work" className="section-pad border-t border-[var(--color-line)] scroll-mt-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected Work"
          title="Work That Makes People Stop Scrolling."
          description="A look at the kind of content direction and creative concepts we produce across industries."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 ${
                active === cat.key
                  ? 'bg-[var(--color-text)] text-[#09090b] border-[var(--color-text)]'
                  : 'border-[var(--color-line)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                variants={fadeUp}
                custom={i % 6}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={viewportOnce}
                onClick={() => setLightbox(item.id)}
                className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden card-border bg-[var(--color-surface)] block text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Ambient blur backdrop fills card edges with matched photo tone */}
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] max-w-none object-cover filter blur-xl brightness-[0.35] opacity-55 pointer-events-none select-none"
                  />
                )}

                {/* Natural-proportion image rendering: no cut-offs, complete photograph visible */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="relative z-[2] w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                )}

                {/* Subtle brand tint gradient on hover */}
                <div
                  className={`absolute inset-0 z-[3] bg-gradient-to-br ${gradients[item.id % gradients.length]} via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Dark vignette for text contrast, gently scoped so images stay clean */}
                <div className="absolute inset-0 z-[4] bg-gradient-to-t from-black/85 via-black/20 to-black/25 pointer-events-none" />

                {/* Center hover action badge */}
                <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>

                {/* Top category label badge — placed at top-right to avoid clashing with photo's baked-in left text */}
                <div className="absolute top-3.5 right-3.5 z-[6]">
                  <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 font-medium border border-white/10 shadow-sm">
                    {item.label}
                  </span>
                </div>

                {/* Bottom title */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-[6]">
                  <h3 className="text-sm sm:text-base font-medium text-white tracking-tight line-clamp-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox: displays complete uncropped high-fidelity photograph */}
      <AnimatePresence>
        {openItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl glass-strong rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.8)] border border-[var(--color-line)]"
            >
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close preview"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white border border-white/15 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="relative aspect-[4/3] sm:aspect-[3/2] w-full overflow-hidden bg-[var(--color-surface)] flex items-center justify-center">
                {openItem.image && (
                  <img
                    src={openItem.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] max-w-none object-cover filter blur-2xl brightness-[0.35] opacity-60 pointer-events-none select-none"
                  />
                )}
                {openItem.image && (
                  <img
                    src={openItem.image}
                    alt={openItem.title}
                    className="relative z-[2] w-full h-full object-contain"
                  />
                )}
                <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs tracking-widest uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/80 font-medium border border-white/15">
                    {openItem.label}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-[var(--color-surface)] border-t border-[var(--color-line)]">
                <h3 className="text-xl font-medium text-[var(--color-text)] mb-1">
                  {openItem.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {portfolioCategories.find((c) => c.key === openItem.category)?.label}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
