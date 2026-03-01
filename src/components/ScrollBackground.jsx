import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

const ScrollBackground = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  // Define morphing paths with EXACTLY the same structure to prevent anime.js errors
  // M x,y L x,y L x,y L x,y L x,y L x,y Z
  const paths = [
    "M 50,5 L 89,27.5 L 89,72.5 L 50,95 L 11,72.5 L 11,27.5 Z", // Hexagon
    "M 10,10 L 50,10 L 90,10 L 90,90 L 50,90 L 10,90 Z", // Square
    "M 50,10 L 70,50 L 90,90 L 50,90 L 10,90 L 30,50 Z", // Triangle
    "M 50,10 L 70,30 L 90,50 L 50,90 L 10,50 L 30,30 Z", // Diamond
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);

      // Calculate rotation based on scroll
      if (containerRef.current) {
        containerRef.current.style.transform = `rotate(${scrollPercent * 360}deg) scale(${1 + scrollPercent * 0.5})`;
      }

      // Morph path based on scroll quadrants
      const pathIndex = Math.min(
        Math.floor(scrollPercent * paths.length),
        paths.length - 1,
      );
      if (pathRef.current) {
        animate(pathRef.current, {
          d: paths[pathIndex],
          duration: 800,
          easing: "easeOutQuart",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none flex items-center justify-center overflow-hidden opacity-20 dark:opacity-10 transition-opacity duration-1000">
      <div
        ref={containerRef}
        className="relative w-[150vh] h-[150vh] transition-transform duration-100 ease-out"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-primary-light stroke-[0.1]"
        >
          <path
            ref={pathRef}
            d={paths[0]}
            className="transition-all duration-700"
          />
          {/* Add a secondary wireframe for depth */}
          <path
            d="M 50,15 L 80,32.5 L 80,67.5 L 50,85 L 20,67.5 L 20,32.5 Z"
            className="stroke-secondary-light/30 stroke-[0.05]"
          />
        </svg>
      </div>
      {/* Cinematic Fog Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-50 dark:from-dark via-transparent to-slate-50 dark:to-dark opacity-80 dark:opacity-60" />
    </div>
  );
};

export default ScrollBackground;
