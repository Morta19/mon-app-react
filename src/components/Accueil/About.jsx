import React from "react";
import { useNavigate } from "react-router-dom"; // Import nécessaire pour la navigation
import {
  FaCode,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaCheckCircle,
  FaAward,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";
import mortaImg from "../../assets/morta.jpg";

const About = () => {
  const navigate = useNavigate(); // Initialisation du hook de navigation

  const user = {
    name: "Mortadha Hassen Masmoudi",
    title: "Développeur Full-Stack",
    tagline: "Ingénierie Web & Automatisation",
    mainDescription:
      "Passionné par l'écosystème Full-Stack, je me spécialise dans la création d'architectures microservices et de systèmes automatisés. Mon approche combine rigueur technique et vision produit pour transformer des concepts complexes en interfaces fluides.",
    mission:
      "Concevoir des solutions robustes, optimisées et scalables pour répondre aux défis numériques de demain.",
    image: mortaImg,
    githubUrl: "https://github.com/Morta19", // REMPLACEZ PAR VOTRE LIEN RÉEL
    stats: [
      { label: "Projets", value: "12+" },
      { label: "Satisfaction", value: "100%" },
      { label: "Expérience", value: "2 Ans" },
      { label: "Innovation", value: "Top 1" },
    ],
    features: [
      {
        icon: <FaCode />,
        title: "Code Structuré",
        desc: "Architecture propre et maintenable (Clean Code).",
      },
      {
        icon: <FaRocket />,
        title: "Performance",
        desc: "Optimisation backend et temps de réponse records.",
      },
      {
        icon: <FaUsers />,
        title: "Collaboration",
        desc: "Expertise en méthodologies agiles et travail d'équipe.",
      },
      {
        icon: <FaLightbulb />,
        title: "Innovation",
        desc: "Veille techno constante sur Flask, React et Docker.",
      },
    ],
    expertise: [
      "Architecture Microservices & APIs REST",
      "Web Scraping Industriel (Selenium/Playwright)",
      "Interfaces Réactives (React / Vue.js)",
      "Conteneurisation & DevOps (Docker)",
      "Optimisation de Bases de Données SQL",
    ],
  };

  return (
    <section className="bg-[#030304] text-white py-24 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HERO SECTION --- */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#0d0d0f] border border-white/5 rounded-full shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                {user.tagline}
              </span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9]">
              CODE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">
                ARCHITECT.
              </span>
            </h2>

            <p className="text-lg text-zinc-500 leading-relaxed max-w-xl font-medium">
              {user.mainDescription}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {user.stats.map((stat, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-[#0d0d0f] border border-white/5 p-5 rounded-2xl transition-all group-hover:border-blue-500/50">
                    <p className="text-2xl font-black text-white italic">
                      {stat.value}
                    </p>
                    <p className="text-[8px] uppercase tracking-widest text-zinc-600 font-black mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group justify-self-center lg:justify-self-end">
            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[3rem] opacity-10 blur-3xl group-hover:opacity-30 transition duration-700"></div>
            <div className="relative w-80 h-[450px] md:w-96 md:h-[550px] overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-black italic text-2xl uppercase tracking-tighter">
                  M. Masmoudi
                </p>
                <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">
                  Full-Stack Engineer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- BENTO GRID FEATURES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-40">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {user.features.map((f, i) => (
              <div
                key={i}
                className="bg-[#0d0d0f] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.02] transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-white/5 text-6xl group-hover:text-blue-500/10 transition-colors">
                  {f.icon}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h4 className="text-lg font-black uppercase italic mb-3 tracking-tight">
                  {f.title}
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-12 rounded-[2.5rem] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
                <FaLightbulb className="text-white" />
              </div>
              <h4 className="text-3xl font-black italic leading-[1.1] mb-6">
                "RENDRE LE COMPLEXE INTUITIF."
              </h4>
              <p className="text-blue-100/70 text-sm font-medium leading-relaxed">
                {user.mission}
              </p>
            </div>
            <FaRocket className="absolute -bottom-10 -right-10 text-[14rem] opacity-10 -rotate-12 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-1000" />
          </div>
        </div>

        {/* --- EXPERIENCE & EXPERTISE --- */}
        <div className="grid lg:grid-cols-5 gap-16 mb-40">
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-sm font-black text-zinc-600 uppercase tracking-[0.4em] flex items-center gap-4">
              Expertise Technique{" "}
              <span className="h-px flex-1 bg-white/5"></span>
            </h3>
            <div className="space-y-4">
              {user.expertise.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-[#0d0d0f] p-5 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all group"
                >
                  <span className="text-zinc-400 text-sm font-bold uppercase tracking-tight group-hover:text-white transition-colors">
                    {item}
                  </span>
                  <FaCheckCircle className="text-zinc-800 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-10">
            <h3 className="text-sm font-black text-zinc-600 uppercase tracking-[0.4em] flex items-center gap-4">
              Parcours & Distinctions{" "}
              <span className="h-px flex-1 bg-white/5"></span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#0d0d0f] border border-white/5 p-8 rounded-[2rem] relative group hover:border-blue-500/30 transition-all">
                <FaGraduationCap className="text-3xl text-blue-500 mb-6" />
                <h4 className="text-lg font-black uppercase italic tracking-tighter">
                  Licence Génie Logiciel
                </h4>
                <p className="text-blue-500/60 font-black text-[10px] uppercase tracking-widest mt-2">
                  IIT • 2022 - 2026
                </p>
                <p className="text-zinc-500 text-xs mt-4 leading-relaxed font-medium">
                  Architecture logicielle avancée et cybersécurité.
                </p>
              </div>

              <div className="bg-[#0d0d0f] border border-white/5 p-8 rounded-[2rem] relative group hover:border-yellow-500/30 transition-all">
                <FaAward className="text-3xl text-yellow-500 mb-6" />
                <h4 className="text-lg font-black uppercase italic tracking-tighter">
                  Projet Innovant
                </h4>
                <p className="text-yellow-500/60 font-black text-[10px] uppercase tracking-widest mt-2">
                  Projects Valley • 2024
                </p>
                <p className="text-zinc-500 text-xs mt-4 leading-relaxed font-medium">
                  Distinction pour l'excellence en automatisation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- CTA SECTION --- */}
        <div className="relative py-24 rounded-[3.5rem] bg-[#0d0d0f] border border-white/5 overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-600/10 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 leading-tight">
              PRÊT À <span className="text-blue-500">TRANSFORMER</span> <br />{" "}
              VOS IDÉES ?
            </h3>
            <p className="text-zinc-500 text-lg mb-12 font-medium">
              Collaborons pour bâtir des systèmes qui définissent les nouveaux
              standards du web.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {/* BOUTON 1 : Navigation Interne vers Contact */}
              <button
                onClick={() => navigate("/contact")}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] active:scale-95 flex items-center gap-3"
              >
                Démarrer un projet <FaArrowRight />
              </button>

              {/* BOUTON 2 : Lien Externe vers GitHub */}
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Voir mon Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
