"use client"

import { useState } from 'react'
import { useStore } from '@/lib/store-context'
import { ZALO_NUMBER } from '@/lib/products'
import { 
  Home, 
  ShoppingBag, 
  HelpCircle, 
  Heart, 
  ArrowLeft, 
  Search, 
  Copy, 
  MousePointer, 
  Send, 
  CheckCircle2,
  MessageCircle,
  Phone,
  Clock,
  Shield,
  Truck,
  CreditCard
} from 'lucide-react'

const steps = [
  {
    number: 1,
    title: "Chon san pham",
    description: "Luot xem va chon san pham ban yeu thich tu cac danh muc. Su dung bo loc de tim kiem nhanh hon.",
    icon: Search,
    color: "from-neon-green to-neon-green/50"
  },
  {
    number: 2,
    title: "Copy ma san pham",
    description: "Nhan vao san pham de xem chi tiet. Ghi nho ma san pham (VD: #HD001) de dat hang.",
    icon: Copy,
    color: "from-neon-orange to-neon-orange/50"
  },
  {
    number: 3,
    title: "Nhan nut 'Mua ngay'",
    description: "Click vao nut 'MUA NGAY QUA ZALO' trong trang chi tiet san pham.",
    icon: MousePointer,
    color: "from-neon-purple to-neon-purple/50"
  },
  {
    number: 4,
    title: "Gui tin nhan Zalo",
    description: "He thong se tu dong dien san thong tin san pham. Ban chi can gui tin nhan va cho tu van.",
    icon: Send,
    color: "from-accent to-accent/50"
  }
]

const benefits = [
  {
    icon: Truck,
    title: "Freeship toan quoc",
    description: "Mien phi van chuyen cho don hang tren 500k"
  },
  {
    icon: Clock,
    title: "Giao hang nhanh",
    description: "Noi thanh 1-2 ngay, ngoai thanh 3-5 ngay"
  },
  {
    icon: Shield,
    title: "Dam bao chat luong",
    description: "Doi tra trong 7 ngay neu khong vua y"
  },
  {
    icon: CreditCard,
    title: "Thanh toan linh hoat",
    description: "COD hoac chuyen khoan tuy chon"
  }
]

export function GuidePage() {
  const { setCurrentPage, wishlist } = useStore()
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage('shop')}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl md:text-2xl font-bold">
              HUONG DAN MUA HANG
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Mua hang <span className="text-accent">don gian</span> chi voi 4 buoc
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Tai Hoang Ninh Luxury, chung toi mang den trai nghiem mua sam de dang va nhanh chong qua Zalo.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative p-6 bg-card border border-border rounded-2xl transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-accent/10 hover:border-accent ${activeStep === index ? 'scale-105 border-accent shadow-xl shadow-accent/10' : ''}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Step number */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                <step.icon className="w-7 h-7 text-background" />
              </div>

              {/* Step indicator */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="font-display text-lg font-bold">{step.number}</span>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Contact section */}
        <div className="bg-gradient-to-r from-neon-green/10 via-neon-orange/10 to-neon-purple/10 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Lien he dat hang ngay
            </h3>
            <p className="font-body text-muted-foreground">
              Doi ngu tu van san sang ho tro ban 24/7
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href={`https://zalo.me/${ZALO_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold text-lg hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              Chat Zalo ngay
            </a>
            <a
              href={`tel:${ZALO_NUMBER}`}
              className="flex items-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-body font-semibold text-lg hover:bg-muted transition-all"
            >
              <Phone className="w-6 h-6" />
              Goi dien: {ZALO_NUMBER}
            </a>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
            Tai sao chon <span className="text-accent">Hoang Ninh Luxury?</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 bg-card border border-border rounded-2xl text-center hover:border-accent transition-colors"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-body font-semibold mb-1">{benefit.title}</h4>
                <p className="font-body text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
            Cau hoi thuong gap
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Lam sao de biet san pham con hang?",
                a: "Moi san pham deu hien thi trang thai 'Con hang' hoac 'Het hang'. San pham sap het se co canh bao 'Chi con X san pham'."
              },
              {
                q: "Toi co the doi tra san pham khong?",
                a: "Co! Ban co 7 ngay de doi tra neu san pham khong vua y, con nguyen tem mac va chua qua su dung."
              },
              {
                q: "Phi ship la bao nhieu?",
                a: "Mien phi ship cho don hang tren 500k. Don hang duoi 500k phi ship tu 20-40k tuy khu vuc."
              },
              {
                q: "Co ho tro tra gop khong?",
                a: "Hien tai chung toi ho tro thanh toan COD (nhan hang tra tien) hoac chuyen khoan truoc."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="p-6 bg-card border border-border rounded-2xl"
              >
                <h4 className="font-body font-semibold mb-2 flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="font-body text-sm text-muted-foreground pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-4 bg-gradient-to-r from-neon-green via-neon-orange to-neon-purple text-background font-body font-semibold text-lg rounded-full hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-105"
          >
            Bat dau mua sam ngay
          </button>
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-40">
        <div className="flex items-center justify-around py-2">
          <button 
            onClick={() => setCurrentPage('landing')}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-body">Trang chu</span>
          </button>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs font-body">San pham</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 p-2 text-accent"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-body">Huong dan</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs font-body">Yeu thich</span>
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-2 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  )
}
