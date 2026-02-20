import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardContent } from "./ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";

// Replace this with your Google Apps Script Web App URL after deployment
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbqdBw3LdrYLbYHYubVN7O-gU4NQEsIWeNKGEKfGq81DVw0WbRkk7uyyKI6QwCU9Ie/exec";

export function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendance: "yes",
    guests: "1",
    dietaryRestrictions: "",
    message: "",
    mealSelection: "Pork Tenderloin", // Default meal selection
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Submit to Google Sheets via Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      // With no-cors, we can't read the response, but if no error thrown, assume success
      console.log("RSVP submitted successfully:", formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      setError("There was an error submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <section
        id="rsvp"
        className="min-h-screen py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center"
      >
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-blue-300 shadow-2xl bg-white/95">
              <CardContent className="p-8 sm:p-12 md:p-16 text-center">
                <motion.div
                  className="mb-4 sm:mb-6 flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="bg-green-100 rounded-full p-4 sm:p-6">
                    <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-600" />
                  </div>
                </motion.div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-900 mb-4 sm:mb-6 tracking-wide px-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Thank You!
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed px-2">
                  We've received your RSVP. We're so excited to celebrate with
                  you!
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 px-2">
                  A confirmation email has been sent to{" "}
                  <span className="font-semibold text-blue-900 break-all">
                    {formData.email}
                  </span>
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-4 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
                >
                  Submit Another RSVP
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white"
    >
      <div className="container mx-auto max-w-2xl">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/60 text-blue-700 text-xs sm:text-sm mb-3 shadow-sm">
            We can’t wait to celebrate with you
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-blue-900 mb-3 sm:mb-4 tracking-wide px-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            RSVP
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border border-blue-200/50 shadow-xl bg-white/85 rounded-2xl">
            <CardContent className="p-5 sm:p-7 md:p-9">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-sm text-blue-900/80">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 border-blue-200 focus:border-blue-400 rounded-xl text-sm h-11"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm text-blue-900/80">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 border-blue-200 focus:border-blue-400 rounded-xl text-sm h-11"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-sm text-blue-900/80">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 border-blue-200 focus:border-blue-400 rounded-xl text-sm h-11"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Attendance */}
                <div>
                  <Label className="text-sm text-blue-900/80 mb-2 block">Will you be attending? *</Label>
                  <RadioGroup
                    value={formData.attendance}
                    onValueChange={(value) =>
                      setFormData({ ...formData, attendance: value })
                    }
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 p-2 rounded-lg border border-blue-100 hover:bg-blue-50/50">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="cursor-pointer font-normal text-sm">
                        Joyfully accepts
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg border border-blue-100 hover:bg-blue-50/50">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="cursor-pointer font-normal text-sm">
                        Regretfully declines
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Number of Guests */}
                {formData.attendance === "yes" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guests" className="text-sm text-blue-900/80">Number of Guests *</Label>
                        <Input
                          id="guests"
                          name="guests"
                          type="number"
                          min="1"
                          max="5"
                          required
                          value={formData.guests}
                          onChange={handleChange}
                          className="mt-2 border-blue-200 focus:border-blue-400 rounded-xl text-sm h-11"
                        />
                      </div>

                      {/* Dietary Restrictions */}
                      <div>
                        <Label
                          htmlFor="dietaryRestrictions"
                          className="text-sm text-blue-900/80"
                        >
                          Dietary Restrictions
                        </Label>
                        <Input
                          id="dietaryRestrictions"
                          name="dietaryRestrictions"
                          value={formData.dietaryRestrictions}
                          onChange={handleChange}
                          className="mt-2 border-blue-200 focus:border-blue-400 rounded-xl text-sm h-11"
                          placeholder="e.g., Vegetarian, Allergies"
                        />
                      </div>
                    </div>

                    {/* Meal Selection */}
                    <div>
                      <Label className="text-sm text-blue-900/80 mb-2 block">Meal Selection *</Label>
                      <RadioGroup
                        value={formData.mealSelection}
                        onValueChange={(value) =>
                          setFormData({ ...formData, mealSelection: value })
                        }
                        className="space-y-2"
                      >
                        <div className="flex items-center gap-2 p-2 rounded-lg border border-blue-100 hover:bg-blue-50/50">
                          <RadioGroupItem value="Pork Tenderloin" id="pork" />
                          <Label htmlFor="pork" className="cursor-pointer font-normal text-sm">
                            Pork Tenderloin
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg border border-blue-100 hover:bg-blue-50/50">
                          <RadioGroupItem value="Grilled Salmon with Tarragon Cream" id="salmon" />
                          <Label htmlFor="salmon" className="cursor-pointer font-normal text-sm">
                            Grilled Salmon with Tarragon Cream
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg border border-blue-100 hover:bg-blue-50/50">
                          <RadioGroupItem value="Grilled Stuffed Portobello Mushroom (vegan)" id="mushroom" />
                          <Label htmlFor="mushroom" className="cursor-pointer font-normal text-sm">
                            Grilled Stuffed Portobello Mushroom (vegan)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </>
                )}

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-sm text-blue-900/80">Message to the Couple</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 border-blue-200 focus:border-blue-400 rounded-xl min-h-24 text-sm"
                    placeholder="Share your wishes and blessings..."
                  />
                </div>

                {/* Submit Button */}
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 sm:h-12 bg-blue-600/90 hover:bg-blue-600 disabled:bg-blue-400 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-colors duration-300 mt-4 focus:outline-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send RSVP"
                  )}
                </button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}