"use client"

import { ArrowRight, ShoppingCart, Trash2 } from "lucide-react"
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
      className={`bg-[#E9E4DC] transition-all duration-700 ease-out ${className}`}
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

export function CartPage() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart()

  return (
    <div className="min-h-screen bg-[#E9E4DC]">
      {/* Header */}
      <header className="w-[90%] mx-auto pt-6 mb-12">
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

      {/* Cart Content */}
      <div className="w-[90%] max-w-6xl mx-auto mb-32">
        <h1 className="text-5xl md:text-6xl font-serif mb-12 text-[#3d3835] text-center">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-[#5d5855] mb-8">Your cart is empty</p>
            <Link
              href="/collection"
              className="inline-flex items-center gap-3 bg-[#E9E4DC] text-[#3d3835] px-8 py-4 rounded-xl font-medium transition-all hover:translate-y-[-2px] hover:brightness-105"
              style={{
                boxShadow:
                  "4px 4px 12px rgba(0, 0, 0, 0.15), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
              }}
            >
              Browse Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, i) => (
                <CarvedBox key={item.id} className="rounded-[32px] p-6" delay={i * 100}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-48 flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-auto h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-serif text-[#3d3835] mb-2">{item.name}</h3>
                        <p className="text-xl text-[#5d5855] mb-4">${item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-[#E9E4DC] text-[#3d3835] w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:translate-y-[-2px] hover:brightness-105"
                            style={{
                              boxShadow:
                                "4px 4px 8px rgba(0, 0, 0, 0.15), -4px -4px 8px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
                            }}
                          >
                            -
                          </button>
                          <span className="text-lg font-medium text-[#3d3835] w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-[#E9E4DC] text-[#3d3835] w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:translate-y-[-2px] hover:brightness-105"
                            style={{
                              boxShadow:
                                "4px 4px 8px rgba(0, 0, 0, 0.15), -4px -4px 8px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-[#5d5855] hover:text-[#3d3835] transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CarvedBox>
              ))}
            </div>

            {/* Checkout Summary */}
            <div className="lg:col-span-1 lg:sticky lg:top-8">
              <CarvedBox className="rounded-[32px] p-8" delay={200}>
                <h2 className="text-2xl font-serif mb-6 text-[#3d3835]">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#5d5855]">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-medium">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-[#5d5855]/20 pt-4 mb-6">
                  <div className="flex justify-between text-xl font-serif text-[#3d3835]">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-[#E9E4DC] text-[#3d3835] px-8 py-4 rounded-xl font-medium transition-all hover:translate-y-[-2px] hover:brightness-105 mb-4 flex items-center justify-center gap-3"
                  style={{
                    boxShadow:
                      "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/collection"
                  className="block text-center text-[#5d5855] hover:text-[#3d3835] transition-colors text-sm"
                >
                  Continue Shopping
                </Link>
              </CarvedBox>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
