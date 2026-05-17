import React, { useRef } from "react";
// تم الإبقاء فقط على useScroll لأنها المستخدمة فعلياً هنا
import { useScroll } from "framer-motion";

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
      <TheDeepBlue scrollYProgress={scrollYProgress} />

      <AbyssSection scrollYProgress={scrollYProgress} />

      <PressureChamber scrollYProgress={scrollYProgress} />

      <BioluminescentIntelligence scrollYProgress={scrollYProgress} />

      <TheCore scrollYProgress={scrollYProgress} />
    </div>
  );
}
