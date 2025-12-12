"use client"

import { ArrowRight, Check, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useCart } from "./cart-context"

function CarvedBox({ 
  children, 
  className = "", 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number 
}) {
  return (
    <div
      className={`bg-[#E9E4DC] ${className}`}
      style={{
        boxShadow: "inset 4px 4px 12px rgba(0, 0, 0, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.7)",
      }}
    >
      {children}
    </div>
  )
}

function ScrollHeader({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  const [isCarved, setIsCarved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarved(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`transition-all duration-500 ease-out bg-[#E9E4DC] ${className}`}
      style={{
        boxShadow: isCarved 
          ? "inset 4px 4px 12px rgba(0, 0, 0, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.7)"
          : "none",
      }}
    >
      {children}
    </div>
  )
}

const featuredProducts = [
  { id: 7, name: "Nesting Table", price: 1400, image: "/show7.png" },
  { id: 5, name: "Calm Sofa", price: 4800, image: "/show5.png" },
  { id: 4, name: "Minimal Vessel", price: 680, image: "/show4.png" },
]

export function FurnitureStore() {
  const { addToCart, totalItems } = useCart()
  const [addedProduct, setAddedProduct] = useState<string | null>(null)
  const [flyingItem, setFlyingItem] = useState<{ x: number; y: number } | null>(null)
  const cartRef = useRef<HTMLAnchorElement>(null)

  const handleAddToCart = (product: typeof featuredProducts[0], event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const buttonRect = button.getBoundingClientRect()
    const cartRect = cartRef.current?.getBoundingClientRect()
    
    if (cartRect) {
      // Start position (center of button)
      const startX = buttonRect.left + buttonRect.width / 2
      const startY = buttonRect.top + buttonRect.height / 2
      
      setFlyingItem({ x: startX, y: startY })
      
      // Remove flying item after animation
      setTimeout(() => {
        setFlyingItem(null)
        addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
        setAddedProduct(product.name)
      }, 600)
      
      setTimeout(() => setAddedProduct(null), 2600)
    } else {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
      setAddedProduct(product.name)
      setTimeout(() => setAddedProduct(null), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#E9E4DC]">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-[5%] pt-4 pb-2">
        <ScrollHeader className="rounded-2xl px-8 py-3 flex items-center justify-between">
            <div className="text-2xl font-serif tracking-tight text-[#3d3835]">SAND</div>
            <nav className="hidden md:flex gap-4 text-sm text-[#3d3835] items-center">
              <Link 
                href="/" 
                className="px-4 py-2 rounded-xl transition-all"
                style={{
                  boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                }}
              >
                Shop
              </Link>
              <Link href="/collection" className="px-4 py-2 hover:opacity-70 transition-opacity">Collections</Link>
              <button className="px-4 py-2 hover:opacity-70 transition-opacity">About</button>
            </nav>
            <Link
              ref={cartRef}
              href="/cart"
              className="bg-[#E9E4DC]/80 text-[#3d3835] p-3 rounded-xl transition-all hover:translate-y-[-2px] hover:brightness-105 flex items-center justify-center relative"
              style={{
                boxShadow:
                  "4px 4px 12px rgba(0, 0, 0, 0.15), -4px -4px 12px rgba(255, 255, 255, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.4)",
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3d3835] text-[#f0ede8] text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </ScrollHeader>
      </header>

      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: "calc(100vh + 5px)" }}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/back3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E9E4DC]/95 via-[#E9E4DC]/80 to-transparent" />
        
        {/* Bottom fade to blend with next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#E9E4DC] to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32">
          <div className="max-w-2xl">
            {/* Decorative line */}
            <div className="w-16 h-px bg-[#3A362F]/30 mb-12" />
            
            {/* Main Heading */}
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl xl:text-[110px] font-serif leading-[0.92] text-[#3A362F] mb-8"
              style={{
                textShadow: "0 2px 20px rgba(0,0,0,0.08)",
                letterSpacing: "-0.02em",
              }}
            >
              Furniture shaped<br/>
              <span className="text-[#8C857B]">by proportion</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-[#5d5855] font-light tracking-wide leading-relaxed mb-12 max-w-xl">
              Defined by material.<br/>
              Elevated by restraint.
            </p>
            
            {/* Decorative line */}
            <div className="w-24 h-px bg-[#3A362F]/20" />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="w-[90%] mx-auto mb-24 md:mb-48 pt-12 md:pt-24">
        <h2 className="text-2xl md:text-4xl font-serif mb-8 md:mb-16 text-[#3d3835] text-center">Featured Pieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {featuredProducts.map((product, i) => (
            <div key={product.id}>
              <CarvedBox className="rounded-[24px] md:rounded-[32px] p-6 md:p-10 mb-4" delay={i * 150}>
                <div className="w-full h-[200px] md:h-[280px] flex items-center justify-center mb-4 md:mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-auto h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-serif text-[#3d3835] mb-2">{product.name}</h3>
                  <p className="text-[#5d5855] mb-4">${product.price.toLocaleString()}</p>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="bg-[#E9E4DC] text-[#3d3835] px-8 py-3 rounded-xl text-sm font-medium transition-all hover:translate-y-[-2px] hover:brightness-105"
                    style={{
                      boxShadow:
                        "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    Add to Cart
                  </button>
                  <Link 
                    href={`/product/${product.id}`}
                    className="block mt-4 text-sm text-[#5d5855] hover:text-[#3d3835] hover:translate-y-[-1px] transition-all underline-offset-4 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </CarvedBox>
            </div>
          ))}
        </div>

        {/* View Collection Button */}
        <div className="flex justify-center mt-20">
          <Link href="/collection" className="group flex items-center gap-2 bg-[#E9E4DC] rounded-xl px-6 py-3 shadow-[4px_4px_10px_rgba(0,0,0,0.12),-4px_-4px_10px_rgba(255,255,255,0.7)] hover:shadow-[3px_3px_8px_rgba(0,0,0,0.12),-3px_-3px_8px_rgba(255,255,255,0.7)] transition-all hover:brightness-105">
            <span className="text-[#3d3835] text-sm font-medium tracking-wide">View Full Collection</span>
            <ArrowRight className="w-4 h-4 text-[#3d3835] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="w-[90%] mx-auto mb-24 md:mb-48">
        <CarvedBox className="rounded-[24px] md:rounded-[32px] p-8 md:p-16 lg:p-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-serif mb-6 md:mb-8 text-[#3d3835]">Crafted with Purpose</h2>
            <p className="text-base md:text-lg text-[#5d5855] mb-8 md:mb-12 leading-relaxed">
              Every piece is thoughtfully designed and meticulously crafted using sustainably sourced materials. We
              believe furniture should last generations, not seasons.
            </p>
            <div className="grid grid-cols-3 gap-4 md:gap-12 mt-8 md:mt-16">
              <div>
                <div className="text-3xl font-serif mb-2 text-[#3d3835]">15+</div>
                <div className="text-sm text-[#5d5855]">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-serif mb-2 text-[#3d3835]">100%</div>
                <div className="text-sm text-[#5d5855]">Sustainable Wood</div>
              </div>
              <div>
                <div className="text-3xl font-serif mb-2 text-[#3d3835]">2,000+</div>
                <div className="text-sm text-[#5d5855]">Happy Homes</div>
              </div>
            </div>
          </div>
        </CarvedBox>
      </section>

      {/* CTA Section */}
      <section className="w-[90%] mx-auto mb-24 md:mb-48">
        <CarvedBox className="rounded-[24px] md:rounded-[32px] p-8 md:p-16 text-center">
          <h2 className="text-2xl md:text-4xl font-serif mb-4 text-[#3d3835]">Visit Our Showroom</h2>
          <p className="text-lg text-[#5d5855] mb-8 leading-relaxed max-w-2xl mx-auto">
            Experience our furniture in person. Book a private consultation with our design team.
          </p>
          <Link
            href="/appointment"
            className="inline-block bg-[#E9E4DC] text-[#3d3835] px-12 py-4 rounded-xl text-base font-medium transition-all hover:translate-y-[-2px] hover:brightness-105"
            style={{
              boxShadow:
                "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
            }}
          >
            Book Appointment
          </Link>
        </CarvedBox>
      </section>

      {/* Footer */}
      <footer className="w-[90%] mx-auto pb-16 pt-8">
        <CarvedBox className="rounded-[32px] px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-serif text-[#3d3835]">SAND</div>
            <div className="flex gap-8 text-sm text-[#5d5855]">
              <button className="hover:text-[#3d3835] transition-colors">Instagram</button>
              <button className="hover:text-[#3d3835] transition-colors">Pinterest</button>
              <button className="hover:text-[#3d3835] transition-colors">Contact</button>
            </div>
            <div className="text-sm text-[#5d5855]">© 2025 Sand Studio</div>
          </div>
          <div className="mt-4 text-center text-xs text-[#8d8885]">
            made by abie marangoni
          </div>
        </CarvedBox>
      </footer>

      {/* Added to Cart Toast */}
      {addedProduct && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div 
            className="flex items-center gap-3 bg-[#3d3835] text-[#f0ede8] px-6 py-4 rounded-xl"
            style={{
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Check className="w-5 h-5" />
            <span>{addedProduct} added to cart</span>
          </div>
        </div>
      )}

      {/* Flying Cart Animation */}
      {flyingItem && cartRef.current && (
        <div
          className="fixed z-[100] pointer-events-none"
          style={{
            left: flyingItem.x,
            top: flyingItem.y,
            animation: "flyToCart 0.6s ease-in-out forwards",
            ["--target-x" as string]: `${cartRef.current.getBoundingClientRect().left + cartRef.current.getBoundingClientRect().width / 2 - flyingItem.x}px`,
            ["--target-y" as string]: `${cartRef.current.getBoundingClientRect().top + cartRef.current.getBoundingClientRect().height / 2 - flyingItem.y}px`,
          }}
        >
          <div 
            className="w-4 h-4 rounded-full bg-[#3d3835]"
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes flyToCart {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(
              calc(var(--target-x) * 0.5 - 50%), 
              calc(var(--target-y) * 0.5 - 100px)
            ) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(var(--target-x) - 50%), 
              calc(var(--target-y) - 50%)
            ) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
