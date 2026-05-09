'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number, suffix?: string, prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        setDisplayValue(Math.floor(eased * value))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsSection() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [-200, 200])
  const x2 = useTransform(scrollYProgress, [0, 1], [200, -200])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const stats = [
    { value: 38, suffix: 'K+', label: 'Followers', sublabel: 'Across platforms' },
    { value: 200, suffix: 'M+', label: 'Views', sublabel: 'Total impressions' },
    { value: 24, suffix: 'M+', label: 'Interactions', sublabel: 'Engagements' },
  ]

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden py-32 md:py-48"
      style={{ scale }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            rgba(255,255,255,0.1) 100px,
            rgba(255,255,255,0.1) 101px
          )`
        }} />
      </div>

      {/* Floating text layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 whitespace-nowrap text-[20vw] font-bold text-white/[0.02] tracking-tighter"
          style={{ x: x1, fontFamily: 'Monument Extended, sans-serif' }}
        >
          IMPACT REACH GROWTH IMPACT
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 whitespace-nowrap text-[20vw] font-bold text-white/[0.02] tracking-tighter"
          style={{ x: x2, fontFamily: 'Monument Extended, sans-serif' }}
        >
          GROWTH IMPACT REACH GROWTH
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>03</span>
      </div>
      <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>METRICS</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase">The Numbers</span>
          <h2 
            className="mt-6 text-4xl md:text-6xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'Monument Extended, sans-serif' }}
          >
            Measured Impact
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * i, duration: 0.8 }}
            >
              {/* Glass card */}
              <div className="glass-strong p-8 md:p-12 rounded-2xl text-center relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                </div>

                {/* Number */}
                <div className="relative">
                  <span 
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight text-glow"
                    style={{ fontFamily: 'Monument Extended, sans-serif' }}
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                </div>

                {/* Labels */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-white tracking-wide">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-white/50 tracking-wide">
                    {stat.sublabel}
                  </p>
                </div>

                {/* Decorative line */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + 0.2 * i, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          className="mt-24 text-center text-white/40 text-sm tracking-wide max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Every number represents a moment of genuine connection. 
          These aren&apos;t just metrics—they&apos;re proof of cultural resonance.
        </motion.p>
      </div>
    </motion.section>
  )
}
