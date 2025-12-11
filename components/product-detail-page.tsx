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
      { threshold: 0.1 }
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
  const [isCarved, setIsCarved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarved(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`bg-[#f0ede8] transition-all duration-700 ease-out ${className}`}
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

const products: Record<string, {
  id: number
  name: string
  price: number
  image: string
  description: string
  dimensions: string
  materials: string
  care: string
}> = {
  "1": { 
    id: 1, 
    name: "Luma Curved Sofa", 
    price: 4800, 
    image: "/l1.png",
    description: "A sculptural three-seater sofa with gentle curves that invite relaxation. Upholstered in premium bouclé fabric for a soft, tactile experience.",
    dimensions: "W 240cm × D 95cm × H 75cm",
    materials: "Solid oak frame, high-density foam, bouclé fabric",
    care: "Professional cleaning recommended. Avoid direct sunlight."
  },
  "2": { 
    id: 2, 
    name: "Soft Edge Lounge Chair", 
    price: 2200, 
    image: "/l2.png",
    description: "An organic lounge chair designed for comfort and visual lightness. Perfect for creating intimate conversation areas.",
    dimensions: "W 85cm × D 90cm × H 78cm",
    materials: "Solid walnut frame, foam padding, linen upholstery",
    care: "Spot clean with mild detergent. Rotate cushions regularly."
  },
  "3": { 
    id: 3, 
    name: "Gallery Coffee Table", 
    price: 1800, 
    image: "/l4.png",
    description: "A sculptural coffee table with an organic silhouette. Crafted from solid oak with a natural matte finish.",
    dimensions: "W 120cm × D 70cm × H 35cm",
    materials: "Solid oak, natural oil finish",
    care: "Wipe with dry cloth. Use coasters to prevent marks."
  },
  "4": { 
    id: 4, 
    name: "Calm Side Table", 
    price: 950, 
    image: "/l5.png",
    description: "A minimalist side table in warm travertine. Its simple form adds understated elegance to any space.",
    dimensions: "W 45cm × D 45cm × H 50cm",
    materials: "Natural travertine stone",
    care: "Seal annually. Clean with stone-safe products only."
  },
  "5": { 
    id: 5, 
    name: "Serene Daybed", 
    price: 3400, 
    image: "/l7.png",
    description: "A low-profile daybed that blurs the line between seating and rest. Ideal for reading nooks and sunlit corners.",
    dimensions: "W 200cm × D 85cm × H 40cm",
    materials: "Solid ash frame, natural latex, linen cover",
    care: "Removable cover, machine washable. Flip mattress monthly."
  },
  "6": { 
    id: 6, 
    name: "Arc Floor Lamp", 
    price: 890, 
    image: "/f1.png",
    description: "A sculptural floor lamp with a graceful arc. Casts warm, diffused light perfect for evening ambiance.",
    dimensions: "W 40cm × D 40cm × H 180cm",
    materials: "Brass-plated steel, linen shade",
    care: "Dust regularly. Use compatible bulbs only."
  },
}

export function ProductDetailPage({ id }: { id: string }) {
  const { addToCart, totalItems } = useCart()
  const [added, setAdded] = useState(false)
  const product = products[id]

  const handleAddToCart = () => {
    if (product) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center">
        <p className="text-[#3d3835]">Product not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      {/* Header */}
      <header className="w-[90%] mx-auto pt-6 mb-16">
        <CarvedHeader className="rounded-2xl px-8 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif tracking-tight text-[#3d3835]">
            SAND
          </Link>
          <nav className="hidden md:flex gap-8 text-sm text-[#3d3835]">
            <Link href="/" className="hover:opacity-70 transition-opacity">Shop</Link>
            <Link href="/collection" className="hover:opacity-70 transition-opacity">Collections</Link>
            <button className="hover:opacity-70 transition-opacity">About</button>
          </nav>
          <Link
            href="/cart"
            className="bg-[#f0ede8] text-[#3d3835] p-3 rounded-xl transition-all hover:translate-y-[-2px] flex items-center justify-center relative"
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

      {/* Breadcrumb */}
      <div className="w-[90%] mx-auto mb-12">
        <nav className="text-sm text-[#5d5855]">
          <Link href="/" className="hover:text-[#3d3835] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collection" className="hover:text-[#3d3835] transition-colors">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-[#3d3835]">{product.name}</span>
        </nav>
      </div>

      {/* Product Content */}
      <section className="w-[90%] mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <CarvedBox className="rounded-[32px] p-12" delay={100}>
            <div className="aspect-square flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-auto h-[400px] object-contain"
              />
            </div>
          </CarvedBox>

          {/* Details */}
          <div className="lg:pt-8">
            <h1 className="text-4xl md:text-5xl font-serif text-[#3d3835] mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-[#5d5855] mb-8">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-[#5d5855] leading-relaxed mb-12">
              {product.description}
            </p>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full px-8 py-5 rounded-xl text-lg font-medium transition-all hover:translate-y-[-2px] mb-12 flex items-center justify-center gap-3 ${
                added ? "bg-[#3d3835] text-[#f0ede8]" : "bg-[#f0ede8] text-[#3d3835]"
              }`}
              style={{
                boxShadow: added 
                  ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                  : "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
              }}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  Add to Cart
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Specs */}
            <CarvedBox className="rounded-[24px] p-8" delay={200}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-[#5d5855] mb-1">Dimensions</h3>
                  <p className="text-[#3d3835]">{product.dimensions}</p>
                </div>
                <div className="border-t border-[#5d5855]/10 pt-6">
                  <h3 className="text-sm text-[#5d5855] mb-1">Materials</h3>
                  <p className="text-[#3d3835]">{product.materials}</p>
                </div>
                <div className="border-t border-[#5d5855]/10 pt-6">
                  <h3 className="text-sm text-[#5d5855] mb-1">Care</h3>
                  <p className="text-[#3d3835]">{product.care}</p>
                </div>
              </div>
            </CarvedBox>
          </div>
        </div>
      </section>

      {/* Back to Collection */}
      <section className="w-[90%] mx-auto mb-32 text-center">
        <Link
          href="/collection"
          className="inline-flex items-center gap-3 text-[#5d5855] hover:text-[#3d3835] transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Collection
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-[90%] mx-auto pb-12 text-center">
        <p className="text-sm text-[#5d5855]">made by abie marangoni</p>
      </footer>
    </div>
  )
}

