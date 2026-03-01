import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const location = useLocation();
  const socialLinks = [
    { icon: Github, path: "#", label: "Github" },
    { icon: Twitter, path: "#", label: "Twitter" },
    { icon: Linkedin, path: "#", label: "LinkedIn" },
    { icon: Mail, path: "#", label: "Email" },
  ];

  return (
    <footer className="glass border-t border-white/5 mt-20 rounded-t-[4rem] relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary-light/50 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto py-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center space-x-3 group mb-8"
              aria-label="Home"
            >
              <span className="text-3xl font-black bg-linear-to-r from-primary-light to-secondary-light bg-clip-text text-transparent tracking-tighter">
                TRIOSTACK TECH
              </span>
            </Link>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-sm font-medium leading-relaxed">
              Engineering high-performance digital architectures and cinematic
              experiences for the world's most ambitious visionaries.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-8">
              Expertise
            </h3>
            <ul className="space-y-4">
              {[
                "Web Engineering",
                "UI/UX Architecture",
                "SAAS Logic",
                "Cloud Strategy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary-light transition-colors font-bold text-sm tracking-tight"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-8">
              Connect
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={i}
                    href={s.path}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-light transition-all rounded-xl shadow-xl"
                    aria-label={s.label}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">
            &copy; 2026 TRIOSTACK TECH. Engineered with Precision.
          </p>
          <div className="flex space-x-10">
            <a
              href="#"
              className="text-slate-500 dark:text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Privacy Protocol
            </a>
            <a
              href="#"
              className="text-slate-500 dark:text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Terms of Protocol
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
