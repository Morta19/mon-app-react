import React, { useRef, useEffect } from "react";
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
    name: "Mortadha Hassen MASMOUDI",
    title: "Développeur full-stack",
    description:
      "Licence Génie Logiciel (IIT, 2026). Expériences chez Linio.io et BACAB Consulting. Développement d'applications web et intégration de modèles IA (YOLOv8) pour plateformes Smart City.",
    avatar: mortaImg,
    location: "Sfax, Tunisie",
  };

  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
      el.style.setProperty("--tx", `${(x * 18).toFixed(1)}px`);
      el.style.setProperty("--ty", `${(y * 18).toFixed(1)}px`);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={rootRef}
      style={{ "--mx": 0, "--my": 0 }}
      className="relative min-h-[100vh] flex items-center bg-grid particle-grid text-[var(--ink)] overflow-hidden pt-20"
    >
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
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                {user.name}
                <br />
                <span className="font-mono text-lg text-[var(--accent)] uppercase">
                  {user.title}
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[var(--ink-muted)] font-medium max-w-2xl leading-relaxed">
                {user.description}
              </p>
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                {[
                  "Python / Flask",
                  "Java / Spring Boot",
                  "C# / ASP.NET Core MVC",
                  "JavaScript / React / Vue.js",
                  "Dart / Flutter",
                  "HTML5 / CSS3",
                  "SQL",
                  "Playwright",
                  "Selenium",
                  "YOLOv8",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="tech-chip text-[12px] text-[var(--muted-2)] whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="btn-primary inline-flex items-center gap-3"
              >
                Voir mes projets <FaChevronRight size={12} />
              </a>

              <a
                href="mailto:Mortadhahassenmasmoudi@gmail.com"
                className="btn-ghost inline-flex items-center gap-3"
              >
                <FaEnvelope size={14} className="text-[var(--accent)]" /> Me
                contacter
              </a>
            </div>
          </div>

          {/* CÔTÉ DROIT : IMAGE (Version Compacte & Stylisée) */}
          <div className="flex-1 relative max-w-[420px] lg:max-w-none">
            {/* Le Cadre "Architectural" (responsive: max-width pour éviter débordement) */}
            <div className="relative z-10 w-full max-w-[360px] h-auto md:h-[480px] min-h-[240px] sm:min-h-[320px] md:min-h-[420px] mx-auto group card glow">
              {/* Effet de bordure néon */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

              {/* Conteneur Image */}
              <div className="relative h-full w-full rounded-4xl overflow-hidden bg-[var(--surface-3)] border border-[var(--line-strong)]">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-700 transform scale-100 group-hover:scale-105"
                  decoding="async"
                />

                {/* Badge Flottant "Tech" */}
                <div className="absolute top-6 right-6 p-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-md">
                  <FaCode className="text-blue-500 text-xl" />
                </div>

                {/* Overlay Infos */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-gradient-to-t from-[rgba(2,6,23,0.85)] via-[rgba(2,6,23,0.45)] to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest mb-1">
                        Expertise
                      </p>
                      <p className="text-sm font-bold text-white uppercase italic">
                        Full-Stack · IA
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-[var(--ink-muted)]">
                        Licence Génie Logiciel • IIT
                      </p>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase">
                        2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Éléments de design flottants derrière */}
              <div
                className="absolute -top-10 -left-10 w-24 h-24 bg-blue-600/12 rounded-full blur-2xl"
                style={{
                  transform: `translate3d(calc(var(--mx)*10px), calc(var(--my)*8px),0)`,
                }}
              ></div>
              <div
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--accent-2)]/12 rounded-full blur-3xl"
                style={{
                  transform: `translate3d(calc(var(--mx)*-12px), calc(var(--my)*-10px),0)`,
                }}
              ></div>

              {/* Floating tech badges */}
              <div
                className="floating-tech"
                style={{
                  top: 12,
                  left: 14,
                  transform: `translate3d(calc(var(--mx)*8px),calc(var(--my)*8px),0)`,
                }}
              >
                Python / Flask
              </div>
              <div
                className="floating-tech"
                style={{
                  top: 40,
                  right: 20,
                  transform: `translate3d(calc(var(--mx)*-6px),calc(var(--my)*6px),0)`,
                  fontSize: 12,
                }}
              >
                YOLOv8
              </div>
              <div
                className="floating-tech"
                style={{
                  bottom: 64,
                  left: 18,
                  transform: `translate3d(calc(var(--mx)*6px),calc(var(--my)*-6px),0)`,
                  fontSize: 12,
                }}
              >
                React
              </div>
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
