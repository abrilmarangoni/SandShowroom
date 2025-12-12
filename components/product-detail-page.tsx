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
      className={`bg-[#E9E4DC] transition-all duration-700 ease-out ${className}`}
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
    name: "Helix Console", 
    price: 3200, 
    image: "/show1.png",
    description: "A sculptural console table with an organic flowing base. The curved wooden form creates a striking silhouette.",
    dimensions: "W 150cm × D 45cm × H 85cm",
    materials: "Solid walnut, hand-sculpted, natural oil finish",
    care: "Dust with soft cloth. Apply wood oil every 6 months."
  },
  "2": { 
    id: 2, 
    name: "Wave Lounge", 
    price: 2200, 
    image: "/show4.png",
    description: "A sculptural lounge chair with curved wooden frame and plush white cushioning. Mid-century modern meets comfort.",
    dimensions: "W 70cm × D 85cm × H 75cm",
    materials: "Solid oak frame, high-resilience foam, linen upholstery",
    care: "Vacuum regularly. Professional cleaning recommended yearly."
  },
  "3": { 
    id: 3, 
    name: "Cloud Chair", 
    price: 2800, 
    image: "/show5.png",
    description: "An enveloping armchair with soft, rounded forms. Pure comfort wrapped in creamy bouclé fabric.",
    dimensions: "W 95cm × D 90cm × H 75cm",
    materials: "Steel frame, high-density foam, bouclé upholstery",
    care: "Professional cleaning only. Rotate cushions monthly."
  },
  "4": { 
    id: 4, 
    name: "Bloom Vessel", 
    price: 380, 
    image: "/show6.png",
    description: "An elegant ceramic vase with dried botanical branches. Brings organic beauty to any space.",
    dimensions: "Ø 18cm × H 45cm",
    materials: "Hand-thrown ceramic, matte glaze, preserved botanicals",
    care: "Dust gently. Keep away from direct sunlight."
  },
  "5": { 
    id: 5, 
    name: "Shell Sofa", 
    price: 4800, 
    image: "/show7.png",
    description: "A sculptural sofa with vertical channel tufting. The curved shell form creates a cocooning embrace.",
    dimensions: "W 240cm × D 95cm × H 80cm",
    materials: "Steel frame, high-density foam, velvet upholstery",
    care: "Professional cleaning recommended. Rotate cushions monthly."
  },
  "6": { 
    id: 6, 
    name: "Zen Duo", 
    price: 450, 
    image: "/show11.png",
    description: "A pair of serene Buddha sculptures. Hand-carved with meditative poses that bring tranquility.",
    dimensions: "H 30cm & H 25cm",
    materials: "Natural sandstone, hand-finished",
    care: "Dust gently. Avoid harsh cleaning products."
  },
  "7": { 
    id: 7, 
    name: "Timber Table", 
    price: 2100, 
    image: "/show10.png",
    description: "A minimalist oak coffee table with clean lines. Natural wood grain adds warmth and character.",
    dimensions: "W 140cm × D 60cm × H 40cm",
    materials: "Solid oak, natural oil finish",
    care: "Dust regularly. Apply wood oil every 6 months."
  },
  "8": { 
    id: 8, 
    name: "Arc Seat", 
    price: 2400, 
    image: "/show13.png",
    description: "A compact curved armchair with enveloping form. Perfect for intimate reading corners.",
    dimensions: "W 75cm × D 80cm × H 75cm",
    materials: "Steel frame, molded foam, bouclé fabric",
    care: "Professional cleaning only. Rotate cushions monthly."
  },
  "9": { 
    id: 9, 
    name: "Drop Light", 
    price: 680, 
    image: "/show14.png",
    description: "A sculptural pendant light with organic form. Casts a warm, ambient glow over any space.",
    dimensions: "Ø 45cm × H 50cm",
    materials: "Hand-spun brass, linen diffuser",
    care: "Dust gently. Use compatible LED bulbs only."
  },
  "10": { 
    id: 10, 
    name: "Living Set", 
    price: 6500, 
    image: "/show9.png",
    description: "A curated set combining lounge chair, side table, and ambient light. Complete harmony in one collection.",
    dimensions: "Various",
    materials: "Mixed materials",
    care: "See individual product care instructions."
  },
  "11": { 
    id: 11, 
    name: "Zen Duo", 
    price: 520, 
    image: "/show3.png",
    description: "A pair of serene Buddha sculptures in cream sandstone. Meditative presence for mindful spaces.",
    dimensions: "H 35cm & H 28cm",
    materials: "Natural sandstone, hand-finished",
    care: "Dust gently. Avoid harsh cleaning products."
  },
  "12": { 
    id: 12, 
    name: "Hongo Lamp", 
    price: 890, 
    image: "/show2.png",
    description: "A mushroom-shaped table lamp in warm cream. Soft, diffused light creates a cozy atmosphere.",
    dimensions: "Ø 25cm × H 40cm",
    materials: "Hand-crafted ceramic, integrated LED",
    care: "Dust gently. Use compatible LED bulbs only."
  },
  "13": { 
    id: 13, 
    name: "Nest Chair", 
    price: 2600, 
    image: "/show8.png",
    description: "A round armchair with embracing form and wooden legs. Sink into comfort with style.",
    dimensions: "W 85cm × D 80cm × H 78cm",
    materials: "Solid oak legs, high-density foam, linen upholstery",
    care: "Vacuum regularly. Professional cleaning recommended yearly."
  },
  "14": { 
    id: 14, 
    name: "Glow Lamp", 
    price: 680, 
    image: "/show12.png",
    description: "A minimalist ambient lamp with soft, diffused light. Perfect for creating atmosphere.",
    dimensions: "Ø 30cm × H 40cm",
    materials: "Brass-plated steel, linen diffuser",
    care: "Dust gently. Use compatible LED bulbs only."
  },
  "15": { 
    id: 15, 
    name: "Haven Sofa", 
    price: 5200, 
    image: "/show15.png",
    description: "A spacious lounge sofa designed for ultimate comfort. Perfect for family gatherings and relaxation.",
    dimensions: "W 280cm × D 100cm × H 78cm",
    materials: "Solid oak frame, high-density foam, linen upholstery",
    care: "Professional cleaning recommended. Rotate cushions monthly."
  },
  "16": { 
    id: 16, 
    name: "Oak Chair", 
    price: 1600, 
    image: "/show16.png",
    description: "A minimalist wooden chair with clean lines. Natural wood grain adds warmth and texture.",
    dimensions: "W 50cm × D 55cm × H 80cm",
    materials: "Solid oak, natural oil finish",
    care: "Dust regularly. Apply wood oil every 6 months."
  },
}

