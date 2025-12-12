"use client"

import { Check, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

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

export function OrderConfirmationPage() {
  const orderNumber = `SAND-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  
  const orderDetails = {
    items: [
      { name: "Oslo Lounge Chair", price: 4200, quantity: 1 },
      { name: "Linear Dining Table", price: 8500, quantity: 1 },
    ],
    subtotal: 12700,
    shipping: 0,
    total: 12700,
    shippingMethod: "Pick up in Store",
    estimatedDate: "December 15-18, 2024",
  }

  return (
    <div className="min-h-screen bg-[#E9E4DC]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-6 bg-[#E9E4DC]">
        <div className="w-[90%] mx-auto">
          <CarvedHeader className="rounded-2xl px-8 py-3 flex items-center justify-between">
            <Link href="/" className="text-2xl font-serif tracking-tight text-[#3d3835]">
              SAND
            </Link>
            <nav className="hidden md:flex gap-8 text-sm text-[#3d3835]">
              <Link href="/" className="hover:opacity-70 transition-opacity">Shop</Link>
              <Link href="/" className="hover:opacity-70 transition-opacity">Collections</Link>
              <Link href="/" className="hover:opacity-70 transition-opacity">About</Link>
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
            </Link>
          </CarvedHeader>
        </div>
      </header>

      {/* Confirmation Content */}
      <div className="w-[90%] max-w-2xl mx-auto pt-28 min-h-[calc(100vh-112px)] flex flex-col justify-center">
        {/* Success Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div 
            className="w-14 h-14 rounded-full bg-[#E9E4DC] flex items-center justify-center mb-4"
            style={{
              boxShadow:
                "4px 4px 12px rgba(0, 0, 0, 0.15), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
            }}
          >
            <Check className="w-7 h-7 text-[#3d3835]" />
          </div>
          <h1 className="text-3xl font-serif text-[#3d3835] text-center">Thank You!</h1>
          <p className="text-[#5d5855] text-center">Your order has been confirmed</p>
        </div>

        {/* Order Number + Details Combined */}
        <CarvedBox className="rounded-[32px] p-6 mb-6" delay={100}>
          {/* Order Number */}
          <div className="text-center pb-4 border-b border-[#5d5855]/20 mb-4">
            <p className="text-xs text-[#5d5855] mb-1">Order Number</p>
            <p className="text-2xl font-serif text-[#3d3835]">{orderNumber}</p>
          </div>

          {/* Items */}
          <div className="space-y-3 mb-4">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-[#5d5855]/10 last:border-0">
                <div>
                  <p className="text-[#3d3835] font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-[#5d5855]">Qty: {item.quantity}</p>
                </div>
                <p className="text-[#3d3835] font-medium text-sm">${item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-2 pt-3 border-t border-[#5d5855]/20">
            <div className="flex justify-between text-sm text-[#5d5855]">
              <span>Subtotal</span>
              <span>${orderDetails.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-[#5d5855]">
              <span>Shipping</span>
              <span>{orderDetails.shipping === 0 ? "Free" : `$${orderDetails.shipping}`}</span>
            </div>
            <div className="flex justify-between text-lg font-serif text-[#3d3835] pt-2 border-t border-[#5d5855]/20">
              <span>Total</span>
              <span>${orderDetails.total.toLocaleString()}</span>
            </div>
          </div>
        </CarvedBox>

        {/* Shipping Method */}
        <CarvedBox className="rounded-[32px] p-6 mb-6" delay={200}>
          <p className="text-xs text-[#5d5855] mb-1">Shipping Method</p>
          <p className="text-[#3d3835] font-medium text-sm">{orderDetails.shippingMethod}</p>
          <p className="text-xs text-[#5d5855]">Ready: {orderDetails.estimatedDate}</p>
        </CarvedBox>

        {/* Back to Home */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="bg-[#E9E4DC] text-[#3d3835] px-8 py-3 rounded-xl font-medium transition-all hover:translate-y-[-2px] hover:brightness-105 flex items-center justify-center"
            style={{
              boxShadow:
                "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

