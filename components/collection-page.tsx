"use client"

import { ArrowRight, Check, ShoppingCart, SlidersHorizontal, X } from "lucide-react"
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

const allProducts = [
  { id: 1, name: "Helix Console", price: 3200, image: "/show1.png", category: "Side Tables", style: "Minimal", color: "Light oak", material: "Solid wood", inStock: true },
  { id: 2, name: "Wave Lounge", price: 2200, image: "/show4.png", category: "Armchairs", style: "Minimal", color: "Off-white", material: "Linen", inStock: true },
  { id: 3, name: "Cloud Chair", price: 2800, image: "/show5.png", category: "Armchairs", style: "Soft curves", color: "Cream", material: "Bouclé", inStock: true },
  { id: 4, name: "Bloom Vessel", price: 380, image: "/show6.png", category: "Decor", style: "Minimal", color: "Warm beige", material: "Ceramic", inStock: true },
  { id: 5, name: "Shell Sofa", price: 4800, image: "/show7.png", category: "Sofas", style: "Soft curves", color: "Cream", material: "Velvet", inStock: true },
  { id: 6, name: "Zen Duo", price: 450, image: "/show11.png", category: "Decor", style: "Minimal", color: "Warm beige", material: "Stone", inStock: true },
  { id: 7, name: "Timber Table", price: 2100, image: "/show10.png", category: "Coffee Tables", style: "Minimal", color: "Light oak", material: "Solid wood", inStock: true },
  { id: 8, name: "Arc Seat", price: 2400, image: "/show13.png", category: "Armchairs", style: "Soft curves", color: "Cream", material: "Bouclé", inStock: true },
  { id: 9, name: "Drop Light", price: 680, image: "/show14.png", category: "Decor", style: "Statement piece", color: "Warm beige", material: "Metal", inStock: true },
  { id: 10, name: "Living Set", price: 6500, image: "/show9.png", category: "Sofas", style: "Scandinavian", color: "Cream", material: "Mixed", inStock: true },
  { id: 11, name: "Zen Duo", price: 520, image: "/show3.png", category: "Decor", style: "Minimal", color: "Warm beige", material: "Stone", inStock: true },
  { id: 12, name: "Hongo Lamp", price: 890, image: "/show2.png", category: "Decor", style: "Statement piece", color: "Cream", material: "Ceramic", inStock: true },
  { id: 13, name: "Nest Chair", price: 2600, image: "/show8.png", category: "Armchairs", style: "Soft curves", color: "Warm beige", material: "Linen", inStock: true },
  { id: 14, name: "Glow Lamp", price: 680, image: "/show12.png", category: "Decor", style: "Minimal", color: "Warm beige", material: "Metal", inStock: true },
  { id: 15, name: "Haven Sofa", price: 5200, image: "/show15.png", category: "Sofas", style: "Warm neutrals", color: "Cream", material: "Linen", inStock: true },
  { id: 16, name: "Oak Chair", price: 1600, image: "/show16.png", category: "Armchairs", style: "Minimal", color: "Light oak", material: "Solid wood", inStock: true },
]

