import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = ["Software Engineer", "MERN Stack Developer", "Tech Enthusiast"];
const sloganText = "Building Solutions, One Line at a Time.";

const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const [slogan, setSlogan] = useState("");
  const [sloganIndex, setSloganIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, deleting ? 50 : 90);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  useEffect(() => {
    if (sloganIndex < sloganText.length) {
      const t = setTimeout(() => {
        setSlogan((p) => p + sloganText[sloganIndex]);
        setSloganIndex(sloganIndex + 1);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [sloganIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black" />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27200%27 height=%27200%27 filter=%27url(%23n)%27 opacity=%270.4%27/%3E%3C/svg%3E')]" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center gap-8 -translate-y-12"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          className="w-44 h-44 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 overflow-hidden"
        >
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide">
          Bimala Venu Madhav
        </h1>

        <motion.h2
          animate={{
            textShadow: [
              "0 0 0px rgba(255,255,255,0.3)",
              "2px 0 8px rgba(255,255,255,0.6)",
              "-2px 0 8px rgba(255,255,255,0.6)",
              "0 0 0px rgba(255,255,255,0.3)",
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-lg sm:text-xl tracking-widest min-h-[28px]"
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.h2>

        <p className="max-w-xl text-sm sm:text-base text-gray-400 leading-relaxed">
          I’m a Software Engineer experienced in building scalable full-stack web
          applications with modern technologies and clean architecture.
        </p>

        <p className="text-base sm:text-lg text-gray-400 tracking-widest min-h-[24px]">
          {slogan}
        </p>

        <div className="flex items-center gap-4 pt-4">
          <a
            href="/projects"
            className="px-6 py-2 border border-white text-base rounded-full hover:bg-white hover:text-black transition"
          >
            View Work
          </a>
          <a
            href="/resume"
            className="px-6 py-2 border border-white text-base rounded-full hover:bg-white hover:text-black transition"
          >
            Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
