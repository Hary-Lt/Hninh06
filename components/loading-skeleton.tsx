"use client"

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[4/5] bg-secondary" />
      
      {/* Info skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-secondary rounded" />
        <div className="h-4 w-full bg-secondary rounded" />
        <div className="h-4 w-3/4 bg-secondary rounded" />
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-secondary rounded" />
          <div className="h-5 w-16 bg-secondary rounded" />
        </div>
        <div className="h-3 w-24 bg-secondary rounded" />
      </div>
    </div>
  )
}

export function ShopPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Banner skeleton */}
      <div className="h-10 bg-secondary animate-pulse" />
      
      {/* Header skeleton */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-secondary rounded animate-pulse" />
            <div className="flex-1 max-w-xl mx-4">
              <div className="h-10 bg-secondary rounded-full animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-secondary rounded-full animate-pulse" />
              <div className="w-10 h-10 bg-secondary rounded-full animate-pulse" />
            </div>
          </div>
          
          {/* Category skeleton */}
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-10 w-20 bg-secondary rounded-full animate-pulse shrink-0" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Products skeleton */}
      <div className="container mx-auto px-4 py-6">
        {/* Section title */}
        <div className="flex gap-3 mb-6">
          <div className="h-8 w-32 bg-secondary rounded animate-pulse" />
          <div className="h-8 w-24 bg-secondary rounded-full animate-pulse" />
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function LandingSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 animate-pulse">
        <div className="w-20 h-20 mx-auto bg-secondary rounded-full" />
        <div className="h-12 w-64 mx-auto bg-secondary rounded" />
        <div className="h-8 w-48 mx-auto bg-secondary rounded" />
        <div className="h-6 w-32 mx-auto bg-secondary rounded" />
        <div className="h-14 w-44 mx-auto bg-secondary rounded-full" />
      </div>
    </div>
  )
}
