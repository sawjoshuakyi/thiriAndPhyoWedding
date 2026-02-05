import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { OurStory } from "./components/OurStory";
import { EventDetails } from "./components/EventDetails";
import { RSVPForm } from "./components/RSVPForm";
import { NearbyHotels } from "./components/NearbyHotels";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    gsap.utils.toArray("section").forEach((section) => {
      const el = section as Element;
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          duration: 1,
          ease: "power2.out",
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <OurStory />
      <EventDetails />
      <NearbyHotels />
      <RSVPForm />
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="container mx-auto text-center relative z-10">
          <p className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>
            Thiri & Phyo
          </p>
          <div className="w-12 sm:w-16 h-0.5 bg-blue-300 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-blue-200 text-base sm:text-lg md:text-xl mb-1 sm:mb-2">May 2, 2026</p>
          <p className="text-xs sm:text-sm md:text-base text-blue-300 mt-4 sm:mt-6 font-light px-4">
            We can't wait to celebrate with you!
          </p>
        </div>
      </footer>
    </div>
  );
}