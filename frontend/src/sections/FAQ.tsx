import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { faqs } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-pad border-t border-[var(--color-line)] bg-[var(--color-bg-secondary)]">
      <div className="container-page grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="FAQ" title="Questions, Answered." align="left" />
        </div>

        <div className="lg:col-span-8">
          <div className="rounded-3xl card-border overflow-hidden divide-y divide-[var(--color-line)] bg-[var(--color-surface)]">
            {faqs.map((faq, i) => {
              const isOpen = open === i
              return (
                <motion.div
                  key={faq.q}
                  variants={fadeUp}
                  custom={i % 5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-medium text-[var(--color-text)]">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center"
                    >
                      <Plus size={14} className="text-[var(--color-accent)]" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
