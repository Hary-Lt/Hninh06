"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Product } from './products'

interface StoreContextType {
  wishlist: number[]
  recentlyViewed: number[]
  isDarkMode: boolean
  currentPage: 'landing' | 'shop' | 'guide'
  toggleWishlist: (productId: number) => void
  addToRecentlyViewed: (productId: number) => void
  toggleDarkMode: () => void
  setCurrentPage: (page: 'landing' | 'shop' | 'guide') => void
  isInWishlist: (productId: number) => boolean
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState<'landing' | 'shop' | 'guide'>('landing')
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedWishlist = localStorage.getItem('hoangninh_wishlist')
    const savedRecent = localStorage.getItem('hoangninh_recent')
    const savedDarkMode = localStorage.getItem('hoangninh_darkmode')
    
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent))
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    } else {
      // Default to light mode for new users
      setIsDarkMode(false)
    }
  }, [])

  // Apply dark mode class
  useEffect(() => {
    if (mounted) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('hoangninh_darkmode', JSON.stringify(isDarkMode))
    }
  }, [isDarkMode, mounted])

  // Save wishlist to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('hoangninh_wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, mounted])

  // Save recently viewed to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('hoangninh_recent', JSON.stringify(recentlyViewed))
    }
  }, [recentlyViewed, mounted])

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const addToRecentlyViewed = (productId: number) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId)
      return [productId, ...filtered].slice(0, 10) // Keep only last 10
    })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const isInWishlist = (productId: number) => wishlist.includes(productId)

  return (
    <StoreContext.Provider value={{
      wishlist,
      recentlyViewed,
      isDarkMode,
      currentPage,
      toggleWishlist,
      addToRecentlyViewed,
      toggleDarkMode,
      setCurrentPage,
      isInWishlist
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}
