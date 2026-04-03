"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Heart, Trash2, ExternalLink } from 'lucide-react'
import { products, type Product, formatPrice, getZaloLink } from '@/lib/products'
import { useStore } from '@/lib/store-context'

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct: (product: Product) => void
}

export function WishlistModal({ isOpen, onClose, onSelectProduct }: WishlistModalProps) {
  const { wishlist, toggleWishlist } = useStore()
  const [isAnimating, setIsAnimating] = useState(false)

  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(onClose, 200)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleProductClick = (product: Product) => {
    handleClose()
    setTimeout(() => onSelectProduct(product), 250)
  }

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm transition-opacity duration-200 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`relative w-full max-w-2xl max-h-[85vh] bg-card rounded-xl overflow-hidden shadow-2xl border border-border transition-all duration-200 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-destructive fill-destructive" />
            <h2 className="font-body font-semibold text-lg">San pham yeu thich</h2>
            <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-bold rounded-full">
              {wishlistProducts.length}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)]">
          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-body font-semibold text-lg mb-2">Chua co san pham yeu thich</h3>
              <p className="font-body text-sm text-muted-foreground text-center">
                Nhan vao icon trai tim de them san pham vao danh sach yeu thich
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {wishlistProducts.map(product => (
                <div 
                  key={product.id}
                  className="flex gap-3 p-3 bg-secondary/50 rounded-xl border border-border hover:border-accent/50 transition-colors"
                >
                  {/* Product image */}
                  <div 
                    className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                      sizes="80px"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-muted-foreground">#{product.code}</span>
                    <h4 
                      className="font-body font-medium text-sm text-card-foreground line-clamp-2 cursor-pointer hover:text-accent transition-colors"
                      onClick={() => handleProductClick(product)}
                    >
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-body font-bold text-accent">
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="font-body text-xs text-muted-foreground line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {product.stock === 0 ? (
                        <span className="text-xs text-muted-foreground">Het hang</span>
                      ) : product.stock <= 5 ? (
                        <span className="text-xs text-destructive">Con {product.stock} san pham</span>
                      ) : (
                        <span className="text-xs text-accent">Con hang</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <a
                      href={product.stock === 0 ? '#' : getZaloLink(product.code, product.name)}
                      target={product.stock === 0 ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors ${product.stock === 0 ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-accent text-accent-foreground hover:bg-accent/80'}`}
                      onClick={product.stock === 0 ? (e) => e.preventDefault() : undefined}
                      title="Mua qua Zalo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors"
                      title="Xoa khoi yeu thich"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
