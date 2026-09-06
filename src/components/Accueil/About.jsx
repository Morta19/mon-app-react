import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaCheckCircle,
  FaAward,
  FaGraduationCap,
} from "react-icons/fa";
import mortaImg from "../../assets/morta.jpg";

const About = () => {
  const navigate = useNavigate();

  const user = {
    name: "Mortadha Hassen MASMOUDI",
    tagline: "Développeur full-stack",
    mainDescription:
      "Développeur full-stack spécialisé en applications web et solutions IA. Titulaire d'une Licence en Génie Logiciel (IIT, 2026). Expériences professionnelles chez Linio.io et BACAB Consulting.",
    mission:
      "Concevoir des solutions robustes, évolutives et centrées utilisateur.",
    image: mortaImg,
    githubUrl: "https://github.com/Morta19",
    features: [
      {
        icon: <FaCode />,
        title: "Code structuré",
        desc: "Architecture propre et maintenable, pensée pour durer.",
      },
      {
        icon: <FaUsers />,
        title: "Travail en équipe",
        desc: "Pratiques agiles et collaboration orientée produit.",
      },
      {
        icon: <FaLightbulb />,
        title: "IA appliquée",
        desc: "Intégration de modèles de Computer Vision (YOLOv8).",
      },
      {
        icon: <FaRocket />,
        title: "Fiabilité",
        desc: "Production de services backend résilients et testés.",
      },
    ],
    expertise: [
      "Architecture microservices & APIs REST",
      "Web scraping (Selenium / Playwright)",
      "Interfaces réactives (React / Vue.js)",
      "Computer Vision & YOLOv8",
      "Bases de données SQL",
    ],
  };

  return (
    <section className="bg-[var(--bg)] text-[var(--ink)] py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 pb-10 border-b border-[var(--line)]">
          <div className="space-y-6">
            <span className="font-mono text-[11px] tracking-widest text-[var(--accent)]">
              {user.tagline.toUpperCase()}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Profil & formation
            </h2>
            <p className="text-lg text-[var(--ink-muted)] leading-relaxed max-w-xl">
              {user.mainDescription}
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              <div className="card p-6">
                <p className="font-mono text-xs text-[var(--ink-muted)] tracking-widest">
                  Diplôme
                </p>
                <h3 className="font-display text-lg font-semibold mt-2">
                  Licence en Génie Logiciel et Systèmes d'Information
                </h3>
                <p className="text-[var(--ink-muted)] text-sm mt-1">
                  Institut International de Technologie — 2026
                </p>
                <p className="text-[var(--ink-muted)] text-xs mt-3">
                  Mention très bien
                </p>
              </div>

              <div className="card p-6">
                <p className="font-mono text-xs text-[var(--ink-muted)] tracking-widest">
                  Baccalauréat
                </p>
                <h3 className="font-display text-lg font-semibold mt-2">
                  Baccalauréat Mathématiques
                </h3>
                <p className="text-[var(--ink-muted)] text-sm mt-1">
                  Lycée Ibn Rachik — 2022
                </p>
              </div>
            </div>
          </div>

          <div className="justify-self-center lg:justify-self-end">
            <div className="corner-frame w-56 h-[360px] sm:w-72 sm:h-[420px] md:w-80 md:h-[480px] border border-[var(--line-strong)] bg-[var(--surface)] p-3">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[rgba(255,255,255,0.02)] to-transparent">
                  <p className="font-display font-semibold text-lg">
                    {user.name}
                  </p>
                  <p className="font-mono text-[10px] text-[var(--accent)] tracking-widest">
                    {user.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] mb-28">
          {user.features.map((f, i) => (
            <div
              key={i}
              className="bg-[var(--bg)] p-8 hover:bg-[var(--surface)] transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center text-[var(--accent)] mb-6 border border-[var(--line-strong)]">
                {f.icon}
              </div>
              <h4 className="font-display font-semibold text-lg mb-2">
                {f.title}
              </h4>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* EXPERTISE & MISSION */}
        <div className="grid lg:grid-cols-5 gap-16 mb-28">
          <div className="lg:col-span-2 space-y-8">
            <h3 className="font-mono text-[11px] text-[var(--ink-muted)] tracking-widest border-b border-[var(--line)] pb-4">
              EXPERTISE TECHNIQUE
            </h3>
            <div className="space-y-3">
              {user.expertise.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-[var(--line)] group"
                >
                  <span className="text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                    {item}
                  </span>
                  <FaCheckCircle className="text-[var(--line-strong)] group-hover:text-[var(--accent)] transition-colors shrink-0 ml-4" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
            <div className="border border-[var(--line)] p-8 bg-[var(--surface)] hover:border-[var(--accent)] transition-colors">
              <FaGraduationCap className="text-2xl text-[var(--accent)] mb-6" />
              <h4 className="font-display font-semibold text-lg">
                Licence en Génie Logiciel
              </h4>
              <p className="font-mono text-[10px] text-[var(--ink-muted)] tracking-widest mt-2">
                Institut International de Technologie · 2026
              </p>
              <p className="text-[var(--ink-muted)] text-xs mt-4 leading-relaxed">
                Mention très bien
              </p>
            </div>

            <div className="border border-[var(--line)] p-8 bg-[var(--surface)] hover:border-[var(--accent)] transition-colors">
              <FaAward className="text-2xl text-[var(--accent)] mb-6" />
              <h4 className="font-display font-semibold text-lg">
                Meilleur Projet Innovant
              </h4>
              <p className="font-mono text-[10px] text-[var(--ink-muted)] tracking-widest mt-2">
                Certificat d'excellence — Projet de fin d'année
              </p>
              <p className="text-[var(--ink-muted)] text-xs mt-4 leading-relaxed">
                Projet récompensé pour l'innovation lors d'une compétition
                interne.
              </p>
            </div>

            <div className="sm:col-span-2 border border-[var(--line-strong)] p-10 bg-[var(--ink)] text-[var(--bg)] flex items-start justify-between gap-8">
              <div>
                <p className="font-display text-2xl font-semibold leading-snug mb-3">
                  « Rendre le complexe intuitif. »
                </p>
                <p className="text-sm opacity-70 leading-relaxed max-w-md">
                  {user.mission}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border border-[var(--line-strong)] bg-[var(--surface)] p-12 md:p-16 text-center">
          <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            Prêt à transformer vos idées ?
          </h3>
          <p className="text-[var(--ink-muted)] text-lg mb-10 max-w-xl mx-auto">
            Collaborons pour bâtir des systèmes qui tiennent dans le temps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="bg-[var(--ink)] text-[var(--bg)] px-10 py-4 font-mono text-xs tracking-widest hover:bg-[var(--accent)] transition-colors"
            >
              DÉMARRER UN PROJET
            </button>
            <a
              href={user.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--line-strong)] px-10 py-4 font-mono text-xs tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              VOIR MON GITHUB
            </a>
          </div>
        </div>

        {/* LANGUES & INTERETS */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="border border-[var(--line)] p-6 bg-[var(--surface)]">
            <h4 className="font-mono text-[11px] tracking-widest text-[var(--ink-muted)] mb-4">
              LANGUES
            </h4>
            <ul className="list-none space-y-2">
              <li className="font-display">Arabe — C2</li>
              <li className="font-display">Français — B2</li>
              <li className="font-display">Anglais — B2</li>
              <li className="font-display">Turc — A2</li>
            </ul>
          </div>

          <div className="border border-[var(--line)] p-6 bg-[var(--surface)]">
            <h4 className="font-mono text-[11px] tracking-widest text-[var(--ink-muted)] mb-4">
              CENTRES D'INTÉRÊT
            </h4>
            <ul className="list-none space-y-2">
              <li>Handball — 9 ans de pratique</li>
              <li>Programmation personnelle</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
