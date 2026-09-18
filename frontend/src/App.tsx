import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/sections/Hero'
import Intro from '@/sections/Intro'
import Audiences from '@/sections/Audiences'
import Services from '@/sections/Services'
import Process from '@/sections/Process'
import Portfolio from '@/sections/Portfolio'
import WhyUs from '@/sections/WhyUs'
import Pricing from '@/sections/Pricing'
import CTA from '@/sections/CTA'
import FAQ from '@/sections/FAQ'
import Contact from '@/sections/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Audiences />
        <Services />
        <Process />
        <Portfolio />
        <WhyUs />
        <Pricing />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
