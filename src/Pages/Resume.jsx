import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Resume = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
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
        <link rel="canonical" href="https://bimalavenumadhav.vercel.app/resume" />

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
        <h1 className="text-3xl sm:text-4xl font-bold tracking-widest text-center mb-20">
          RESUME
        </h1>
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
          className="w-full max-w-3xl h-auto object-contain border border-white/20 rounded-lg shadow-lg cursor-pointer"
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
                className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
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
