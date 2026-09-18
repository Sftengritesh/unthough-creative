import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { portfolioCategories, portfolioItems } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

const ratioClass: Record<string, string> = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
}

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
                  ? 'bg-[var(--color-text)] text-[#0a0d16] border-[var(--color-text)]'
                  : 'border-[var(--color-line)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
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
                className={`group relative w-full mb-4 break-inside-avoid rounded-2xl overflow-hidden card-border bg-[var(--color-surface)] ${ratioClass[item.ratio]} block text-left`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradients[item.id % gradients.length]} via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-400">
                    <ArrowUpRight size={20} className="text-[var(--color-text)]" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-widest uppercase glass rounded-full px-3 py-1 text-[var(--color-text-secondary)]">
                    {item.label}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-base font-medium text-white">{item.title}</h3>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass-strong rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close preview"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white"
              >
                <X size={16} />
              </button>
              <div
                className={`aspect-video bg-gradient-to-br ${gradients[openItem.id % gradients.length]} via-[var(--color-surface)] to-[var(--color-bg)] flex items-center justify-center`}
              >
                <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
                  {openItem.label}
                </span>
              </div>
              <div className="p-6">
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
