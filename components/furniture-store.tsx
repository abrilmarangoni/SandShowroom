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
      className={`bg-[#f0ede8] backdrop-blur-sm transition-all duration-700 ease-out ${className}`}
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

const featuredProducts = [
  { id: 7, name: "Nesting Table", price: 1400, image: "/show7.png" },
  { id: 5, name: "Calm Sofa", price: 4800, image: "/show5.png" },
  { id: 4, name: "Minimal Vessel", price: 680, image: "/show4.png" },
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
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-[5%] pt-4 pb-2">
        <CarvedHeader className="rounded-2xl px-8 py-3 flex items-center justify-between">
            <div className="text-2xl font-serif tracking-tight text-[#3d3835]">SAND</div>
            <nav className="hidden md:flex gap-8 text-sm text-[#3d3835]">
              <Link href="/" className="hover:opacity-70 transition-opacity">Shop</Link>
              <Link href="/collection" className="hover:opacity-70 transition-opacity">Collections</Link>
              <button className="hover:opacity-70 transition-opacity">About</button>
            </nav>
            <Link
              href="/cart"
              className="bg-[#e8e4df]/80 text-[#3d3835] p-3 rounded-xl transition-all hover:translate-y-[-2px] hover:brightness-105 flex items-center justify-center relative"
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

      {/* Hero Background Section */}
      <div 
        className="relative min-h-screen pt-24"
        style={{
          backgroundImage: "url('/back3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-start justify-center pt-16 relative z-10">
          <div className="text-center px-4">
            <h1 className="text-6xl md:text-8xl font-serif mb-6 text-[#3d3835] leading-tight text-balance">
              Minimal forniture that allow space to remain open and calm.
            </h1>
            <p className="text-lg md:text-xl text-[#5d5855] max-w-2xl mx-auto leading-relaxed mb-12">
              Shaped by proportion, material,
              <br />
              and the absence of excess.
            </p>
            <Link 
              href="/collection" 
              className="inline-flex items-center gap-3 bg-[#f0ede8] rounded-xl px-10 py-4 transition-all hover:translate-y-[-2px] hover:brightness-105"
              style={{
                boxShadow: "8px 8px 16px rgba(0,0,0,0.15), -8px -8px 16px rgba(255,255,255,0.7)",
              }}
            >
              <span className="text-[#3d3835] text-lg font-medium tracking-wide">Showroom</span>
              <ArrowRight className="w-5 h-5 text-[#3d3835]" />
            </Link>
          </div>
        </section>
      </div>

      {/* Product Grid */}
      <section className="w-[90%] mx-auto mb-48 pt-48">
        <h2 className="text-4xl font-serif mb-16 text-[#3d3835] text-center">Featured Pieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredProducts.map((product, i) => (
            <div key={product.id}>
              <CarvedBox className="rounded-[32px] p-10 mb-4" delay={i * 150}>
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
                    className="bg-[#f0ede8] text-[#3d3835] px-8 py-3 rounded-xl text-sm font-medium transition-all hover:translate-y-[-2px] hover:brightness-105"
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
          <Link href="/collection" className="group flex items-center gap-2 bg-[#f0ede8] rounded-xl px-6 py-3 shadow-[4px_4px_10px_rgba(0,0,0,0.12),-4px_-4px_10px_rgba(255,255,255,0.7)] hover:shadow-[3px_3px_8px_rgba(0,0,0,0.12),-3px_-3px_8px_rgba(255,255,255,0.7)] transition-all hover:brightness-105">
            <span className="text-[#3d3835] text-sm font-medium tracking-wide">View Full Collection</span>
            <ArrowRight className="w-4 h-4 text-[#3d3835] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="w-[90%] mx-auto mb-48">
        <CarvedBox className="rounded-[32px] p-16 md:p-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-8 text-[#3d3835]">Crafted with Purpose</h2>
            <p className="text-lg text-[#5d5855] mb-12 leading-relaxed">
              Every piece is thoughtfully designed and meticulously crafted using sustainably sourced materials. We
              believe furniture should last generations, not seasons.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
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
      <section className="w-[90%] mx-auto mb-48">
        <CarvedBox className="rounded-[32px] p-16 text-center">
          <h2 className="text-4xl font-serif mb-4 text-[#3d3835]">Visit Our Showroom</h2>
          <p className="text-lg text-[#5d5855] mb-8 leading-relaxed max-w-2xl mx-auto">
            Experience our furniture in person. Book a private consultation with our design team.
          </p>
          <button
            className="bg-[#f0ede8] text-[#3d3835] px-12 py-4 rounded-xl text-base font-medium transition-all hover:translate-y-[-2px] hover:brightness-105"
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
    </div>
  )
}