const categories = ["All", "Sofas", "Armchairs", "Coffee Tables", "Side Tables", "Decor"]
const styles = ["Minimal", "Warm neutrals", "Scandinavian", "Soft curves", "Statement piece"]
const colors = ["Cream", "Off-white", "Warm beige", "Taupe", "Light oak"]
const materials = ["Bouclé", "Linen", "Solid wood", "Stone", "Metal", "Glass"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"]

export function CollectionPage() {
  const { addToCart, totalItems } = useCart()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState("Featured")
  const [addedProductId, setAddedProductId] = useState<number | null>(null)

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
    setAddedProductId(product.id)
    setTimeout(() => setAddedProductId(null), 2000)
  }

  const filteredProducts = allProducts.filter(p => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false
    if (selectedStyles.length > 0 && !selectedStyles.includes(p.style)) return false
    if (selectedColors.length > 0 && !selectedColors.includes(p.color)) return false
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(p.material)) return false
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false
    if (inStockOnly && !p.inStock) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price
    if (sortBy === "Price: High to Low") return b.price - a.price
    if (sortBy === "Newest") return b.id - a.id
    return 0
  })

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedStyles([])
    setSelectedColors([])
    setSelectedMaterials([])
    setPriceRange([0, 10000])
    setInStockOnly(false)
  }

  const activeFiltersCount = [
    selectedCategory !== "All" ? 1 : 0,
    selectedStyles.length,
    selectedColors.length,
    selectedMaterials.length,
    inStockOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  const toggleArrayFilter = (arr: string[], value: string, setter: (v: string[]) => void) => {
    if (arr.includes(value)) {
      setter(arr.filter(v => v !== value))
    } else {
      setter([...arr, value])
    }
  }

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      {/* Header */}
      <header className="w-[90%] mx-auto pt-6 mb-24">
        <CarvedHeader className="rounded-2xl px-8 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif tracking-tight text-[#3d3835]">
            SAND
          </Link>
          <nav className="hidden md:flex gap-8 text-sm text-[#3d3835]">
            <Link href="/" className="hover:opacity-70 transition-opacity">Shop</Link>
            <Link href="/collection" className="hover:opacity-70 transition-opacity font-medium">Collections</Link>
            <button className="hover:opacity-70 transition-opacity">About</button>
          </nav>
          <Link
            href="/cart"
            className="bg-[#f0ede8] text-[#3d3835] p-3 rounded-xl transition-all hover:translate-y-[-2px] hover:brightness-105 flex items-center justify-center relative"
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

      {/* Title */}
      <section className="w-[90%] mx-auto mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-[#3d3835] mb-6">
          2026 Collection
        </h1>
        <p className="text-lg text-[#5d5855] max-w-xl mx-auto">
          Curated pieces designed for calm, breathable spaces.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="w-[90%] mx-auto mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 bg-[#f0ede8] text-[#3d3835] px-5 py-3 rounded-xl transition-all hover:translate-y-[-2px] hover:brightness-105"
              style={{
                boxShadow:
                  "4px 4px 12px rgba(0, 0, 0, 0.15), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-[#3d3835] text-[#f0ede8] text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <span className="text-sm text-[#5d5855]">
              {sortedProducts.length} piece{sortedProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#f0ede8] text-[#3d3835] px-4 py-3 rounded-xl border-none outline-none text-sm cursor-pointer"
            style={{
              boxShadow:
                "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
            }}
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-[90%] mx-auto mb-32">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => (
              <CarvedBox key={product.id} className="rounded-[32px] p-8" delay={index * 100}>
                <div className="aspect-square flex items-center justify-center mb-6 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-auto h-[280px] object-contain"
                  />
                  {!product.inStock && (
                    <span className="absolute top-2 left-2 text-xs text-[#5d5855] bg-[#f0ede8] px-3 py-1 rounded-full">
                      Pre-order
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-serif text-[#3d3835] mb-2">{product.name}</h3>
                <p className="text-lg text-[#5d5855] mb-6">${product.price.toLocaleString()}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full px-6 py-4 rounded-xl font-medium transition-all mb-3 flex items-center justify-center gap-2 ${
                    addedProductId === product.id 
                      ? "bg-[#3d3835] text-[#f0ede8]" 
                      : "bg-[#f0ede8] text-[#3d3835] hover:translate-y-[-2px] hover:brightness-105"
                  }`}
                  style={{
                    boxShadow: addedProductId === product.id
                      ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                      : "4px 4px 12px rgba(0, 0, 0, 0.15), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {addedProductId === product.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
                <Link
                  href={`/product/${product.id}`}
                  className="block text-center text-sm text-[#5d5855] hover:text-[#3d3835] hover:translate-y-[-1px] transition-all underline-offset-4 hover:underline"
                >
                  View Details
                </Link>
              </CarvedBox>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-[#3d3835] mb-4">No pieces match these filters.</p>
            <button
              onClick={clearFilters}
              className="text-[#5d5855] hover:text-[#3d3835] underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Back to Home */}
      <section className="w-[90%] mx-auto mb-32 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-[#5d5855] hover:text-[#3d3835] transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-[90%] mx-auto pb-12 text-center">
        <p className="text-sm text-[#5d5855]">made by abie marangoni</p>
      </footer>

      {/* Added to Cart Toast */}
      {addedProductId && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div 
            className="flex items-center gap-3 bg-[#3d3835] text-[#f0ede8] px-6 py-4 rounded-xl"
            style={{
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Check className="w-5 h-5" />
            <span>{allProducts.find(p => p.id === addedProductId)?.name} added to cart</span>
          </div>
        </div>
      )}

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#f0ede8] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif text-[#3d3835]">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 text-[#3d3835] hover:opacity-70"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#3d3835] mb-3">Category</h3>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 rounded-xl text-sm transition-all text-center hover:brightness-105 ${
                        selectedCategory === cat 
                          ? "bg-[#3d3835] text-[#f0ede8]" 
                          : "bg-[#f0ede8] text-[#3d3835]"
                      }`}
                      style={{
                        boxShadow: selectedCategory === cat
                          ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                          : "3px 3px 8px rgba(0, 0, 0, 0.12), -3px -3px 8px rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#3d3835] mb-3">Style</h3>
                <div className="grid grid-cols-2 gap-2">
                  {styles.map(style => (
                    <button
                      key={style}
                      onClick={() => toggleArrayFilter(selectedStyles, style, setSelectedStyles)}
                      className={`px-3 py-2 rounded-xl text-sm transition-all text-center hover:brightness-105 ${
                        selectedStyles.includes(style) 
                          ? "bg-[#3d3835] text-[#f0ede8]" 
                          : "bg-[#f0ede8] text-[#3d3835]"
                      }`}
                      style={{
                        boxShadow: selectedStyles.includes(style)
                          ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                          : "3px 3px 8px rgba(0, 0, 0, 0.12), -3px -3px 8px rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#3d3835] mb-3">Color</h3>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => toggleArrayFilter(selectedColors, color, setSelectedColors)}
                      className={`px-3 py-2 rounded-xl text-sm transition-all text-center hover:brightness-105 ${
                        selectedColors.includes(color) 
                          ? "bg-[#3d3835] text-[#f0ede8]" 
                          : "bg-[#f0ede8] text-[#3d3835]"
                      }`}
                      style={{
                        boxShadow: selectedColors.includes(color)
                          ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                          : "3px 3px 8px rgba(0, 0, 0, 0.12), -3px -3px 8px rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#3d3835] mb-3">Material</h3>
                <div className="grid grid-cols-3 gap-2">
                  {materials.map(mat => (
                    <button
                      key={mat}
                      onClick={() => toggleArrayFilter(selectedMaterials, mat, setSelectedMaterials)}
                      className={`px-3 py-2 rounded-xl text-sm transition-all text-center hover:brightness-105 ${
                        selectedMaterials.includes(mat) 
                          ? "bg-[#3d3835] text-[#f0ede8]" 
                          : "bg-[#f0ede8] text-[#3d3835]"
                      }`}
                      style={{
                        boxShadow: selectedMaterials.includes(mat)
                          ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                          : "3px 3px 8px rgba(0, 0, 0, 0.12), -3px -3px 8px rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#3d3835] mb-3">
                  Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </h3>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#3d3835]"
                />
              </div>

              {/* In Stock */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-5 h-5 rounded accent-[#3d3835]"
                  />
                  <span className="text-sm text-[#3d3835]">In stock only</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#5d5855]/10">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-6 py-3 rounded-xl text-[#3d3835] text-sm font-medium hover:brightness-105 transition-all"
                  style={{
                    boxShadow:
                      "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Clear all
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-[#3d3835] text-[#f0ede8] text-sm font-medium hover:brightness-110 transition-all"
                >
                  Show {sortedProducts.length} results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
