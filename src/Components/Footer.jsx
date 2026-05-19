import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const SocialIcon = ({ href, icon: Icon, label, rotateDirection = 5 }) => {
  const iconRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!iconRef.current) return;

    const rect = iconRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setMagnet({
      x: (e.clientX - centerX) * 0.28,
      y: (e.clientY - centerY) * 0.28,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setMagnet({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={iconRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: magnet.x,
        y: magnet.y,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 24,
        mass: 0.4,
      }}
      whileTap={{ scale: 0.88 }}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl text-gray-400 transition hover:text-white"
    >
      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, y: 6, scale: 0.9 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 6,
          scale: hovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur-md"
      >
        {label}
      </motion.span>

      {/* Rotating border */}
      <motion.span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.55) 12%, transparent 25%)",
        }}
        animate={{ rotate: hovered ? 360 : 0 }}
        transition={{
          duration: 1.6,
          repeat: hovered ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Inner background */}
      <span className="absolute inset-[1px] rounded-full bg-black" />

      {/* Glow */}
      <motion.span
        className="absolute inset-0 rounded-full bg-white/20 blur-xl"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{
          opacity: hovered ? 0.8 : 0,
          scale: hovered ? 1.35 : 0.4,
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Ripple */}
      {hovered && (
        <motion.span
          className="absolute inset-0 rounded-full border border-white/30"
          initial={{ scale: 1, opacity: 0.55 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.75 }}
        />
      )}

      {/* Icon */}
      <motion.span
        className="relative z-10"
        animate={{
          scale: hovered ? 1.18 : 1,
          rotate: hovered ? [0, -rotateDirection, rotateDirection, 0] : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <Icon />
      </motion.span>
    </motion.a>
  );
};

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-black/40 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-gray-300">
        <span className="text-sm">
          © {new Date().getFullYear()} Bimala Venu Madhav
        </span>

        <div className="flex items-center gap-4">
          <SocialIcon
            href="https://github.com/BIMALA-VENU-MADHAV"
            icon={FaGithub}
            label="GitHub"
            rotateDirection={5}
          />

          <SocialIcon
            href="https://www.linkedin.com/in/bimala-venu-madhav-731a30334"
            icon={FaLinkedinIn}
            label="LinkedIn"
            rotateDirection={-5}
          />

          <SocialIcon
            href="https://www.instagram.com/_mr_prince_1_7"
            icon={FaInstagram}
            label="Instagram"
            rotateDirection={5}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;