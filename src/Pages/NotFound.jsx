import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="fixed inset-0 overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27200%27 height=%27200%27 filter=%27url(%23n)%27 opacity=%270.4%27/%3E%3C/svg%3E')]" />

      <div className="relative text-center">
        <motion.h1
          animate={{
            x: pos.x,
            y: pos.y,
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="text-7xl sm:text-8xl font-bold tracking-widest relative"
        >
          <span className="absolute inset-0 text-white/30 translate-x-1">
            404
          </span>
          <span className="absolute inset-0 text-white/20 -translate-x-1">
            404
          </span>
          404
        </motion.h1>

        <p className="mt-6 text-gray-400 text-sm sm:text-base">
          This page drifted out of reality.
        </p>

        <NavLink
          to="/"
          className="inline-block mt-10 px-6 py-2 border border-white text-sm rounded-full hover:bg-white hover:text-black transition"
        >
          Back to Home
        </NavLink>
      </div>
    </section>
  );
};

export default NotFound;
