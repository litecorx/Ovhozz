'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { CustomCursor } from '@/components/cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import { LoadingScreen } from '@/components/loading-screen'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { StatsSection } from '@/components/stats-section'
import { PartnershipsSection } from '@/components/partnerships-section'
import { TimelineSection } from '@/components/timeline-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { SoundToggle } from '@/components/sound-toggle'

// Dynamically import heavy 3D component
const ImmersiveSection = dynamic(
  () => import('@/components/immersive-section').then(mod => ({ default: mod.ImmersiveSection })),
  { 
    ssr: false,
    loading: () => (
      <section className="h-screen w-full bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </section>
    )
  }
)

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLoadingComplete = () => {
    setShowContent(true)
  }

  return (
    <main className="relative min-h-screen bg-black">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen */}
      {isLoaded && !showContent && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Main content */}
      {showContent && (
        <SmoothScroll>
          <Navigation />
          
          <HeroSection />
          
          <div id="about">
            <AboutSection />
          </div>
          
          <StatsSection />
          
          <Suspense fallback={
            <section className="h-screen w-full bg-black flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </section>
          }>
            <ImmersiveSection />
          </Suspense>
          
          <div id="work">
            <PartnershipsSection />
          </div>
          
          <TimelineSection />
          
          <ContactSection />
          
          <Footer />
          
          <SoundToggle />
        </SmoothScroll>
      )}
    </main>
  )
}
