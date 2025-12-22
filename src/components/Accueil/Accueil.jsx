import React from "react";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Experience from "./Experience.jsx";

const Accueil = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Experience / Parcours Professionnel */}
      <Experience />
    </div>
  );
};

export default Accueil;
