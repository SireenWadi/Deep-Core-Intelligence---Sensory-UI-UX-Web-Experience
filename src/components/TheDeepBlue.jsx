import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// ===== فقاعات عشوائية =====
const BUBBLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 12 + 3,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 12,
  opacity: Math.random() * 0.35 + 0.08,
  sway: Math.random() * 30 - 15,
}));

// ===== بيانات الكاردات =====
const CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Deep Analysis",
    desc: "Process massive datasets with fluid efficiency and bioluminescent precision beneath the surface.",
    accent: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.25)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Hidden Patterns",
    desc: "Uncover insights buried deep beneath the surface of raw data, where light never reaches.",
    accent: "#818cf8",
    glow: "rgba(129, 140, 248, 0.25)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Fluid Security",
    desc: "Adaptive protection that flows and shifts with your data like tidal currents.",
    accent: "#34d399",
    glow: "rgba(52, 211, 153, 0.25)",
  },
];

// ===== مكوّن الكارد المفرد =====
function GlassCard({ card, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.03)",
        border: hovered
          ? `1px solid ${card.accent}55`
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        padding: "44px 32px",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: hovered ? "translateY(-14px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 30px 60px rgba(0,0,0,0.5), 0 0 40px ${card.glow}`
          : "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {/* Glow بداخل الكارد عند الـ Hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `radial-gradient(circle at 50% 50%, ${card.glow} 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* أيقونة الكارد */}
      <motion.div
        animate={{ 
          filter: hovered ? `drop-shadow(0 0 14px ${card.accent})` : `drop-shadow(0 0 6px ${card.accent}88)` 
        }}
        transition={{ duration: 0.4 }}
        style={{ color: card.accent, marginBottom: "24px" }}
      >
        {card.icon}
      </motion.div>

      <h3 style={{
        color: "#f0f9ff",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "30px",
        fontWeight: 400,
        marginBottom: "16px",
        lineHeight: 1.1,
      }}>
        {card.title}
      </h3>

      <p style={{
        color: "rgba(224, 242, 254, 0.55)",
        fontSize: "14px",
        lineHeight: "1.75",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {card.desc}
      </p>

      {/* خط سفلي متحرك */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          width: "80%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}

// ===== المكوّن الرئيسي =====
export default function TheDeepBlue() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const isHeadlineInView = useInView(headlineRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax للحوت في الخلفية
  const whaleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const whaleX = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const whaleOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.28, 0.18, 0]);

  // Parallax للفقاعات
  const bubblesY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // تلاشي القسم عند التمرير للأسفل
  const sectionOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  // تأثير Parallax للفيديو الخلفي
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const springConfig = { stiffness: 60, damping: 20 };
  const smoothWhaleY = useSpring(whaleY, springConfig);
  const smoothWhaleX = useSpring(whaleX, springConfig);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 45,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 28,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .deep-blue-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #010816;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bubble-animated {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent);
          border: 0.5px solid rgba(255,255,255,0.25);
          animation: bubbleFloat linear infinite;
          pointer-events: none;
          z-index: 4;
        }

        @keyframes bubbleFloat {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: var(--b-opacity);
          }
          85% {
            opacity: var(--b-opacity);
          }
          100% {
            transform: translateY(-20vh) translateX(var(--b-sway));
            opacity: 0;
          }
        }

        .caustic-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 30% 20%, rgba(56,189,248,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(99,102,241,0.04) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, transparent 20%, rgba(1,8,22,0.65) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* تأثير النور الكوستيكي (caustic light) يحاكي الضوء تحت الماء */
        @keyframes causticShift {
          0%, 100% { opacity: 0.04; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.08; transform: scale(1.05) rotate(3deg); }
        }
      `}</style>

      <motion.div
        className="deep-blue-root"
        ref={containerRef}
        style={{ opacity: sectionOpacity }}
      >
        {/* ===== خلفية الفيديو ===== */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            y: videoY,
          }}
        >
          <video
            autoPlay muted loop playsInline
            style={{
              position: "absolute",
              width: "100%",
              height: "110%",
              objectFit: "cover",
              opacity: 0.45,
              top: "-5%",
            }}
          >
            <source src="/ocean-depths.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* ===== طبقة الضوء الكوستيكي ===== */}
        <div className="caustic-overlay" />

        {/* ===== الحوت بـ Parallax ===== */}
        <motion.img
          src="/whale-overlay.png"
          alt="Whale in the deep ocean"
          style={{
            position: "absolute",
            width: "680px",
            left: "8%",
            top: "15%",
            mixBlendMode: "screen",
            zIndex: 3,
            pointerEvents: "none",
            opacity: whaleOpacity,
            y: smoothWhaleY,
            x: smoothWhaleX,
            rotateZ: mousePos.x * 0.04,
            translateX: mousePos.x * -1.0,
            translateY: mousePos.y * -0.6,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
        />

        {/* ===== الفقاعات ===== */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            pointerEvents: "none",
            y: bubblesY,
          }}
        >
          {BUBBLES.map((b) => (
            <div
              key={b.id}
              className="bubble-animated"
              style={{
                left: b.left,
                width: `${b.size}px`,
                height: `${b.size}px`,
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
                "--b-opacity": b.opacity,
                "--b-sway": `${b.sway}px`,
              }}
            />
          ))}
        </motion.div>

        {/* ===== المحتوى الرئيسي ===== */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1120px",
            width: "100%",
            padding: "80px 40px",
            textAlign: "center",
          }}
        >
          {/* Overline */}
          <motion.p
            ref={headlineRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: "#38bdf8",
              letterSpacing: "0.45em",
              fontSize: "12px",
              fontWeight: 500,
              marginBottom: "18px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            OCEAN INTELLIGENCE
          </motion.p>

          {/* العنوان الرئيسي */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ opacity: 0, y: 70 }}
              animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(42px, 8.5vw, 96px)",
                lineHeight: 0.88,
                color: "#f0f9ff",
                marginBottom: "36px",
                textShadow: "0 0 60px rgba(125,211,252,0.2)",
                letterSpacing: "-0.02em",
              }}
            >
              Exploring the<br />
              <span style={{ fontStyle: "italic", color: "#7dd3fc" }}>Uncharted</span>
            </motion.h1>
          </div>

          {/* وصف */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: "rgba(186, 230, 253, 0.55)",
              fontSize: "16px",
              lineHeight: "1.8",
              maxWidth: "540px",
              margin: "0 auto 60px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
            }}
          >
            Dive beneath the surface where intelligence flows like current — fluid, boundless, alive.
          </motion.p>

          {/* الكارداز */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: "20px",
            }}
          >
            {CARDS.map((card, idx) => (
              <GlassCard key={idx} card={card} index={idx} />
            ))}
          </div>
        </div>

        {/* تلاشي سفلي لدمج القسمين بسلاسة */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "220px",
            background: "linear-gradient(to bottom, transparent, #010816)",
            zIndex: 8,
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </>
  );
}
