"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import type { ProductColorVariant } from "@/lib/products";

interface ImageGalleryProps {
  mainImage: string;
  colorVariants?: ProductColorVariant[];
  productName: string;
}

export function ImageGallery({
  mainImage,
  colorVariants,
  productName,
}: ImageGalleryProps) {
  // Gom tất cả ảnh từ các biến thể màu (nếu có)
  const getAllImages = () => {
    let allImages: string[] = [];
    if (colorVariants && colorVariants.length > 0) {
      colorVariants.forEach((variant) => {
        if (variant.urls && variant.urls.length > 0) {
          allImages = [...allImages, ...variant.urls];
        }
      });
    }
    return allImages.length > 0 ? allImages : [mainImage];
  };

  const currentImages = getAllImages();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const currentImage = currentImages[selectedImageIndex] || mainImage;

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedImageIndex < currentImages.length - 1) {
      setSelectedImageIndex((prev) => prev + 1);
    }
    if (isRightSwipe && selectedImageIndex > 0) {
      setSelectedImageIndex((prev) => prev - 1);
    }
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : currentImages.length - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < currentImages.length - 1 ? prev + 1 : 0,
    );
  };

  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[
        selectedImageIndex
      ] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedImageIndex]);

  return (
    <div className="flex flex-col h-full">
      {/* ĐÃ FIX: Dùng chiều cao cố định h-[350px] cho mobile để tránh lỗi sập khung */}
      <div
        ref={imageRef}
        className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] bg-secondary overflow-hidden cursor-pointer shrink-0"
        onClick={() => setIsLightboxOpen(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={currentImage}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        <div className="absolute top-3 right-3 p-2 bg-background/70 rounded-lg pointer-events-none md:block hidden">
          <Expand className="w-4 h-4 text-muted-foreground" />
        </div>

        {currentImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 hover:bg-background rounded-full transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 hover:bg-background rounded-full transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {currentImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/80 rounded-full text-xs font-body shadow-sm">
            {selectedImageIndex + 1} / {currentImages.length}
          </div>
        )}

        {currentImages.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
            {currentImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImageIndex
                    ? "bg-foreground w-4"
                    : "bg-foreground/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {currentImages.length > 1 && (
        <div
          ref={thumbnailsRef}
          className="flex gap-2 p-3 overflow-x-auto hide-scrollbar bg-card border-t border-border shrink-0"
        >
          {currentImages.map((url, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedImageIndex
                  ? "border-accent shadow-md"
                  : "border-transparent hover:border-muted-foreground/50"
              }`}
            >
              <Image
                src={url}
                alt={`${productName} - Anh ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {currentImages.length > 1 && (
            <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-body">
              {selectedImageIndex + 1} / {currentImages.length}
            </div>
          )}

          {currentImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage}
              alt={productName}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {currentImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {currentImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === selectedImageIndex
                      ? "bg-white w-6"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
