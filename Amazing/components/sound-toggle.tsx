'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function SoundToggle() {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <motion.button
      onClick={() => setIsEnabled(!isEnabled)}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-2 glass rounded-full group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
      data-cursor="Sound"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Sound bars */}
      <div className="flex items-end gap-0.5 h-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-0.5 bg-white/60 rounded-full"
            animate={isEnabled ? {
              height: [4, 12, 6, 16, 4],
            } : {
              height: 4,
            }}
            transition={{
              duration: 0.8,
              repeat: isEnabled ? Infinity : 0,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      <span className="text-xs tracking-[0.15em] text-white/60 uppercase">
        {isEnabled ? 'On' : 'Off'}
      </span>
    </motion.button>
  )
}
