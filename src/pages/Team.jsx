import React from "react";
import { motion } from "framer-motion";
import { Team as TeamSection } from "../components/LiveSections";

const Team = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="pt-32 pb-20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <TeamSection />
      </div>
    </motion.section>
  );
};

export default Team;
