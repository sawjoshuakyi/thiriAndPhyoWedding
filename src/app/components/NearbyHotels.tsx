import { motion } from "motion/react";
import { MapPin, Star, Link as LinkIcon } from "lucide-react";

const hotels = [
  {
    name: "Hilton Garden Inn Frederick",
    distance: "~4 mi from venue",
    address: "7226 Corporate Ct, Frederick, MD 21703",
    rating: 4.5,
    link: "https://maps.google.com/?q=Hilton+Garden+Inn+Frederick+MD",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1080&q=80&auto=format&fit=crop",
  },
  {
    name: "Hampton Inn Frederick",
    distance: "~5 mi from venue",
    address: "5311 Buckeystown Pike, Frederick, MD 21704",
    rating: 4.3,
    link: "https://maps.google.com/?q=Hampton+Inn+Frederick+MD",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1080&q=80&auto=format&fit=crop",
  },
  {
    name: "Courtyard by Marriott Frederick",
    distance: "~6 mi from venue",
    address: "5225 Westview Dr, Frederick, MD 21703",
    rating: 4.4,
    link: "https://maps.google.com/?q=Courtyard+by+Marriott+Frederick+MD",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1080&q=80&auto=format&fit=crop",
  },
];

export function NearbyHotels() {
  return (
    <section id="nearby-hotels" className="relative overflow-hidden py-16 sm:py-20 md:py-28 px-4"
      style={{ background: "linear-gradient(to bottom, #ffffff 0%, rgba(255,228,230,0.15) 50%, #ffffff 100%)" }}>
      {/* Sakura branch decorations */}
      <img src="/images/sakura_bottom2.jpg" alt="" aria-hidden="true"
        style={{ position:"absolute", bottom:0, left:0, width:"18rem", maxWidth:"32vw", opacity:0.22, pointerEvents:"none", userSelect:"none" }} />
      <img src="/images/sakura1-Picsart-BackgroundRemover.jpg" alt="" aria-hidden="true"
        style={{ position:"absolute", top:0, right:0, width:"15rem", maxWidth:"28vw", opacity:0.15, pointerEvents:"none", userSelect:"none" }} />

      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-4 sm:mb-6 tracking-wide px-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Nearby Hotels
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <span style={{ fontSize:"1.1rem" }}>🌸</span>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          </div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-blue-700 max-w-2xl mx-auto font-light px-4">
            Hotel suggestions close to the venue
          </p>
        </motion.div>

        {/* Mobile: swipeable carousel */}
        <div className="sm:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4">
            {hotels.map((h, i) => (
              <motion.article
                key={h.name}
                className="min-w-[85%] snap-start rounded-2xl border border-blue-200/50 bg-white/90 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <img src={h.image} alt={h.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg text-blue-900 mb-1" style={{ fontFamily: "var(--font-serif)" }}>{h.name}</h3>
                  <div className="flex items-center justify-between text-blue-700">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{h.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-700/80 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{h.distance}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{h.address}</p>
                  <a
                    href={h.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Map toggle for mobile */}
          <details className="mt-6 rounded-2xl border border-blue-200/50 bg-white/80 shadow-md">
            <summary className="cursor-pointer list-none flex items-center justify-between px-4 py-3">
              <span className="text-blue-900" style={{ fontFamily: 'var(--font-serif)' }}>Show Map</span>
              <span className="text-blue-700 text-sm">Tap to toggle</span>
            </summary>
            <div className="rounded-b-2xl overflow-hidden">
              <iframe
                title="Ceresville Mansion - Wedding Venue"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Ceresville+Mansion,8529+Liberty+Road,Frederick,MD+21701&zoom=14"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </details>
        </div>

        {/* Tablet/Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {hotels.map((h, i) => (
            <motion.article
              key={h.name}
              className="rounded-2xl border border-blue-200/50 bg-white/85 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 * i }}
            >
              <img src={h.image} alt={h.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl text-blue-900" style={{ fontFamily: "var(--font-serif)" }}>{h.name}</h3>
                  <div className="flex items-center gap-1 text-blue-700">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">{h.rating}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-blue-700/80 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{h.distance}</span>
                </div>
                <p className="mt-1 text-gray-700 text-sm">{h.address}</p>
                <a
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 text-sm"
                >
                  <LinkIcon className="w-4 h-4" />
                  View on Google Maps
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Original map embed kept for sm+ above the grid */}
        <div className="hidden sm:block rounded-2xl overflow-hidden border border-blue-200/50 shadow-lg bg-white/70 mb-8 sm:mb-10 mt-10">
          <iframe
            title="Ceresville Mansion - Wedding Venue"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Ceresville+Mansion,8529+Liberty+Road,Frederick,MD+21701&zoom=14"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
