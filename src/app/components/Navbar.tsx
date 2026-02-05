import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/98 shadow-lg border-b border-blue-100/50" 
          : "bg-gradient-to-b from-white/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        {/* Use a 3-column grid to keep the center title perfectly centered */}
        <div className="grid grid-cols-3 items-center h-16 sm:h-20 md:h-24">
          {/* Left area */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("event-details")}
              className={`hidden lg:block hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 text-sm lg:text-base ${
                isScrolled ? "text-blue-900" : "text-blue-800"
              }`}
            >
              Event Details
            </Button>
          </div>

          {/* Center title */}
          <div className="justify-self-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-900 tracking-wide hover:text-blue-700 transition-colors duration-300 px-2"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              <span className="hidden sm:inline">Thiri & Phyo</span>
              <span className="sm:hidden">T & P</span>
            </button>
          </div>

          {/* Right area */}
          <div className="justify-self-end flex items-center gap-2 lg:gap-3">
            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <button
                onClick={() => scrollToSection("rsvp")}
                className={`flex items-center justify-center px-4 lg:px-6 py-2 lg:py-2.5 rounded-full transition-all duration-300 font-medium text-xs lg:text-sm ${ 
                  isScrolled 
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl" 
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                }`}
              >
                RSVP
              </button>
              <a
                href="https://www.honeyfund.com/site/oo-lwin-05-02-2026"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center px-4 lg:px-6 py-2 lg:py-2.5 rounded-full transition-all duration-300 font-medium text-xs lg:text-sm whitespace-nowrap ${ 
                  isScrolled 
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md hover:shadow-lg" 
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-sm hover:shadow-md"
                }`}
              >
                <span className="hidden lg:inline">Honeymoon Fund</span>
                <span className="lg:hidden">Fund</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-white/95 rounded-lg p-4 mb-2 shadow-xl border border-blue-100">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("our-story")}
              className="w-full justify-start hover:bg-blue-50 text-blue-900 hover:text-blue-700 transition-colors text-base"
            >
              Our Story
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("event-details")}
              className="w-full justify-start hover:bg-blue-50 text-blue-900 hover:text-blue-700 transition-colors text-base"
            >
              Event Details
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("rsvp")}
              className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700 text-base"
            >
              RSVP
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                window.open('https://www.honeyfund.com/site/oo-lwin-05-02-2026', '_blank');
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start bg-blue-100 text-blue-700 hover:bg-blue-200 text-base"
            >
              Honeymoon Fund
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}