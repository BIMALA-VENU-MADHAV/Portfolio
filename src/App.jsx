import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Project from "./Pages/Project";
import Certificate from "./Pages/Certificate";
import Resume from "./Pages/Resume";
import NotFound from "./Pages/NotFound";

function App() {
  const location = useLocation();

  const isNotFound =
    !["/", "/about", "/projects", "/certificates", "/resume"].includes(
      location.pathname
    );

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {!isNotFound && <Header />}

      <main className="flex-grow px-6 py-18">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/certificates" element={<Certificate />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isNotFound && <Footer />}
    </div>
  );
}

export default App;
