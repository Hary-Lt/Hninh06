"use client";

import { useEffect, useState } from "react";
import {
  X,
  Heart,
  ExternalLink,
  ShoppingCart,
  Flame,
  Zap,
  Star,
  Eye,
  Users,
  ArrowLeft,
  Facebook,
} from "lucide-react";
import {
  type Product,
  formatPrice,
  getZaloLink,
  getFacebookLink,
} from "@/lib/products";
import { useStore } from "@/lib/store-context";
import { ImageGallery } from "./image-gallery";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { toggleWishlist, isInWishlist } = useStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [recentBuyers, setRecentBuyers] = useState(0);

  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Random FOMO numbers
      setViewers(Math.floor(Math.random() * 25) + 10);
      setRecentBuyers(Math.floor(Math.random() * 8) + 2);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !product) return null;

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm transition-opacity duration-200 ${isAnimating ? "opacity-100" : "opacity-0"}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-5xl max-h-[90vh] bg-card rounded-xl overflow-hidden shadow-2xl border border-border transition-all duration-200 ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        {/* Back button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-2 bg-background/90 hover:bg-background rounded-lg transition-colors text-sm font-body shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lai
        </button>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-background/90 hover:bg-background rounded-full transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
          {/* Image section with gallery */}
          <div className="relative w-full md:w-1/2 bg-secondary">
            <ImageGallery
              mainImage={product.image}
              colorVariants={product.images}
              productName={product.name}
            />

            {/* Badges */}
            <div className="absolute top-14 left-4 flex flex-col gap-2 z-10">
              {product.isNew && (
                <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-body font-semibold rounded flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3" /> MOI
                </span>
              )}
              {product.isHot && (
                <span className="px-2 py-1 bg-neon-orange text-background text-xs font-body font-semibold rounded flex items-center gap-1 shadow-md">
                  <Flame className="w-3 h-3" /> HOT
                </span>
              )}
              {product.isSale && discount > 0 && (
                <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-body font-semibold rounded flex items-center gap-1 shadow-md">
                  <Zap className="w-3 h-3" /> -{discount}%
                </span>
              )}
            </div>

            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
                <span className="px-4 py-2 bg-muted text-muted-foreground font-body font-bold text-lg rounded-lg">
                  HET HANG
                </span>
              </div>
            )}
          </div>

          {/* Info section */}
          <div className="w-full md:w-1/2 p-5 md:p-6 flex flex-col">
            {/* Product code */}
            <span className="text-xs font-mono text-muted-foreground">
              Ma san pham: #{product.code}
            </span>

            {/* Product name */}
            <h2 className="font-body text-xl md:text-2xl font-bold text-card-foreground mt-2">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-center gap-3 mt-3">
              <span className="font-body font-bold text-2xl text-accent">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="font-body text-lg text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Stock status */}
            <div className="mt-4 p-3 rounded-xl bg-secondary border border-border">
              {isLowStock ? (
                <div className="flex items-center gap-2 text-destructive">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="font-body font-semibold text-sm">
                    Chi con {product.stock} san pham!
                  </span>
                </div>
              ) : isOutOfStock ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="font-body font-semibold text-sm">
                    Tam het hang
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-accent">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="font-body font-semibold text-sm">
                    Con hang ({product.stock} san pham)
                  </span>
                </div>
              )}
            </div>

            {/* FOMO indicators */}
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary rounded-lg border border-border">
                <Eye className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-body">
                  {viewers} nguoi dang xem
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary rounded-lg border border-border">
                <Users className="w-3.5 h-3.5 text-neon-orange" />
                <span className="text-xs font-body">
                  {recentBuyers} vua them vao gio
                </span>
              </div>
            </div>

            {/* Category */}
            <div className="mt-3">
              <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-body rounded-full">
                {product.category}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-auto pt-5">
              {/* Buy buttons row */}
              <div className="flex gap-3">
                {/* Zalo button */}
                <a
                  href={
                    isOutOfStock ? "#" : getZaloLink(product.code, product.name)
                  }
                  target={isOutOfStock ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-body font-semibold text-sm transition-all ${isOutOfStock ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-[#0068FF] text-white hover:bg-[#0055cc] hover:shadow-lg hover:scale-[1.02]"}`}
                  onClick={isOutOfStock ? (e) => e.preventDefault() : undefined}
                >
                  <ExternalLink className="w-4 h-4" />
                  {isOutOfStock ? "Het hang" : "MUA QUA ZALO"}
                </a>

                {/* Facebook button */}
                <a
                  href={
                    isOutOfStock
                      ? "#"
                      : getFacebookLink(product.code, product.name)
                  }
                  target={isOutOfStock ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-body font-semibold text-sm transition-all ${isOutOfStock ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-[#1877F2] text-white hover:bg-[#1565c0] hover:shadow-lg hover:scale-[1.02]"}`}
                  onClick={isOutOfStock ? (e) => e.preventDefault() : undefined}
                >
                  <Facebook className="w-4 h-4" />
                  {isOutOfStock ? "Het hang" : "MUA QUA FACEBOOK"}
                </a>
              </div>

              {/* TikTok button */}
              <a
                href="https://www.tiktok.com/@timi998shop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-body font-semibold text-sm transition-all bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                TRUY CẬP VÀO TIKTOK
              </a>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${inWishlist ? "border-destructive bg-destructive/10 text-destructive" : "border-border hover:border-destructive hover:text-destructive"}`}
              >
                <Heart
                  className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
                />
                <span className="font-body text-sm font-medium">
                  {inWishlist ? "Da them vao yeu thich" : "Them vao yeu thich"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
