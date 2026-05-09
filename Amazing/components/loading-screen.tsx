'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 800)
          }, 500)
          return 100
        }
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background noise texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />

          {/* Animated lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                  top: `${20 + i * 15}%`,
                  left: 0,
                  right: 0,
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold tracking-[0.3em] text-white"
              style={{ fontFamily: 'Monument Extended, sans-serif' }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,255,255,0)',
                  '0 0 40px rgba(255,255,255,0.3)',
                  '0 0 20px rgba(255,255,255,0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              OVHOZ
            </motion.h1>
            <motion.div
              className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Progress container */}
          <motion.div
            className="w-64 md:w-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Progress bar */}
            <div className="relative h-px bg-white/10 overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Progress text */}
            <div className="mt-4 flex justify-between items-center text-xs tracking-[0.3em] text-white/50">
              <span>INITIALIZING</span>
              <motion.span
                key={Math.floor(progress)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono"
              >
                {Math.floor(progress)}%
              </motion.span>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute bottom-8 left-8 text-[10px] tracking-[0.5em] text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            DIGITAL EXPERIENCE
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 text-[10px] tracking-[0.5em] text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            2024
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
