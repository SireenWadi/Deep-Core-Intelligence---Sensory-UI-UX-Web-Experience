import { useRef } from "react";
import { motion, useTransform, useScroll, useSpring, useInView } from "framer-motion";

const FEATURES = [
  {
    title: "Down-to-Earth Technology",
    body:
      "Drag-and-drop, grab and go, point and click — or set it and forget it. You name it, consider it done without coding. Fully functional across platforms and connected to your devices: XR, web, mobile, and voice compatible (coming soon). The most powerful intelligence engine on Earth, packaged into the simplest possible interface.",
  },
  {
    title: "Infinite Depth. Zero Friction.",
    body:
      "The Core is where everything converges. Years of research distilled into a single unified access point — the heartbeat of your entire intelligent ecosystem. Whether you are managing a single workflow or orchestrating planetary-scale operations, The Core scales effortlessly beneath you.",
  },
];

const SECONDARY_LEFT = [
  {
    title: "Augment Your Team",
    body:
      "Augment your team with the intelligence resources they need to reach their peak. Apply Virtual and Augmented Reality to hone your team's existing skills and then the ability to fully immerse your team from new vantage points. Explore, Collaborate. Share with your entire team to fully immerse themselves in your new reality and take your team to the top.",
  },
  {
    title: "Transcend Collaboration",
    body:
      "The programs makes these forms of local design available to your entire team. It is a good idea to Transcend previous limitations through intelligent group spaces — there's no more stovepipes. Bring your team to the next level, ensuring they will accomplish the goals of your organization and keep. Find more, See more, and Think more. Transcend begins to work.",
  },
];

const SECONDARY_RIGHT = [
  {
    title: "Nano-design Pipeline",
    body:
      "Nano-design policies as a whole, bring your team with the handover-centric they need to reach their peak. Apply Virtual and Augmented Reality to hone your team's existing skills and then the ability to fully immerse your team from new vantage points. Understand what you team is learning and help them train to the top.",
  },
  {
    title: "Skill Building Engine",
    body:
      "These design policies are similar to a strict, living your team to the test by being the transformative. Step by step, to provide the drive. I nearly doesn't matter. With regards to computing, you can accomplish or at the other points at any time. For other forms of local help. The primary supports the augmented reality training that the required content-learning things. Use artificial training points heavily and adapt, ensure each member is reaching their potential, and from there. If you're able to reach limits by team. Build together, grow smarter, and from there. Make the step to build empowers you from start. Analysis, create for the whole vision and can use on-hold features for what you learn.",
  },
];

function TextBlock({ item, index, fromLeft }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -25 : 25 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginBottom: "32px", paddingBottom: "32px",
        borderBottom: "1px solid rgba(56,189,248,0.07)",
      }}
    >
      <h5 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(17px, 2vw, 22px)",
        color: "#bae6fd", marginBottom: "12px",
        fontWeight: 400, letterSpacing: "-0.01em",
      }}>
        {item.title}
      </h5>
      <p style={{
        color: "rgba(186,230,253,0.38)", fontSize: "13px",
        lineHeight: "1.85", fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
      }}>
        {item.body}
      </p>
    </motion.div>
  );
}

