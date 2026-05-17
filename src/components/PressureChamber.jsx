import { useRef } from "react";
import { motion, useTransform, useScroll, useSpring, useInView } from "framer-motion";

const STATS = [
  { value: "99.8%", label: "Uptime Reliability" },
  { value: "0.3ms", label: "Response Latency" },
  { value: "∞", label: "Scalable Depth" },
];

const FEATURES_LEFT = [
  {
    title: "Neural Compression Engine",
    body:
      "Our proprietary pressure-mapping system compresses terabytes of raw intelligence into crystalline decision packets — each one refined under the weight of deep-ocean computation. No signal is lost. Every pattern survives the descent.",
  },
  {
    title: "Thermal Gradient Processing",
    body:
      "Inspired by hydrothermal vents, our architecture channels extreme data differentials into coherent streams of insight. Heat becomes precision. Pressure becomes clarity. Complexity becomes your competitive advantage.",
  },
];

const FEATURES_RIGHT = [
  {
    title: "Adaptive Structural Memory",
    body:
      "Like pressure-resistant titanium shells, our memory modules flex without fracturing. Each system reconfigures in real time — absorbing spike loads, rerouting around failure points, and maintaining structural integrity under any operational depth.",
  },
  {
    title: "Deep Signal Routing",
    body:
      "Signals navigate the labyrinth of your data architecture with sonar-like precision. Every query finds its answer. Every decision reaches its destination — even through the most turbulent informational currents.",
  },
];

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textAlign: "center",
        padding: "28px 24px",
        background: "rgba(56,189,248,0.04)",
        border: "1px solid rgba(56,189,248,0.12)",
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(36px, 5vw, 56px)",
          color: "#38bdf8",
          lineHeight: 1,
          marginBottom: "8px",
          fontWeight: 300,
          textShadow: "0 0 30px rgba(56,189,248,0.5)",
        }}
      >
        {stat.value}
      </div>
      <div
        style={{
          color: "rgba(186,230,253,0.5)",
          fontSize: "11px",
          letterSpacing: "0.3em",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
        }}
      >
        {stat.label.toUpperCase()}
      </div>
    </motion.div>
  );
}

function FeatureBlock({ item, index, fromLeft }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginBottom: "36px",
        paddingBottom: "36px",
        borderBottom: "1px solid rgba(56,189,248,0.07)",
      }}
    >
      <h4
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(20px, 2.5vw, 26px)",
          color: "#e0f2fe",
          marginBottom: "14px",
          fontWeight: 400,
          letterSpacing: "-0.01em",
        }}
      >
        {item.title}
      </h4>
      <p
        style={{
          color: "rgba(186,230,253,0.45)",
          fontSize: "14px",
          lineHeight: "1.85",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
        }}
      >
        {item.body}
      </p>
    </motion.div>
  );
}

