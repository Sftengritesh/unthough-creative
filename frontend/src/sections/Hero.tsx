import { motion } from 'framer-motion'
import { ArrowUpRight, Play, TrendingUp, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-accent)]/18 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-[var(--color-accent-2)]/14 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
            >
              <Sparkles size={13} className="text-[var(--color-accent)]" />
              <span className="text-xs font-medium text-[var(--color-text-secondary)] tracking-wide">
                Social Media & Content Creation Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="h1-display"
            >
              Your Brand Deserves
              <br />
              More Than Just{' '}
              <span className="gradient-text italic">Content.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="body-lg mt-7 max-w-xl"
            >
              We help ambitious businesses turn social media into a powerful
              growth engine through strategy, storytelling, and
              scroll-stopping content.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-primary group"
              >
                Start a Project
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-outline group"
              >
                <Play size={14} className="fill-current" />
                Explore Our Work
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex items-center gap-3 text-xs sm:text-sm text-[var(--color-text-muted)] tracking-wide"
            >
              <span>Content</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
              <span>Strategy</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
              <span>Growth</span>
            </motion.div>
          </div>

          {/* Right: floating composition */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[480px] lg:h-[540px]">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-6 left-0 w-[62%] aspect-[4/5] rounded-3xl glass-strong p-4 shadow-2xl"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/30 via-[var(--color-surface)] to-[var(--color-bg)] flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-widest text-white/70">
                    REEL · 00:24
                  </span>
                  <TrendingUp size={14} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <div className="h-2 w-3/4 rounded-full bg-white/20 mb-2" />
                  <div className="h-2 w-1/2 rounded-full bg-white/10" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 8 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="absolute top-0 right-0 w-[54%] aspect-square rounded-3xl glass-strong p-4 shadow-2xl"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--color-accent-2)]/30 via-[var(--color-surface)] to-[var(--color-bg)] p-4 flex flex-col justify-end">
                <span className="text-[10px] font-semibold tracking-widest text-white/70 mb-2">
                  ENGAGEMENT
                </span>
                <div className="flex items-end gap-1.5 h-14">
                  {[40, 65, 45, 80, 60, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: 0.7 + i * 0.06 }}
                      className="flex-1 rounded-t-sm bg-[var(--color-accent)]/70"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-0 right-4 w-[58%] rounded-2xl glass-strong p-4 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)]" />
                <div className="flex-1">
                  <div className="h-1.5 w-3/4 rounded-full bg-white/25 mb-1.5" />
                  <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-16 left-2 w-16 h-16 rounded-2xl glass flex items-center justify-center shadow-xl"
            >
              <Sparkles size={20} className="text-[var(--color-accent)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
