import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, Send } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";

// Extracted static array
const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email us",
    value: "triostack.cvp@gmail.com",
    color: "text-primary-dark",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 7439 018 008",
    color: "text-secondary-light",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Kolkata, India",
    color: "text-orange-500",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: submitError } = await supabase
      .from("messages")
      .insert([formData]);

    if (submitError) {
      setError("Failed to reach our servers. Please try again.");
      setIsSubmitting(false);
    } else {
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="pt-32 md:pt-44 pb-20 md:pb-32 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-primary-light uppercase bg-primary-light/10 rounded-full border border-primary-light/20">
              Get In Touch
            </div>
            <h1
              id="contact-heading"
              className="text-[11vw] sm:text-5xl md:text-6xl lg:text-8xl font-black mb-8 leading-none tracking-tighter"
            >
              Let's build{" "}
              <span className="text-glow text-primary-light">
                Extraordinary.
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-medium">
              Bring your vision to a lead specialist. We don't just take orders;
              we architect digital advantage. Reach out and let's build
              something elite.
            </p>

            <ul className="space-y-8" role="list">
              {CONTACT_INFO.map((info, i) => {
                const Icon = info.icon;
                return (
                  <li key={i} className="flex items-center group">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mr-6 shadow-md transition-colors duration-500 group-hover:bg-primary-light group-hover:dark:bg-primary-light group-hover:text-dark group-hover:dark:text-dark"
                    >
                      <Icon className="w-8 h-8" aria-hidden="true" />
                    </motion.div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-1">
                        {info.label}
                      </p>
                      <p className="text-xl font-black tracking-tight group-hover:text-primary-light transition-colors text-slate-900 dark:text-white">
                        {info.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] relative border border-slate-200 dark:border-white/10 shadow-2xl bg-white/50 dark:bg-white/5"
          >
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-12 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-3xl bg-white/80 dark:bg-dark/80"
              >
                <div className="w-24 h-24 bg-secondary-light/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle
                    className="w-16 h-16 text-secondary-light animate-bounce"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter text-slate-900 dark:text-white">
                  Transmission Received!
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                  A lead specialist will personally review your inquiry. Expect
                  a direct response shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 px-8 py-3 bg-primary-light text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                >
                  Send Another
                </button>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 md:space-y-8"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-2xl border border-slate-300 dark:border-white/5 bg-slate-100 dark:bg-white/5 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-primary-light outline-none transition-all font-bold text-slate-900 dark:text-white"
                    placeholder="Enter your name"
                    aria-invalid={!formData.name}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-2xl border border-slate-300 dark:border-white/5 bg-slate-100 dark:bg-white/5 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-primary-light outline-none transition-all font-bold text-slate-900 dark:text-white"
                    placeholder="name@example.com"
                    aria-invalid={!formData.email}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2"
                >
                  Project Subject
                </label>
                <input
                  id="contact-subject"
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-2xl border border-slate-300 dark:border-white/5 bg-slate-100 dark:bg-white/5 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-primary-light outline-none transition-all font-bold text-slate-900 dark:text-white"
                  placeholder="What are we building?"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2"
                >
                  Detailed Inquiry
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-2xl border border-slate-300 dark:border-white/5 bg-slate-100 dark:bg-white/5 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-primary-light outline-none transition-all resize-none font-bold text-slate-900 dark:text-white"
                  placeholder="Describe your vision..."
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="text-red-500 dark:text-red-400 text-sm font-bold text-center"
                >
                  {error}
                </div>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className="group w-full bg-primary-light hover:bg-primary-dark text-slate-900 font-black py-5 rounded-2xl transition-all duration-500 flex items-center justify-center disabled:opacity-50 shadow-xl shadow-primary-light/20 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
              >
                {isSubmitting ? (
                  <div
                    className="w-6 h-6 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"
                    aria-label="Submitting"
                  />
                ) : (
                  <>
                    <span className="mr-3 tracking-[0.2em] uppercase">
                      Initialize Project
                    </span>
                    <Send
                      className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
