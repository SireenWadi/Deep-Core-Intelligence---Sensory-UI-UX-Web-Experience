import { useRef } from "react";
import { motion, useTransform, useScroll, useSpring, useInView } from "framer-motion";

const PILLARS = [
  {
    num: "01",
    title: "Synaptic Pattern Recognition",
    body:
      "Drawing from the communication protocols of deep-sea organisms, our intelligence layer decodes complex behavioral patterns across billions of data points simultaneously. Each insight pulses outward like a bioluminescent signal, illuminating invisible connections between disparate data clusters.",
    accent: "#38bdf8",
  },
  {
    num: "02",
    title: "Neural Cascade Architecture",
    body:
      "Structured like the nervous system of a comb jellyfish — distributed, redundant, and infinitely adaptive. Our cascading neural layers process uncertainty without collapsing, routing intelligence through alternate pathways when primary channels encounter interference or noise.",
    accent: "#818cf8",
  },
  {
    num: "03",
    title: "Photonic Memory Arrays",
    body:
      "Light encodes faster than electricity. Our photonic memory model stores decision history in wave-based structures, enabling retrieval at speeds that traditional architectures cannot approach. The darker the operational environment, the brighter our recall becomes.",
    accent: "#34d399",
  },
];

const SECONDARY = [
  {
    title: "Autonomous Signal Calibration",
    body:
      "Self-tuning algorithms that recalibrate signal thresholds in real time, ensuring your intelligence layer maintains peak sensitivity regardless of environmental volatility or data volume fluctuations.",
  },
  {
    title: "Distributed Luminescence Network",
    body:
      "Like a colony of glowing organisms working in concert, our distributed nodes share state across a resilient mesh — no central point of failure, no dark zones, no blind spots in your operational data fabric.",
  },
];

function PillarCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        padding: "40px 36px",
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${item.accent}22`,
        borderRadius: "20px",
        backdropFilter: "blur(16px)",
        overflow: "hidden",
      }}
    >
      {/* Glow corner */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${item.accent}60, transparent)`,
      }} />

      <div style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: "13px",
        color: item.accent, opacity: 0.6, marginBottom: "16px",
        letterSpacing: "0.1em",
      }}>
        {item.num}
      </div>

      <h4 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(22px, 2.8vw, 30px)",
        color: "#e0f2fe", marginBottom: "18px",
        fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.01em",
      }}>
        {item.title}
      </h4>

      <p style={{
        color: "rgba(186,230,253,0.45)", fontSize: "14px",
        lineHeight: "1.85", fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
      }}>
        {item.body}
      </p>

      {/* Bottom accent dot */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", bottom: "24px", right: "24px",
          width: "8px", height: "8px", borderRadius: "50%",
          background: item.accent, boxShadow: `0 0 16px ${item.accent}`,
        }}
      />
    </motion.div>
  );
}

function SecondaryBlock({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        paddingTop: "32px",
        borderTop: "1px solid rgba(56,189,248,0.08)",
      }}
    >
      <h5 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(18px, 2.2vw, 24px)",
        color: "#bae6fd", marginBottom: "12px", fontWeight: 400,
      }}>
        {item.title}
      </h5>
      <p style={{
        color: "rgba(186,230,253,0.4)", fontSize: "13px",
        lineHeight: "1.8", fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
      }}>
        {item.body}
      </p>
    </motion.div>
  );
}

