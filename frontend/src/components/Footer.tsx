import { AtSign, MessageCircle } from 'lucide-react'
import { business, contact, navLinks, whatsappLink } from '@/data/siteConfig'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg-secondary)]">
      <div className="container-page py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="text-base font-semibold tracking-[0.12em] text-[var(--color-text)]">
                UNTHOUGHT
              </span>
              <span className="text-[11px] tracking-[0.3em] text-[var(--color-accent)] font-medium">
                CREATIVE
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xs">
              {business.footerLine}
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-4">
              Navigate
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors w-fit"
              >
                <AtSign size={15} />
                Instagram
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors w-fit"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-4">
              Contact
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)]">{contact.phoneDisplay}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider text-white">UNTHOUGHT</span>
            <span className="text-[var(--color-line)]">|</span>
            <span>© {business.year} UNTHOUGHT CREATIVE. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-slate-400">
            <a href="#privacy" className="hover:text-[var(--color-accent)] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[var(--color-accent)] transition-colors">Terms of Service</a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
