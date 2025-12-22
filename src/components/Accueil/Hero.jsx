import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaChevronRight,
  FaEnvelope,
  FaCode,
} from "react-icons/fa";
import mortaImg from "../../assets/morta.jpg";

const Hero = () => {
  const user = {
    name: "Mortadha Hassen Masmoudi",
    title: "Développeur Full-Stack",
    description:
      "Expert en Flask, React et Web Scraping avancé. Je construis des systèmes évolutifs et des expériences numériques de haute précision.",
    avatar: mortaImg,
    location: "Sfax, Tunisie",
  };

  return (
    <section className="relative min-h-[100vh] flex items-center bg-[#050505] text-white overflow-hidden pt-20">
      {/* Background Blobs (Plus subtils et mieux placés) */}
      <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* CÔTÉ GAUCHE : TEXTE (Plus aéré) */}
          <div className="flex-[1.2] space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                Disponible • {user.location}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
                CRAFTING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-300 to-purple-500 not-italic">
                  DIGITAL POWER.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Je suis{" "}
                <span className="text-white font-bold">{user.name}</span>.{" "}
                {user.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/projets"
                className="group relative px-10 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
                  Portfolio <FaChevronRight size={10} />
                </span>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>

              <Link
                to="/contact"
                className="px-10 py-4 bg-transparent border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-3"
              >
                <FaEnvelope size={12} className="text-blue-500" /> Me contacter
              </Link>
            </div>
          </div>

          {/* CÔTÉ DROIT : IMAGE (Version Compacte & Stylisée) */}
          <div className="flex-1 relative max-w-[400px] lg:max-w-none">
            {/* Le Cadre "Architectural" */}
            <div className="relative z-10 w-[280px] h-[350px] md:w-[350px] md:h-[450px] mx-auto group">
              {/* Effet de bordure néon */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

              {/* Conteneur Image */}
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/10">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />

                {/* Badge Flottant "Tech" */}
                <div className="absolute top-6 right-6 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl">
                  <FaCode className="text-blue-500 text-xl" />
                </div>

                {/* Overlay Infos */}
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">
                        Expertise
                      </p>
                      <p className="text-sm font-bold text-white uppercase italic">
                        Full Stack & Scraping
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black italic">2+</p>
                      <p className="text-[8px] font-bold text-zinc-500 uppercase">
                        Expérience
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Éléments de design flottants derrière */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl animate-bounce-slow"></div>
            </div>

            {/* Liens Sociaux Verticaux (À côté de l'image sur Desktop) */}
            <div className="hidden xl:flex flex-col gap-6 absolute -right-12 top-1/2 -translate-y-1/2">
              <a
                href="https://github.com/Morta19"
                className="text-zinc-600 hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/mortadha-hassen-masmoudi-676530359/"
                className="text-zinc-600 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <div className="h-20 w-[1px] bg-white/10 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
