import { useMemo, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { portfolioCategories, portfolioItems } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

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

  // Escape key and body scroll lock for lightbox
  useEffect(() => {
    if (lightbox === null) return
    const orig = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = orig
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  return (
    <section id="work" className="section-pad border-t border-[var(--color-line)] scroll-mt-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected Work"
          title="Work That Makes People Stop Scrolling."
          description="A look at the kind of content direction and creative concepts we produce across industries."
        />

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.key}
              id={`portfolio-filter-${cat.key}`}
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

        {/*
          Portfolio Card Grid
          ───────────────────
          Each card image is a pre-designed campaign creative with baked-in
          typography (title, tagline, label). The website UI adds NO overlaid
          text — the image itself IS the card content.

          Interactivity is communicated through:
          • Border glow + lift on hover
          • A center action badge (ArrowUpRight) that fades in on hover
          • cursor: pointer

          Clicking opens a detail modal with rich service info below the artwork.
        */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                id={`portfolio-card-${item.id}`}
                layout
                variants={fadeUp}
                custom={i % 6}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={viewportOnce}
                onClick={() => setLightbox(item.id)}
                aria-label={`View campaign details: ${item.title}`}
                className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden card-border bg-[var(--color-surface)] block text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,77,21,0.08)]"
              >
                {/* Ambient blur backdrop fills card edges with matched photo tones */}
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] max-w-none object-cover filter blur-xl brightness-[0.3] opacity-50 pointer-events-none select-none"
                  />
                )}

                {/*
                  Campaign creative — full artwork, zero clipping.
                  object-contain ensures the image's own baked-in text is
                  never cropped or covered.
                */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="relative z-[2] w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                )}

                {/*
                  Hover overlay — subtle dark wash communicates clickability
                  without covering the artwork's baked-in text at rest.
                  Only appears on hover.
                */}
                <div className="absolute inset-0 z-[3] bg-black/0 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none" />

                {/* Center action badge — appears on hover only */}
                <div className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-accent)] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_8px_24px_rgba(255,77,21,0.5)]">
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/*
        Portfolio Lightbox / Detail Modal
        ──────────────────────────────────
        Artwork shown at full fidelity (object-contain, no cropping).
        All website UI text lives BELOW the image in a dedicated metadata
        panel — never overlapping the campaign creative.
      */}
      <AnimatePresence>
        {openItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Portfolio: ${openItem.title}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.8)] border border-[var(--color-line)] flex flex-col"
            >
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close preview"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white border border-white/15 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Full campaign creative — pristine, no overlaid UI text */}
              <div className="relative w-full overflow-hidden bg-[#09090b] flex items-center justify-center border-b border-[var(--color-line)]">
                {openItem.image && (
                  <img
                    src={openItem.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] max-w-none object-cover filter blur-2xl brightness-[0.25] opacity-60 pointer-events-none select-none"
                  />
                )}
                {openItem.image && (
                  <img
                    src={openItem.image}
                    alt={openItem.title}
                    className="relative z-[2] w-full h-auto max-h-[55vh] object-contain"
                  />
                )}
              </div>

              {/* Metadata panel — all website text lives here, below the artwork */}
              <div className="p-6 bg-[var(--color-surface)] border-t border-[var(--color-line)]">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[var(--color-accent)]">
                  {portfolioCategories.find((c) => c.key === openItem.category)?.label}
                </span>
                <h3 className="mt-1.5 text-xl font-semibold text-[var(--color-text)] tracking-tight">
                  {openItem.title}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">
                  Sample campaign creative — click the card to discuss a similar content strategy for your business.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
