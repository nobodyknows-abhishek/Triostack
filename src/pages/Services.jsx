import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Palette,
  Globe,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

// Extract static data outside the component to prevent recreation on every render
const SERVICES_DATA = [
  {
    icon: Code,
    title: "Web Development",
    features: [
      "React & Next.js",
      "TypeSafe Backend",
      "Scalable Architecture",
      "API Integration",
    ],
    desc: "Direct-to-master web engineering using the latest industry standards and performance optimizations.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    features: [
      "User Research",
      "Prototyping",
      "Design Systems",
      "Interaction Design",
    ],
    desc: "Crafting beautiful, intuitive interfaces that prioritize user experience and brand identity.",
  },
  {
    icon: Globe,
    title: "Digital Growth",
    features: [
      "SEO Strategy",
      "Analytics",
      "Performance Audit",
      "Conversion Optimization",
    ],
    desc: "Helping your business reach the right audience through data-driven digital strategies.",
  },
  {
    icon: Layers,
    title: "SAAS solutions",
    features: [
      "Cloud Native",
      "Microservices",
      "Security First",
      "Real-time Ops",
    ],
    desc: "Robust backend systems designed to scale seamlessly with your growing user base.",
  },
];

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const Services = () => {
  return (
    <section
      aria-labelledby="services-heading"
      className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-0 min-h-screen text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1
            id="services-heading"
            className="text-[12vw] sm:text-5xl md:text-6xl lg:text-8xl font-black mb-8 tracking-tighter leading-none"
          >
            Our <span className="text-primary-light">Specialties</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium">
            Boutique engineering and design services delivered by independent
            masters of their craft. No overhead, just pure execution.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {SERVICES_DATA.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] group transition-all duration-500 border border-slate-200 dark:border-white/10 hover:border-primary-light/30 hover:bg-white/10 dark:hover:bg-white/5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,255,204,0.1)] relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-64 h-64 bg-primary-light/5 rounded-full blur-[80px] -z-10 group-hover:bg-primary-light/10 transition-colors duration-500"
                  aria-hidden="true"
                />

                <div className="w-20 h-20 bg-primary-light/10 text-primary-light rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform duration-700 group-hover:scale-110 shadow-xl shadow-primary-light/5 text-glow group-hover:shadow-[0_0_30px_rgba(0,255,204,0.4)] relative">
                  <Icon size={40} aria-hidden="true" />
                </div>

                <h2 className="text-4xl font-black mb-6 group-hover:text-primary-light transition-colors">
                  {s.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                  {s.desc}
                </p>

                <ul
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
                  aria-label={`Features of ${s.title}`}
                >
                  {s.features.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 font-bold text-sm uppercase tracking-widest group/item"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-primary-light opacity-60 group-hover/item:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center text-primary-light font-black group-hover:translate-x-2 transition-transform uppercase tracking-widest text-sm"
                  aria-label={`Start a project for ${s.title}`}
                >
                  Start a project{" "}
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
