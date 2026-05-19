import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";

const projects = [
  {
    title: "JMRAO Associates",
    description:
      "Service-based business website for tax and compliance solutions including GST, Income Tax, and registrations.",
    image: "/projects/jmrao.png",
    live: "https://jmraoassociates.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/jmraoassociates.git",
    tags: ["Full Stack", "React", "Tailwind", "Vercel"],
  },
  {
    title: "ShopSmart",
    description:
      "A full-stack grocery web application with authentication, admin dashboard, and product management.",
    image: "/projects/shopsmart.png",
    live: "https://shopsmart-frontend.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/ShopSmart",
    tags: ["Full Stack", "React", "MERN", "Auth", "Dashboard"],
  },
  {
    title: "Laundry Order Management System",
    description:
      "Full-stack application for managing laundry orders, billing, and tracking with a dashboard for business insights.",
    image: "/projects/laundry.png",
    live: "https://drycleaning1.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/Laundry-Order-Management",
    tags: ["React", "Full Stack", "Dashboard", "Analytics"],
  },
  {
    title: "Dog Breed Classification",
    description:
      "AI and ML model to classify dog breeds using image recognition.",
    image: "/projects/dogbreed.png",
    live: "https://wvenu07-dog-breed.hf.space",
    github: "https://github.com/BIMALA-VENU-MADHAV/Dog-Breed-Classification",
    tags: ["AI/ML", "Python", "HuggingFace"],
  },
  {
    title: "House Rent Prediction",
    description:
      "AI and ML model to predict house rent prices based on features.",
    image: "/projects/houserent.png",
    live: "https://house-rent-prediction-uizh.onrender.com",
    github: "https://github.com/BIMALA-VENU-MADHAV/House-Rent-Prediction",
    tags: ["AI/ML", "Python", "Render"],
  },
  {
    title: "Weather Forecast App",
    description:
      "Real-time weather application using external APIs with search, location-based results, and clean UI.",
    image: "/projects/weather.png",
    live: "https://weatherapp-red-zeta.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/WeatherApp",
    tags: ["React", "API", "Responsive"],
  },
  {
    title: "Calculator App",
    description:
      "A responsive calculator application supporting basic arithmetic operations.",
    image: "/projects/calculator.png",
    live: "https://calculator-app-phi-gilt.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/Calculator-app",
    tags: ["React", "JavaScript", "CSS", "Logic"],
  },
  {
    title: "Tic Tac Toe Game",
    description: "Classic tic tac toe game with interactive UI and game logic.",
    image: "/projects/tictactoe.png",
    live: "https://tictactoegame7.netlify.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/TicTacToe",
    tags: ["React", "JavaScript", "Game", "Logic"],
  },
  {
    title: "Aura Music Player",
    description:
      "A modern music player application with playlist management and audio controls.",
    image: "/projects/aura.png",
    live: "https://auramusicplayer-7.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/Aura",
    tags: ["React", "Audio API", "UI/UX"],
  },
];

const ProjectCard = ({ project, index }) => {
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
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
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
      <div className="absolute -inset-2 rounded-2xl bg-white opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-20" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg transition-all duration-500 group-hover:border-white/30">
        {/* Rotating border */}
        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            isHovered ? "animate-card-spin" : ""
          }`}
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.28), transparent)",
          }}
        />

        {/* Inner content */}
        <div className="relative m-[1px] overflow-hidden rounded-2xl bg-black/70">
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden">
            {/* Shine effect */}
            <div
              className={`absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                isHovered ? "animate-card-shine" : ""
              }`}
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                backgroundSize: "220% 100%",
              }}
            />

            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

            {/* Tags */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-medium text-white/85 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4 p-6">
            <h2 className="text-lg font-semibold tracking-wide text-white transition-colors">
              {project.title}
            </h2>

            <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">
              {project.description}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative flex flex-1 items-center justify-center gap-2 overflow-hidden py-2.5"
              >
                <span className="absolute inset-0 rounded-full border border-white/30 transition-all duration-500 group-hover/btn:border-white/60" />
                <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-white transition-transform duration-500 group-hover/btn:scale-x-100" />

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="relative z-10 transition-colors duration-500 group-hover/btn:text-black"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>

                <span className="relative z-10 text-sm transition-colors duration-500 group-hover/btn:text-black">
                  Live
                </span>
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative flex flex-1 items-center justify-center gap-2 overflow-hidden py-2.5"
              >
                <span className="absolute inset-0 rounded-full border border-white/30 transition-all duration-500 group-hover/btn:border-white/60" />
                <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-white transition-transform duration-500 group-hover/btn:scale-x-100" />

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="relative z-10 transition-colors duration-500 group-hover/btn:text-black"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>

                <span className="relative z-10 text-sm transition-colors duration-500 group-hover/btn:text-black">
                  GitHub
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Project = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState("all");

  const categories = ["all", "Full Stack", "AI/ML", "React"];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) =>
          project.tags.some((tag) =>
            tag.toLowerCase().includes(filter.toLowerCase())
          )
        );

  return (
    <>
      <Helmet>
        <title>Projects | Bimala Venu Madhav</title>

        <meta
          name="description"
          content="Explore projects by Bimala Venu Madhav including MERN stack apps, AI/ML models, and modern web applications."
        />

        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://bimalavenumadhav.vercel.app/projects"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Projects | Bimala Venu Madhav" />
        <meta
          property="og:description"
          content="View my portfolio projects including full-stack apps, AI/ML models, and web applications."
        />
        <meta
          property="og:image"
          content="https://bimalavenumadhav.vercel.app/profile.jpeg"
        />
        <meta
          property="og:url"
          content="https://bimalavenumadhav.vercel.app/projects"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Bimala Venu Madhav" />
        <meta
          name="twitter:description"
          content="Explore MERN stack, AI/ML, and web development projects."
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
          <div className="relative mb-12 text-center">
            <motion.h1
              className="relative inline-block text-3xl font-bold tracking-[0.22em] text-white sm:text-4xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="relative inline-block">
                PROJECTS

                <span
                  className="absolute inset-0 text-white/10"
                  style={{ transform: "translate(-2px, 0)" }}
                >
                  PROJECTS
                </span>
              </span>
            </motion.h1>

            <motion.div
              className="absolute -bottom-4 left-1/2 h-px w-24 -translate-x-1/2 origin-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              }}
            />
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16 flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`relative rounded-full px-5 py-2 text-sm transition-all duration-300 ${
                  filter === cat
                    ? "text-black"
                    : "border border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {filter === cat && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10 capitalize">{cat}</span>
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </motion.div>

          
        </div>

        {/* Vite React CSS replacement for style jsx */}
        <style>
          {`
            @keyframes card-spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            @keyframes card-shine {
              0% {
                background-position: 200% 0;
              }
              100% {
                background-position: -200% 0;
              }
            }

            .animate-card-spin {
              animation: card-spin 4s linear infinite;
            }

            .animate-card-shine {
              animation: card-shine 1.5s ease-in-out;
            }
          `}
        </style>
      </section>
    </>
  );
};

export default Project;