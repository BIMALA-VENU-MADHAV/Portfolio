import { motion } from "framer-motion";

const certificates = [
  {
    title: "JavaScript Foundations",
    issuer: "Mozilla (LinkedIn)",
    image: "/certificates/javascript.png",
    link: "https://www.linkedin.com/learning/certificates/831b3fe9dbd681d929b86859b2276d19389f002e04e0f8d62217de71d8a62762",
  },
  {
    title: "Full Stack Development",
    issuer: "SmartBridge",
    image: "/certificates/smartbridge.png",
    link: "https://apsche.smartinternz.com/certificate/student/0090f3ec04a901452d3bd40e39d4d832",
  },
  {
    title: "Java Programming",
    issuer: "edX",
    image: "/certificates/java.png",
    link: "https://drive.google.com/file/d/1xMhUQzdDWVz2U_3kjFxkvlZFEah0fvYr/view",
  },
  {
    title: "SQL Programming",
    issuer: "LinkedIn Learning",
    image: "/certificates/sql.png",
    link: "https://www.linkedin.com/learning/certificates/96f60eb735f81e078bb3417c4770d53ac39ada12dffdfbeee07d44358eb96e01",
  },
  {
    title: "Web Development Internship",
    issuer: "SkillForge",
    image: "/certificates/skillforge.png",
    link: "https://workdrive.zohopublic.in/file/d7kd526480310807745fd9ae3d3a985d264e4",
  },
];

const Certificate = () => {
  return (
    <section className="min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-widest text-center mb-20">
          CERTIFICATES
        </h1>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
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
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6 flex flex-col gap-3">
                <h2 className="text-lg font-semibold tracking-wide">
                  {cert.title}
                </h2>

                <p className="text-sm text-gray-400">
                  {cert.issuer}
                </p>

                <div className="pt-4">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 border border-white text-sm rounded-full hover:bg-white hover:text-black transition"
                  >
                    View Certificate
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

export default Certificate;
