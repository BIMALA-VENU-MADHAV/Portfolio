import { motion } from "framer-motion";
import {
  FaJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import { SiMongodb, SiMysql, SiVercel, SiRender } from "react-icons/si";

const techStack = [
  FaJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  SiMongodb,
  SiMysql,
  FaGitAlt,
  FaGithub,
  SiVercel,
  SiRender,
];

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-widest mb-10">
          LET ME INTRODUCE MYSELF
        </h1>

        <div className="space-y-6 text-sm sm:text-base text-gray-400 leading-relaxed">
          <p>
            I’m a Software Developer experienced in building scalable, efficient
             applications. My core skill set includes{" "}
            <span className="text-white">
              JavaScript, Python, Java, SQL, HTML, and CSS
            </span>
            , with hands-on experience using modern frameworks like{" "}
            <span className="text-white">React.js</span> and{" "}
            <span className="text-white">Node.js</span>.
          </p>

          <p>
            I work extensively with databases such as{" "}
            <span className="text-white">MongoDB</span> and{" "}
            <span className="text-white">MySQL</span>, integrate{" "}
            <span className="text-white">RESTful APIs</span>, and deploy
            production-ready applications on platforms like{" "}
            <span className="text-white">Vercel</span> and{" "}
            <span className="text-white">Render</span>.
          </p>

          <p>
            I use <span className="text-white">Git</span> and{" "}
            <span className="text-white">GitHub</span> for version control and
            collaboration, ensuring clean workflows and maintainable codebases.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-6"
        >
          {techStack.map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-2xl sm:text-3xl text-gray-400 hover:text-white transition"
            >
              <Icon />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 text-sm text-gray-400">
          Feel free to connect with me
        </div>
      </motion.div>
    </section>
  );
};

export default About;
