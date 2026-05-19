import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Certificates", path: "/certificates" },
  { name: "Resume", path: "/resume" },
];

const MagneticLink = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position, x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const GlowingBorder = () => (
  <div className="absolute inset-0 overflow-hidden rounded-full">
    <div 
      className="absolute inset-0 animate-spin-slow"
      style={{
        background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.8), transparent, rgba(255,255,255,0.4), transparent)',
        animationDuration: '3s',
      }}
    />
    <div className="absolute inset-[1px] bg-black rounded-full" />
  </div>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();
  const headerRef = useRef(null);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [12, 20]);
  
  const springY = useSpring(headerY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      ref={headerRef}
      style={{ y: springY, opacity: headerOpacity }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-2' 
          : 'py-4'
      }`}
    >
      {/* Animated background */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/70 backdrop-blur-xl' 
            : 'bg-black/30 backdrop-blur-md'
        }`}
      />
      
      {/* Bottom border with gradient animation */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div 
          className="h-full w-[200%]"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.5), rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.5), rgba(255,255,255,0.1), transparent)',
          }}
        />
      </div>

      <nav className="relative flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
        {/* Logo with glow effect */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 text-lg sm:text-xl font-bold tracking-wide whitespace-nowrap shrink-0"
          onClick={() => setOpen(false)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.img 
              src="/logo.png" 
              alt="logo" 
              className="relative w-8 h-8 shrink-0"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </div>
          <motion.span 
            className="relative"
            whileHover={{ letterSpacing: '0.1em' }}
            transition={{ duration: 0.3 }}
          >
            Portfolio
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-white to-transparent group-hover:w-full transition-all duration-300" />
          </motion.span>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-2 xl:gap-4">
          {navLinks.map((link, index) => (
            <li key={link.name} className="relative">
              <MagneticLink>
                <NavLink
                  to={link.path}
                  className="relative px-4 py-2 text-sm tracking-wide transition-colors duration-300 block"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hover background */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="nav-hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Link text with animated underline */}
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Active indicator */}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
                    </motion.div>
                  )}
                </NavLink>
              </MagneticLink>
            </li>
          ))}

          {/* GitHub Button with special effects */}
          <li className="ml-4">
            <MagneticLink>
              <a
                href="https://github.com/BIMALA-VENU-MADHAV"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-5 py-2.5 text-sm rounded-full overflow-hidden block"
              >
                {/* Animated border */}
                <GlowingBorder />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                </span>
                
                {/* Hover fill effect */}
                <div className="absolute inset-[1px] bg-white rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="absolute inset-0 flex items-center justify-center gap-2 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 z-20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                </span>
              </a>
            </MagneticLink>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="lg:hidden z-50 p-2 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="absolute top-0 left-0 block h-0.5 w-6 bg-white rounded-full"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="absolute top-2 left-0 block h-0.5 w-6 bg-white rounded-full"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="absolute top-4 left-0 block h-0.5 w-6 bg-white rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
              onClick={() => setOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden relative overflow-hidden"
            >
              <div className="bg-black/90 backdrop-blur-xl border-t border-white/10">
                <ul className="px-6 py-8 space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-300 ${
                          location.pathname === link.path 
                            ? 'bg-white/10' 
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          location.pathname === link.path 
                            ? 'bg-white scale-100' 
                            : 'bg-white/30 scale-75 group-hover:scale-100 group-hover:bg-white/50'
                        }`} />
                        <span className="text-lg font-light tracking-wide">{link.name}</span>
                        <svg 
                          className={`w-4 h-4 ml-auto transition-all duration-300 ${
                            location.pathname === link.path 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'
                          }`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </NavLink>
                    </motion.li>
                  ))}

                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="pt-4"
                  >
                    <a
                      href="https://github.com/BIMALA-VENU-MADHAV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-black font-medium rounded-full transition-transform duration-300 active:scale-95"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      View GitHub
                    </a>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