export default function BioluminescentIntelligence({ scrollYProgress }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const { scrollYProgress: localProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Jellyfish swimming motion
  const jellyY = useTransform(localProgress, [0, 1], [80, -80]);
  const jellyX = useTransform(localProgress, [0, 0.5, 1], [20, 0, -20]);
  const jellyOpacity = useTransform(localProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0.4]);
  const jellyScale = useTransform(localProgress, [0, 0.5, 1], [0.9, 1.02, 0.95]);
  const bgY = useTransform(localProgress, [0, 1], [-25, 25]);

  const smoothJellyY = useSpring(jellyY, { stiffness: 35, damping: 14 });
  const smoothJellyX = useSpring(jellyX, { stiffness: 35, damping: 14 });

  const sectionOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <>
      <style>{`
        @keyframes jellyfishPulse {
          0%, 100% { transform: translateY(0px) scaleX(1) scaleY(1); }
          25% { transform: translateY(-20px) scaleX(0.96) scaleY(1.04); }
          50% { transform: translateY(-30px) scaleX(1) scaleY(1); }
          75% { transform: translateY(-18px) scaleX(1.03) scaleY(0.97); }
        }
        .jelly-swim {
          animation: jellyfishPulse 7s ease-in-out infinite;
        }
        @keyframes tentacleWave {
          0%, 100% { transform: skewX(0deg) translateY(0); }
          33% { transform: skewX(2deg) translateY(4px); }
          66% { transform: skewX(-2deg) translateY(-2px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
      `}</style>

      <motion.section
        ref={sectionRef}
        style={{
          position: "relative", minHeight: "100vh", width: "100%",
          background: "#010816", overflow: "hidden",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          opacity: sectionOpacity,
        }}
      >
        {/* Background video */}
        <motion.div style={{ position: "absolute", inset: 0, zIndex: 0, y: bgY }}>
          <video autoPlay loop muted playsInline style={{
            width: "100%", height: "110%", objectFit: "cover",
            opacity: 0.22, position: "absolute", top: "-5%",
          }}>
            <source src="/bioluminescent-bg.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #010816 0%, transparent 12%, transparent 88%, #010816 100%)",
          }} />
        </motion.div>

        {/* Radial intelligence glow */}
        <div className="glow-pulse" style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 30%, rgba(56,189,248,0.12) 0%, transparent 55%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse at 25% 75%, rgba(129,140,248,0.07) 0%, transparent 50%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse at 80% 60%, rgba(52,211,153,0.06) 0%, transparent 45%)",
        }} />

        {/* Big background number */}
        <div style={{
          position: "absolute", top: "-3rem", left: "50%", transform: "translateX(-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(12rem, 25vw, 22rem)",
          color: "#818cf8", opacity: 0.04, zIndex: 2,
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        }}>04</div>

        {/* MAIN CONTENT */}
        <div style={{
          position: "relative", zIndex: 10, width: "100%",
          maxWidth: "1280px", padding: "100px 48px",
        }}>

          {/* ── TOP: Title + Jellyfish center ── */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "center", marginBottom: "100px",
          }}>

            {/* Left: Text content */}
            <div ref={titleRef}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  color: "#818cf8", letterSpacing: "0.5em", fontSize: "11px",
                  fontWeight: 500, marginBottom: "20px", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                BIOLUMINESCENT INTELLIGENCE
              </motion.p>

              <div style={{ overflow: "hidden" }}>
                <motion.h2
                  initial={{ opacity: 0, y: 60 }}
                  animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(40px, 6.5vw, 80px)",
                    lineHeight: 0.9, color: "#f0f9ff",
                    marginBottom: "32px", letterSpacing: "-0.03em",
                    textShadow: "0 0 50px rgba(129,140,248,0.25)",
                  }}
                >
                  Patterns Emerge<br />
                  <span style={{ fontStyle: "italic", color: "#a5b4fc" }}>From Darkness</span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  color: "rgba(186,230,253,0.5)", fontSize: "16px",
                  lineHeight: "1.85", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300, marginBottom: "40px",
                }}
              >
                Like the anglerfish that hunts in absolute darkness using living light,
                our intelligence system generates its own illumination — revealing signal
                where others see only static. Every decision is made with photon-precise clarity,
                guided by evolutionary instincts forged across billions of data cycles.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  color: "rgba(186,230,253,0.38)", fontSize: "14px",
                  lineHeight: "1.8", fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                }}
              >
                Drawing from the communication protocols of comb jellyfish and
                deep-sea siphonophores, we have engineered a distributed cognition
                model that functions as a single unified intelligence across any
                scale of deployment — from a single query to planetary-scale inference.
              </motion.p>
            </div>

            {/* Right: Jellyfish swimming */}
            <motion.div
              style={{
                position: "relative", display: "flex",
                justifyContent: "center", alignItems: "center",
                height: "480px",
                y: smoothJellyY, x: smoothJellyX,
                opacity: jellyOpacity, scale: jellyScale,
              }}
            >
              {/* Outer ambient glow */}
              <div style={{
                position: "absolute", inset: "-15%",
                background: "radial-gradient(circle, rgba(129,140,248,0.2) 0%, transparent 65%)",
                borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none",
              }} />

              {/* Secondary glow ring */}
              <motion.div
                animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: "-8%",
                  background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 60%)",
                  borderRadius: "50%", filter: "blur(30px)", pointerEvents: "none",
                }}
              />

              {/* Jellyfish with swimming animation */}
              <div className="jelly-swim" style={{ position: "relative", zIndex: 2 }}>
                <img
                  src="/jellyfish-glow.png"
                  alt="Bioluminescent Jellyfish"
                  style={{
                    width: "clamp(280px, 40vw, 460px)",
                    filter: "drop-shadow(0 0 60px rgba(129,140,248,0.5)) drop-shadow(0 0 30px rgba(56,189,248,0.3))",
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* Floating intelligence dots */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.1, 0.9, 0.1],
                    scale: [0.6, 1.5, 0.6],
                    x: [0, (i % 2 === 0 ? 8 : -8), 0],
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.3, repeat: Infinity,
                    delay: i * 0.4, ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    width: `${3 + (i % 4) * 2}px`,
                    height: `${3 + (i % 4) * 2}px`,
                    borderRadius: "50%",
                    background: i % 3 === 0 ? "#818cf8" : i % 3 === 1 ? "#38bdf8" : "#34d399",
                    top: `${8 + i * 9}%`,
                    left: i % 2 === 0 ? `${6 + i * 4}%` : `${78 - i * 4}%`,
                    boxShadow: `0 0 16px ${i % 3 === 0 ? "#818cf8" : i % 3 === 1 ? "#38bdf8" : "#34d399"}`,
                    zIndex: 3,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* ── MIDDLE: Three pillar cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px", marginBottom: "80px",
          }}>
            {PILLARS.map((item, i) => (
              <PillarCard key={i} item={item} index={i} />
            ))}
          </div>

          {/* ── BOTTOM: Two secondary blocks + CTA ── */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "60px", marginBottom: "64px",
          }}>
            {SECONDARY.map((item, i) => (
              <SecondaryBlock key={i} item={item} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.button
              whileHover={{
                backgroundColor: "rgba(129,140,248,0.15)",
                borderColor: "rgba(129,140,248,0.7)",
                boxShadow: "0 0 40px rgba(129,140,248,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "16px 44px", borderRadius: "100px",
                border: "1px solid rgba(129,140,248,0.3)",
                color: "#f0f9ff", letterSpacing: "0.4em",
                fontSize: "10px", fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "10px",
              }}
            >
              <span style={{ fontSize: "14px" }}>▶</span> AI-POWERED VR
            </motion.button>

            <motion.button
              whileHover={{
                backgroundColor: "rgba(56,189,248,0.08)",
                borderColor: "rgba(56,189,248,0.5)",
                boxShadow: "0 0 40px rgba(56,189,248,0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "16px 44px", borderRadius: "100px",
                border: "1px solid rgba(56,189,248,0.18)",
                color: "#bae6fd", letterSpacing: "0.4em",
                fontSize: "10px", fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "10px",
              }}
            >
              UPSKILL BUILDING <span style={{ fontSize: "14px" }}>→</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
          background: "linear-gradient(to bottom, transparent, #010816)",
          zIndex: 8, pointerEvents: "none",
        }} />
      </motion.section>
    </>
  );
}
