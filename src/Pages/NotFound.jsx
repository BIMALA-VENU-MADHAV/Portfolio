import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);
  const containerRef = useRef(null);

  const particles = useMemo(
    () =>
      [...Array(30)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3,
      })),
    []
  );

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);

      setTimeout(() => {
        setGlitchActive(false);
      }, 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "perspective(500px) rotateX(60deg) translateY(-50%)",
            transformOrigin: "center top",
          }}
        />
      </div>

      {/* Mouse follow spotlight */}
      <div
        className="pointer-events-none absolute hidden h-[800px] w-[800px] rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)",
          left: mousePos.x - 400,
          top: mousePos.y - 400,
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-px w-px rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27200%27 height=%27200%27 filter=%27url(%23n)%27 opacity=%270.4%27/%3E%3C/svg%3E')]" />

      <div className="relative z-10 text-center">
        {/* Main 404 with parallax and glitch */}
        <motion.div
          animate={{
            x: pos.x,
            y: pos.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="relative"
        >
          {/* Glitch layers */}
          <motion.h1
            className="relative select-none text-[120px] font-black tracking-tighter sm:text-[180px] md:text-[220px]"
            style={{ lineHeight: 1 }}
          >
            {/* Background glow */}
            <span
              className="absolute inset-0 bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent opacity-20 blur-3xl"
            >
              404
            </span>

            {/* Glitch clone 1 */}
            <span
              className="absolute inset-0 text-white/25"
              style={{
                transform: glitchActive
                  ? "translate(-4px, -2px)"
                  : "translate(-2px, 0)",
                clipPath: glitchActive
                  ? "inset(20% 0 30% 0)"
                  : "inset(0 0 80% 0)",
                transition: "all 0.1s",
              }}
            >
              404
            </span>

            {/* Glitch clone 2 */}
            <span
              className="absolute inset-0 text-white/15"
              style={{
                transform: glitchActive
                  ? "translate(4px, 2px)"
                  : "translate(2px, 0)",
                clipPath: glitchActive
                  ? "inset(50% 0 20% 0)"
                  : "inset(80% 0 0% 0)",
                transition: "all 0.1s",
              }}
            >
              404
            </span>

            {/* Main text */}
            <span
              className="relative bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent"
              style={{
                textShadow: glitchActive
                  ? "0 0 20px rgba(255,255,255,0.5)"
                  : "none",
              }}
            >
              404
            </span>
          </motion.h1>

          {/* Scanning line effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        {/* Subtitle with typewriter effect */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-sm tracking-wide text-gray-400 sm:text-base"
        >
          <span className="inline-block">
            {"This page drifted out of reality.".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.p>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <Link
            to="/"
            className="group relative inline-flex items-center gap-2 overflow-hidden px-8 py-3"
          >
            {/* Button border */}
            <span className="absolute inset-0 rounded-full border border-white/30 transition-all duration-500 group-hover:border-white/60" />

            {/* Hover fill effect */}
            <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-white transition-transform duration-500 group-hover:scale-x-100" />

            {/* Arrow icon */}
            <motion.span
              className="relative z-10 transition-colors duration-500 group-hover:text-black"
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </motion.span>

            <span className="relative z-10 text-sm tracking-wider transition-colors duration-500 group-hover:text-black">
              Back to Home
            </span>
          </Link>
        </motion.div>

        {/* Decorative rings */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 md:block">
          <motion.div
            className="absolute inset-0 rounded-full border border-white/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-10 rounded-full border border-white/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          {[0, 120, 240].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-0 h-2 w-2 rounded-full bg-white/20"
              style={{ transformOrigin: "0 250px" }}
              animate={{ rotate: [deg, deg + 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotFound;