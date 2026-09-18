import { motion } from 'framer-motion'
import { Compass, Repeat, Palette, TrendingUp } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { introStats } from '@/data/siteConfig'
import { fadeUp, viewportOnce } from '@/lib/motion'

const icons = [Compass, Repeat, Palette, TrendingUp]

export default function Intro() {
  return (
    <section className="section-pad border-t border-[var(--color-line)]">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Why Unthought"
              title="Built For Brands That Want To Be Remembered."
              description="We combine creative direction, social media strategy, and consistent execution to help businesses build a stronger digital presence."
            />
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {introStats.map((stat, i) => {
              const Icon = icons[i % icons.length]
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="glass rounded-2xl p-5 flex flex-col gap-3"
                >
                  <Icon size={18} className="text-[var(--color-accent)]" />
                  <span className="text-sm font-medium text-[var(--color-text)] leading-snug">
                    {stat.label}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
