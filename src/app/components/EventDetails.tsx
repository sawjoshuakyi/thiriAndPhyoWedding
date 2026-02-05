import { Calendar, Clock, MapPin, Music, Shirt, Utensils, PartyPopper, ListOrdered } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function EventDetails() {
  const agendaItems = [
    { time: "5:00 PM", event: "Arrival & Seating" },
    { time: "5:30 PM", event: "Ceremony Begins" },
    { time: "6:30 PM", event: "Cocktail Hour" },
    { time: "7:00 PM", event: "Reception" },
  ];

  const colorPalette = [
    { color: "#FAEDCB", name: "Yellow" },
    { color: "#C6DEF1", name: "Blue" },
    { color: "#FADDE1", name: "Pink" },
    { color: "#DEDAF4", name: "Purple" },
  ];

  return (
    <section
      id="event-details"
      className="min-h-screen py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-white to-blue-50/30"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-4 sm:mb-6 tracking-wide px-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Event Details
          </h2>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-blue-700 max-w-2xl mx-auto font-light px-4">
            Join us as we celebrate our love and commitment
          </p>
        </motion.div>

        {/* Mobile-friendly compact accordion (below md) */}
        <div className="md:hidden mb-10">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ceremony" className="border border-blue-200/50 rounded-xl mb-3 bg-white">
              <AccordionTrigger className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-xl shadow-sm">
                    <Calendar className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-lg text-blue-900" style={{ fontFamily: "var(--font-serif)" }}>Wedding Day</h3>
                    <p className="text-xs text-blue-600">Date, time & venue</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl">
                    <Calendar className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Date</p>
                      <p className="text-sm">Friday, May 2, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Time</p>
                      <p className="text-sm">5:00 PM - 7:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl">
                    <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Venue</p>
                      <p className="text-xs text-gray-600 mt-1">8529 Liberty Road, Frederick, MD 21701</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="agenda" className="border border-blue-200/50 rounded-xl mb-3 bg-white">
              <AccordionTrigger className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-xl shadow-sm">
                    <ListOrdered className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-lg text-blue-900" style={{ fontFamily: "var(--font-serif)" }}>Agenda</h3>
                    <p className="text-xs text-blue-600">Schedule of events</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2">
                  {agendaItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                      <span className="font-semibold text-blue-700 text-sm min-w-[70px]">{item.time}</span>
                      <span className="text-gray-700 text-sm">{item.event}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dresscode" className="border border-blue-200/50 rounded-xl bg-white">
              <AccordionTrigger className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-xl shadow-sm">
                    <Shirt className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-lg text-blue-900" style={{ fontFamily: "var(--font-serif)" }}>Dress Code</h3>
                    <p className="text-xs text-blue-600">What to wear</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm">Formal or Cocktail Attire</p>
                  <p className="text-gray-600 text-xs">Soft pastels are kindly encouraged</p>
                  <div className="flex gap-2 mt-3">
                    {colorPalette.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-gray-500 mt-1">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Event Cards Grid (md and up) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16">
          {/* Wedding Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-2 border-blue-200/50 hover:border-blue-300 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <div className="flex items-start space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 sm:p-4 rounded-2xl shadow-md flex-shrink-0">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-blue-700" />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl text-blue-900 mb-1 sm:mb-2 tracking-wide"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Wedding Day
                    </h3>
                    <p className="text-sm sm:text-base text-blue-600 font-light">Join us for our special day</p>
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-5 text-gray-700">
                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-50/50 rounded-xl">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">Date</p>
                      <p className="text-gray-700 text-sm sm:text-base">Friday, May 2, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-50/50 rounded-xl">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">Time</p>
                      <p className="text-gray-700 text-sm sm:text-base">5:00 PM - 7:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-50/50 rounded-xl">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">Venue</p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        8529 Liberty Road, Frederick, MD 21701
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Agenda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border-2 border-blue-200/50 hover:border-blue-300 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <div className="flex items-start space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 sm:p-4 rounded-2xl shadow-md flex-shrink-0">
                    <ListOrdered className="w-6 h-6 sm:w-7 sm:h-7 text-blue-700" />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl text-blue-900 mb-1 sm:mb-2 tracking-wide"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Agenda
                    </h3>
                    <p className="text-sm sm:text-base text-blue-600 font-light">Schedule of events</p>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {agendaItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-50/50 rounded-xl"
                    >
                      <span className="font-semibold text-blue-700 text-sm sm:text-base min-w-[80px]">
                        {item.time}
                      </span>
                      <span className="text-gray-700 text-sm sm:text-base">{item.event}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Dress Code Section */}
        <motion.div
          className="hidden md:block bg-gradient-to-br from-blue-100/50 to-blue-50/30 rounded-2xl p-6 sm:p-8 md:p-12 border border-blue-200/50 shadow-lg mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 sm:p-4 rounded-2xl shadow-lg inline-block mb-4 sm:mb-6">
              <Shirt className="w-6 h-6 sm:w-8 sm:h-8 text-blue-700" />
            </div>
            <h3
              className="text-xl sm:text-2xl md:text-3xl text-blue-900 mb-3 sm:mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Dress Code
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-2">Formal or Cocktail Attire</p>
            <p className="text-sm sm:text-base text-blue-600 mb-6 sm:mb-8">Soft pastels are kindly encouraged</p>
            
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8">
              {colorPalette.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs sm:text-sm text-gray-600 mt-2">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="bg-gradient-to-br from-blue-100/50 to-blue-50/30 rounded-2xl p-6 sm:p-8 md:p-12 border border-blue-200/50 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3
            className="text-xl sm:text-2xl md:text-3xl text-blue-900 mb-6 sm:mb-8 text-center tracking-wide px-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            What to Expect
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-blue-200/50 shadow-md text-center">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
              </div>
              <p className="font-semibold text-blue-900 mb-1 sm:mb-2 text-base sm:text-lg">Dinner</p>
              <p className="text-gray-700 text-sm sm:text-base">Traditional & Western Cuisine</p>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-blue-200/50 shadow-md text-center">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
              </div>
              <p className="font-semibold text-blue-900 mb-1 sm:mb-2 text-base sm:text-lg">Entertainment</p>
              <p className="text-gray-700 text-sm sm:text-base">Live Music & Dancing</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}