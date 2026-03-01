import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code, X } from "lucide-react";

const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const rawTech = project.tech_stack;
  let techArray = [];
  if (Array.isArray(rawTech)) {
    techArray = rawTech;
  } else if (typeof rawTech === "string") {
    techArray = rawTech
      .split(/[\n,]+/)
      .map((t) => t.trim())
      .filter(Boolean);
  }
  const displayTech = techArray.slice(0, 4);
  const extraTechCount = techArray.length > 4 ? techArray.length - 4 : 0;

  // Stop click from propagating to the parent card when clicking external links
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="group relative glass rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 hover:border-primary-light/30 dark:hover:border-primary-light/50 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,255,204,0.15)] bg-white/50 dark:bg-dark/50 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-16/10 w-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
          <img
            src={
              project.image_url ||
              "https://via.placeholder.com/800x500/1e293b/ffffff?text=Project+Preview"
            }
            alt={`Preview of project: ${project.title}`}
            loading="lazy"
            className="w-full h-full object-fit group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 dark:from-dark/90 via-slate-900/20 dark:via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <div className="flex space-x-4">
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  aria-label={`Visit live site for ${project.title}`}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary-light transition-colors shadow-lg hover:shadow-primary-light/50"
                >
                  <ExternalLink className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  aria-label={`View GitHub repository for ${project.title}`}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-slate-800 transition-colors shadow-lg"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div
            className="flex flex-wrap gap-2 mb-6"
            aria-label="Technologies used"
          >
            {displayTech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-[10px] font-black tracking-widest uppercase bg-primary-light/10 text-primary-light rounded-full border border-primary-light/20 truncate max-w-30"
                title={tech}
              >
                {tech}
              </span>
            ))}
            {extraTechCount > 0 && (
              <span className="px-3 py-1.5 text-[10px] font-black tracking-widest uppercase bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-300 rounded-full border border-slate-300 dark:border-white/10">
                +{extraTechCount}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-primary-light transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar glass bg-white/95 dark:bg-dark/95 border border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 p-6 md:p-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 rounded-full transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 rounded-2xl md:rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 relative">
                <img
                  src={
                    project.image_url ||
                    "https://via.placeholder.com/800x500/1e293b/ffffff?text=Project+Preview"
                  }
                  alt={`Preview of project: ${project.title}`}
                  className="w-full h-full object-center relative z-10"
                />
              </div>

              {/* Modal Details */}
              <div className="w-full md:w-1/2 flex flex-col py-2 md:py-6">
                <h2
                  id="modal-title"
                  className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
                >
                  {project.title}
                </h2>

                <div
                  className="flex flex-wrap gap-2 mb-8"
                  aria-label="All technologies used"
                >
                  {techArray.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-xs font-bold tracking-wider uppercase bg-primary-light/10 text-primary-light rounded-full border border-primary-light/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 mb-10">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-auto">
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-8 py-4 bg-primary-light text-dark font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary-dark transition-colors"
                    >
                      <span>Live Site</span>
                      <ExternalLink
                        className="w-4 h-4 text-dark"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-8 py-4 glass border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <span>Source Code</span>
                      <Github className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
