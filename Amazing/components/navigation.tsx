'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="relative z-10"
            data-cursor="Home"
          >
            <span 
              className="text-xl font-bold text-white tracking-[0.2em]"
              style={{ fontFamily: 'Monument Extended, sans-serif' }}
            >
              OVHOZ
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm tracking-[0.15em] text-white/60 hover:text-white transition-colors uppercase"
                data-cursor={link.name}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2.5 text-sm tracking-wide border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
              data-cursor="Partner"
            >
              Partner
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            data-cursor="Menu"
          >
            <motion.span
              className="w-6 h-px bg-white"
              animate={{ 
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 4 : 0
              }}
            />
            <motion.span
              className="w-6 h-px bg-white"
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-6 h-px bg-white"
              animate={{ 
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -4 : 0
              }}
            />
          </button>
        </div>

        {/* Glass background when scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              className="absolute inset-0 glass -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-white tracking-[0.1em]"
                  style={{ fontFamily: 'Monument Extended, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 text-lg tracking-wide border border-white rounded-full text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Partner With Us
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
