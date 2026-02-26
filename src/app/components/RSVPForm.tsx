import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardContent } from "./ui/card";
import { CheckCircle, Loader2, User, Mail, Phone, Heart, Utensils, MessageSquare, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbqdBw3LdrYLbYHYubVN7O-gU4NQEsIWeNKGEKfGq81DVw0WbRkk7uyyKI6QwCU9Ie/exec";

const MEAL_OPTIONS = [
  { value: "Pork Tenderloin with Orange Horseradish Glaze", id: "pork", emoji: "🥩" },
  { value: "Grilled Salmon with Tarragon Cream", id: "salmon", emoji: "🐟" },
  { value: "Grilled Stuffed Portobello Mushroom (vegan)", id: "mushroom", emoji: "🍄" },
];

function MealSelector({
  label,
  value,
  onChange,
  idPrefix,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  idPrefix: string;
}) {
  return (
    <div>
      <Label className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
        <Utensils className="w-4 h-4 text-blue-500" />
        {label}
      </Label>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {MEAL_OPTIONS.map((opt) => (
          <label
            key={opt.id}
            htmlFor={`${idPrefix}-${opt.id}`}
            className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              value === opt.value
                ? "border-blue-400 bg-blue-50 shadow-sm"
                : "border-blue-100 bg-white hover:border-blue-200 hover:bg-blue-50/40"
            }`}
          >
            <RadioGroupItem value={opt.value} id={`${idPrefix}-${opt.id}`} className="shrink-0 mt-0.5" />
            <span className="text-lg shrink-0">{opt.emoji}</span>
            <span className="text-sm font-medium text-gray-700 leading-snug">{opt.value}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}

export function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendance: "yes",
    plusOne: "no",
    plusOneName: "",
    dietaryRestrictions: "",
    message: "",
    mealSelection: "Pork Tenderloin with Orange Horseradish Glaze",
    plusOneMealSelection: "Pork Tenderloin with Orange Horseradish Glaze",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      });
      console.log("RSVP submitted successfully:", formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      setError("There was an error submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <section
        id="rsvp"
        className="relative overflow-hidden min-h-screen py-16 sm:py-20 md:py-28 px-4 flex items-center"
        style={{ background: "linear-gradient(to bottom right, rgba(255,228,230,0.2), #ffffff, #dbeafe)" }}
      >
        <img src="/images/sakura1-Picsart-BackgroundRemover.jpg" alt="" aria-hidden="true"
          style={{ position:"absolute", top:0, right:0, width:"18rem", maxWidth:"32vw", opacity:0.22, pointerEvents:"none", userSelect:"none" }} />
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-blue-200 shadow-2xl bg-white/95 rounded-3xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400" />
              <CardContent className="p-8 sm:p-12 md:p-16 text-center">
                <motion.div
                  className="mb-6 flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="bg-green-100 rounded-full p-5">
                    <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500" />
                  </div>
                </motion.div>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl text-blue-900 mb-4 tracking-wide"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Thank You!
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                  We've received your RSVP. We're so excited to celebrate with you!
                </p>
                <p className="text-sm sm:text-base text-gray-500 mb-8">
                  A confirmation has been sent to{" "}
                  <span className="font-semibold text-blue-800 break-all">{formData.email}</span>
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="px-8 py-5 text-sm border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-400 rounded-xl transition-all duration-300"
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
      className="relative overflow-hidden py-16 sm:py-20 md:py-28 px-4"
      style={{ background: "linear-gradient(to bottom, rgba(255,228,230,0.2) 0%, #ffffff 40%, #eff6ff 100%)" }}
    >
      {/* Sakura branch decorations */}
      <img src="/images/sakura1-Picsart-BackgroundRemover.jpg" alt="" aria-hidden="true"
        style={{ position:"absolute", top:0, right:0, width:"18rem", maxWidth:"32vw", opacity:0.22, pointerEvents:"none", userSelect:"none" }} />
      <img src="/images/sakura_bottom2.jpg" alt="" aria-hidden="true"
        style={{ position:"absolute", bottom:0, left:0, width:"15rem", maxWidth:"28vw", opacity:0.15, pointerEvents:"none", userSelect:"none" }} />

      <div className="container mx-auto max-w-2xl relative">
        {/* Section Title */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm mb-4 shadow-sm">
            <Heart className="w-3.5 h-3.5" />
            We can't wait to celebrate with you
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-blue-900 mb-4 tracking-wide"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            RSVP
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <span style={{ fontSize:"1.1rem" }}>🌸</span>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border border-blue-100 shadow-2xl bg-white rounded-3xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300" />
            <CardContent className="p-4 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* ── Personal Info ── */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Your Information</p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold text-blue-900 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-400" /> Full Name <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name" name="name" required
                        value={formData.name} onChange={handleChange}
                        className="border-2 border-blue-100 focus:border-blue-400 rounded-xl text-sm h-11 bg-blue-50/30 placeholder:text-gray-400 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold text-blue-900 mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-blue-400" /> Email <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="email" name="email" type="email" required
                          value={formData.email} onChange={handleChange}
                          className="border-2 border-blue-100 focus:border-blue-400 rounded-xl text-sm h-11 bg-blue-50/30 placeholder:text-gray-400 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-semibold text-blue-900 mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-blue-400" /> Phone
                        </Label>
                        <Input
                          id="phone" name="phone" type="tel"
                          value={formData.phone} onChange={handleChange}
                          className="border-2 border-blue-100 focus:border-blue-400 rounded-xl text-sm h-11 bg-blue-50/30 placeholder:text-gray-400 transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-blue-50" />

                {/* ── Attendance ── */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Attendance</p>
                  <Label className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-blue-500" />
                    Will you be attending? <span className="text-red-400">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.attendance}
                    onValueChange={(value) => setFormData({ ...formData, attendance: value })}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
                  >
                    {[
                      { value: "yes", label: "Joyfully Accepts", emoji: "🎉" },
                      { value: "no", label: "Regretfully Declines", emoji: "💔" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        htmlFor={`attend-${opt.value}`}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          formData.attendance === opt.value
                            ? "border-blue-400 bg-blue-50 shadow-sm"
                            : "border-blue-100 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                        }`}
                      >
                        <RadioGroupItem value={opt.value} id={`attend-${opt.value}`} className="shrink-0" />
                        <span className="text-base shrink-0">{opt.emoji}</span>
                        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* ── Attending details ── */}
                <AnimatePresence>
                  {formData.attendance === "yes" && (
                    <motion.div
                      key="attending-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden space-y-6"
                    >
                      <div className="border-t border-blue-50" />

                      {/* Your Meal */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Your Meal</p>
                        <MealSelector
                          label="Meal Selection *"
                          value={formData.mealSelection}
                          onChange={(val) => setFormData({ ...formData, mealSelection: val })}
                          idPrefix="primary"
                        />
                      </div>

                      {/* Dietary */}
                      <div>
                        <Label htmlFor="dietaryRestrictions" className="text-sm font-semibold text-blue-900 mb-1.5 block">
                          Dietary Restrictions
                        </Label>
                        <Input
                          id="dietaryRestrictions" name="dietaryRestrictions"
                          value={formData.dietaryRestrictions} onChange={handleChange}
                          className="border-2 border-blue-100 focus:border-blue-400 rounded-xl text-sm h-11 bg-blue-50/30 placeholder:text-gray-400 transition-colors"
                          placeholder="e.g., Vegetarian, nut allergy…"
                        />
                      </div>

                      <div className="border-t border-blue-50" />

                      {/* Plus One */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Plus One</p>
                        <Label className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                          <UserPlus className="w-4 h-4 text-blue-500" />
                          Will there be a plus one?
                        </Label>
                        <RadioGroup
                          value={formData.plusOne}
                          onValueChange={(value) => setFormData({ ...formData, plusOne: value })}
                          className="grid grid-cols-2 gap-3 mt-2"
                        >
                          {[
                            { value: "yes", label: "Yes", emoji: "👫" },
                            { value: "no", label: "No", emoji: "🙅" },
                          ].map((opt) => (
                            <label
                              key={opt.value}
                              htmlFor={`plusone-${opt.value}`}
                              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                formData.plusOne === opt.value
                                  ? "border-blue-400 bg-blue-50 shadow-sm"
                                  : "border-blue-100 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                              }`}
                            >
                              <RadioGroupItem value={opt.value} id={`plusone-${opt.value}`} className="shrink-0" />
                              <span className="text-base">{opt.emoji}</span>
                              <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                            </label>
                          ))}
                        </RadioGroup>
                      </div>

                      {/* Plus One Details */}
                      <AnimatePresence>
                        {formData.plusOne === "yes" && (
                          <motion.div
                            key="plusone-meal"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 space-y-5">
                              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">Plus One's Details</p>
                              <div>
                                <Label htmlFor="plusOneName" className="text-sm font-semibold text-blue-900 mb-1.5 flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-blue-400" /> Plus One's Name <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                  id="plusOneName" name="plusOneName"
                                  value={formData.plusOneName} onChange={handleChange}
                                  className="border-2 border-blue-100 focus:border-blue-400 rounded-xl text-sm h-11 bg-white placeholder:text-gray-400 transition-colors"
                                  placeholder="Enter their full name"
                                />
                              </div>
                              <MealSelector
                                label="Plus One's Meal Selection *"
                                value={formData.plusOneMealSelection}
                                onChange={(val) => setFormData({ ...formData, plusOneMealSelection: val })}
                                idPrefix="plusone"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="border-t border-blue-50" />

                {/* ── Message ── */}
                <div>
                  <Label htmlFor="message" className="text-sm font-semibold text-blue-900 mb-1.5 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    Message to the Couple
                  </Label>
                  <Textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    className="mt-1 border-2 border-blue-100 focus:border-blue-400 rounded-xl min-h-24 text-sm bg-blue-50/30 placeholder:text-gray-400 transition-colors"
                    placeholder="Share your wishes and blessings…"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-blue-300 disabled:to-blue-300 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all duration-300 mt-2 focus:outline-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      Send RSVP
                    </>
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
