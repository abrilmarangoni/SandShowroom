"use client"

import { ArrowRight, Calendar, Clock, MapPin, Check, ShoppingCart } from "lucide-react"
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
      className={`bg-[#E9E4DC] backdrop-blur-sm transition-all duration-700 ease-out ${className}`}
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

export function AppointmentPage() {
  const { totalItems } = useCart()
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return {
      value: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
    }
  })

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#E9E4DC] flex items-center justify-center p-4">
        <CarvedBox className="rounded-[32px] p-12 max-w-md w-full text-center" delay={0}>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#3d3835] flex items-center justify-center">
            <Check className="w-8 h-8 text-[#f0ede8]" />
          </div>
          <h1 className="text-2xl font-serif text-[#3d3835] mb-3">Confirmed</h1>
          <p className="text-[#5d5855] mb-6 text-sm">
            We'll see you soon at Sand Showroom.
          </p>
          <div className="text-left space-y-2 mb-8 text-sm">
            <div className="flex items-center gap-3 text-[#3d3835]">
              <Calendar className="w-4 h-4 text-[#5d5855]" />
              <span>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-3 text-[#3d3835]">
              <Clock className="w-4 h-4 text-[#5d5855]" />
              <span>{selectedTime}</span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#3d3835] text-[#f0ede8] px-6 py-3 rounded-xl text-sm font-medium transition-all hover:brightness-110"
          >
            Back to Home
          </Link>
        </CarvedBox>
      </div>
    )
  }

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

      {/* Main Content */}
      <section className="w-[90%] max-w-2xl mx-auto pb-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3d3835] mb-4">
            Book a Visit
          </h1>
          <p className="text-[#5d5855]">
            Experience our collection in person.
          </p>
        </div>

        {/* Step 1: Date */}
        {step === 1 && (
          <CarvedBox className="rounded-[32px] p-8 md:p-10" delay={100}>
            <h2 className="text-lg font-serif text-[#3d3835] mb-6">Select a date</h2>
            <div className="grid grid-cols-7 gap-3 mb-8">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`p-4 rounded-xl text-center transition-all hover:brightness-105 ${
                    selectedDate === d.value 
                      ? "bg-[#3d3835] text-[#f0ede8]" 
                      : "bg-[#E9E4DC] text-[#3d3835]"
                  }`}
                  style={{
                    boxShadow: selectedDate === d.value
                      ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                      : "3px 3px 8px rgba(0, 0, 0, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <span className={`text-xs block mb-1 ${selectedDate === d.value ? "text-[#f0ede8]/70" : "text-[#5d5855]"}`}>
                    {d.day}
                  </span>
                  <span className="text-xl font-medium">{d.date}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!selectedDate}
              className="w-full px-6 py-4 rounded-xl font-medium transition-all bg-[#3d3835] text-[#f0ede8] disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </CarvedBox>
        )}

        {/* Step 2: Time */}
        {step === 2 && (
          <CarvedBox className="rounded-[32px] p-8 md:p-10" delay={100}>
            <button onClick={() => setStep(1)} className="text-sm text-[#5d5855] mb-4 hover:text-[#3d3835] transition-colors">
              ← Back
            </button>
            <h2 className="text-lg font-serif text-[#3d3835] mb-6">Select a time</h2>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 rounded-xl text-center transition-all hover:brightness-105 ${
                    selectedTime === time 
                      ? "bg-[#3d3835] text-[#f0ede8]" 
                      : "bg-[#E9E4DC] text-[#3d3835]"
                  }`}
                  style={{
                    boxShadow: selectedTime === time
                      ? "inset 2px 2px 4px rgba(0, 0, 0, 0.2)"
                      : "3px 3px 8px rgba(0, 0, 0, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={!selectedTime}
              className="w-full px-6 py-4 rounded-xl font-medium transition-all bg-[#3d3835] text-[#f0ede8] disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </CarvedBox>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <CarvedBox className="rounded-[32px] p-8 md:p-10" delay={100}>
            <button onClick={() => setStep(2)} className="text-sm text-[#5d5855] mb-4 hover:text-[#3d3835] transition-colors">
              ← Back
            </button>
            <h2 className="text-lg font-serif text-[#3d3835] mb-6">Your details</h2>
            <div className="space-y-4 mb-8">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 rounded-xl bg-[#E9E4DC] text-[#3d3835] outline-none placeholder:text-[#5d5855]/60"
                style={{
                  boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 rounded-xl bg-[#E9E4DC] text-[#3d3835] outline-none placeholder:text-[#5d5855]/60"
                style={{
                  boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                }}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-4 rounded-xl bg-[#E9E4DC] text-[#3d3835] outline-none placeholder:text-[#5d5855]/60"
                style={{
                  boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
                }}
              />
            </div>

            {/* Summary */}
            <div className="border-t border-[#5d5855]/10 pt-6 mb-6">
              <div className="flex items-center gap-3 text-sm text-[#3d3835] mb-2">
                <Calendar className="w-4 h-4 text-[#5d5855]" />
                <span>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#3d3835] mb-2">
                <Clock className="w-4 h-4 text-[#5d5855]" />
                <span>{selectedTime}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#3d3835]">
                <MapPin className="w-4 h-4 text-[#5d5855]" />
                <span>Sand Showroom, NYC</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.phone}
              className="w-full px-6 py-4 rounded-xl font-medium transition-all bg-[#3d3835] text-[#f0ede8] disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
            >
              Confirm Booking
            </button>
          </CarvedBox>
        )}

        {/* Location */}
        <div className="mt-12 text-center text-sm text-[#5d5855]">
          <MapPin className="w-4 h-4 inline mr-2" />
          123 Design Street, New York, NY 10001
        </div>
      </section>
    </div>
  )
}
