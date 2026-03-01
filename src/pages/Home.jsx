import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRealtime } from "../hooks/useRealtime";
import ProjectCard from "../components/ProjectCard";
import { ArrowRight, Code, Palette, Globe, Layers } from "lucide-react";
import { Team } from "../components/LiveSections";

// --- Extracted Static Data ---
const SERVICES_DATA = [
  {
    icon: Code,
    title: "Artisanal Code",
    desc: "Handcrafted engineering using modern frameworks and minimalist logic.",
  },
  {
    icon: Palette,
    title: "Motion Systems",
    desc: "Choreographed interfaces that tell your brand's story through movement.",
  },
  {
    icon: Globe,
    title: "Strategic Growth",
    desc: "Direct-to-expert SEO and performance audits that drive global visibility.",
  },
  {
    icon: Layers,
    title: "Architectural Core",
    desc: "Lean, scalable infrastructures designed for high-stakes digital products.",
  },
];

// --- Framer Motion Variants ---
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

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center pt-28 md:pt-20 overflow-hidden"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content"
        >
          <motion.div
            variants={itemVariants}
            className="hero-status inline-flex items-center space-x-3 mb-8 px-5 py-2 glass rounded-full border border-white/5 animate-pulse"
          >
            <div
              className="w-2 h-2 bg-primary-light rounded-full shadow-[0_0_10px_rgba(0,229,255,0.8)]"
              aria-hidden="true"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-light/80">
              FUTURE READY DEVELOPMENT
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="hero-title text-[13vw] sm:text-[11vw] md:text-8xl lg:text-[12rem] font-black mb-6 leading-[0.85] tracking-tighter text-slate-900 dark:text-white uppercase italic"
          >
            TRIO<span className="text-primary-light">STACK</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="hero-subtitle max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-16 leading-relaxed font-medium tracking-wide"
          >
            An elite collective of independent masters engineering the next
            generation of high-stakes digital products.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="hero-cta flex flex-wrap justify-center gap-6 md:gap-10"
          >
            <Link
              to="/projects"
              className="group relative w-full md:w-auto text-center px-12 py-5 bg-white text-slate-900 font-black uppercase tracking-widest text-xs overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 block"
            >
              <span className="relative z-10">View Portfolio</span>
              <div
                className="absolute inset-0 bg-primary-light translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                aria-hidden="true"
              />
            </Link>
            <Link
              to="/contact"
              className="group w-full md:w-auto text-center px-12 py-5 border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/40 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs transition-all duration-700 hover:scale-[1.02] hover:bg-slate-200 dark:hover:bg-white/5 hover:shadow-[0_10px_30px_-15px_rgba(255,255,255,0.2)] active:scale-95 hover:-translate-y-1 block"
            >
              Request Access
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cinematic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
        aria-hidden="true"
      >
        <div className="w-[1px] h-16 bg-linear-to-b from-primary-light to-transparent" />
      </motion.div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 md:py-40 relative px-4 sm:px-0"
    >
      <div className="text-center mb-20 md:mb-40">
        <motion.h2
          id="services-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[10rem] font-black mb-10 tracking-tighter text-slate-900 dark:text-white uppercase italic"
        >
          The <span className="text-primary-light">Core</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-black uppercase tracking-[0.4em] text-[10px]"
        >
          Engineering Excellence / Triostack Collective
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {SERVICES_DATA.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-accent p-12 rounded-2xl group transition-all duration-500 border border-white/5 hover:border-primary-light/30 hover:shadow-[0_20px_40px_-15px_rgba(0,255,204,0.1)] hover:bg-white/10 dark:hover:bg-white/5"
            >
              <div className="w-16 h-16 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center mb-10 group-hover:bg-primary-light group-hover:text-slate-900 transition-all duration-500 shadow-xl shadow-primary-light/5 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,255,204,0.4)]">
                <Icon size={32} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-black mb-6 group-hover:text-primary-light transition-colors text-slate-900 dark:text-white">
                {s.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

const FeaturedProjectsSection = () => {
  const { data: projects, loading } = useRealtime("projects");

  return (
    <section
      id="projects"
      aria-labelledby="featured-projects-heading"
      className="py-12 md:py-20 px-4 sm:px-0"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <h2
            id="featured-projects-heading"
            className="text-[10vw] sm:text-5xl lg:text-6xl font-black mb-4 tracking-tighter text-slate-900 dark:text-white leading-none"
          >
            Featured <span className="text-secondary-light">Works</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md font-medium text-lg">
            Handpicked selection of our most impactful digital solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Link
            to="/projects"
            className="group flex items-center space-x-2 text-primary-light font-black text-lg hover:text-primary-dark transition-colors"
          >
            <span>Explore All Projects</span>
            <ArrowRight
              className="w-6 h-6 group-hover:translate-x-2 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {loading
          ? [1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 glass animate-pulse rounded-[2.5rem]"
              />
            ))
          : projects.slice(0, 3).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15 + 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
      </motion.div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ServicesSection />
        <FeaturedProjectsSection />
        <Team />
      </div>
    </div>
  );
};

export default Home;
