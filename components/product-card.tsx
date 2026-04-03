"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Eye, ShoppingCart, Flame, Zap, Star } from "lucide-react";
import { type Product, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store-context";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToRecentlyViewed } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const handleClick = () => {
    addToRecentlyViewed(product.id);
    onSelect(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Random viewers count for FOMO effect
  const viewers = Math.floor(Math.random() * 20) + 5;

  return (
    <div
      className={`group relative bg-card rounded-xl overflow-hidden border border-border transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-accent/5 ${isOutOfStock ? "opacity-60" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Image container - smaller aspect ratio */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          // TỐI ƯU TỐC ĐỘ: Ưu tiên load 6 ảnh đầu tiên
          priority={product.id <= 6}
          // TỐI ƯU HIỂN THỊ: Hiện khung mờ khi ảnh đang tải thay vì để trắng
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+ZNPQAIXQM485D16AAAAABJRU5ErkJggg=="
          className={`object-cover transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />

        {/* Quick action buttons on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <button
            className="p-2.5 bg-background/90 text-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-colors shadow-md"
            onClick={handleClick}
            title="Xem nhanh"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className={`p-2.5 rounded-full transition-colors shadow-md ${inWishlist ? "bg-destructive text-destructive-foreground" : "bg-background/90 text-foreground hover:bg-destructive hover:text-destructive-foreground"}`}
            onClick={handleWishlistClick}
            title={inWishlist ? "Bo yeu thich" : "Yeu thich"}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Badges - compact */}
        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-1.5 py-0.5 bg-accent text-accent-foreground text-[10px] font-body font-semibold rounded">
              MOI
            </span>
          )}
          {product.isHot && (
            <span className="px-1.5 py-0.5 bg-neon-orange text-background text-[10px] font-body font-semibold rounded flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5" /> HOT
            </span>
          )}
          {product.isSale && (
            <span className="px-1.5 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-body font-semibold rounded">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist indicator - always visible when in wishlist */}
        {inWishlist && !isHovered && (
          <div className="absolute top-1.5 right-1.5">
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <span className="px-2 py-1 bg-muted text-muted-foreground font-body font-semibold text-xs rounded">
              HET HANG
            </span>
          </div>
        )}
      </div>

      {/* Product info - compact */}
      <div className="p-2.5">
        {/* Product code */}
        <span className="text-[10px] font-mono text-muted-foreground">
          #{product.code}
        </span>

        {/* Product name */}
        <h3 className="font-body font-medium text-xs md:text-sm text-card-foreground line-clamp-2 mt-0.5 min-h-[2rem] leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="font-body font-bold text-sm text-accent">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="font-body text-[10px] text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Stock status */}
        <div className="flex items-center justify-between mt-1.5">
          {isLowStock ? (
            <span className="text-[10px] font-body text-destructive">
              Con {product.stock} sp
            </span>
          ) : isOutOfStock ? (
            <span className="text-[10px] font-body text-muted-foreground">
              Het hang
            </span>
          ) : (
            <span className="text-[10px] font-body text-accent">Con hang</span>
          )}
        </div>

        {/* FOMO: Viewers count on hover */}
        {!isOutOfStock && isHovered && (
          <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground animate-slide-up">
            <Eye className="w-2.5 h-2.5" />
            <span>{viewers} dang xem</span>
          </div>
        )}
      </div>
    </div>
  );
}
