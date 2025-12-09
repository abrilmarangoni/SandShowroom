export function FurnitureStore() {
  return (
    <div className="min-h-screen bg-[#f0ede8]">
      {/* Header */}
      <header className="w-[90%] mx-auto pt-6 mb-12">
        <div
          className="bg-[#f0ede8] rounded-2xl px-8 py-3 flex items-center justify-between"
          style={{
            boxShadow: "inset 3px 3px 8px rgba(0, 0, 0, 0.15), inset -3px -3px 8px rgba(255, 255, 255, 0.7)",
          }}
        >
          <div className="text-2xl font-serif tracking-tight text-[#3d3835]">SAND</div>
          <nav className="hidden md:flex gap-8 text-sm text-[#3d3835]">
            <button className="hover:opacity-70 transition-opacity">Shop</button>
            <button className="hover:opacity-70 transition-opacity">Collections</button>
            <button className="hover:opacity-70 transition-opacity">About</button>
          </nav>
          <button
            className="bg-[#f0ede8] text-[#3d3835] px-8 py-2 rounded-xl text-sm font-medium transition-all hover:translate-y-[-2px]"
            style={{
              boxShadow:
                "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
            }}
          >
            Contact Us
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center mb-16 relative overflow-hidden">
        {/* Decorative carved elements - left side */}
        <div className="absolute left-[8%] top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12">
          <div
            className="w-20 h-20 rounded-md bg-[#f0ede8]"
            style={{
              boxShadow: "inset 3px 3px 10px rgba(0, 0, 0, 0.12), inset -2px -2px 8px rgba(255, 255, 255, 0.8)",
            }}
          />
          <div
            className="w-12 h-12 rounded-md bg-[#f0ede8] ml-10"
            style={{
              boxShadow: "inset 2px 2px 8px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.8)",
            }}
          />
        </div>

        {/* Decorative carved elements - right side */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 items-end">
          <div
            className="w-12 h-12 rounded-md bg-[#f0ede8] mr-10"
            style={{
              boxShadow: "inset 2px 2px 8px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.8)",
            }}
          />
          <div
            className="w-20 h-20 rounded-md bg-[#f0ede8]"
            style={{
              boxShadow: "inset 3px 3px 10px rgba(0, 0, 0, 0.12), inset -2px -2px 8px rgba(255, 255, 255, 0.8)",
            }}
          />
        </div>

        <div className="text-center z-10">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 text-[#3d3835] leading-tight text-balance">
            Made of calm
          </h1>
          <p className="text-lg md:text-xl text-[#5d5855] max-w-2xl mx-auto leading-relaxed">
            Furniture shaped by proportion, material,
            <br />
            and the absence of excess.
          </p>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="w-[90%] mx-auto mb-16">
        <div
          className="bg-[#f0ede8] rounded-[32px] p-12 flex flex-col items-center"
          style={{
            boxShadow: "inset 4px 4px 12px rgba(0, 0, 0, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.7)",
          }}
        >
          <div className="w-full max-w-3xl h-[400px] flex items-center justify-center mb-8">
            <img src="/hero-chair.jpg" alt="Featured furniture piece" className="w-auto h-full object-contain" />
          </div>
          <button
            className="bg-[#f0ede8] text-[#3d3835] px-12 py-4 rounded-xl text-base font-medium transition-all hover:translate-y-[-2px]"
            style={{
              boxShadow:
                "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
            }}
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="w-[90%] mx-auto mb-16">
        <h2 className="text-4xl font-serif mb-8 text-[#3d3835] text-center">Featured Pieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Oslo Lounge Chair",
              price: "$4,200",
              image: "/featured-1.jpg",
            },
            {
              name: "Linear Dining Table",
              price: "$8,500",
              image: "/featured-2.jpg",
            },
            {
              name: "Curve Sofa",
              price: "$12,400",
              image: "/featured-3.jpg",
            },
          ].map((product, i) => (
            <div key={i}>
              <div
                className="bg-[#f0ede8] rounded-[32px] p-8 mb-4"
                style={{
                  boxShadow: "inset 4px 4px 12px rgba(0, 0, 0, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.7)",
                }}
              >
                <div className="w-full h-64 flex items-center justify-center mb-6">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-auto h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-serif text-[#3d3835] mb-2">{product.name}</h3>
                  <p className="text-[#5d5855] mb-4">{product.price}</p>
                  <button
                    className="bg-[#f0ede8] text-[#3d3835] px-8 py-3 rounded-xl text-sm font-medium transition-all hover:translate-y-[-2px]"
                    style={{
                      boxShadow:
                        "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="w-[90%] mx-auto mb-16">
        <div
          className="bg-[#f0ede8] rounded-[32px] p-12 md:p-16"
          style={{
            boxShadow: "inset 4px 4px 12px rgba(0, 0, 0, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.7)",
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-6 text-[#3d3835]">Crafted with Purpose</h2>
            <p className="text-lg text-[#5d5855] mb-8 leading-relaxed">
              Every piece is thoughtfully designed and meticulously crafted using sustainably sourced materials. We
              believe furniture should last generations, not seasons.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-[90%] mx-auto mb-16">
        <div
          className="bg-[#f0ede8] rounded-[32px] p-12 text-center"
          style={{
            boxShadow: "inset 4px 4px 12px rgba(0, 0, 0, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.7)",
          }}
        >
          <h2 className="text-4xl font-serif mb-4 text-[#3d3835]">Visit Our Showroom</h2>
          <p className="text-lg text-[#5d5855] mb-8 leading-relaxed max-w-2xl mx-auto">
            Experience our furniture in person. Book a private consultation with our design team.
          </p>
          <button
            className="bg-[#f0ede8] text-[#3d3835] px-12 py-4 rounded-xl text-base font-medium transition-all hover:translate-y-[-2px]"
            style={{
              boxShadow:
                "4px 4px 12px rgba(0, 0, 0, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.7), inset 1px 1px 2px rgba(255, 255, 255, 0.5)",
            }}
          >
            Book Appointment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-[90%] mx-auto pb-8">
        <div
          className="bg-[#f0ede8] rounded-[32px] px-12 py-8"
          style={{
            boxShadow: "inset 4px 4px 12px rgba(0, 0, 0, 0.15), inset -4px -4px 12px rgba(255, 255, 255, 0.7)",
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
        </div>
      </footer>
    </div>
  )
}