export default function TheCore({ scrollYProgress }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const { scrollYProgress: localProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Core light ray swimming upward
  const lightY = useTransform(localProgress, [0, 1], [50, -50]);
  const lightOpacity = useTransform(localProgress, [0, 0.1, 0.9, 1], [0, 0.65, 0.65, 0.3]);
  const mountainY = useTransform(localProgress, [0, 1], [30, -30]);
  const bgY = useTransform(localProgress, [0, 1], [-20, 20]);

  const smoothLightY = useSpring(lightY, { stiffness: 30, damping: 12 });
  const smoothMountainY = useSpring(mountainY, { stiffness: 30, damping: 12 });

  const sectionOpacity = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);

  return (
    <>
      <style>{`
        @keyframes auroraShift {
          0%, 100% { opacity: 0.55; transform: translateX(0%) scaleY(1); }
          33% { opacity: 0.75; transform: translateX(-2%) scaleY(1.03); }
          66% { opacity: 0.6; transform: translateX(2%) scaleY(0.97); }
        }
        .aurora-layer { animation: auroraShift 8s ease-in-out infinite; }

        @keyframes corePulse {
          0%, 100% { box-shadow: 0 0 80px rgba(56,189,248,0.35), 0 0 200px rgba(56,189,248,0.15); }
          50% { box-shadow: 0 0 120px rgba(56,189,248,0.55), 0 0 300px rgba(56,189,248,0.25); }
        }
        .core-btn { animation: corePulse 3s ease-in-out infinite; }

        @keyframes mountainFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .mountain-float { animation: mountainFloat 9s ease-in-out infinite; }

        @keyframes runningText {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: runningText 18s linear infinite; white-space: nowrap; }
      `}</style>

      <motion.section
        ref={sectionRef}
        style={{
          position: "relative", minHeight: "100vh", width: "100%",
          background: "#000", overflow: "hidden",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-start",
          opacity: sectionOpacity,
        }}
      >
        {/* Background video */}
        <motion.div style={{ position: "absolute", inset: 0, zIndex: 0, y: bgY }}>
          <video autoPlay loop muted playsInline style={{
            width: "100%", height: "110%", objectFit: "cover",
            opacity: 0.38, position: "absolute", top: "-5%",
          }}>
            <source src="/deep-core-bg.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #000 0%, transparent 8%, transparent 65%, #000 100%)",
          }} />
        </motion.div>

        {/* Aurora light rays */}
        <motion.div
          className="aurora-layer"
          style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "70%", zIndex: 1, pointerEvents: "none",
            background: `
              linear-gradient(180deg,
                rgba(56,189,248,0.08) 0%,
                rgba(99,102,241,0.12) 20%,
                rgba(56,189,248,0.06) 40%,
                rgba(129,140,248,0.1) 60%,
                transparent 100%
              )
            `,
            opacity: lightOpacity,
            y: smoothLightY,
          }}
        />

        {/* Core light beam */}
        <motion.img
          src="/core-light.png"
          style={{
            position: "absolute", width: "100%", top: 0,
            mixBlendMode: "screen", opacity: lightOpacity,
            zIndex: 2, pointerEvents: "none",
            y: smoothLightY,
          }}
        />

        {/* Running text marquee banner */}
        <div style={{
          position: "absolute", top: "12px", left: 0, right: 0,
          zIndex: 15, overflow: "hidden", pointerEvents: "none",
        }}>
          <div className="marquee-track" style={{
            display: "inline-flex", gap: "80px",
          }}>
            {[...Array(6)].map((_, i) => (
              <span key={i} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 3vw, 28px)",
                color: "rgba(186,230,253,0.55)",
                letterSpacing: "0.08em",
                display: "inline-block",
              }}>
                Down-to-earth technology &nbsp;&nbsp;·&nbsp;&nbsp; The Core &nbsp;&nbsp;·&nbsp;&nbsp; Easy as A, B, C &nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{
          position: "relative", zIndex: 10, width: "100%",
          maxWidth: "1280px", padding: "100px 48px 0",
        }}>

          {/* ── TOP: Centered title + subtitle ── */}
          <div ref={titleRef} style={{ textAlign: "center", marginBottom: "72px" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: "#38bdf8", letterSpacing: "0.5em", fontSize: "11px",
                fontWeight: 500, marginBottom: "20px", fontFamily: "'DM Sans', sans-serif",
              }}
            >
              THE CORE
            </motion.p>

            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ opacity: 0, y: 60 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(48px, 8.5vw, 100px)",
                  lineHeight: 0.88, color: "#f0f9ff",
                  marginBottom: "36px", letterSpacing: "-0.03em",
                  textShadow: "0 0 80px rgba(125,211,252,0.3)",
                }}
              >
                Easy as<br />
                <span style={{ fontStyle: "italic", color: "#7dd3fc" }}>A, B, C</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: "rgba(186,230,253,0.5)", fontSize: "17px",
                lineHeight: "1.8", maxWidth: "640px", margin: "0 auto 48px",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              }}
            >
              Drag-and-drop, grab and go, point and click, or set it and forget it.
              You name it, consider it done — without coding. Fully functional across
              platforms and connected to your devices: XR, web, mobile, and voice compatible.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}
            >
              <motion.button
                whileHover={{
                  backgroundColor: "rgba(56,189,248,0.15)",
                  borderColor: "rgba(56,189,248,0.7)",
                  boxShadow: "0 0 50px rgba(56,189,248,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "16px 40px", borderRadius: "100px",
                  border: "1px solid rgba(56,189,248,0.35)",
                  color: "#f0f9ff", letterSpacing: "0.4em",
                  fontSize: "10px", fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  background: "rgba(56,189,248,0.05)", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "10px",
                }}
              >
                <span style={{ fontSize: "14px" }}>▶</span> EXPERIENCE NOW
              </motion.button>

              <motion.button
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "16px 40px", borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(186,230,253,0.7)", letterSpacing: "0.4em",
                  fontSize: "10px", fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  background: "transparent", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "10px",
                }}
              >
                GET THE DEMO <span style={{ fontSize: "14px" }}>→</span>
              </motion.button>
            </motion.div>
          </div>

          {/* ── MIDDLE: Two-column main features ── */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "60px", marginBottom: "72px",
          }}>
            {FEATURES.map((item, i) => (
              <TextBlock key={i} item={item} index={i} fromLeft={i === 0} />
            ))}
          </div>

          {/* ── SECONDARY: Two-column body text ── */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "60px", marginBottom: "0",
          }}>
            <div>
              {SECONDARY_LEFT.map((item, i) => (
                <TextBlock key={i} item={item} index={i} fromLeft={true} />
              ))}
            </div>
            <div>
              {SECONDARY_RIGHT.map((item, i) => (
                <TextBlock key={i} item={item} index={i} fromLeft={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Mountain landscape floating at bottom */}
        <motion.div
          className="mountain-float"
          style={{
            position: "relative", zIndex: 6, width: "100%",
            marginTop: "-20px",
            y: smoothMountainY,
          }}
        >
          {/* Synthetic mountain silhouettes — aurora/ice mountain aesthetic */}
          <svg
            viewBox="0 0 1440 380"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", display: "block" }}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#db2777" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="mtn3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9333ea" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="ice1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#000" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="aurora" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                <stop offset="30%" stopColor="#818cf8" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Aurora shafts in sky */}
            <rect x="0" y="0" width="1440" height="200" fill="url(#aurora)" />

            {/* Far mountains - back layer */}
            <path d="M0,280 L80,180 L160,220 L250,140 L340,190 L420,110 L500,170 L590,90 L680,160 L760,80 L840,150 L920,100 L1000,170 L1080,120 L1160,200 L1240,150 L1320,220 L1440,180 L1440,380 L0,380 Z" fill="url(#mtn1)" />

            {/* Mid mountains */}
            <path d="M0,320 L100,240 L180,290 L270,200 L370,260 L450,190 L540,250 L620,160 L720,230 L800,170 L900,240 L980,180 L1080,260 L1160,200 L1260,270 L1340,220 L1440,280 L1440,380 L0,380 Z" fill="url(#mtn2)" />

            {/* Front mountains - pink/rose peaks */}
            <path d="M0,380 L60,310 L130,350 L200,280 L280,330 L360,260 L440,310 L520,270 L600,330 L680,250 L760,310 L840,270 L920,340 L1000,290 L1080,360 L1160,300 L1240,360 L1320,310 L1380,360 L1440,330 L1440,380 Z" fill="url(#mtn3)" />

            {/* Snow/ice caps on front peaks */}
            <path d="M200,280 L220,305 L240,295 L260,310 L280,330 Z" fill="url(#ice1)" opacity="0.8" />
            <path d="M360,260 L385,295 L400,280 L420,310 L440,310 Z" fill="url(#ice1)" opacity="0.75" />
            <path d="M520,270 L545,298 L565,285 L590,310 L600,330 Z" fill="url(#ice1)" opacity="0.8" />
            <path d="M680,250 L705,280 L725,265 L750,295 L760,310 Z" fill="url(#ice1)" opacity="0.85" />
            <path d="M840,270 L862,298 L878,285 L900,315 L920,340 Z" fill="url(#ice1)" opacity="0.7" />

            {/* Foreground ice chunks in water */}
            <ellipse cx="150" cy="365" rx="90" ry="22" fill="#bae6fd" opacity="0.5" />
            <ellipse cx="400" cy="372" rx="70" ry="16" fill="#e0f2fe" opacity="0.4" />
            <ellipse cx="700" cy="368" rx="110" ry="20" fill="#bae6fd" opacity="0.45" />
            <ellipse cx="1000" cy="370" rx="80" ry="18" fill="#e0f2fe" opacity="0.4" />
            <ellipse cx="1280" cy="366" rx="95" ry="22" fill="#bae6fd" opacity="0.5" />

            {/* Water reflection */}
            <path d="M0,355 L1440,355 L1440,380 L0,380 Z" fill="url(#water)" />

            {/* Water shimmer lines */}
            <line x1="0" y1="358" x2="1440" y2="358" stroke="rgba(56,189,248,0.15)" strokeWidth="1" />
            <line x1="0" y1="363" x2="1440" y2="363" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Contact Core CTA - floating bubble */}
        <motion.div
          style={{
            position: "absolute", left: "50%", top: "48%",
            transform: "translate(-50%, -50%)", zIndex: 12,
          }}
        >
          <motion.div
            className="core-btn"
            whileHover={{ scale: 1.08, boxShadow: "0 0 160px rgba(56,189,248,0.6)" }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "44px 64px", borderRadius: "999px",
              border: "1px solid rgba(56,189,248,0.5)",
              background: "rgba(56,189,248,0.08)",
              backdropFilter: "blur(20px)",
              color: "white", cursor: "pointer",
              textAlign: "center",
            }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 3.5vw, 38px)",
              letterSpacing: "0.12em", marginBottom: "6px",
              textShadow: "0 0 30px rgba(56,189,248,0.6)",
            }}>
              CONTACT CORE
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px", letterSpacing: "0.3em",
              color: "rgba(186,230,253,0.6)",
            }}>
              INITIATE CONNECTION
            </div>
          </motion.div>
        </motion.div>

      </motion.section>
    </>
  );
}
