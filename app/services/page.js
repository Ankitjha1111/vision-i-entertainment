export default function ServicesPage() {
  const servicesList = [
    { id: "01", title: "Corporate Events", image: "/service1.jpg", desc: "Seamless corporate galas and product launches." },
    { id: "02", title: "College Events", image: "/service2.jpg", desc: "High-energy college fests and star nights." },
    { id: "03", title: "School Events", image: "/service3.jpg", desc: "Annual sports days and cultural programs." },
    { id: "04", title: "Fabricated Stall Setup", image: "/services4.jpg", desc: "Custom trade show booths and exhibition architecture." },
    { id: "05", title: "Dealer and Distributer Meet", image: "/services5.jpg", desc: "Professional corporate hosting and rewards meets." },
    { id: "06", title: "RWA Activities", image: "/services6.jpg", desc: "Society festivals and engaging community events." },
    { id: "07", title: "Live Musical Concert", image: "/services7.jpg", desc: "Grand stage setups, acoustics, and star performances." },
    { id: "08", title: "BTL activation", image: "/services8.jpg", desc: "Direct-to-consumer promotional campaigns and roadshows." }
  ];

  return (
    <main className="bg-[#0b0b0b] text-white min-h-screen p-8 md:p-20 font-sans selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="text-[#D4AF37] text-sm hover:underline mb-8 inline-block font-medium">&larr; Back to Home</a>
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#D4AF37] text-center tracking-tight">Our Services</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service) => (
            <div key={service.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-[#D4AF37] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#D4AF37] font-mono text-xs font-bold tracking-widest">{service.id}</span>
                </div>
                <div className="h-40 mb-4 overflow-hidden rounded-xl bg-neutral-800">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-xs font-light leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}