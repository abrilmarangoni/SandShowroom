"use client"

import { ArrowRight, Calendar, Clock, MapPin, Check, ShoppingCart } from "lucide-react"
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
  const [isCarved, setIsCarved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarved(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
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

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
]

const visitTypes = [
  { id: "showroom", name: "Showroom Visit", duration: "45 min", description: "Explore our collection in person" },
  { id: "consultation", name: "Design Consultation", duration: "60 min", description: "One-on-one with our design team" },
  { id: "custom", name: "Custom Project", duration: "90 min", description: "Discuss bespoke furniture pieces" },
]

export function AppointmentPage() {
  const { totalItems } = useCart()
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return {
      value: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' })
    }
  })

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-4">
        <CarvedBox className="rounded-[32px] p-12 md:p-16 max-w-lg w-full text-center" delay={0}>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#3d3835] flex items-center justify-center">
            <Check className="w-8 h-8 text-[#f0ede8]" />
          </div>
          <h1 className="text-3xl font-serif text-[#3d3835] mb-4">Appointment Confirmed</h1>
          <p className="text-[#5d5855] mb-8">
            We've sent a confirmation to your email. We look forward to seeing you.
          </p>
          <div className="space-y-3 text-left mb-8">
            <div className="flex items-center gap-3 text-[#3d3835]">
              <Calendar className="w-5 h-5 text-[#5d5855]" />
              <span>{selectedDate}</span>
            </div>
            <div className="flex items-center gap-3 text-[#3d3835]">
              <Clock className="w-5 h-5 text-[#5d5855]" />
              <span>{selectedTime}</span>
            </div>
            <div className="flex items-center gap-3 text-[#3d3835]">
              <MapPin className="w-5 h-5 text-[#5d5855]" />
              <span>Sand Showroom, 123 Design St.</span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#3d3835] text-[#f0ede8] px-8 py-4 rounded-xl font-medium transition-all hover:brightness-110"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </CarvedBox>
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

      {/* Hero */}
      <section className="w-[90%] mx-auto mb-16">
        <CarvedBox className="rounded-[32px] p-12 md:p-16" delay={100}>
          <div className="max-w-2xl">
            <span className="text-sm tracking-[0.3em] text-[#5d5855] uppercase mb-4 block">Visit Us</span>
            <h1 className="text-5xl md:text-6xl font-serif text-[#3d3835] mb-6 leading-tight">
              Book Your Showroom Experience
            </h1>
            <p className="text-lg text-[#5d5855] leading-relaxed">
              Step into our world. Experience the textures, proportions, and craftsmanship that make each piece unique.
            </p>
          </div>
        </CarvedBox>
      </section>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="w-[90%] mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Visit Type */}
            <CarvedBox className="rounded-[32px] p-8" delay={150}>
              <h2 className="text-xl font-serif text-[#3d3835] mb-6">Select Visit Type</h2>
              <div className="space-y-3">
                {visitTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full p-5 rounded-xl text-left transition-all hover:brightness-105 ${
                      selectedType === type.id 
                        ? "bg-[#3d3835] text-[#f0ede8]" 
                        : "bg-[#f0ede8] text-[#3d3835]"
                    }`}
                    style={{
                      boxShadow: selectedType === type.id
                        ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                        : "3px 3px 8px rgba(0, 0, 0, 0.12), -3px -3px 8px rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium mb-1">{type.name}</h3>
                        <p className={`text-sm ${selectedType === type.id ? "text-[#f0ede8]/70" : "text-[#5d5855]"}`}>
                          {type.description}
                        </p>
                      </div>
                      <span className={`text-sm ${selectedType === type.id ? "text-[#f0ede8]/70" : "text-[#5d5855]"}`}>
                        {type.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </CarvedBox>

            {/* Date Selection */}
            <CarvedBox className="rounded-[32px] p-8" delay={200}>
              <h2 className="text-xl font-serif text-[#3d3835] mb-6">Select Date</h2>
              <div className="grid grid-cols-7 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setSelectedDate(d.value)}
                    className={`p-3 rounded-xl text-center transition-all hover:brightness-105 ${
                      selectedDate === d.value 
                        ? "bg-[#3d3835] text-[#f0ede8]" 
                        : "bg-[#f0ede8] text-[#3d3835]"
                    }`}
                    style={{
                      boxShadow: selectedDate === d.value
                        ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                        : "2px 2px 6px rgba(0, 0, 0, 0.1), -2px -2px 6px rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <span className={`text-xs block ${selectedDate === d.value ? "text-[#f0ede8]/70" : "text-[#5d5855]"}`}>
                      {d.day}
                    </span>
                    <span className="text-lg font-medium block">{d.date}</span>
                  </button>
                ))}
              </div>
            </CarvedBox>

            {/* Time Selection */}
            <CarvedBox className="rounded-[32px] p-8" delay={250}>
              <h2 className="text-xl font-serif text-[#3d3835] mb-6">Select Time</h2>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl text-sm transition-all hover:brightness-105 ${
                      selectedTime === time 
                        ? "bg-[#3d3835] text-[#f0ede8]" 
                        : "bg-[#f0ede8] text-[#3d3835]"
                    }`}
                    style={{
                      boxShadow: selectedTime === time
                        ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                        : "2px 2px 6px rgba(0, 0, 0, 0.1), -2px -2px 6px rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </CarvedBox>
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <CarvedBox className="rounded-[32px] p-8 h-full" delay={300}>
              <h2 className="text-xl font-serif text-[#3d3835] mb-6">Your Details</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-[#5d5855] mb-2 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#f0ede8] text-[#3d3835] outline-none"
                    style={{
                      boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#5d5855] mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#f0ede8] text-[#3d3835] outline-none"
                    style={{
                      boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#5d5855] mb-2 block">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#f0ede8] text-[#3d3835] outline-none"
                    style={{
                      boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#5d5855] mb-2 block">Notes (optional)</label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us what you're looking for..."
                    className="w-full p-4 rounded-xl bg-[#f0ede8] text-[#3d3835] outline-none resize-none"
                    style={{
                      boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                    }}
                  />
                </div>

                {/* Location Info */}
                <div className="pt-6 border-t border-[#5d5855]/10">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#5d5855] mt-0.5" />
                    <div>
                      <p className="text-[#3d3835] font-medium">Sand Showroom</p>
                      <p className="text-sm text-[#5d5855]">123 Design Street, Suite 100</p>
                      <p className="text-sm text-[#5d5855]">New York, NY 10001</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || !selectedType || !formData.name || !formData.email || !formData.phone}
                  className="w-full px-8 py-5 rounded-xl text-lg font-medium transition-all hover:brightness-110 bg-[#3d3835] text-[#f0ede8] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  Confirm Appointment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </CarvedBox>
          </div>
        </div>
      </form>

      {/* Footer */}
      <footer className="w-[90%] mx-auto pb-12 text-center">
        <p className="text-sm text-[#5d5855]">made by abie marangoni</p>
      </footer>
    </div>
  )
}

