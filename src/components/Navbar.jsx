import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Rocket } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <motion.div
        className="absolute top-0 left-0 h-1 bg-primary-light z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="glass border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center space-x-3 group"
              aria-label="Home"
            >
              <div className="p-2 bg-primary-light/10 rounded-xl group-hover:rotate-12 transition-transform shadow-inner shadow-primary-light/20">
                <Rocket
                  className="w-8 h-8 text-primary-light drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                  aria-hidden="true"
                />
              </div>
              <span className="text-2xl font-black bg-linear-to-r from-primary-light to-secondary-light bg-clip-text text-transparent tracking-tighter">
                TRIOSTACK
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => {
                    if (location.pathname === link.path) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="relative group py-2"
                >
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-primary-light transition-colors">
                    {link.name}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light transition-all duration-500 group-hover:w-full shadow-[0_0_10px_rgba(0,255,204,0.5)]"
                    aria-hidden="true"
                  />
                </Link>
              ))}

              <Link
                to="/contact"
                className="bg-primary-light hover:bg-primary-dark text-dark px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,255,204,0.2)]"
              >
                Book a Specialist
              </Link>

              {user && (
                <Link
                  to="/admin/dashboard"
                  className="bg-primary-light/10 text-primary-light border border-primary-light/20 px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-primary-light hover:text-dark transition-all"
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 glass rounded-xl transition-transform text-slate-900 dark:text-white hover:text-primary-light ${isOpen ? "rotate-90 text-primary-light" : ""}`}
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <X aria-hidden="true" />
                ) : (
                  <Menu aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden glass border-t border-white/10 h-screen p-8 flex flex-col justify-center space-y-6 overflow-hidden absolute w-full top-full"
          >
            {navLinks.map((link) => (
              <motion.div variants={mobileItemVariants} key={link.path}>
                <Link
                  to={link.path}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (location.pathname === link.path) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="block text-4xl font-black tracking-tighter text-slate-900 dark:text-white hover:text-primary-light transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            {user && (
              <motion.div variants={mobileItemVariants}>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block text-xl font-black text-primary-light uppercase tracking-widest mt-8"
                >
                  Go to Dashboard
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
