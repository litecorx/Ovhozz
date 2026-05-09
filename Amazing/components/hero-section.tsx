'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeroScene } from './hero-scene'
import gsap from 'gsap'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char')
      gsap.fromTo(chars, 
        { 
          opacity: 0, 
          y: 100,
          rotateX: -90,
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.5,
        }
      )
    }
  }, [])

  const title = 'OVHOZ'

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
      style={{ opacity, scale }}
    >
      {/* 3D Scene */}
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none z-10" />

      {/* Content */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4"
        style={{ y }}
      >
        {/* Small tagline */}
        <motion.p
          className="text-xs md:text-sm tracking-[0.5em] text-white/50 mb-8 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Digital Creator & Attention Architect
        </motion.p>

        {/* Main title */}
        <h1 
          ref={titleRef}
          className="text-[15vw] md:text-[12vw] font-bold tracking-[0.1em] text-white leading-none perspective-[1000px]"
          style={{ fontFamily: 'Monument Extended, sans-serif' }}
        >
          {title.split('').map((char, i) => (
            <span 
              key={i} 
              className="char inline-block transform-gpu"
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.div
          className="mt-8 md:mt-12 max-w-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="text-sm md:text-base text-white/60 tracking-wide leading-relaxed">
            Culture-driven content that captures attention and defines the digital landscape.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>01</span>
      </div>
      <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>HERO</span>
      </div>
    </motion.section>
  )
}
