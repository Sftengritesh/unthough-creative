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
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border border-[var(--color-accent)]/30 bg-[var(--color-surface)]/80 text-[var(--color-accent)] shadow-[0_0_15px_rgba(0,187,166,0.1)]"
            >
              <span className="text-xs">✦</span>
              <span className="text-xs font-semibold tracking-wide">
                Social Media Content & Creative Agency
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
              <span className="gradient-text italic font-serif">Content.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="body-lg mt-7 max-w-xl text-slate-300"
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
              className="mt-12 flex items-center gap-3 text-xs sm:text-sm text-[var(--color-text-muted)] tracking-wider uppercase font-semibold"
            >
              <span>CONTENT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              <span>STRATEGY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              <span>GROWTH</span>
            </motion.div>
          </div>

          {/* Right: floating composition */}
          <div className="lg:col-span-5 relative h-[460px] sm:h-[500px] lg:h-[560px]">
            {/* Main Shoot Photo Frame */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-10 left-0 w-[72%] aspect-[4/5] rounded-3xl glass-strong p-3 shadow-2xl border border-[var(--color-accent)]/20"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src="/images/imagesowner-studio.jpg"
                  alt="Unthought Creative — Brand Shoot"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030d0e]/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-white/90 uppercase bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    ✦ BRAND SHOOT
                  </span>
                  <TrendingUp size={16} className="text-[var(--color-accent)]" />
                </div>
              </div>
            </motion.div>

            {/* Top Right Analytics Card Widget */}
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="absolute top-0 right-0 w-[62%] rounded-2xl glass-strong p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[var(--color-accent)]/30 backdrop-blur-xl group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                  <span className="text-[10px] font-bold tracking-wider text-white/80 uppercase">
                    REELS REACH
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[var(--color-accent)] bg-[var(--color-accent)]/15 px-2 py-0.5 rounded-full border border-[var(--color-accent)]/30">
                  +140%
                </span>
              </div>
              <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">MONTHLY REACH</div>
              <div className="text-2xl font-black text-white tracking-tight">148.5K+</div>

              {/* Glowing trend curve graph */}
              <div className="mt-3 h-14 relative w-full flex items-end justify-between gap-1 overflow-hidden pt-2">
                <svg className="absolute inset-0 w-full h-full text-[var(--color-accent)]" viewBox="0 0 200 60" fill="none" preserveAspectRatio="none">
                  <path d="M0 45 Q 40 35, 80 40 T 160 15 T 200 8" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <path d="M0 45 Q 40 35, 80 40 T 160 15 T 200 8 L 200 60 L 0 60 Z" fill="url(#cyan-grad)" opacity="0.25" />
                  <defs>
                    <linearGradient id="cyan-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00bba6" />
                      <stop offset="100%" stopColor="#00bba6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                {[30, 45, 38, 60, 52, 78, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                    className="w-2 rounded-t-sm bg-gradient-to-t from-[var(--color-accent)]/30 to-[var(--color-accent)] relative z-10"
                  />
                ))}
              </div>
            </motion.div>

            {/* Bottom Profile Status Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-4 right-2 w-[60%] rounded-2xl glass-strong p-3 shadow-2xl border border-white/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-[var(--color-accent)]">
                  <img
                    src="/images/owner-founder.jpg"
                    alt="Founder"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Unthought Team</span>
                  <span className="text-[10px] text-[var(--color-accent)]">Active Content Strategy</span>
                </div>
              </div>
              <Sparkles size={16} className="text-[var(--color-accent)] animate-spin-slow" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
