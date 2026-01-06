import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-black/40 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-gray-300">
        <span className="text-sm">
          © {new Date().getFullYear()} Bimala Venu Madhav
        </span>

        <div className="flex items-center gap-6">
          <motion.a
            href="https://github.com/BIMALA-VENU-MADHAV"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-xl hover:text-white"
          >
            <FaGithub />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/bimala-venu-madhav-731a30334"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-xl hover:text-white"
          >
            <FaLinkedinIn />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/_mr_prince_1_7"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-xl hover:text-white"
          >
            <FaInstagram />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
