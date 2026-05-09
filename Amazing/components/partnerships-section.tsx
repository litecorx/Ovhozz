'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const partnerships = [
  {
    name: 'Tech Giants',
    description: 'Collaborative campaigns with leading technology companies',
    year: '2024',
  },
  {
    name: 'Fashion Houses',
    description: 'Digital-first storytelling for luxury fashion brands',
    year: '2024',
  },
  {
    name: 'Gaming Studios',
    description: 'Immersive content creation for AAA game launches',
    year: '2023',
  },
  {
    name: 'Lifestyle Brands',
    description: 'Authentic integration with premium lifestyle products',
    year: '2023',
  },
  {
    name: 'Streaming Platforms',
    description: 'Original content partnerships and platform collaborations',
    year: '2023',
  },
]

function PartnershipCard({ item, index }: { item: typeof partnerships[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div 
        className="relative border-b border-white/10 py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-all duration-500 px-4 md:px-8 -mx-4 md:-mx-8"
        data-cursor="Explore"
      >
        {/* Index number */}
        <span className="text-[10px] tracking-[0.3em] text-white/30 md:w-16">
          0{index + 1}
        </span>

        {/* Name */}
        <h3 
          className="text-2xl md:text-4xl font-bold text-white tracking-tight flex-1"
          style={{ fontFamily: 'Monument Extended, sans-serif' }}
        >
          <span className="relative">
            {item.name}
            <motion.span 
              className="absolute -bottom-1 left-0 h-px bg-white origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </span>
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm md:text-base md:w-64 lg:w-80">
          {item.description}
        </p>

        {/* Year */}
        <span className="text-white/30 text-sm tracking-wide md:w-20 text-right">
          {item.year}
        </span>

        {/* Arrow */}
        <motion.div 
          className="absolute right-4 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <svg 
            className="w-6 h-6 text-white/50" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function PartnershipsSection() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden py-32 md:py-48"
    >
      {/* Background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"
        style={{ y }}
      />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>05</span>
      </div>
      <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>PARTNERS</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase">Collaborations</span>
          <h2 
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'Monument Extended, sans-serif' }}
          >
            Brand Partners
          </h2>
          <p className="mt-6 max-w-xl text-white/60 text-lg leading-relaxed">
            Strategic collaborations with industry leaders. Every partnership 
            is built on authentic storytelling and measurable results.
          </p>
        </motion.div>

        {/* Partnership list */}
        <div className="border-t border-white/10">
          {partnerships.map((item, i) => (
            <PartnershipCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-white/40 text-sm tracking-wide mb-6">
            Interested in working together?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-4 text-white hover:text-white/80 transition-colors group"
            data-cursor="Let&apos;s Talk"
          >
            <span className="text-lg tracking-wide">Start a Partnership</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
