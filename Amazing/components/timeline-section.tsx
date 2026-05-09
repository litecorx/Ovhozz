'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const timeline = [
  {
    year: 'JANUARY 2026',
    title: 'The Beginning',
    description: 'Started creating content. Developed unique voice and visual identity.',
    milestone: 'Origin',
  },
  {
    year: 'FEBRUARY 2026',
    title: 'Viral Breakout',
    description: 'First viral moment. Content strategy refined for maximum engagement.',
    milestone: 'Going Viral',
  },
  {
    year: 'APRIL 2026',
    title: 'Rapid Growth',
    description: 'Audience expanding rapidly. Building a loyal community of followers.',
    milestone: 'Momentum',
  },
  {
    year: 'MAY 2026',
    title: 'Cultural Phenomenon',
    description: 'Reached 200M+ total views. Established as a leading voice in digital culture.',
    milestone: '200M Views',
  },
]

function TimelineItem({ item, index, isLast }: { item: typeof timeline[0], index: number, isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="relative grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8 }}
    >
      {/* Left content (even items) */}
      <div className={`md:text-right ${index % 2 === 0 ? '' : 'md:order-3'}`}>
        {index % 2 === 0 && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
          >
            <span className="text-white/30 text-sm tracking-[0.3em]">{item.year}</span>
            <h3 
              className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'Monument Extended, sans-serif' }}
            >
              {item.title}
            </h3>
            <p className="mt-3 text-white/50 leading-relaxed max-w-sm md:ml-auto">
              {item.description}
            </p>
            <span className="inline-block mt-4 text-xs tracking-[0.2em] text-white/40 uppercase px-4 py-2 border border-white/10 rounded-full">
              {item.milestone}
            </span>
          </motion.div>
        )}
      </div>

      {/* Center line */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-white/50 bg-black z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2 + index * 0.2, duration: 0.4, type: 'spring' }}
        />
        {!isLast && (
          <motion.div
            className="w-px flex-1 bg-gradient-to-b from-white/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* Right content (odd items) */}
      <div className={index % 2 === 0 ? '' : 'md:order-1'}>
        {index % 2 !== 0 && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
          >
            <span className="text-white/30 text-sm tracking-[0.3em]">{item.year}</span>
            <h3 
              className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'Monument Extended, sans-serif' }}
            >
              {item.title}
            </h3>
            <p className="mt-3 text-white/50 leading-relaxed max-w-sm">
              {item.description}
            </p>
            <span className="inline-block mt-4 text-xs tracking-[0.2em] text-white/40 uppercase px-4 py-2 border border-white/10 rounded-full">
              {item.milestone}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export function TimelineSection() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden py-32 md:py-48"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>06</span>
      </div>
      <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>JOURNEY</span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-24 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase">Evolution</span>
          <h2 
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'Monument Extended, sans-serif' }}
          >
            The Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-16 md:space-y-24">
          {timeline.map((item, i) => (
            <TimelineItem 
              key={i} 
              item={item} 
              index={i} 
              isLast={i === timeline.length - 1} 
            />
          ))}
        </div>

        {/* Future indicator */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="inline-flex flex-col items-center">
            <span className="text-xs tracking-[0.5em] text-white/30 uppercase">JUNE 2026</span>
            <span className="mt-2 text-lg text-white/60">The next chapter begins...</span>
            <motion.div 
              className="mt-4 w-px h-16 bg-gradient-to-b from-white/30 to-transparent"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
