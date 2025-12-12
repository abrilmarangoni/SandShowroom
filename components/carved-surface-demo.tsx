import { ChevronRight } from "lucide-react"

export function CarvedSurfaceDemo() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-[90%] mx-auto mt-8 rounded-2xl bg-[#E9E4DC] px-8 py-6 shadow-[inset_6px_6px_16px_rgba(0,0,0,0.12),inset_-3px_-3px_12px_rgba(255,255,255,0.5)]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-[#4a4540] tracking-tight">Design System</h2>

          <button className="group relative flex items-center gap-2 rounded-[32px] bg-[#E9E4DC] px-6 py-3 shadow-[0_10px_20px_rgba(0,0,0,0.15),0_3px_6px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,0.4)] transition-all duration-200 hover:shadow-[0_14px_28px_rgba(0,0,0,0.18),0_5px_10px_rgba(0,0,0,0.12),inset_0_2px_0_rgba(255,255,255,0.5)] hover:brightness-[1.02] active:shadow-[0_5px_10px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]">
            <span className="text-[#4a4540] font-medium text-sm">Explore</span>
            <ChevronRight className="w-4 h-4 text-[#6a6560] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <div className="relative rounded-[32px] bg-[#E9E4DC] p-12 shadow-[inset_6px_6px_16px_rgba(0,0,0,0.12),inset_-3px_-3px_12px_rgba(255,255,255,0.5)]">
            <div className="space-y-6">
              <h1 className="text-4xl font-medium text-[#4a4540] tracking-tight">Get in touch</h1>
              <p className="text-lg text-[#6a6560] leading-relaxed max-w-md">
                We'd love to hear from you. Our team is here to answer any questions you may have.
              </p>
            </div>

            <button className="group relative mt-8 flex items-center gap-3 rounded-[32px] bg-[#E9E4DC] px-8 py-4 shadow-[0_10px_20px_rgba(0,0,0,0.15),0_3px_6px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,0.4)] transition-all duration-200 hover:shadow-[0_14px_28px_rgba(0,0,0,0.18),0_5px_10px_rgba(0,0,0,0.12),inset_0_2px_0_rgba(255,255,255,0.5)] hover:brightness-[1.02] active:shadow-[0_5px_10px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]">
              <span className="text-[#4a4540] font-medium text-base">Contact Us</span>
              <ChevronRight className="w-5 h-5 text-[#6a6560] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
