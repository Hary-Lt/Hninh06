"use client"

import { useState, useEffect } from 'react'
import { StoreProvider, useStore } from '@/lib/store-context'
import { LandingIntro } from '@/components/landing-intro'
import { ShopPage } from '@/components/shop-page'
import { GuidePage } from '@/components/guide-page'
import { LandingSkeleton, ShopPageSkeleton } from '@/components/loading-skeleton'

function AppContent() {
  const { currentPage } = useStore()
  const [isLoading, setIsLoading] = useState(true)
  const [pageTransition, setPageTransition] = useState(false)

  useEffect(() => {
    // Initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Page transition effect
  useEffect(() => {
    setPageTransition(true)
    const timer = setTimeout(() => {
      setPageTransition(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [currentPage])

  if (isLoading) {
    return <LandingSkeleton />
  }

  return (
    <div className={`transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
      {currentPage === 'landing' && <LandingIntro />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'guide' && <GuidePage />}
    </div>
  )
}

export default function Home() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}
