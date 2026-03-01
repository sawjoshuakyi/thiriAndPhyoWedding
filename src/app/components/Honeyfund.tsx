import { motion } from "motion/react";
import { Gift, Heart, ExternalLink } from "lucide-react";

const HONEYFUND_URL = "https://www.honeyfund.com/site/oo-lwin-05-02-2026";

export function Honeyfund() {
  return (
    <section
      id="honeyfund"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 px-4"
      style={{ background: "linear-gradient(to bottom, #eff6ff 0%, #ffffff 50%, #eff6ff 100%)" }}
    >
      {/* Sakura decorations */}
      <img
        src="/images/sakura1-Picsart-BackgroundRemover.jpg"
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, width: "14rem", maxWidth: "28vw", opacity: 0.18, pointerEvents: "none", userSelect: "none", transform: "scaleX(-1)" }}
      />
      <img
        src="/images/sakura_bottom2.jpg"
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, right: 0, width: "14rem", maxWidth: "28vw", opacity: 0.15, pointerEvents: "none", userSelect: "none", transform: "scaleX(-1)" }}
      />

      <div className="container mx-auto max-w-2xl relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm mb-4 shadow-sm">
            <Gift className="w-3.5 h-3.5" />
            Honeyfund
          </div>

          {/* Title */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-blue-900 mb-4 tracking-wide"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Gift Registry
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <span style={{ fontSize: "1.1rem" }}>🌸</span>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-3xl border border-blue-100 bg-white/90 shadow-xl p-8 sm:p-10 text-center"
        >
          <div className="flex justify-center mb-5">
            <div className="bg-blue-50 rounded-full p-4">
              <Heart className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-2">
            Your presence at our wedding is the greatest gift of all.
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
            However, if you'd like to contribute to our honeymoon and future adventures together, we'd be so grateful for a gift through our Honeyfund.
          </p>

          <a
            href={HONEYFUND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm sm:text-base font-semibold shadow-lg shadow-blue-200 transition-all duration-300"
          >
            <Gift className="w-4 h-4" />
            Visit Our Honeyfund
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>

          <p className="mt-5 text-xs sm:text-sm text-blue-400">
            Thank you for your love and generosity 💙
          </p>
        </motion.div>
      </div>
    </section>
  );
}
