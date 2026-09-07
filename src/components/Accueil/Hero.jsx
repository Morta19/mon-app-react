import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaChevronRight,
  FaChevronDown,
  FaEnvelope,
  FaCode,
} from "react-icons/fa";
import mortaImg from "../../assets/morta.jpg";

const Hero = () => {
  const user = {
    name: "Mortadha Hassen MASMOUDI",
    title: "Développeur full-stack",
    hookline:
      "Je transforme des idées en applications web robustes — du backend Flask aux interfaces React, jusqu'à l'IA quand elle apporte une vraie valeur.",
    description:
      "Licence Génie Logiciel (IIT, 2026 · mention très bien). Expériences chez Linio.io (remote, USA) et BACAB Consulting : microservices, APIs REST et vision par ordinateur (YOLOv8) appliquée à une plateforme Smart City.",
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
      className="relative min-h-[100vh] flex items-center bg-grid particle-grid text-[var(--ink)] overflow-hidden pt-24 pb-16"
    >
      {/* Background Blobs — halo ambre/navy cohérent avec le design system */}
      <div className="absolute top-[8%] left-[-8%] w-[560px] h-[560px] rounded-full blur-[150px] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }}></div>
      <div className="absolute bottom-[6%] right-[2%] w-[420px] h-[420px] rounded-full blur-[130px] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-2-soft), transparent 70%)" }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20">
          {/* CÔTÉ GAUCHE : TEXTE */}
          <div className="flex-[1.2] space-y-8 text-center lg:text-left">
            <div
              data-reveal="up"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--surface-3)]/70 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "var(--accent)" }}
                ></span>
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "var(--accent)" }}
                ></span>
              </span>
              <span className="font-mono text-[10px] font-semibold tracking-[0.28em] text-[var(--ink-muted)] uppercase">
                Disponible • {user.location}
              </span>
            </div>

            <div className="space-y-6">
              <h1 data-reveal="up" style={{ "--reveal-delay": "80ms" }}>
                <span className="block text-[var(--ink-muted)] mb-2">
                  <span className="eyebrow">PORTFOLIO — 2026</span>
                </span>
                <span className="display-xl block">
                  Mortadha Hassen
                  <br />
                  <span className="text-gradient-gold">Masmoudi</span>
                </span>
                <span className="mt-5 flex items-center justify-center lg:justify-start gap-4">
                  <span className="section-rule w-12 hidden sm:block"></span>
                  <span className="font-mono text-base sm:text-lg text-[var(--accent)] uppercase tracking-[0.18em]">
                    {user.title}
                  </span>
                </span>
              </h1>
              <p
                data-reveal="up"
                style={{ "--reveal-delay": "120ms" }}
                className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-[var(--ink)] leading-snug max-w-2xl mx-auto lg:mx-0"
              >
                {user.hookline}
              </p>
              <p
                data-reveal="up"
                style={{ "--reveal-delay": "180ms" }}
                className="text-sm sm:text-base text-[var(--ink-muted)] font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0"
              >
                {user.description}
              </p>
              <div
                data-reveal="up"
                style={{ "--reveal-delay": "220ms" }}
                className="flex gap-3 overflow-x-auto no-scrollbar py-1 lg:flex-wrap lg:overflow-visible"
              >
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
                    className="tech-chip text-[12px] text-[var(--ink-muted)] whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              data-reveal="up"
              style={{ "--reveal-delay": "300ms" }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Link
                to="/projects"
                className="btn-primary inline-flex items-center gap-3"
              >
                Voir mes projets <FaChevronRight size={12} />
              </Link>

              <Link
                to="/contact"
                className="btn-ghost inline-flex items-center gap-3"
              >
                <FaEnvelope size={14} className="text-[var(--accent)]" /> Me
                contacter
              </Link>
            </div>
          </div>

          {/* CÔTÉ DROIT : IMAGE (Cadre architectural) */}
          <div
            data-reveal="up"
            style={{ "--reveal-delay": "180ms" }}
            className="flex-1 relative max-w-[420px] lg:max-w-none"
          >
            {/* Le Cadre "Architectural" (responsive: max-width pour éviter débordement) */}
            <div className="relative z-10 w-full max-w-[360px] h-auto md:h-[480px] min-h-[240px] sm:min-h-[320px] md:min-h-[420px] mx-auto group card glow">
              {/* Effet de bordure halo ambre */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

              {/* Conteneur Image */}
              <div className="relative h-full w-full rounded-4xl overflow-hidden bg-[var(--surface-3)] border border-[var(--line-strong)]">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform scale-100 group-hover:scale-105"
                  decoding="async"
                />

                {/* Badge Flottant "Tech" */}
                <div className="absolute top-6 right-6 p-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-md">
                  <FaCode className="text-[var(--accent)] text-xl" />
                </div>

                {/* Overlay Infos */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-gradient-to-t from-[rgba(5,7,13,0.88)] via-[rgba(5,7,13,0.45)] to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-mono text-[10px] font-semibold text-[var(--accent)] uppercase tracking-[0.28em] mb-1">
                        Expertise
                      </p>
                      <p className="text-sm font-bold text-white uppercase">
                        Full-Stack · IA
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-white/80">
                        Licence Génie Logiciel • IIT
                      </p>
                      <p className="text-[10px] font-semibold font-mono text-white/60 uppercase tracking-widest">
                        2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Éléments de design flottants derrière */}
              <div
                className="absolute -top-10 -left-10 w-24 h-24 rounded-full blur-2xl"
                style={{
                  background: "var(--accent-soft)",
                  transform: `translate3d(calc(var(--mx)*10px), calc(var(--my)*8px),0)`,
                }}
              ></div>
              <div
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl"
                style={{
                  background: "var(--accent-2-soft)",
                  transform: `translate3d(calc(var(--mx)*-12px), calc(var(--my)*-10px),0)`,
                }}
              ></div>

              {/* Floating tech badges */}
              <div
                className="floating-tech font-mono text-[11px]"
                style={{
                  top: 12,
                  left: 14,
                  transform: `translate3d(calc(var(--mx)*8px),calc(var(--my)*8px),0)`,
                }}
              >
                Python / Flask
              </div>
              <div
                className="floating-tech font-mono text-[11px]"
                style={{
                  top: 40,
                  right: 20,
                  transform: `translate3d(calc(var(--mx)*-6px),calc(var(--my)*6px),0)`,
                }}
              >
                YOLOv8
              </div>
              <div
                className="floating-tech font-mono text-[11px]"
                style={{
                  bottom: 64,
                  left: 18,
                  transform: `translate3d(calc(var(--mx)*6px),calc(var(--my)*-6px),0)`,
                }}
              >
                React
              </div>
            </div>

            {/* Liens Sociaux Verticaux (À côté de l'image sur Desktop) */}
            <div className="hidden xl:flex flex-col gap-6 absolute -right-12 top-1/2 -translate-y-1/2">
              <a
                href="https://github.com/Morta19"
                aria-label="GitHub"
                className="text-[var(--muted-2)] hover:text-[var(--accent)] transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/mortadha-hassen-masmoudi-676530359/"
                aria-label="LinkedIn"
                className="text-[var(--muted-2)] hover:text-[var(--accent)] transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <div className="h-20 w-[1px] bg-[var(--line)] mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll — la suite de la page commence sous le Hero */}
      <a
        href="#accueil-suite"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[var(--muted-2)] hover:text-[var(--accent)] transition-colors"
        aria-label="Faire défiler vers la suite de la page"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <FaChevronDown size={13} className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