export default function PressureChamber({ scrollYProgress }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const { scrollYProgress: localProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Submarine swimming animation
  const subY = useTransform(localProgress, [0, 1], [60, -60]);
  const subX = useTransform(localProgress, [0, 0.5, 1], [-20, 0, 20]);
  const subOpacity = useTransform(localProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.5]);
  const subRotate = useTransform(localProgress, [0, 0.5, 1], [-1.5, 0, 1.5]);
  const bgY = useTransform(localProgress, [0, 1], [-20, 20]);

  const smoothSubY = useSpring(subY, { stiffness: 40, damping: 16 });
  const smoothSubX = useSpring(subX, { stiffness: 40, damping: 16 });

  const sectionOpacity = useTransform(scrollYProgress, [0.32, 0.48], [0, 1]);

  return (
    <>
      <style>{`
        @keyframes rovFloat {
          0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
          40% { transform: translateY(-22px) rotate(0.8deg); }
          70% { transform: translateY(-12px) rotate(-0.3deg); }
        }
        .rov-swim {
          animation: rovFloat 6s ease-in-out infinite;
        }
        @keyframes pressurePulse {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.18; transform: scale(1.04); }
        }
        .pressure-glow {
          animation: pressurePulse 4s ease-in-out infinite;
        }
        @keyframes bubbleDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-80px) translateX(12px); opacity: 0; }
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          background: "#010816",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: sectionOpacity,
        }}
      >
        {/* Background Video */}
        <motion.div style={{ position: "absolute", inset: 0, zIndex: 0, y: bgY }}>
          <video
            autoPlay loop muted playsInline
            style={{
              width: "100%", height: "110%",
              objectFit: "cover", opacity: 0.3,
              position: "absolute", top: "-5%",
            }}
          >
            <source src="/pressure-bg.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #010816 0%, transparent 12%, transparent 88%, #010816 100%)",
          }} />
        </motion.div>

        {/* Pressure overlay */}
        <video
          autoPlay loop muted playsInline
          style={{
            position: "absolute", width: "120%", height: "120%",
            objectFit: "cover", opacity: 0.08, mixBlendMode: "screen",
            zIndex: 1, pointerEvents: "none",
          }}
        >
          <source src="/pressure-overlay.mp4" type="video/mp4" />
        </video>

        {/* Radial glows */}
        <div className="pressure-glow" style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 40%, rgba(56,189,248,0.12) 0%, transparent 60%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse at 80% 70%, rgba(99,102,241,0.07) 0%, transparent 45%)",
        }} />

        {/* Section number background */}
        <div style={{
          position: "absolute", top: "-4rem", left: "50%", transform: "translateX(-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(12rem, 25vw, 22rem)",
          color: "#38bdf8", opacity: 0.04, zIndex: 2,
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        }}>03</div>

        {/* MAIN CONTENT */}
        <div style={{
          position: "relative", zIndex: 10, width: "100%",
          maxWidth: "1280px", padding: "100px 48px",
        }}>

          {/* ── TOP: Overline + Title + Subtitle ── */}
          <div ref={titleRef} style={{ textAlign: "center", marginBottom: "80px" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: "#38bdf8", letterSpacing: "0.5em", fontSize: "11px",
                fontWeight: 500, marginBottom: "20px", fontFamily: "'DM Sans', sans-serif",
              }}
            >
              PRESSURE CHAMBER
            </motion.p>

            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ opacity: 0, y: 60 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(44px, 8vw, 96px)",
                  lineHeight: 0.9, color: "#f0f9ff",
                  marginBottom: "32px", letterSpacing: "-0.03em",
                  textShadow: "0 0 60px rgba(125,211,252,0.2)",
                }}
              >
                Handling<br />
                <span style={{ fontStyle: "italic", color: "#7dd3fc" }}>Complexity</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: "rgba(186,230,253,0.5)", fontSize: "17px",
                lineHeight: "1.8", maxWidth: "600px", margin: "0 auto 48px",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              }}
            >
              Every signal is compressed, every decision emerges under the crushing 
              weight of deep data pressure — refined into pure, actionable intelligence.
            </motion.p>

            {/* Stats row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px", maxWidth: "700px", margin: "0 auto",
            }}>
              {STATS.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
            </div>
          </div>

          {/* ── MIDDLE: Submarine swimming center ── */}
          <motion.div
            style={{
              position: "relative", display: "flex",
              justifyContent: "center", alignItems: "center",
              height: "380px", marginBottom: "80px",
              y: smoothSubY, x: smoothSubX,
              opacity: subOpacity, rotate: subRotate,
            }}
          >
            {/* Outer glow ring */}
            <div style={{
              position: "absolute",
              width: "600px", height: "300px",
              background: "radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, transparent 70%)",
              filter: "blur(40px)", pointerEvents: "none",
            }} />

            {/* Bubble trail behind sub */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0, 0.4, 0], y: [-10, -60], x: [0, (i % 2 === 0 ? 8 : -8)] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: `${28 + i * 4}%`,
                  bottom: "35%",
                  width: `${3 + (i % 3) * 2}px`,
                  height: `${3 + (i % 3) * 2}px`,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.5)",
                  border: "0.5px solid rgba(255,255,255,0.3)",
                }}
              />
            ))}

            {/* ROV Submarine with swimming animation */}
            <div className="rov-swim" style={{ position: "relative", zIndex: 2 }}>
              <img
                src="/rov-submarine.png"
                alt="ROV Submarine"
                style={{
                  width: "clamp(320px, 45vw, 560px)",
                  filter: "drop-shadow(0 0 50px rgba(56,189,248,0.4)) drop-shadow(0 0 20px rgba(56,189,248,0.25))",
                  mixBlendMode: "screen",
                }}
              />
            </div>

            {/* Bioluminescent dots around sub */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.7, 1.4, 0.7] }}
                transition={{
                  duration: 2 + i * 0.35, repeat: Infinity,
                  delay: i * 0.45, ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  width: `${3 + i * 1.5}px`, height: `${3 + i * 1.5}px`,
                  borderRadius: "50%",
                  background: i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#818cf8" : "#34d399",
                  top: `${10 + i * 11}%`,
                  left: i % 2 === 0 ? `${5 + i * 4}%` : `${72 - i * 3}%`,
                  boxShadow: `0 0 14px ${i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#818cf8" : "#34d399"}`,
                  zIndex: 3,
                }}
              />
            ))}
          </motion.div>

          {/* ── BOTTOM: Two-column text ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "start",
          }}>
            {/* Left column */}
            <div>
              {FEATURES_LEFT.map((item, i) => (
                <FeatureBlock key={i} item={item} index={i} fromLeft={true} />
              ))}
            </div>

            {/* Right column */}
            <div>
              {FEATURES_RIGHT.map((item, i) => (
                <FeatureBlock key={i} item={item} index={i} fromLeft={false} />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex", gap: "20px",
              justifyContent: "center", marginTop: "64px",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              whileHover={{
                backgroundColor: "rgba(56,189,248,0.15)",
                borderColor: "rgba(56,189,248,0.7)",
                boxShadow: "0 0 40px rgba(56,189,248,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "16px 40px", borderRadius: "100px",
                border: "1px solid rgba(56,189,248,0.3)",
                color: "#f0f9ff", letterSpacing: "0.4em",
                fontSize: "10px", fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "10px",
              }}
            >
              <span style={{ fontSize: "14px" }}>▶</span> EXPLORE DEPTH
            </motion.button>

            <motion.button
              whileHover={{
                backgroundColor: "rgba(129,140,248,0.1)",
                borderColor: "rgba(129,140,248,0.5)",
                boxShadow: "0 0 40px rgba(129,140,248,0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "16px 40px", borderRadius: "100px",
                border: "1px solid rgba(129,140,248,0.2)",
                color: "#c7d2fe", letterSpacing: "0.4em",
                fontSize: "10px", fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "10px",
              }}
            >
              GET THE SPECS <span style={{ fontSize: "14px" }}>→</span>
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
