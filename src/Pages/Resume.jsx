import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

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
    <section className="min-h-screen px-6 py-32 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl flex flex-col items-center gap-10"
      >
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
          className="w-full max-w-3xl border border-white/20 rounded-lg shadow-lg cursor-pointer"
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
  );
};

export default Resume;
