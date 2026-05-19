import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const roles = ["Software Developer", "MERN Stack Developer", "Tech Enthusiast"];
const sloganText = "Building Solutions, One Line at a Time.";

const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            background: `radial-gradient(circle, rgba(255,255,255,${
              0.03 - i * 0.005
            }) 0%, transparent 70%)`,
            left: `${10 + i * 20}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

const ProfileImage = () => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.75, y: 24 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.6, ease: "easeOut" },
        scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        y: {
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.04,
      }}
    >
      {/* Soft premium background glow */}
      <motion.div
        className="absolute -inset-8 rounded-full bg-white/10 blur-3xl"
        animate={{
          opacity: [0.18, 0.35, 0.18],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Slow rotating outer halo */}
      <motion.div
        className="absolute -inset-5 rounded-full opacity-80"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.45) 70deg, transparent 120deg, transparent 210deg, rgba(255,255,255,0.18) 280deg, transparent 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glass ring mask */}
      <div className="absolute -inset-[14px] rounded-full border border-white/15 bg-black/40 backdrop-blur-md shadow-[0_0_60px_rgba(255,255,255,0.12)]" />

      {/* Orbit ring */}
      <motion.div
        className="absolute -inset-3 rounded-full border border-white/20"
        animate={{ rotate: -360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.span
          className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]"
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/60 shadow-[0_0_14px_rgba(255,255,255,0.6)]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.45, 0.9, 0.45],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </motion.div>

      {/* Profile image card */}
      <motion.div
        className="relative h-48 w-48 overflow-hidden rounded-full border border-white/25 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:h-52 sm:w-52"
        whileHover={{
          borderColor: "rgba(255,255,255,0.55)",
          boxShadow:
            "0 28px 100px rgba(0,0,0,0.75), 0 0 55px rgba(255,255,255,0.16)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.img
          src="/profile.webp"
          alt="Bimala Venu Madhav"
          className="h-full w-full object-cover grayscale-[20%] contrast-110"
          loading="eager"
          fetchPriority="high"
          draggable="false"
          whileHover={{
            scale: 1.08,
            filter: "grayscale(0%) contrast(1.12)",
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />

        {/* Inner vignette */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_35%,transparent_42%,rgba(0,0,0,0.45)_100%)]" />

        {/* Shine sweep */}
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-white/25 to-transparent"
          animate={{
            x: ["-120%", "120%"],
            y: ["-120%", "120%"],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        />

        {/* Bottom glass reflection */}
        <div className="absolute inset-x-6 bottom-4 h-10 rounded-full bg-white/10 blur-xl" />
      </motion.div>
    </motion.div>
  );
};

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
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setCharIndex(0);
        }
      }
    }, deleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  useEffect(() => {
    if (sloganIndex < sloganText.length) {
      const t = setTimeout(() => {
        setSlogan((prev) => prev + sloganText[sloganIndex]);
        setSloganIndex((prev) => prev + 1);
      }, 80);

      return () => clearTimeout(t);
    }
  }, [sloganIndex]);

  return (
    <>
      <Helmet>
        <title>Bimala Venu Madhav | MERN Stack Developer</title>

        <meta
          name="description"
          content="Bimala Venu Madhav is a MERN stack developer specializing in React, Node.js, and full-stack web applications. Explore projects, skills, and experience."
        />

        <meta name="author" content="Bimala Venu Madhav" />
        <meta name="robots" content="index, follow" />

        <meta
          name="keywords"
          content="Bimala Venu Madhav, MERN Developer, React Developer, Portfolio, Full Stack Developer"
        />

        <meta name="author" content="Bimala Venu Madhav" />
        <link rel="canonical" href="https://bimalavenumadhav.vercel.app/" />

        {/* Open Graph */}
        <meta property="og:title" content="Bimala Venu Madhav | Portfolio" />
        <meta
          property="og:description"
          content="Explore my projects, skills, and experience as a MERN stack developer."
        />
        <meta
          property="og:image"
          content="https://bimalavenumadhav.vercel.app/profile.jpeg"
        />
        <meta property="og:url" content="https://bimalavenumadhav.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bimala Venu Madhav Portfolio" />
        <meta
          name="twitter:description"
          content="MERN stack developer portfolio showcasing projects and skills."
        />
        <meta
          name="twitter:image"
          content="https://bimalavenumadhav.vercel.app/profile.jpeg"
        />

        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Bimala Venu Madhav",
      "url": "https://bimalavenumadhav.vercel.app/",
      "sameAs": [
        "https://github.com/BIMALA-VENU-MADHAV",
        "https://www.linkedin.com/in/bimala-venu-madhav-731a30334"
      ],
      "jobTitle": "MERN Stack Developer"
    }
    `}
        </script>
      </Helmet>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27200%27 height=%27200%27 filter=%27url(%23n)%27 opacity=%270.4%27/%3E%3C/svg%3E')]" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center gap-8 -translate-y-4"
        >
          {/* profile image */}
          <ProfileImage />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide">
            Bimala Venu Madhav
          </h1>

          {/* roles */}
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
            I’m a Software Developer experienced in building scalable full-stack
            web applications with modern technologies and clean architecture.
          </p>

          {/* slogan */}
          <p className="text-base sm:text-lg text-gray-400 tracking-widest min-h-[24px]">
            {slogan}
          </p>

          {/* actions */}
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
    </>
  );
};

export default Home;