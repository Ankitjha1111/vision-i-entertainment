"use client";
import { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-07",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    client
      .fetch(`*[_type == "project"]{title, slug, mainImage, description}`)
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  return (
    <main className="bg-[#0b0b0b] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center px-6 md:px-8 py-4 bg-[#0a0a0a]/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <a href="/">
          <div className="flex flex-col cursor-pointer group select-none">
            <span className="text-xl md:text-2xl font-black tracking-tight text-white transition duration-300 group-hover:text-[#D4AF37]">
              VISION <span className="text-[#D4AF37]">I</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.28em] text-[#D4AF37] uppercase mt-0.5">
              ENTERTAINMENT
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold">
          <a href="/" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">Home</a>
          <a href="/about" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">About Us</a>
          <a href="/services" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">Services</a>
          <a href="#masterpieces" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">Masterpieces</a>
          <a href="#contact" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">Contact</a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white focus:outline-none p-2"
          aria-label="Toggle Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/10 flex flex-col items-center gap-5 py-6 md:hidden shadow-2xl">
            <a href="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#D4AF37] text-base font-medium">Home</a>
            <a href="/about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#D4AF37] text-base font-medium">About Us</a>
            <a href="/services" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#D4AF37] text-base font-medium">Services</a>
            <a href="#masterpieces" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#D4AF37] text-base font-medium">Masterpieces</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#D4AF37] text-base font-medium">Contact</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-[60vh] md:h-[85vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent z-10" />
          <div className="w-full h-full bg-[url('/concert.jpg')] bg-cover bg-center filter brightness-75" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-black tracking-tight mb-3 text-white drop-shadow-lg">
            VISION I <span className="text-[#D4AF37]">ENTERTAINMENT</span>
          </h1>
          <p className="text-sm md:text-xl text-gray-200 max-w-xl mx-auto font-light drop-shadow">
            Elevating Your Vision. Crafting Unforgettable Experiences.
          </p>
        </div>
      </section>

      {/* Masterpieces Section */}
      <section id="masterpieces" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#D4AF37]">Our Masterpieces: Events in Focus</h2>
          <p className="text-gray-400 text-sm mt-2">Click on any image to view details</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : '';
              return (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  {imageUrl && (
                    <img src={imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-gray-300 text-xs line-clamp-2">{project.description}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400 col-span-full">Loading masterpieces...</p>
          )}
        </div>
      </section>

      {/* Brands We Are Working With */}
      
          {/* Brands We Are Working With */}
      <section className="py-20 bg-[#121212] border-t border-b border-[#2a2a2a] px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-300 to-[#D4AF37]">
            Brands We Are Working With
          </h2>
          <p className="text-gray-400 text-sm mt-4 mb-16 max-w-2xl mx-auto font-light">
            Proudly collaborating with leading brands and enterprises to deliver exceptional live experiences.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-[#D4AF37]/50 transition duration-300 h-28 shadow-lg">
              <img src="/brand1.png" alt="Brand 1" className="max-h-14 w-auto object-contain transition transform hover:scale-105" />
            </div>
            <div className="flex items-center justify-center p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-[#D4AF37]/50 transition duration-300 h-28 shadow-lg">
              <img src="/brand2.png" alt="Brand 2" className="max-h-14 w-auto object-contain transition transform hover:scale-105" />
            </div>
            <div className="flex items-center justify-center p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-[#D4AF37]/50 transition duration-300 h-28 shadow-lg">
              <img src="/brand3.png" alt="Brand 3" className="max-h-14 w-auto object-contain transition transform hover:scale-105" />
            </div>
            <div className="flex items-center justify-center p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-[#D4AF37]/50 transition duration-300 h-28 shadow-lg">
              <img src="/brand4.jpeg" alt="Brand 4" className="max-h-14 w-auto object-contain transition transform hover:scale-105" />
            </div>
            <div className="flex items-center justify-center p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-[#D4AF37]/50 transition duration-300 h-28 shadow-lg">
              <img src="/brand5.png" alt="Brand 5" className="max-h-14 w-auto object-contain transition transform hover:scale-105" />
            </div>
            <div className="flex items-center justify-center p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-[#D4AF37]/50 transition duration-300 h-28 shadow-lg">
              <img src="/brand6.jpeg" alt="Brand 6" className="max-h-14 w-auto object-contain transition transform hover:scale-105" />
            </div>
            <div className="flex items-center justify-center p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-[#D4AF37]/50 transition duration-300 h-28 shadow-lg col-span-2 sm:col-span-1">
              <img src="/brand7.jpeg" alt="Brand 7" className="max-h-14 w-auto object-contain transition transform hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Glassmorphism & Neon Gold Footer */}
      <footer id="contact" className="relative bg-[#070708] border-t border-white/5 py-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[140px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 hover:border-[#D4AF37]/40 transition duration-500 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-block bg-white/[0.03] border border-white/[0.08] px-4 py-2 rounded-xl mb-6">
                <h3 className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-300 to-[#D4AF37]">
                  Let's Connect
                </h3>
              </div>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Creating magical live experiences and grand event productions across locations.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 hover:border-[#D4AF37]/40 transition duration-500 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-block bg-white/[0.03] border border-white/[0.08] px-4 py-2 rounded-xl mb-6">
                <h3 className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-300 to-[#D4AF37]">
                  Contact Us
                </h3>
              </div>
              <div className="space-y-3 text-sm text-gray-300 font-light">
                <p className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                  <span>📧</span>
                  <span>entertainmentvision1@gmail.com</span>
                </p>
                <p className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                  <span>📧</span>
                  <span>arnab@vientertainment.in</span>
                </p>
                <p className="flex items-center space-x-2 text-white font-medium pt-3 border-t border-white/10">
                  <span>📞</span>
                  <span>Arnab Ghosh : +91 9038269681</span>
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 hover:border-[#D4AF37]/40 transition duration-500 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-block bg-white/[0.03] border border-white/[0.08] px-4 py-2 rounded-xl mb-6">
                <h3 className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-300 to-[#D4AF37]">
                  Office Address
                </h3>
              </div>
              <div className="space-y-4 text-sm text-gray-300 font-light leading-relaxed">
                <p className="flex items-start space-x-2">
                  <span className="mt-0.5">🏢</span>
                  <span>795, Raja Ram Mohan Roy Road, Kolkata 700008 (Office)</span>
                </p>
                <p className="flex items-start space-x-2 pt-2 border-t border-white/10">
                  <span className="mt-0.5">📍</span>
                  <span>Yani Sarani, Diamond Park, Joka, Kolkata, West Bengal 700104</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-6 mt-12 border-t border-white/5 text-gray-500 text-xs relative z-10">
          © 2026 Vision I Entertainment. All Rights Reserved.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919038269681"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>

      {/* Image Modal Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(label => null)}
        >
          <div className="relative max-w-4xl w-full">
            <img src={selectedImage} alt="Expanded view" className="w-full max-h-[85vh] object-contain rounded-xl" />
            <button 
              className="absolute top-3 right-3 text-white bg-black/60 rounded-full p-2 hover:bg-[#D4AF37] hover:text-black transition"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}