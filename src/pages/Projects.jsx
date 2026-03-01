import React from "react";
import { motion } from "framer-motion";
import { useRealtime } from "../hooks/useRealtime";
import ProjectCard from "../components/ProjectCard";

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

const Projects = () => {
  const { data: projects, loading } = useRealtime("projects");

  return (
    <section
      aria-labelledby="projects-heading"
      className="pt-32 md:pt-44 pb-20 md:pb-32 px-4 md:px-6 min-h-screen text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-secondary-light uppercase bg-secondary-light/10 rounded-full border border-secondary-light/20">
            Portfolio
          </div>
          <h1
            id="projects-heading"
            className="text-[12vw] sm:text-5xl md:text-6xl lg:text-8xl font-black mb-8 leading-none tracking-tighter"
          >
            Our Digital{" "}
            <span className="text-glow text-primary-light">Archive</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            A comprehensive showcase of high-performance solutions, spanning
            from disruptive startups to global enterprise architectures.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={!loading ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-112.5 bg-white/5 dark:bg-dark/50 animate-pulse rounded-[3rem] border border-slate-200 dark:border-white/5"
              />
            ))
          ) : projects.length > 0 ? (
            projects.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full py-40 text-center glass rounded-[4rem] border border-white/10"
            >
              <p className="text-2xl text-slate-500 font-black uppercase tracking-widest">
                Archive is currently empty.
              </p>
              <p className="text-slate-400 mt-2">
                New revolutionary projects coming soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
