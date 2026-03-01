import React from "react";
import { motion } from "framer-motion";
import { Award, Zap, Users, Target, CheckCircle2 } from "lucide-react";

// Extracted static data outside component to prevent recreation on every render
const STATS = [
  { label: "Founded", value: "2026", icon: Zap },
  { label: "Projects Incoming", value: "0→∞", icon: Award },
  { label: "Core Team", value: "3", icon: Users },
  { label: "Commitment", value: "100%", icon: Target },
];

const FEATURES = [
  "From Idea to Launch — Faster Than Traditional Agencies",
  "Scalable Systems Built for Real-World Growth",
  "Interfaces Designed to Convert, Not Just Impress",
];

// Framer Motion variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const About = () => {
  return (
    <section
      className="pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden px-6 relative"
      aria-labelledby="about-heading"
    >
      {/* Background ambient light effects */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-[120px] -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary-light/10 rounded-full blur-[100px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center mb-20 md:mb-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block self-start px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-secondary-light uppercase bg-secondary-light/10 rounded-full border border-secondary-light/20"
            >
              Our Origin Story
            </motion.div>

            <motion.h1
              variants={itemVariants}
              id="about-heading"
              className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black mb-8 leading-none tracking-tighter text-slate-900 dark:text-white"
            >
              Bespoke <br />
              <span className="text-glow text-primary-light">Mastery</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium"
            >
              TRIOSTACK TECH is not an agency. We are a high-performance
              collective of independent specialists who unite to build digital
              engines that outperform the competition. No middle-management,
              just direct mastery.
            </motion.p>

            <motion.ul
              variants={containerVariants}
              className="space-y-5"
              role="list"
            >
              {FEATURES.map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-8 h-8 bg-primary-light/10 dark:bg-primary-light/20 text-primary-light rounded-xl flex items-center justify-center text-sm shadow-sm border border-primary-light/20 group-hover:bg-primary-light group-hover:text-white transition-colors duration-300">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="font-bold uppercase tracking-wider text-sm text-slate-800 dark:text-slate-200">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div
              className="absolute inset-0 bg-primary-light/5 blur-[80px] -z-10 animate-pulse rounded-full"
              aria-hidden="true"
            />
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="glass p-6 md:p-8 rounded-3xl text-center border border-white/10 dark:border-white/5 transition-colors duration-500 hover:bg-white/10 dark:hover:bg-white/5 hover:shadow-[0_20px_40px_-15px_rgba(0,255,204,0.15)] flex flex-col items-center justify-center"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-light to-secondary-light text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-500 hover:rotate-6">
                      <Icon
                        className="w-6 h-6 md:w-8 md:h-8"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-3xl md:text-4xl font-black mb-2 tracking-tighter text-slate-900 dark:text-white transition-colors duration-300">
                      {s.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em]">
                      {s.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="glass p-8 md:p-16 lg:p-20 rounded-[2.5rem] md:rounded-[4rem] text-center bg-mesh border border-white/10 dark:border-white/5 relative overflow-hidden shadow-2xl shadow-primary-light/5"
        >
          <div
            className="absolute top-0 rotate-180 left-0 w-full h-full bg-gradient-to-b from-primary-light/10 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <h2 className="text-sm md:text-base font-black mb-6 md:mb-8 uppercase tracking-[0.3em] text-primary-light">
            Our Critical Mission
          </h2>
          <p className="text-2xl md:text-4xl lg:text-5xl text-slate-900 dark:text-white font-black max-w-4xl mx-auto leading-tight md:leading-tight lg:leading-tight tracking-tighter relative z-10">
            "We empower global visionaries by engineering
            <span className="text-glow text-secondary-light mx-2 inline-block">
              elite tools
            </span>
            that redefine what's possible."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
