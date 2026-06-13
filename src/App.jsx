import React, { useState, useEffect } from 'react';
import { ArrowRight, Laptop, Cpu, PhoneCall, Layers } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Monitor scrolling accurately to highlight the correct item in our custom floating dock
  useEffect(() => {
    const container = document.querySelector('.snap-container');
    const handleScroll = () => {
      if (!container) return;
      
      const sections = ['home', 'products', 'services', 'contact'];
      let currentSection = 'home';
      let minDistance = Infinity;

      // Calculate which section's center is closest to the screen's visual midpoint
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distanceToCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
          if (distanceToCenter < minDistance) {
            minDistance = distanceToCenter;
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Passive listener improves browser scrolling frame rates
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white font-sans antialiased selection:bg-white selection:text-black min-h-screen relative overflow-hidden">
      
      {/* Background static design lines & overlays */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none z-0" />

      {/* --- FIXED TOP BRAND HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-md border-b border-neutral-900/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span onClick={() => scrollToSection('home')} className="text-sm font-bold tracking-[0.3em] uppercase text-white cursor-pointer select-none">
            Fraevo
          </span>
          <div className="hidden sm:block text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
            // Core Engineering Hub
          </div>
        </div>
      </header>

      {/* --- RESPONSIVE FLOATING NAVIGATION DOCK --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:translate-x-0 z-50">
        <div className="flex lg:flex-col items-center gap-3 bg-neutral-950/80 border border-neutral-800 p-2 rounded-full shadow-2xl backdrop-blur-lg">
          {[
            { id: 'home', label: 'Home', icon: <Layers className="w-4 h-4" /> },
            { id: 'products', label: 'Products', icon: <Cpu className="w-4 h-4" /> },
            { id: 'services', label: 'Services', icon: <Laptop className="w-4 h-4" /> },
            { id: 'contact', label: 'Contact', icon: <PhoneCall className="w-4 h-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`p-3 rounded-full transition-all duration-300 relative group ${
                activeSection === item.id 
                  ? 'bg-white text-black font-medium shadow-md' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
              }`}
              aria-label={item.label}
            >
              {item.icon}
              {/* Desktop Hover Tooltip labels */}
              <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-neutral-900 text-neutral-200 border border-neutral-800 text-[10px] px-2.5 py-1 rounded hidden lg:group-hover:block pointer-events-none tracking-wide whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* --- SCROLL SNAP ENGINE WRAPPER --- */}
      <div className="snap-container">

        {/* 1. HERO / HOME SECTION */}
        <section id="home" className="snap-section px-6">
          <div className="max-w-4xl mx-auto text-center w-full mt-4 sm:mt-0">
            {/* Status Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950/60 backdrop-blur-sm mb-6 sm:mb-8">
              <span className="relative flex h-1.5 w-1.5 bg-neutral-500 rounded-full overflow-hidden">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-white"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-wide text-neutral-400 font-normal">Currently in development</span>
            </div>

            <h1 className="text-3xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.15] sm:leading-[1.1] max-w-4xl">
              Building Technology <br />
              <span className="text-neutral-500 font-medium">for Tomorrow.</span>
            </h1>

            <p className="mt-6 max-w-xl sm:max-w-2xl mx-auto text-xs sm:text-base text-neutral-400 font-light leading-relaxed tracking-wide px-2">
              Fraevo delivers software engineering, technology consulting, and AI-driven solutions while creating innovative products that shape the future.
            </p>

            <p className="text-[11px] sm:text-xs text-neutral-500 max-w-xs sm:max-w-md mx-auto pt-4 sm:pt-6 border-t border-neutral-900/80 mt-6">
              From digital transformation to next-generation products, we're building what comes next.
            </p>
          </div>
        </section>

        {/* 2. PRODUCTS SECTION */}
        <section id="products" className="snap-section px-6 border-t border-neutral-900">
          <div className="max-w-5xl mx-auto w-full">
            <div className="mb-4 sm:mb-10 text-left">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium block mb-1">Products</span>
              <h2 className="text-xl sm:text-4xl font-medium tracking-tight text-white">
                Quietly building the <br className="hidden sm:block" />next generation.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              {/* Product Card 1: Fraevo Fashion */}
              <div className="group relative p-4 sm:p-8 rounded-xl border border-neutral-900 hover:border-neutral-500 bg-neutral-950/40 backdrop-blur-sm flex flex-col justify-between min-h-[150px] sm:min-h-[240px] transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center mb-3 sm:mb-8">
                    <span className="text-[9px] sm:text-[11px] font-mono tracking-widest text-neutral-500 uppercase">AI · Lifestyle</span>
                    <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400">Soon</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-medium text-white mb-1.5 sm:mb-3">Fraevo Fashion</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xs">
                    Reimagining the future of fashion through AI-powered experiences.
                  </p>
                </div>
                <div className="pt-3 sm:pt-6">
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 group-hover:text-white transition-colors cursor-pointer">
                    Learn more <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Product Card 2: Fraevo Robots */}
              <div className="group relative p-4 sm:p-8 rounded-xl border border-neutral-900 hover:border-neutral-500 bg-neutral-950/40 backdrop-blur-sm flex flex-col justify-between min-h-[150px] sm:min-h-[240px] transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center mb-3 sm:mb-8">
                    <span className="text-[9px] sm:text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Robotics · Automation</span>
                    <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400">Soon</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-medium text-white mb-1.5 sm:mb-3">Fraevo Robots</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xs">
                    Building intelligent robotics and automation solutions for tomorrow.
                  </p>
                </div>
                <div className="pt-3 sm:pt-6">
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 group-hover:text-white transition-colors cursor-pointer">
                    Learn more <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section id="services" className="snap-section px-6 border-t border-neutral-900">
          <div className="max-w-5xl mx-auto w-full">
            <div className="mb-4 sm:mb-10 text-left">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium block mb-1">Services</span>
              <h2 className="text-xl sm:text-4xl font-medium tracking-tight text-white">
                Engineering excellence, end to end.
              </h2>
            </div>

            <div className="border-t border-neutral-900 max-h-[52vh] sm:max-h-none overflow-y-auto sm:overflow-visible pr-1 sm:pr-0">
              {[
                { num: "01", title: "Software Development", desc: "End-to-end engineering for web, mobile, and enterprise platforms." },
                { num: "02", title: "AI & Machine Learning Solutions", desc: "Custom models, intelligent agents, and data-driven systems." },
                { num: "03", title: "Technology Consulting", desc: "Strategy and architecture for modern, scalable engineering teams." },
                { num: "04", title: "Product Engineering", desc: "From zero-to-one digital products to mature platform evolution." },
                { num: "05", title: "Automation & Innovation", desc: "Robotic process automation and operational intelligence." }
              ].map((service, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 py-3 sm:py-5 border-b border-neutral-900 items-baseline gap-1 sm:gap-4">
                  <div className="hidden md:block md:col-span-1 text-xs font-mono text-neutral-600">
                    {service.num}
                  </div>
                  <div className="md:col-span-5 text-sm sm:text-lg font-medium text-white">
                    {service.title}
                  </div>
                  <div className="md:col-span-6 text-[11px] sm:text-sm text-neutral-400 font-light">
                    {service.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CONTACT & FOOTER SECTION */}
        <section id="contact" className="snap-section px-6 border-t border-neutral-900 justify-between pt-20 pb-24 sm:pt-24 sm:pb-10">
          <div className="hidden sm:block" /> {/* Layout balance element */}
          
          <div className="max-w-4xl mx-auto text-center space-y-3 my-auto sm:my-0">
            <h2 className="text-2xl sm:text-5xl font-medium text-white tracking-tight leading-tight">
              Our products are currently <br />
              <span className="text-neutral-400">in development.</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light tracking-wide pb-4">
              Exciting things are on the way.
            </p>
            
            <a 
              href="mailto:hello@fraevo.com" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-xs tracking-wide font-normal transition-all text-neutral-200 hover:text-white"
            >
              hello@fraevo.com <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>

          {/* Minimal Base Footer */}
          <footer className="w-full max-w-5xl mx-auto pt-4 border-t border-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-[10px] sm:text-[11px] text-neutral-500 tracking-wide font-light">
              &copy; 2026 Fraevo. Building the future through technology.
            </p>
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-bold uppercase text-neutral-500">
              Fraevo
            </span>
          </footer>
        </section>

      </div>
    </div>
  );
}