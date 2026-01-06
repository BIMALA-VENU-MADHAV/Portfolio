import { motion } from "framer-motion";

const projects = [
  {
    title: "ShopSmart",
    description:
      "A full-stack grocery web application with authentication, admin dashboard, and product management.",
    image: "/projects/shopsmart.png",
    live: "https://shopsmart-frontend.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/ShopSmart",
  },
  {
    title: "Weather Forecast App",
    description:
      "Real-time weather application using external APIs with search, location-based results, and clean UI.",
    image: "/projects/weather.png",
    live: "https://weatherapp-red-zeta.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/WeatherApp",
  },
  {
    title: "Meltrax",
    description:
      "Corporate website for a manufacturing company showcasing services and infrastructure.",
    image: "/projects/meltrax.png",
    live: "https://meltrax.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/MELTRAX",
  },
  {
    title: "Calculator App",
    description:
      "A responsive calculator application supporting basic arithmetic operations.",
    image: "/projects/calculator.png",
    live: "https://calculator-app-phi-gilt.vercel.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/Calculator-app",
  },
  {
    title: "Tic Tac Toe Game",
    description:
      "Classic tic tac toe game with interactive UI and game logic.",
    image: "/projects/tictactoe.png",
    live: "https://tictactoegame7.netlify.app/",
    github: "https://github.com/BIMALA-VENU-MADHAV/TicTacToe",
  },
];

const Project = () => {
  return (
    <section className="min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-widest text-center mb-20">
          PROJECTS
        </h1>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6 flex flex-col gap-4">
                <h2 className="text-lg font-semibold tracking-wide">
                  {project.title}
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex gap-4 pt-4">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-white text-sm rounded-full hover:bg-white hover:text-black transition"
                  >
                    Live
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-white/40 text-sm rounded-full hover:border-white transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
