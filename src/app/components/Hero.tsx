import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden pt-16 sm:pt-20 md:pt-0"
    >
      {/* Floating hearts in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-400/50"
            initial={{ 
              bottom: -20,
              left: `${Math.random() * 100}%`,
              opacity: 0
            }}
            animate={{
              bottom: '110%',
              opacity: [0, 0.5, 0.7, 0.7, 0.5, 0],
            }}
            transition={{
              duration: 25 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear"
            }}
            style={{ fontSize: `${20 + Math.random() * 20}px` }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Sakura SVG at top right */}
      <img
        src={"/src/app/resource/sakura1-Picsart-BackgroundRemover.jpg"}
        alt="Sakura"
        className="absolute top-0 right-0 w-40 sm:w-64 md:w-80 opacity-70 pointer-events-none select-none"
        style={{ zIndex: 20 }}
      />

      {/* Sakura at bottom left */}
      <img
        src={"/src/app/resource/sakura_bottom2.jpg"}
        alt="Sakura Bottom Left"
        className="absolute bottom-0 left-0 w-40 sm:w-64 md:w-80 opacity-70 pointer-events-none select-none"
        style={{ zIndex: 20 }}
      />

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="relative flex justify-center items-center">
          {/* Sakura circle background directly behind names */}
          <img
            src={"/src/app/resource/sakura_circle1.jpg"}
            alt="Sakura Circle"
            className="absolute left-1/2 top-1/2 sm:top-[140%] md:top-[180%] w-[28rem] sm:w-[40rem] md:w-[48rem] -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none select-none"
            style={{ zIndex: 1 }}
          />
          <motion.h1
            className="relative z-10 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl text-blue-900 mb-4 sm:mb-6 leading-tight px-2"
            style={{ fontFamily: 'var(--font-hero-script)', letterSpacing: '0.5px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="block sm:inline">Thiri Wai Lwin</span>{' '}
            <span className="text-blue-400">&</span>{' '}
            <span className="block sm:inline">Phyo Thant Oo</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-700 mb-8 sm:mb-12 font-light tracking-wide px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          We're getting married!
        </motion.p>

        {/* Wedding Date */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="inline-block bg-white/80 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl border border-blue-200">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-800 tracking-wider" style={{ fontFamily: 'var(--font-serif)' }}>
              May 2, 2026
            </p>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <CountdownTimer targetDate={new Date("2026-05-02")} />
      </div>
    </section>
  );
}

interface CountdownTimerProps {
  targetDate: Date;
}

function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8">
      <motion.p 
        className="text-sm sm:text-base md:text-lg text-blue-800 mb-5 sm:mb-6 tracking-wide uppercase" 
        style={{ fontFamily: 'var(--font-sans)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        Countdown to Our Special Day
      </motion.p>

      {/* Mobile layout: emphasize Days, then show Hours/Minutes/Seconds in a row */}
      <div className="block sm:hidden max-w-md mx-auto px-4">
        <div className="bg-white/85 rounded-xl p-5 shadow-lg border border-blue-100 mb-4">
          <div className="text-xs text-blue-700 uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-sans)' }}>Days</div>
          <div className="text-5xl text-blue-900 leading-none" style={{ fontFamily: 'var(--font-serif)' }}>{timeLeft.days}</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.5 + (index * 0.05) }}
            >
              <div className="text-2xl text-blue-900" style={{ fontFamily: 'var(--font-serif)' }}>{item.value}</div>
              <div className="text-[10px] text-blue-700 uppercase tracking-wider mt-1" style={{ fontFamily: 'var(--font-sans)' }}>{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tablet/Desktop layout */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="bg-white/80 rounded-lg p-6 shadow-lg border border-blue-100"
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.5 + (index * 0.05),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.2), 0 8px 10px -6px rgb(59 130 246 / 0.2)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="text-4xl text-blue-900 mb-2" 
                style={{ fontFamily: 'var(--font-serif)' }}
                key={item.value}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.2 }}
              >
                {item.value}
              </motion.div>
              <div className="text-sm text-blue-700 uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}