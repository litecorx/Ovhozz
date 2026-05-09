'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(textRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const words = [
    { text: 'Culture-driven', delay: 0 },
    { text: 'creator.', delay: 0.1 },
    { text: 'Attention', delay: 0.2 },
    { text: 'architect.', delay: 0.3 },
    { text: 'Internet', delay: 0.4 },
    { text: 'personality.', delay: 0.5 },
  ]

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden py-32 md:py-48"
      style={{ opacity }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"
          style={{ y }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/[0.01] rounded-full blur-2xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>02</span>
      </div>
      <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>ABOUT</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase">Who is Ovhoz</span>
        </motion.div>

        {/* Main text */}
        <div ref={textRef} className="space-y-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
                style={{ fontFamily: 'Monument Extended, sans-serif' }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: word.delay,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Description paragraphs */}
        <motion.div
          className="mt-24 grid md:grid-cols-2 gap-12 md:gap-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="space-y-6">
            <div className="w-12 h-px bg-white/20" />
            <p className="text-lg text-white/70 leading-relaxed">
              In an era of infinite scroll and fleeting attention, Ovhoz has mastered 
              the art of the pause. Every piece of content is engineered to stop thumbs, 
              capture minds, and create lasting impressions.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-px bg-white/20" />
            <p className="text-lg text-white/70 leading-relaxed">
              With a deep understanding of digital culture and human psychology, 
              Ovhoz creates content that resonates, engages, and converts. 
              This is high-retention storytelling for the modern age.
            </p>
          </div>
        </motion.div>

        {/* Floating glass panels */}
        <motion.div
          className="mt-32 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Philosophy', desc: 'Content that commands attention' },
              { title: 'Approach', desc: 'Data-driven creative excellence' },
              { title: 'Results', desc: 'Measurable cultural impact' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass p-8 rounded-lg group hover:bg-white/[0.05] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * i + 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                data-cursor="View"
              >
                <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Monument Extended, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-white/60">
                  {item.desc}
                </p>
                <motion.div 
                  className="mt-6 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
