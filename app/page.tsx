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

  useEffect(() => {
    client
      .fetch(`*[_type == "project"]{title, slug, mainImage, description}`)
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  return (
    <main className="bg-[#0b0b0b] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Header / Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-[#0a0a0a]/95 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-900/50">
        <a href="/"> 
          <div className="flex flex-col cursor-pointer group select-none"> 
            <span className="text-xl md:text-2xl font-black tracking-tight text-white transition duration-300 group-hover:text-[#D4AF37] font-sans"> 
              VISION <span className="text-[#D4AF37]">I</span> 
            </span> 
            <span className="text-[9px] font-bold tracking-[0.28em] text-[#D4AF37] uppercase mt-0.5"> 
              ENTERTAINMENT 
            </span> 
          </div> 
        </a> 

        <nav className="hidden md:flex gap-8 text-sm font-semibold"> 
          <a href="/" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">Home</a> 
          <a href="/about" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">About Us</a> 
          <a href="/services" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">Services</a> 
          <a href="#masterpieces" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">Masterpieces</a> 
          <a href="#contact" className="text-gray-300 hover:text-[#D4AF37] transition duration-300 tracking-wide">Contact</a> 
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent z-10" />
          <div className="w-full h-full bg-[url('/concert.jpg')] bg-cover bg-center filter brightness-90 scale-105" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-lg">
            VISION I <span className="text-[#D4AF37]">ENTERTAINMENT</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light drop-shadow">
            Elevating Your Vision. Crafting Unforgettable Experiences.
          </p>
        </div>
      </section>

      {/* Masterpieces Section (Dynamic from Sanity) */}
      <section id="masterpieces" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#D4AF37]">
            Our Masterpieces: Events in Focus
          </h2>
          <p className="text-gray-400 text-sm mt-2">Click on any image to view in full screen.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : '/concert.jpg';
              return (
                <div 
                  key={index}
                  className="rounded-xl overflow-hidden shadow-lg border border-[#2a2a2a] bg-[#161616] cursor-pointer group hover:border-[#D4AF37] transition"
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  <img src={imageUrl} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-500" />
                  <div className="p-4">
                    <h4 className="font-semibold text-[#D4AF37] text-sm">{project.title}</h4>
                    {project.description && (
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">{project.description}</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-full text-center">Loading projects from Sanity Studio...</p>
          )}
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Fullscreen Preview" className="max-w-full max-h-[90vh] rounded-lg object-contain border border-[#D4AF37]/30" />
        </div>
      )}

      {/* Brands We Are Working With */}
      <section className="py-20 bg-[#121212] border-t border-b border-[#2a2a2a] px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-400 to-red-500">
            Brands We Are Working With
          </h2>
          <p className="text-gray-400 text-sm mt-4 mb-16 max-w-2xl mx-auto">
            Proudly collaborating with leading brands and enterprises to deliver exceptional live experiences.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 items-center justify-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center p-4"><img src="/brand1.png" alt="Brand 1" className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-105" /></div>
            <div className="flex items-center justify-center p-4"><img src="/brand2.png" alt="Brand 2" className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-105" /></div>
            <div className="flex items-center justify-center p-4"><img src="/brand3.png" alt="Brand 3" className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-105" /></div>
            <div className="flex items-center justify-center p-4"><img src="/brand4.jpeg" alt="Brand 4" className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-105" /></div>
            <div className="flex items-center justify-center p-4"><img src="/brand5.png" alt="Brand 5" className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-105" /></div>
            <div className="flex items-center justify-center p-4"><img src="/brand6.jpeg" alt="Brand 6" className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-105" /></div>
            <div className="flex items-center justify-center p-4"><img src="/brand7.jpeg" alt="Brand 7" className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-105" /></div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/919038269681" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center transition hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>

        {/* Footer with Boxed Headings Only */}

       {/* Modern Glassmorphism & Neon Gold Footer */}

<footer id="contact" className="relative bg-[#070708] border-t border-white/5 py-20 px-6 mt-28 overflow-hidden">

 

  {/* बैकग्राउंड में हल्का एम्बिएंट गोल्ड ग्लो */}

  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.02] rounded-full blur-[130px] pointer-events-none" />



  {/* मुख्य ग्रिड कंटेनर */}

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">

   

    {/* पहला डिब्बा: Let's Connect */}

    <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]">

      {/* हेडिंग डिब्बा - ग्लास इफ़ेक्ट */}

      <div className="bg-white/[0.03] border border-white/[0.08] px-5 py-3 rounded-xl mb-5">

        <h3 className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-[#D4AF37] to-amber-600">

          Let&apos;s Connect

        </h3>

      </div>

      <p className="text-sm text-gray-400 font-light leading-relaxed">

        Creating magical live experiences and grand event productions across locations.

      </p>

    </div>



    {/* दूसरा डिब्बा: Email & Phone */}

    <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]">

      {/* हेडिंग डिब्बा */}

      <div className="bg-white/[0.03] border border-white/[0.08] px-5 py-3 rounded-xl mb-5">

        <h3 className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-[#D4AF37] to-amber-600">

          Contact Us

        </h3>

      </div>

      <div className="space-y-3 text-sm text-gray-400 font-light">

        <p className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">

          <span>✉️</span> <span>entertainmentvision1@gmail.com</span>

        </p>

        <p className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">

          <span>✉️</span> <span>arnab@vientertainment.in</span>

        </p>

        <p className="flex items-center space-x-2 text-white font-medium pt-2 border-t border-white/5">

          <span>👤</span> <span>Arnab Ghosh : +91 9038269681</span>

        </p>

      </div>

    </div>



    {/* तीसरा डिब्बा: Office Address */}

    <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]">

      {/* हेडिंग डिब्बा */}

      <div className="bg-white/[0.03] border border-white/[0.08] px-5 py-3 rounded-xl mb-5">

        <h3 className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-[#D4AF37] to-amber-600">

          Office Address

        </h3>

      </div>

      <div className="space-y-4 text-sm text-gray-400 font-light leading-relaxed">

        <p className="flex items-start space-x-2">

          <span className="mt-0.5">🏢</span>

          <span>795, Raja Ram Mohan Roy Road, Kolkata 700008 (Office)</span>

        </p>

        <p className="flex items-start space-x-2 pt-2 border-t border-white/5">

          <span>📍</span>

          <span>Yani Sarani, Diamond Park, Joka, Kolkata, West Bengal 700104</span>

        </p>

      </div>

    </div>



  </div>



  {/* सबसे नीचे कॉपीराइट की बारीक पट्टी */}

  <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-white/5 text-center relative z-10">

    <p className="text-center text-xs text-gray-500 tracking-wider">

      © 2026 Vision 1 Entertainment. All Rights Reserved.

    </p>

  </div>

</footer>

</main>

  )

} 

