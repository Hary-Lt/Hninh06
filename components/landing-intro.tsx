"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store-context";
import { ChevronRight, Sparkles } from "lucide-react";

export function LandingIntro() {
  const { setCurrentPage } = useStore();
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 500);
    const timer2 = setTimeout(() => setShowSubtext(true), 1500);
    const timer3 = setTimeout(() => setShowButton(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleEnter = () => {
    setCurrentPage("shop");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-background via-secondary to-background" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating neon orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-neon-green/20 blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/20 blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-neon-orange/20 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Brand logo/icon */}
        <div
          className={`mb-8 transition-all duration-1000 ${showText ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          <div className="relative">
            <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-accent animate-pulse" />
            <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 bg-accent/30 blur-xl rounded-full" />
          </div>
        </div>

        {/* Main heading with typing effect */}
        <h1
          className={`font-display text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider mb-4 transition-all duration-1000 ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="text-foreground">CHÀO MỪNG ĐẾN VỚI</span>
          <br />
          <span className="bg-gradient-to-r from-neon-green via-neon-orange to-neon-purple bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            HOANG NINH CHRISTIAN DIOR
          </span>
        </h1>

        {/* Subtext */}
        <p
          className={`font-body text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-12 transition-all duration-1000 delay-300 ${showSubtext ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Streetwear đỉnh cao - Chuyên Order Quần Áo - Giày Dép - Phụ Kiện Nam
        </p>

        {/* CTA Button */}
        <button
          onClick={handleEnter}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`group relative overflow-hidden px-8 py-4 md:px-12 md:py-5 bg-primary text-primary-foreground font-body font-semibold text-lg md:text-xl rounded-full transition-all duration-500 ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${isHovering ? "animate-shake scale-105 shadow-2xl" : ""}`}
        >
          {/* Button glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-neon-green via-neon-orange to-neon-purple opacity-0 transition-opacity duration-300 ${isHovering ? "opacity-100" : ""}`}
          />

          {/* Ripple effect container */}
          <span className="relative z-10 flex items-center gap-2">
            Khám phá ngay
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 ${isHovering ? "translate-x-1" : ""}`}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
