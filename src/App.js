import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import TheDeepBlue from "./components/TheDeepBlue";
import AbyssSection from "./components/AbyssSection";
import PressureChamber from "./components/PressureChamber";
import BioluminescentIntelligence from "./components/BioluminescentIntelligence";
import TheCore from "./components/TheCore";

export default function App() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      style={{
        background: "#010816",
        minHeight: "500vh", // 5 sections stacked
        overflowX: "hidden",
      }}
    >
      {/* ===== SECTION 1 ===== */}
      <TheDeepBlue scrollYProgress={scrollYProgress} />

      {/* ===== SECTION 2 ===== */}
      <AbyssSection scrollYProgress={scrollYProgress} />

      {/* ===== SECTION 3 ===== */}
      <PressureChamber scrollYProgress={scrollYProgress} />

      {/* ===== SECTION 4 ===== */}
      <BioluminescentIntelligence scrollYProgress={scrollYProgress} />

      {/* ===== SECTION 5 ===== */}
      <TheCore scrollYProgress={scrollYProgress} />
    </div>
  );
}