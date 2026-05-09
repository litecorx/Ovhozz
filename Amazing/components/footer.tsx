'use client'

import { useRef } from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'

const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'TikTok', href: '#' },
  { name: 'YouTube', href: '#' },
  { name: 'Twitter', href: '#' },
]

export function Footer() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  })

  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  return (
    <motion.footer 
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden pt-32 pb-8"
    >
      {/* Large OVHOZ text */}
      <motion.div 
        className="relative px-8 mb-24"
        style={{ y }}
      >
        <h2 
          className="text-[20vw] font-bold text-white/[0.03] tracking-tighter leading-none text-center select-none"
          style={{ fontFamily: 'Monument Extended, sans-serif' }}
        >
          OVHOZ
        </h2>
      </motion.div>

      {/* Footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 pb-16 border-b border-white/10">
          {/* Brand */}
          <div>
            <h3 
              className="text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'Monument Extended, sans-serif' }}
            >
              OVHOZ
            </h3>
            <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-xs">
              Culture-driven creator. Attention architect. 
              Building the future of digital content.
            </p>
          </div>

          {/* Social Links */}
          <div className="md:text-center">
            <h4 className="text-xs tracking-[0.3em] text-white/40 uppercase mb-6">Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    data-cursor={link.name}
                  >
                    <span>{link.name}</span>
                    <svg 
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h4 className="text-xs tracking-[0.3em] text-white/40 uppercase mb-6">Contact</h4>
            <a 
              href="mailto:hello@ovhoz.com" 
              className="text-white/60 hover:text-white transition-colors"
              data-cursor="Email"
            >
              hello@ovhoz.com
            </a>
            <p className="mt-4 text-white/40 text-sm">
              For partnership inquiries
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs tracking-wide">
            © {new Date().getFullYear()} OVHOZ. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.footer>
  )
}
