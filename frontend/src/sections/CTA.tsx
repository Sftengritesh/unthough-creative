import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, viewportOnce } from '@/lib/motion'

export default function CTA() {
  return (
    <section className="section-pad border-t border-[var(--color-line)]">
      <div className="container-page">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative rounded-3xl overflow-hidden glass-strong px-8 py-16 sm:px-16 sm:py-20 text-center"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 0%, rgba(124,140,255,0.18), transparent 60%)',
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="eyebrow mb-5">Your Story Starts Here</p>
            <h2 className="h2-display">
              Let's Make Your Brand The Next Success Story.
            </h2>
            <p className="body-lg mt-6">
              We're just getting started building standout content for
              businesses like yours — let's talk about what growth could look
              like for your brand.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary mt-9 group"
            >
              Start a Project
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
