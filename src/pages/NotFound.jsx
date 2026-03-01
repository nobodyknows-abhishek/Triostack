import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MoveLeft, Ghost } from "lucide-react";
import { heroEntrance } from "../animations/animePresets";

const NotFound = () => {
  useEffect(() => {
    heroEntrance(".notfound-container");
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 notfound-container opacity-0">
      <div className="text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-light/10 blur-[100px] -z-10 animate-pulse" />

        <div className="inline-block p-8 bg-white/5 border border-white/10 rounded-[3rem] shadow-2xl mb-12 group hover:rotate-6 transition-transform duration-500">
          <Ghost className="w-24 h-24 text-primary-light drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
        </div>

        <h1 className="hero-title text-8xl md:text-[12rem] font-black tracking-tighter mb-4 opacity-10 select-none">
          404
        </h1>

        <h2 className="hero-subtitle text-4xl md:text-6xl font-black mb-6 tracking-tight">
          Lost in the{" "}
          <span className="text-secondary-light text-glow">Void.</span>
        </h2>

        <p className="hero-stagger text-slate-500 max-w-md mx-auto mb-12 text-lg font-medium leading-relaxed">
          The coordinates you've entered lead to a non-existent vector. Let's
          navigate you back to safety.
        </p>

        <div className="hero-cta">
          <Link
            to="/"
            className="inline-flex items-center space-x-3 bg-primary-light hover:bg-primary-dark text-dark px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-primary-light/40 hover:-translate-y-1"
          >
            <MoveLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
            <span>Return to Mission Control</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
