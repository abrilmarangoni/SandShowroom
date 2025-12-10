"use client"

import { ArrowRight, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

function CarvedInput({ 
  label, 
  placeholder, 
  type = "text",
  className = "",
  onChange
}: { 
  label: string
  placeholder?: string
  type?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-[#5d5855] mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-[#f0ede8] text-[#3d3835] px-4 py-3 rounded-xl border-none outline-none transition-all"
        style={{
          boxShadow:
            "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
        }}
      />
    </div>
  )
}

export function CheckoutPage() {
  const router = useRouter()
  const [pickupInStore, setPickupInStore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  })
  
  const subtotal = 12700
  const shipping = pickupInStore ? 0 : (shippingAddress.address && shippingAddress.city && shippingAddress.zipCode ? 200 : 0)
  const total = subtotal + shipping

  const handleCompleteOrder = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push("/order-confirmation")
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div 
            className="w-32 h-32 rounded-full bg-[#f0ede8] flex items-center justify-center animate-pulse"
            style={{
              boxShadow:
                "inset 4px 4px 12px rgba(0, 0, 0, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.7)",
            }}
          >
            <div 
              className="w-24 h-24 rounded-full bg-[#f0ede8] flex items-center justify-center"
              style={{
                boxShadow:
                  "4px 4px 12px rgba(0, 0, 0, 0.15), -4px -4px 12px rgba(255, 255, 255, 0.7)",
              }}
            >
              <span className="text-2xl font-serif text-[#3d3835] tracking-tight">SAND</span>
            </div>
          </div>
          <p className="text-[#5d5855] text-sm animate-pulse">Processing your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-6 bg-[#f0ede8]">
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
              className="bg-[#f0ede8] text-[#3d3835] p-3 rounded-xl transition-all hover:translate-y-[-2px] flex items-center justify-center relative"
              style={{
                boxShadow:
                  "4px 4px 12px rgba(0, 0, 0, 0.15), -4px -4px 12px rgba(255, 255, 255, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.4)",
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#3d3835] text-[#f0ede8] text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>
          </CarvedHeader>
        </div>
      </header>

      {/* Checkout Content */}
      <div className="w-[90%] max-w-6xl mx-auto mb-32 pt-32">
        <h1 className="text-5xl md:text-6xl font-serif mb-12 text-[#3d3835] text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <CarvedBox className="rounded-[32px] p-8 min-h-[500px] flex flex-col justify-between" delay={0}>
              <div>
                <h2 className="text-3xl font-serif mb-6 text-[#3d3835]">Shipping</h2>
                
                <button
                onClick={() => setPickupInStore(!pickupInStore)}
                className={`w-full mb-6 px-6 py-4 rounded-xl text-base font-medium transition-all hover:translate-y-[-2px] ${
                  pickupInStore 
                    ? "bg-[#3d3835] text-[#f0ede8]" 
                    : "bg-[#f0ede8] text-[#3d3835]"
                }`}
                style={{
                  boxShadow:
                    "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
                }}
              >
                Pick up in Store
              </button>

              {!pickupInStore && (
                <div className="space-y-4">
                  <CarvedInput 
                    label="Full Name" 
                    placeholder="John Doe"
                    onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                  />
                  <CarvedInput 
                    label="Address" 
                    placeholder="123 Main Street"
                    onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <CarvedInput 
                      label="City" 
                      placeholder="New York"
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                    />
                    <CarvedInput 
                      label="ZIP Code" 
                      placeholder="10001"
                      onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                    />
                  </div>
                  <CarvedInput 
                    label="Country" 
                    placeholder="United States"
                    onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                  />
                </div>
              )}
              </div>
            </CarvedBox>

            {/* Payment Method */}
            <CarvedBox className="rounded-[32px] p-8 min-h-[500px] flex flex-col justify-between" delay={100}>
              <div>
                <h2 className="text-3xl font-serif mb-6 text-[#3d3835]">Payment Method</h2>
                
                <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f0ede8] cursor-pointer"
                  style={{
                    boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <input type="radio" name="payment" id="card" defaultChecked className="w-4 h-4" />
                  <label htmlFor="card" className="flex-1 text-[#3d3835] font-medium cursor-pointer">
                    Credit Card
                  </label>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f0ede8] cursor-pointer"
                  style={{
                    boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <input type="radio" name="payment" id="paypal" className="w-4 h-4" />
                  <label htmlFor="paypal" className="flex-1 text-[#3d3835] font-medium cursor-pointer">
                    PayPal
                  </label>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <CarvedInput label="Card Number" placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <CarvedInput label="Expiry Date" placeholder="MM/YY" />
                  <CarvedInput label="CVV" placeholder="123" type="password" />
                </div>
                <CarvedInput label="Cardholder Name" placeholder="John Doe" />
              </div>
              </div>
            </CarvedBox>

            {/* Billing Address */}
            <CarvedBox className="rounded-[32px] p-8 min-h-[500px] flex flex-col justify-between" delay={200}>
              <div>
                <h2 className="text-3xl font-serif mb-6 text-[#3d3835]">Billing Address</h2>
                
                <div className="space-y-4">
                <CarvedInput label="Full Name" placeholder="John Doe" />
                <CarvedInput label="Email" placeholder="john@example.com" type="email" />
                <CarvedInput label="Phone" placeholder="+1 (555) 123-4567" type="tel" />
                <CarvedInput label="Address" placeholder="123 Main Street" />
                <div className="grid grid-cols-2 gap-4">
                  <CarvedInput label="City" placeholder="New York" />
                  <CarvedInput label="ZIP Code" placeholder="10001" />
                </div>
                <CarvedInput label="Country" placeholder="United States" />
              </div>
              </div>
            </CarvedBox>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <CarvedBox className="rounded-[32px] p-10 md:p-12 flex flex-col justify-between min-h-[500px]" delay={300}>
              <div>
                <h2 className="text-4xl font-serif mb-10 text-[#3d3835]">Order Summary</h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-lg text-[#5d5855]">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-[#5d5855]/20 pt-6 mt-6">
                    <div className="flex justify-between text-2xl font-serif text-[#3d3835]">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleCompleteOrder}
                  className="w-full bg-[#f0ede8] text-[#3d3835] px-8 py-5 rounded-xl text-lg font-medium transition-all hover:translate-y-[-2px] mb-6 flex items-center justify-center gap-3"
                  style={{
                    boxShadow:
                      "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Complete Order
                  <ArrowRight className="w-5 h-5" />
                </button>

                <Link
                  href="/cart"
                  className="block text-center text-[#5d5855] hover:text-[#3d3835] transition-colors"
                >
                  Back to Cart
                </Link>
              </div>
            </CarvedBox>
          </div>
        </div>
      </div>
    </div>
  )
}

