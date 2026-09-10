export default function AboutPage() {
  return (
    <main className="bg-[#0b0b0b] text-white min-h-screen p-8 md:p-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-[#D4AF37] text-sm hover:underline mb-8 inline-block">&larr; Back to Home</a>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#D4AF37]">About Our Company</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img src="/services4.jpg" alt="About Company" className="w-full h-[350px] object-cover rounded-2xl border border-[#D4AF37]/30 shadow-2xl" />
          <p className="text-gray-300 leading-relaxed text-lg">
            Vision I Entertainment is an event management company specializing in creating unforgettable experiences. We offer end-to-end services for corporate events, live shows, product launches, and private celebrations, blending creativity with seamless execution.
          </p>
        </div>
      </div>
    </main>
  );
}