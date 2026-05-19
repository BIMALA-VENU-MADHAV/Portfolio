import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

const certificates = [
  {
    title: "JavaScript Foundations",
    issuer: "Mozilla (LinkedIn)",
    image: "/certificates/javascript.png",
    link: "https://www.linkedin.com/learning/certificates/831b3fe9dbd681d929b86859b2276d19389f002e04e0f8d62217de71d8a62762",
    color: "#F7DF1E",
  },
  {
    title: "Full Stack Development",
    issuer: "SmartBridge",
    image: "/certificates/smartbridge.png",
    link: "https://apsche.smartinternz.com/certificate/student/0090f3ec04a901452d3bd40e39d4d832",
    color: "#61DAFB",
  },
  {
    title: "Java Programming",
    issuer: "edX",
    image: "/certificates/java.png",
    link: "https://drive.google.com/file/d/1xMhUQzdDWVz2U_3kjFxkvlZFEah0fvYr/view",
    color: "#ED8B00",
  },
  {
    title: "SQL Programming",
    issuer: "LinkedIn Learning",
    image: "/certificates/sql.png",
    link: "https://www.linkedin.com/learning/certificates/96f60eb735f81e078bb3417c4770d53ac39ada12dffdfbeee07d44358eb96e01",
    color: "#4479A1",
  },
  {
    title: "Web Development Internship",
    issuer: "SkillForge",
    image: "/certificates/skillforge.png",
    link: "https://workdrive.zohopublic.in/file/d7kd526480310807745fd9ae3d3a985d264e4",
    color: "#10B981",
  },
];

const CertificateCard = ({ cert, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 28,
    mass: 0.45,
  });

  const rotateY = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 28,
    mass: 0.45,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    rotateX.set(mouseY * -0.025);
    rotateY.set(mouseX * 0.025);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-2 rounded-2xl opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-40"
        style={{ backgroundColor: cert.color }}
      />

      {/* Card container */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg transition-all duration-500 group-hover:border-white/30">
        {/* Animated border gradient */}
        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            isHovered ? "animate-cert-spin" : ""
          }`}
          style={{
            background: `conic-gradient(from 0deg, transparent, ${cert.color}40, transparent)`,
          }}
        />

        {/* Inner content */}
        <div className="relative m-[1px] overflow-hidden rounded-2xl bg-black/70">
          {/* Image container */}
          <div className="relative h-48 w-full overflow-hidden">
            {/* Shine effect */}
            <div
              className={`absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                isHovered ? "animate-cert-shine" : ""
              }`}
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                backgroundSize: "220% 100%",
              }}
            />

            <img
              src={cert.image}
              alt={cert.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Issuer badge */}
            <div
              className="absolute right-3 top-3 rounded-full border border-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md"
              style={{
                backgroundColor: `${cert.color}20`,
                color: cert.color,
              }}
            >
              {cert.issuer}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4 p-6">
            <motion.h2
              className="text-lg font-semibold tracking-wide text-white"
              style={{ transform: "translateZ(20px)" }}
            >
              {cert.title}
            </motion.h2>

            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex self-start items-center gap-2 overflow-hidden px-5 py-2.5"
            >
              {/* Button border */}
              <span className="absolute inset-0 rounded-full border border-white/30 transition-all duration-500 group-hover/btn:border-white/60" />

              {/* Hover fill */}
              <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-white transition-transform duration-500 group-hover/btn:scale-x-100" />

              {/* Text */}
              <span className="relative z-10 text-sm transition-colors duration-500 group-hover/btn:text-black">
                View Certificate
              </span>

              {/* Arrow */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative z-10 transition-all duration-500 group-hover/btn:translate-x-1 group-hover/btn:text-black"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Certificate = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <>
      <Helmet>
        <title>Certificates | Bimala Venu Madhav</title>

        <meta
          name="description"
          content="View certifications of Bimala Venu Madhav including JavaScript, Full Stack Development, Java, SQL, and web development training."
        />

        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://bimalavenumadhav.vercel.app/certificates"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Certificates | Bimala Venu Madhav" />
        <meta
          property="og:description"
          content="Explore my certifications in web development, programming, and full-stack technologies."
        />
        <meta
          property="og:image"
          content="https://bimalavenumadhav.vercel.app/profile.jpeg"
        />
        <meta
          property="og:url"
          content="https://bimalavenumadhav.vercel.app/certificates"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Certificates | Bimala Venu Madhav" />
        <meta
          name="twitter:description"
          content="Certifications in JavaScript, full-stack development, Java, SQL, and more."
        />
        <meta
          name="twitter:image"
          content="https://bimalavenumadhav.vercel.app/profile.jpeg"
        />
      </Helmet>

      <section
        className="relative min-h-screen overflow-hidden px-6 py-24"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black" />

        {/* Animated background grid */}
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

        {/* Mouse spotlight */}
        <div
          className="pointer-events-none fixed hidden h-[520px] w-[520px] rounded-full opacity-30 md:block"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
            left: mousePos.x - 260,
            top: mousePos.y - 260,
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Title */}
          <div className="relative mb-20 text-center">
            <motion.h1
              className="relative inline-block text-3xl font-bold tracking-[0.22em] text-white sm:text-4xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="relative inline-block">
                CERTIFICATES

                <span
                  className="absolute inset-0 text-white/10"
                  style={{ transform: "translate(-2px, 0)" }}
                >
                  CERTIFICATES
                </span>
              </span>
            </motion.h1>

            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-4 left-1/2 h-px w-32 -translate-x-1/2 origin-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-gray-400"
            >
              Professional certifications and achievements
            </motion.p>
          </div>

          {/* Certificates grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, index) => (
              <CertificateCard key={cert.title} cert={cert} index={index} />
            ))}
          </div>
        </div>

        {/* Vite React CSS replacement for style jsx */}
        <style>
          {`
            @keyframes cert-spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            @keyframes cert-shine {
              0% {
                background-position: 200% 0;
              }
              100% {
                background-position: -200% 0;
              }
            }

            .animate-cert-spin {
              animation: cert-spin 4s linear infinite;
            }

            .animate-cert-shine {
              animation: cert-shine 1.5s ease-in-out;
            }
          `}
        </style>
      </section>
    </>
  );
};

export default Certificate;