export function ProductDetailPage({ id }: { id: string }) {
  const { addToCart, totalItems } = useCart()
  const [added, setAdded] = useState(false)
  const [flyingItem, setFlyingItem] = useState<{ x: number; y: number } | null>(null)
  const cartRef = useRef<HTMLAnchorElement>(null)
  const product = products[id]

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (product) {
      const button = event.currentTarget
      const buttonRect = button.getBoundingClientRect()
      const cartRect = cartRef.current?.getBoundingClientRect()
      
      if (cartRect) {
        const startX = buttonRect.left + buttonRect.width / 2
        const startY = buttonRect.top + buttonRect.height / 2
        
        setFlyingItem({ x: startX, y: startY })
        
        setTimeout(() => {
          setFlyingItem(null)
          addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
          setAdded(true)
        }, 600)
        
        setTimeout(() => setAdded(false), 2600)
      } else {
        addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
      }
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#E9E4DC] flex items-center justify-center">
        <p className="text-[#3d3835]">Product not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E9E4DC]">
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
            ref={cartRef}
            href="/cart"
            className="bg-[#E9E4DC] text-[#3d3835] p-3 rounded-xl transition-all hover:translate-y-[-2px] hover:brightness-105 flex items-center justify-center relative"
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
      <section className="w-[90%] mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Image */}
          <CarvedBox className="rounded-[32px] p-8 flex items-center justify-center" delay={100}>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-auto max-h-[400px] object-contain"
            />
          </CarvedBox>

          {/* Details */}
          <div className="flex flex-col">
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
              onClick={(e) => handleAddToCart(e)}
              className={`w-full px-8 py-5 rounded-xl text-lg font-medium transition-all hover:translate-y-[-2px] hover:brightness-105 mb-12 flex items-center justify-center gap-3 ${
                added ? "bg-[#3d3835] text-[#f0ede8]" : "bg-[#E9E4DC] text-[#3d3835]"
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
      <section className="w-[90%] mx-auto mb-16 text-center">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 text-sm text-[#5d5855] hover:text-[#3d3835] transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Collection
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-[90%] mx-auto pb-8 text-center">
        <p className="text-sm text-[#5d5855]">made by abie marangoni</p>
      </footer>

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

