import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Certificates", path: "/certificates" },
  { name: "Resume", path: "/resume" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
      <nav className="flex items-center justify-between px-6 py-5">
        <NavLink
          to="/"
          className="text-xl font-bold tracking-wide whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          Portfolio
        </NavLink>

        <ul className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <NavLink
                to={link.path}
                className="text-base tracking-wide hover:text-gray-400 transition"
              >
                {link.name}
              </NavLink>

              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-[2px] w-full bg-white"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </li>
          ))}

          <li>
            <a
              href="https://github.com/BIMALA-VENU-MADHAV"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 border border-white text-base rounded-full hover:bg-white hover:text-black transition"
            >
              GitHub
            </a>
          </li>
        </ul>

        <button
          className="md:hidden z-50 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <motion.div animate={open ? "open" : "closed"} className="space-y-1.5">
            <motion.span
              variants={{ open: { rotate: 45, y: 6 }, closed: { rotate: 0, y: 0 } }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              variants={{ open: { rotate: -45, y: -6 }, closed: { rotate: 0, y: 0 } }}
              className="block h-0.5 w-6 bg-white"
            />
          </motion.div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/70 backdrop-blur-md border-t border-white/10 px-6 py-8 space-y-6"
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="block text-base hover:text-gray-400 transition"
                >
                  {link.name}
                </NavLink>
              </motion.li>
            ))}

            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="https://github.com/BIMALA-VENU-MADHAV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 border border-white text-base rounded-full hover:bg-white hover:text-black transition"
              >
                GitHub
              </a>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
