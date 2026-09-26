import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X, CheckCircle2, MessageCircle } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { audiences, contact, type Audience } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

export default function Audiences() {
  const [selected, setSelected] = useState<Audience | null>(null)

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!selected) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selected])

  const handleStartProject = (item: Audience) => {
    setSelected(null)
    // Dispatch custom event so the contact form automatically pre-selects this business type
    window.dispatchEvent(
      new CustomEvent('unthought:select-industry', {
        detail: { businessType: item.businessType, service: item.service },
      })
    )
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="industries" className="section-pad border-t border-[var(--color-line)] bg-[var(--color-bg-secondary)] scroll-mt-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Who We Work With"
          title="Content That Fits Your Business."
          description="Select your industry to explore specialized creative direction, deliverables, and production strategies."
          align="left"
        />

        {/* Industry cards: image is a campaign creative — text lives below, never over the artwork */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
          {audiences.map((item, i) => (
            <motion.button
              key={item.id || item.title}
              id={`industry-card-${item.id}`}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              onClick={() => setSelected(item)}
              aria-label={`View details for ${item.service}`}
              className="group relative rounded-2xl overflow-hidden card-border bg-[var(--color-surface)] flex flex-col text-left cursor-pointer transition-all duration-400 hover:-translate-y-1.5 hover:border-[var(--color-accent)]/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(255,77,21,0.12)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
            >
              {/*
                Campaign Artwork Stage
                ─────────────────────
                These images are pre-designed promotional creatives with baked-in
                typography (campaign titles, taglines, labels). We treat them as
                artwork — no website text is overlaid on them.

                • object-contain ensures the complete creative is fully visible
                • Ambient blur backdrop fills card edges with matched photo tones
                • A subtle hover overlay + center icon communicates interactivity
                  without obscuring the image's own text
              */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#09090b] flex items-center justify-center border-b border-[var(--color-line)]">
                {/* Ambient blur backdrop */}
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] max-w-none object-cover filter blur-xl brightness-[0.3] opacity-50 pointer-events-none select-none"
                  />
                )}

                {/* Campaign creative — shown in full, no cropping, no text on top */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.service}
                    className="relative z-[2] w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                )}

                {/*
                  Hover interactive overlay — semi-transparent dark wash + center
                  action badge. This ONLY appears on hover so the artwork stays
                  clean at rest. The overlay is kept light enough that the image's
                  own text remains readable underneath.
                */}
                <div className="absolute inset-0 z-[3] bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
                <div className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_8px_24px_rgba(255,77,21,0.5)]">
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
                </div>
              </div>

              {/*
                Metadata Block — below the image, never over it
                ────────────────────────────────────────────────
                Industry label, service title, one-line description,
                and a "tap for details" affordance.
              */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-3 bg-[var(--color-surface)]">
                {/* Industry tag */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[var(--color-accent)]">
                      {item.tag}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight line-clamp-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {item.service}
                    </h3>
                  </div>
                  <div className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-white/5 border border-[var(--color-line)] flex items-center justify-center text-[var(--color-text-secondary)] transition-all duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:border-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                  {item.desc}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                  <span>View deliverables &amp; strategy</span>
                  <span>→</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Industry Detail Modal — full creative artwork + rich content details */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.service} details`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto glass-strong rounded-3xl border border-[var(--color-line)] shadow-[0_24px_64px_rgba(0,0,0,0.85)] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/*
                Full Campaign Artwork in Modal
                The image is the hero — it's the creative sample being presented.
                No web text is placed over it. object-contain keeps it pristine.
              */}
              <div className="relative w-full overflow-hidden bg-[#09090b] flex items-center justify-center border-b border-[var(--color-line)]">
                {selected.image && (
                  <img
                    src={selected.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] max-w-none object-cover filter blur-2xl brightness-[0.25] opacity-60 pointer-events-none select-none"
                  />
                )}
                {selected.image && (
                  <img
                    src={selected.image}
                    alt={selected.service}
                    className="relative z-[2] w-full h-auto max-h-[55vh] object-contain"
                  />
                )}
              </div>

              {/* Modal Content — all the rich detail lives here, below the artwork */}
              <div className="p-6 sm:p-8 flex flex-col gap-6 bg-[var(--color-surface)]">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[var(--color-accent)]">
                    {selected.tag}
                  </span>
                  <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                    {selected.service}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                    {selected.strategy}
                  </p>
                </div>

                {/* Core Deliverables Grid */}
                {selected.deliverables && selected.deliverables.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                      Core Deliverables &amp; Content Scope
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selected.deliverables.map((del) => (
                        <div
                          key={del}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-zinc-200"
                        >
                          <CheckCircle2 size={15} className="text-[var(--color-accent)] shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-[var(--color-line)] flex flex-wrap gap-3">
                  <button
                    onClick={() => handleStartProject(selected)}
                    className="btn-primary !py-3 !px-6 text-xs sm:text-sm font-semibold tracking-wider flex-1 sm:flex-none"
                  >
                    Discuss a {selected.tag} Project ↗
                  </button>
                  <a
                    href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                      `Hi Unthought Creative, I'd like to discuss ${selected.service} for my business.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline !py-3 !px-5 text-xs sm:text-sm font-medium tracking-wider inline-flex items-center justify-center gap-2 text-green-400 hover:text-green-300 hover:border-green-500/40 hover:bg-green-500/10 flex-1 sm:flex-none"
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
