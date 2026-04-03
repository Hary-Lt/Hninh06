"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUp,
  Home,
  ShoppingBag,
  HelpCircle,
  Moon,
  Sun,
  Heart,
  Clock,
} from "lucide-react";
import {
  products,
  categories,
  type Product,
  vietnameseNames,
  formatPrice,
} from "@/lib/products";
import { useStore } from "@/lib/store-context";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { WishlistModal } from "./wishlist-modal";

export function ShopPage() {
  const {
    isDarkMode,
    toggleDarkMode,
    setCurrentPage,
    wishlist,
    recentlyViewed,
  } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 15,
    seconds: 33,
  });
  const [showWishlist, setShowWishlist] = useState(false);

  // Countdown timer for sale
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Random purchase notifications
  useEffect(() => {
    const showNotification = () => {
      const randomName =
        vietnameseNames[Math.floor(Math.random() * vietnameseNames.length)];
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      setNotification(`${randomName} vua mua ${randomProduct.name}`);
      setTimeout(() => setNotification(null), 4000);
    };

    const interval = setInterval(showNotification, 15000);
    // Show first notification after 5 seconds
    const timeout = setTimeout(showNotification, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  // Group products
  const newDropProducts = filteredProducts.filter((p) => p.isNew).slice(0, 100);
  const bestSellerProducts = filteredProducts.filter(
    (p) => p.isHot && !p.isNew,
  );
  const limitedProducts = filteredProducts.filter(
    (p) => p.stock > 0 && p.stock <= 5,
  );
  const allOtherProducts = filteredProducts.filter(
    (p) => !p.isNew && !(p.isHot && !p.isNew) && p.stock > 5,
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.code.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .slice(0, 5);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top announcement bar - Sale countdown only */}
      <div className="bg-foreground text-background py-2.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          <span className="mx-8 font-body font-medium flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" /> FLASH SALE ket thuc sau:{" "}
            {String(countdown.hours).padStart(2, "0")}:
            {String(countdown.minutes).padStart(2, "0")}:
            {String(countdown.seconds).padStart(2, "0")}
          </span>
          <span className="mx-8 font-body font-medium flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" /> FLASH SALE ket thuc sau:{" "}
            {String(countdown.hours).padStart(2, "0")}:
            {String(countdown.minutes).padStart(2, "0")}:
            {String(countdown.seconds).padStart(2, "0")}
          </span>
          <span className="mx-8 font-body font-medium flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" /> FLASH SALE ket thuc sau:{" "}
            {String(countdown.hours).padStart(2, "0")}:
            {String(countdown.minutes).padStart(2, "0")}:
            {String(countdown.seconds).padStart(2, "0")}
          </span>
          <span className="mx-8 font-body font-medium flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" /> FLASH SALE ket thuc sau:{" "}
            {String(countdown.hours).padStart(2, "0")}:
            {String(countdown.minutes).padStart(2, "0")}:
            {String(countdown.seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <h1
              className="font-body text-lg md:text-xl font-bold cursor-pointer hover:text-accent transition-colors"
              onClick={() => setCurrentPage("landing")}
            >
              <span className="hidden md:inline">HOANG NINH</span>
              <span className="md:hidden">HN</span>
              <span className="text-accent">.</span>
            </h1>

            {/* Search bar */}
            <div className="flex-1 max-w-xl relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tim kiem san pham..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 bg-secondary text-foreground rounded-xl border border-border focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 font-body text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search suggestions */}
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
                  {searchSuggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setSearchQuery("");
                      }}
                      className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-secondary transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden shrink-0">
                        <img
                          src={product.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm truncate">
                          {product.name}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          #{product.code}
                        </p>
                      </div>
                      <span className="font-body text-sm font-semibold text-accent">
                        {formatPrice(product.price)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-secondary rounded-xl transition-colors md:hidden"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-secondary rounded-xl transition-colors"
                title={isDarkMode ? "Che do sang" : "Che do toi"}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setShowWishlist(true)}
                className="relative p-2 hover:bg-secondary rounded-xl transition-colors"
                title="San pham yeu thich"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-3 -mx-4 px-4 overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-xl font-body text-sm whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-foreground text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price filter (desktop) */}
          <div
            className={`mt-3 p-3 bg-secondary rounded-xl ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-body text-sm font-medium">
                Loc theo gia:
              </span>
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="flex-1 accent-accent h-1.5"
                />
                <span className="font-body text-sm whitespace-nowrap min-w-[140px]">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 1000000]);
                  setSearchQuery("");
                }}
                className="px-3 py-1.5 bg-muted hover:bg-border rounded-xl font-body text-sm transition-colors"
              >
                Xoa bo loc
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-5">
        {/* NEW DROP Section */}
        {newDropProducts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-body text-xl md:text-2xl font-bold">
                NEW DROP
              </h2>
              <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-body font-semibold rounded">
                Moi
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {newDropProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* BEST SELLER Section */}
        {bestSellerProducts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-body text-xl md:text-2xl font-bold">
                BEST SELLER
              </h2>
              <span className="px-2 py-0.5 bg-neon-orange text-background text-xs font-body font-semibold rounded">
                Hot
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {bestSellerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* LIMITED Section */}
        {limitedProducts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-body text-xl md:text-2xl font-bold">
                LIMITED
              </h2>
              <span className="px-2 py-0.5 bg-destructive text-destructive-foreground text-xs font-body font-semibold rounded">
                Sap het
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {limitedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products Section */}
        {allOtherProducts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-body text-xl md:text-2xl font-bold">
                TAT CA SAN PHAM
              </h2>
              <span className="text-muted-foreground font-body text-sm">
                ({allOtherProducts.length})
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {allOtherProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-body text-lg font-bold mb-2">
              Khong tim thay san pham
            </h3>
            <p className="font-body text-muted-foreground text-sm mb-4">
              Thu thay doi bo loc hoac tim kiem khac
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange([0, 1000000]);
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-foreground text-background rounded-xl font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Xoa bo loc
            </button>
          </div>
        )}
      </main>

      {/* Purchase notification popup */}
      {notification && (
        <div className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-72 bg-card border border-border rounded-xl shadow-xl p-3 animate-slide-up z-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-accent" />
            </div>
            <p className="font-body text-xs flex-1 line-clamp-2">
              {notification}
            </p>
          </div>
        </div>
      )}

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 md:bottom-6 right-4 p-2.5 bg-foreground text-background rounded-xl shadow-lg hover:bg-accent transition-colors z-40"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-40">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setCurrentPage("landing")}
            className="flex flex-col items-center gap-0.5 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-body">Trang chu</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 p-2 text-accent">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px] font-body">San pham</span>
          </button>
          <button
            onClick={() => setCurrentPage("guide")}
            className="flex flex-col items-center gap-0.5 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-[10px] font-body">Huong dan</span>
          </button>
          <button
            onClick={() => setShowWishlist(true)}
            className="flex flex-col items-center gap-0.5 p-2 text-muted-foreground hover:text-foreground transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            <span className="text-[10px] font-body">Yeu thich</span>
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-3 w-3.5 h-3.5 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Product modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Wishlist modal */}
      <WishlistModal
        isOpen={showWishlist}
        onClose={() => setShowWishlist(false)}
        onSelectProduct={setSelectedProduct}
      />
    </div>
  );
}
