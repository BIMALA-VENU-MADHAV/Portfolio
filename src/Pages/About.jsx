import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,  
} from "react-icons/fa";
import { SiMongodb, SiMysql, SiVercel, SiRender } from "react-icons/si";

const techStack = [
  { icon: FaJs, name: "JavaScript", color: "#F7DF1E" },
  { icon: FaPython, name: "Python", color: "#3776AB" },
  { icon: FaJava, name: "Java", color: "#ED8B00" },
  { icon: FaHtml5, name: "HTML5", color: "#E34F26" },
  { icon: FaCss3Alt, name: "CSS3", color: "#1572B6" },
  { icon: FaReact, name: "React.js", color: "#61DAFB" },
  { icon: FaNodeJs, name: "Node.js", color: "#339933" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1" },
  { icon: FaGitAlt, name: "Git", color: "#F05032" },
  { icon: FaGithub, name: "GitHub", color: "#ffffff" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff" },
  { icon: SiRender, name: "Render", color: "#46E3B7" },
];

const aboutCards = [
  {
    text: (
      <>
        I&apos;m a Software Developer experienced in building scalable,
        efficient applications. My core skill set includes{" "}
        <span className="font-medium text-white">
          JavaScript, Python, Java, SQL, HTML, and CSS
        </span>
        , with hands-on experience using modern frameworks like{" "}
        <span className="font-medium text-white">React.js</span> and{" "}
        <span className="font-medium text-white">Node.js</span>.
      </>
    ),
  },
  {
    text: (
      <>
        I work extensively with databases such as{" "}
        <span className="font-medium text-white">MongoDB</span> and{" "}
        <span className="font-medium text-white">MySQL</span>, integrate{" "}
        <span className="font-medium text-white">RESTful APIs</span>, and deploy
        production-ready applications on platforms like{" "}
        <span className="font-medium text-white">Vercel</span> and{" "}
        <span className="font-medium text-white">Render</span>.
      </>
    ),
  },
  {
    text: (
      <>
        I use <span className="font-medium text-white">Git</span> and{" "}
        <span className="font-medium text-white">GitHub</span> for version
        control and collaboration, ensuring clean workflows and maintainable
        codebases.
      </>
    ),
  },
];

const TechIcon = ({ tech, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 260,
    damping: 22,
    mass: 0.4,
  });

  const springY = useSpring(y, {
    stiffness: 260,
    damping: 22,
    mass: 0.4,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.22);
    y.set((e.clientY - centerY) * 0.22);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const Icon = tech.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.55 + index * 0.045,
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="group relative"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: tech.color }}
      />

      {/* Icon card */}
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/30 group-hover:bg-white/[0.07] sm:h-20 sm:w-20">
        {/* Shimmer */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            hovered ? "animate-tech-shimmer" : ""
          }`}
          style={{
            background: `linear-gradient(135deg, transparent 35%, ${tech.color}45 50%, transparent 65%)`,
            backgroundSize: "220% 220%",
          }}
        />

        <Icon
          className="relative z-10 text-2xl text-gray-400 transition-colors duration-300 group-hover:text-white sm:text-3xl"
          style={{ color: hovered ? tech.color : undefined }}
        />
      </div>

      {/* Tooltip */}
      <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] text-white/80 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:bottom-[-42px] group-hover:opacity-100">
        {tech.name}
      </div>
    </motion.div>
  );
};

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Helmet>
        <title>About | Bimala Venu Madhav</title>

        <meta
          name="description"
          content="Learn about Bimala Venu Madhav, a MERN stack developer skilled in React, Node.js, MongoDB, and modern web technologies."
        />

        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://bimalavenumadhav.vercel.app/about"
        />

        {/* Open Graph */}
        <meta property="og:title" content="About | Bimala Venu Madhav" />
        <meta
          property="og:description"
          content="Discover my skills, experience, and technologies I use as a MERN stack developer."
        />
        <meta
          property="og:image"
          content="https://bimalavenumadhav.vercel.app/profile.jpeg"
        />
        <meta
          property="og:url"
          content="https://bimalavenumadhav.vercel.app/about"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | Bimala Venu Madhav" />
        <meta
          name="twitter:description"
          content="MERN stack developer with expertise in full-stack web development."
        />
        <meta
          name="twitter:image"
          content="https://bimalavenumadhav.vercel.app/profile.jpeg"
        />
      </Helmet>

      <section
        ref={containerRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black" />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-25">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(circle at center, black 0%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 0%, transparent 72%)",
            }}
          />
        </div>

        {/* Mouse follow spotlight */}
        <div
          className="pointer-events-none absolute hidden h-[520px] w-[520px] rounded-full opacity-30 transition-opacity duration-300 md:block"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            left: mousePos.x - 260,
            top: mousePos.y - 260,
          }}
        />

        {/* Floating particles */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20"
            initial={{
              x: `${(i * 37) % 100}vw`,
              y: `${20 + ((i * 23) % 70)}vh`,
              opacity: 0,
            }}
            animate={{
              y: [`${20 + ((i * 23) % 70)}vh`, `${5 + ((i * 17) % 30)}vh`],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: i * 0.35,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          {/* Section title */}
          <div className="relative mb-12 inline-block">
            <motion.h1
              className="relative text-2xl font-bold tracking-[0.22em] text-white sm:text-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.6 }}
            >
              <span className="relative inline-block">
                LET ME INTRODUCE MYSELF

                {/* Glitch layer */}
                <span
                  className="absolute inset-0 text-white/20"
                  style={{
                    clipPath: "inset(10% 0 78% 0)",
                    transform: "translate(-2px, 0)",
                  }}
                >
                  LET ME INTRODUCE MYSELF
                </span>
              </span>
            </motion.h1>

            <motion.div
              className="absolute -bottom-4 left-0 right-0 h-px origin-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              }}
            />
          </div>

          {/* About content cards */}
          <div className="mt-16 space-y-6 text-sm leading-relaxed text-gray-400 sm:text-base">
            {aboutCards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.06] via-white/[0.025] to-transparent opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

                <p className="relative rounded-2xl border border-white/[0.04] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/[0.04]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-20"
          >
            <p className="mb-8 text-xs uppercase tracking-[0.28em] text-gray-500">
              Technologies I work with
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {techStack.map((tech, i) => (
                <TechIcon key={tech.name} tech={tech} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Find me on */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="mt-24"
          >
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Find Me On
            </h2>

            <p className="mb-6 text-sm text-gray-400">
              Feel free to connect with me
            </p>

            <div className="flex items-center justify-center gap-4">
              <motion.a
                href="https://github.com/BIMALA-VENU-MADHAV"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-xl text-gray-300 backdrop-blur-md transition hover:border-white/35 hover:text-white"
              >
                <FaGithub />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/bimala-venu-madhav-731a30334"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-300 backdrop-blur-md transition hover:border-white/35 hover:text-white"
              >
                <FaLinkedinIn />
              </motion.a>
            </div>

          </motion.div>
        </motion.div>

        {/* Vite React CSS replacement for style jsx */}
        <style>
          {`
            @keyframes tech-shimmer {
              0% {
                background-position: 200% 0;
              }
              100% {
                background-position: -200% 0;
              }
            }

            .animate-tech-shimmer {
              animation: tech-shimmer 2s linear infinite;
            }
          `}
        </style>
      </section>
    </>
  );
};

export default About;