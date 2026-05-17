import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// ===== فقاعات خاصة بقسم Abyss =====
const ABYSS_BUBBLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 8 + 2,
  duration: Math.random() * 12 + 10,
  delay: Math.random() * 15,
  opacity: Math.random() * 0.25 + 0.06,
  sway: Math.random() * 40 - 20,
}));

// ===== ميزات النقاط =====
const FEATURES = [
  {
    label: "Bioluminescent Interface",
    desc: "Every interaction glows with life, mirroring the deep-sea creatures that light their own path.",
  },
  {
    label: "Adaptive Intelligence",
    desc: "Systems that evolve with your environment — fluid, reactive, and always in motion.",
  },
  {
    label: "Immersive Ecosystem",
    desc: "A seamless digital ocean where your data flows freely across interconnected currents.",
  },
];

// ===== مكوّن بطاقة الميزة =====
function FeatureItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
        padding: "28px 0",
        borderBottom: "1px solid rgba(56,189,248,0.08)",
      }}
    >
      {/* رقم متسلسل */}
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "13px",
          color: "#38bdf8",
          opacity: 0.6,
          minWidth: "28px",
          paddingTop: "4px",
        }}
      >
        0{index + 1}
      </span>

      <div>
        <h4
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "22px",
            color: "#e0f2fe",
            marginBottom: "8px",
            fontWeight: 400,
          }}
        >
          {item.label}
        </h4>
        <p
          style={{
            color: "rgba(186,230,253,0.45)",
            fontSize: "14px",
            lineHeight: "1.7",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
          }}
        >
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ===== المكوّن الرئيسي =====
export default function AbyssSection() {
  const sectionRef = useRef(null);
  const creatureRef = useRef(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax للكائن البحري
  const creatureY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const creatureScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.05]);
  const creatureOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);

  // Parallax للرقم الكبير
  const numY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 0.12, 0.12, 0]);

  // Parallax للخلفية
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Glow animation للكائن
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.2, 0.45, 0.25]);

  const smoothCreatureY = useSpring(creatureY, { stiffness: 50, damping: 18 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .abyss-bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent);
          border: 0.5px solid rgba(255,255,255,0.18);
          animation: abyssBubbleRise linear infinite;
          pointer-events: none;
          z-index: 3;
        }

        @keyframes abyssBubbleRise {
          0% {
            transform: translateY(110vh) translateX(0px);
            opacity: 0;
          }
          8% { opacity: var(--ab-opacity); }
          88% { opacity: var(--ab-opacity); }
          100% {
            transform: translateY(-15vh) translateX(var(--ab-sway));
            opacity: 0;
          }
        }

        @keyframes creatureFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(0.8deg); }
          66% { transform: translateY(-10px) rotate(-0.5deg); }
        }

        .creature-float {
          animation: creatureFloat 7s ease-in-out infinite;
        }
      `}</style>

      <section
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
        }}
      >
        {/* ===== خلفية الفيديو ===== */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            y: bgY,
          }}
        >
          <video
            autoPlay loop muted playsInline
            style={{
              width: "100%",
              height: "110%",
              objectFit: "cover",
              opacity: 0.18,
              top: "-5%",
              position: "absolute",
            }}
          >
            <source src="/ocean-bg.mp4" type="video/mp4" />
          </video>

          {/* تدرج لدمج القسمين */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, #010816 0%, transparent 15%, transparent 85%, #010816 100%)",
            }}
          />
        </motion.div>

        {/* ===== طبقة Caustic Light ===== */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(56,189,248,0.05) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(99,102,241,0.04) 0%, transparent 50%)",
          }}
        />

        {/* ===== الفقاعات ===== */}
        {ABYSS_BUBBLES.map((b) => (
          <div
            key={b.id}
            className="abyss-bubble"
            style={{
              left: b.left,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--ab-opacity": b.opacity,
              "--ab-sway": `${b.sway}px`,
            }}
          />
        ))}

        {/* ===== الرقم العملاق في الخلفية ===== */}
        <motion.span
          style={{
            position: "absolute",
            top: "-2rem",
            left: "50%",
            translateX: "-50%",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(10rem, 22vw, 18rem)",
            color: "#38bdf8",
            zIndex: 2,
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
            opacity: numOpacity,
            y: numY,
          }}
        >
          02
        </motion.span>

        {/* ===== المحتوى الرئيسي ===== */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1200px",
            padding: "80px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* ===== العمود الأيسر: الكائن البحري ===== */}
          <motion.div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              y: smoothCreatureY,
              opacity: creatureOpacity,
              scale: creatureScale,
            }}
          >
            {/* Glow الخارجي للكائن */}
            <motion.div
              style={{
                position: "absolute",
                inset: "-20%",
                background: "radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 65%)",
                borderRadius: "50%",
                opacity: glowOpacity,
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />

            {/* الكائن البحري الطافي */}
            <div className="creature-float" style={{ position: "relative", zIndex: 2 }}>
              <img
                src="/main-creature.png"
                alt="Deep Sea Creature"
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  filter: "drop-shadow(0 0 60px rgba(56,189,248,0.45)) drop-shadow(0 0 20px rgba(56,189,248,0.3))",
                  mixBlendMode: "lighten",
                }}
              />
            </div>

            {/* نقاط الـ Bioluminescence حول الكائن */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 2.5 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  width: `${4 + i * 2}px`,
                  height: `${4 + i * 2}px`,
                  borderRadius: "50%",
                  background: i % 2 === 0 ? "#38bdf8" : "#818cf8",
                  top: `${15 + i * 13}%`,
                  left: i % 2 === 0 ? `${8 + i * 5}%` : `${75 - i * 5}%`,
                  boxShadow: `0 0 12px ${i % 2 === 0 ? "#38bdf8" : "#818cf8"}`,
                  zIndex: 3,
                }}
              />
            ))}
          </motion.div>

          {/* ===== العمود الأيمن: النص ===== */}
          <div ref={titleRef}>
            {/* Overline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: "#38bdf8",
                letterSpacing: "0.4em",
                fontSize: "11px",
                fontWeight: 500,
                marginBottom: "20px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ADAPTIVE INTELLIGENCE
            </motion.p>

            {/* العنوان */}
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ opacity: 0, y: 60 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(36px, 6vw, 76px)",
                  lineHeight: 0.92,
                  color: "#f0f9ff",
                  marginBottom: "40px",
                  letterSpacing: "-0.02em",
                  textShadow: "0 0 40px rgba(125,211,252,0.15)",
                }}
              >
                Adapted to<br />
                <span style={{ fontStyle: "italic", color: "#7dd3fc" }}>Your Reality</span>
              </motion.h2>
            </div>

            {/* قائمة الميزات بتتابع */}
            <div>
              {FEATURES.map((item, idx) => (
                <FeatureItem key={idx} item={item} index={idx} />
              ))}
            </div>

            {/* زر Discover More */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: "44px" }}
            >
              <motion.button
                whileHover={{
                  backgroundColor: "rgba(56,189,248,0.12)",
                  borderColor: "rgba(56,189,248,0.6)",
                  boxShadow: "0 0 30px rgba(56,189,248,0.2)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: "16px 44px",
                  borderRadius: "100px",
                  border: "1px solid rgba(56,189,248,0.25)",
                  color: "#f0f9ff",
                  letterSpacing: "0.4em",
                  fontSize: "10px",
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                }}
              >
                DISCOVER MORE
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* ===== تلاشي سفلي ===== */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "180px",
            background: "linear-gradient(to bottom, transparent, #010816)",
            zIndex: 8,
            pointerEvents: "none",
          }}
        />
      </section>
    </>
  );
}
