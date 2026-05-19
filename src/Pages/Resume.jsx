import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Resume = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Helmet>
        <title>Resume | Bimala Venu Madhav</title>

        <meta
          name="description"
          content="View and download the resume of Bimala Venu Madhav, a MERN stack developer skilled in React, Node.js, MongoDB, and full-stack development."
        />

        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://bimalavenumadhav.vercel.app/resume"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Resume | Bimala Venu Madhav" />
        <meta
          property="og:description"
          content="Download my resume and explore my skills, experience, and projects as a MERN stack developer."
        />
        <meta
          property="og:image"
          content="https://bimalavenumadhav.vercel.app/Resume_preview.png"
        />
        <meta
          property="og:url"
          content="https://bimalavenumadhav.vercel.app/resume"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resume | Bimala Venu Madhav" />
        <meta
          name="twitter:description"
          content="Download my resume and explore my experience as a MERN stack developer."
        />
        <meta
          name="twitter:image"
          content="https://bimalavenumadhav.vercel.app/Resume_preview.png"
        />
      </Helmet>

      <section className="min-h-screen px-6 py-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl flex flex-col items-center gap-8"
        >
          {/* Updated Resume Title */}
          <div className="relative text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative inline-block"
            >
              {/* Background glow */}
              <div className="absolute -inset-8 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-2xl" />

              <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.22em]">
                <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                  RESUME
                </span>

                <span
                  className="absolute inset-0 text-white/10"
                  style={{ transform: "translate(-2px, 0)" }}
                >
                  RESUME
                </span>
              </h1>

              {/* Decorative left line */}
              <motion.div
                className="absolute -left-16 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-r from-transparent to-white/50 sm:block"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              {/* Decorative right line */}
              <motion.div
                className="absolute -right-16 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-l from-transparent to-white/50 sm:block"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              {/* Underline */}
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
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-xs sm:text-sm text-white/40 tracking-widest uppercase"
            >
              Click preview to view full size
            </motion.p>
          </div>

          <a
            href="/BIMALA VENU MADHAV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            Download Resume
          </a>

          <img
            src="/Resume_preview.png"
            alt="Resume Preview"
            onClick={() => setOpen(true)}
            className="w-full max-w-10xl h-auto object-contain border border-white/20 rounded-lg shadow-lg cursor-pointer"
          />

          <a
            href="/BIMALA VENU MADHAV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            Download Resume
          </a>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
                onClick={() => setOpen(false)}
              >
                <motion.img
                  src="/Resume_preview.png"
                  alt="Resume Full Preview"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[100vh] max-w-[90vw] rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />

                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-6 right-6 text-white text-2xl"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
};

export default Resume;