"use client"

import { ArrowRight, Check, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useCart } from "./cart-context"

function CarvedBox({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isCarved, setIsCarved] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsCarved(true)
          }, delay)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`bg-[#f0ede8] transition-all duration-700 ease-out ${className}`}
      style={{
        boxShadow: isCarved 
          ? "inset 4px 4px 12px rgba(0, 0, 0, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.7)"
          : "0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(255, 255, 255, 0)",
      }}
    >
      {children}
    </div>
  )
}

function CarvedHeader({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isCarved, setIsCarved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarved(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={ref}
      className={`bg-[#e8e4df]/90 backdrop-blur-sm transition-all duration-700 ease-out ${className}`}
      style={{
        boxShadow: isCarved 
          ? "inset 3px 3px 8px rgba(0, 0, 0, 0.12), inset -3px -3px 8px rgba(255, 255, 255, 0.6)"
          : "0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(255, 255, 255, 0)",
      }}
    >
      {children}
    </div>
  )
}

const featuredProducts = [
  { id: 1, name: "Oslo Lounge Chair", price: 4200, image: "/l1.png" },
  { id: 2, name: "Linear Dining Table", price: 8500, image: "/l4.png" },
  { id: 3, name: "Sculptural Side Table", price: 2100, image: "/l7.png" },
]

export function FurnitureStore() {
  const { addToCart, totalItems } = useCart()
  const [addedProduct, setAddedProduct] = useState<string | null>(null)

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
    setAddedProduct(product.name)
    setTimeout(() => setAddedProduct(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      {/* Hero Background Section */}
      <div 
        className="relative min-h-screen"
        style={{
          backgroundImage: "url('/back3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Header */}
        <header className="w-[90%] mx-auto pt-6 mb-12 relative z-10">
          <CarvedHeader className="rounded-2xl px-8 py-3 flex items-center justify-between">
            <div className="text-2xl font-serif tracking-tight text-[#3d3835]">SAND</div>
            <nav className="hidden md:flex gap-8 text-sm text-[#3d3835]">
              <Link href="/" className="hover:opacity-70 transition-opacity">Shop</Link>
              <Link href="/collection" className="hover:opacity-70 transition-opacity">Collections</Link>
              <button className="hover:opacity-70 transition-opacity">About</button>
            </nav>
            <Link
              href="/cart"
              className="bg-[#e8e4df]/80 text-[#3d3835] p-3 rounded-xl transition-all hover:translate-y-[-2px] flex items-center justify-center relative"
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
          </CarvedHeader>
        </header>

        {/* Hero Section */}
        <section className="min-h-[70vh] flex items-center justify-center relative z-10">
          <div className="text-center px-4">
            <h1 className="text-6xl md:text-8xl font-serif mb-6 text-[#3d3835] leading-tight text-balance">
              Minimal forniture that allow space to remain open and calm.
            </h1>
            <p className="text-lg md:text-xl text-[#5d5855] max-w-2xl mx-auto leading-relaxed">
              Shaped by proportion, material,
              <br />
              and the absence of excess.
            </p>
          </div>
        </section>
      </div>

      {/* Product Grid */}
      <section className="w-[90%] mx-auto mb-32 pt-32">
        <h2 className="text-4xl font-serif mb-8 text-[#3d3835] text-center">Featured Pieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, i) => (
            <div key={product.id}>
              <CarvedBox className="rounded-[32px] p-8 mb-4" delay={i * 150}>
                <div className="w-full h-[280px] flex items-center justify-center mb-6">
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
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#f0ede8] text-[#3d3835] px-8 py-3 rounded-xl text-sm font-medium transition-all hover:translate-y-[-2px]"
                    style={{
                      boxShadow:
                        "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </CarvedBox>
            </div>
          ))}
        </div>

        {/* View Collection Button */}
        <div className="flex justify-center mt-16">
          <Link href="/collection" className="group flex items-center gap-3 bg-[#f0ede8] rounded-xl px-10 py-4 shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.7)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.7)] transition-all">
            <span className="text-[#3d3835] text-lg font-medium tracking-wide">View Full Collection</span>
            <ArrowRight className="w-5 h-5 text-[#3d3835] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="w-[90%] mx-auto mb-32">
        <CarvedBox className="rounded-[32px] p-12 md:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-6 text-[#3d3835]">Crafted with Purpose</h2>
            <p className="text-lg text-[#5d5855] mb-8 leading-relaxed">
              Every piece is thoughtfully designed and meticulously crafted using sustainably sourced materials. We
              believe furniture should last generations, not seasons.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
      <section className="w-[90%] mx-auto mb-32">
        <CarvedBox className="rounded-[32px] p-12 text-center">
          <h2 className="text-4xl font-serif mb-4 text-[#3d3835]">Visit Our Showroom</h2>
          <p className="text-lg text-[#5d5855] mb-8 leading-relaxed max-w-2xl mx-auto">
            Experience our furniture in person. Book a private consultation with our design team.
          </p>
          <button
            className="bg-[#f0ede8] text-[#3d3835] px-12 py-4 rounded-xl text-base font-medium transition-all hover:translate-y-[-2px]"
            style={{
              boxShadow:
                "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
            }}
          >
            Book Appointment
          </button>
        </CarvedBox>
      </section>

      {/* Footer */}
      <footer className="w-[90%] mx-auto pb-8">
        <CarvedBox className="rounded-[32px] px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
    </div>
  )
}
