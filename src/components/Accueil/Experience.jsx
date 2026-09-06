import React, { useEffect } from "react";
import {
  FaCalendar,
  FaAward,
  FaExternalLinkAlt,
  FaRobot,
  FaServer,
} from "react-icons/fa";

const Experience = () => {
  const user = {
    experience: "",
    availability: "",
    bio: "Développeur full-stack spécialisé dans les architectures microservices et l'intégration de modèles IA.",

    stack: [
      "Python / Flask",
      "React / Vue.js",
      "Playwright / Selenium",
      "Microservices",
    ],

    experiences: [
      {
        id: 1,
        period: "Janvier — Avril 2025",
        role: "Développeur Web Full-Stack",
        company: "Linio.io (USA)",
        location: "Remote",
        type: "Mission",
        icon: <FaRobot />,
        description:
          "Développement d'applications web avec React et Flask. Travaux de web scraping (Selenium, Playwright), conception d'API REST, et optimisation des applications.",
        achievements: [
          "Développement d'applications React & Flask",
          "Web scraping avec Selenium et Playwright",
          "Conception d'API REST et tests",
        ],
        technologies: ["React", "Flask", "Selenium", "Playwright", "Figma"],
      },
      {
        id: 2,
        period: "Mars — Juillet 2026",
        role: "Développeur Full-Stack & IA",
        company: "BACAB Consulting",
        location: "Tunisie",
        type: "Projet de fin d'études",
        icon: <FaServer />,
        description:
          "Développement d'une plateforme Smart City de gestion des incidents urbains, intégrant classification assistée par IA et tableaux de bord.",
        achievements: [
          "Conception d'une architecture microservices (React, Flask)",
          "Intégration d'un modèle YOLOv8 pour classification automatique",
          "Mise en place d'authentification JWT et notifications e-mail",
        ],
        technologies: ["React", "Flask", "YOLOv8", "REST API", "JWT"],
      },
    ],

    certifications: [
      {
        name: "Meilleur Projet Innovant",
        organization: "IIT",
        date: "2024",
        url: "#",
      },
    ],
  };

  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");
    if (!items || items.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <section className="min-h-screen bg-[var(--bg)] text-[var(--ink)] py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col mb-20 border-b border-[var(--line)] pb-16">
          <span className="font-mono text-[11px] tracking-widest text-[var(--accent)] mb-4">
            MON PARCOURS
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-10">
            Expérience & évolution.
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--ink-muted)]">
              "{user.bio}"
            </p>
            <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
              <div>
                <p className="font-display text-4xl font-semibold text-[var(--accent)]">
                  {user.experience}
                </p>
                <p className="font-mono text-[10px] tracking-widest text-[var(--ink-muted)] mt-1">
                  EXPERTISE
                </p>
              </div>
              <div>
                <p className="font-display text-base font-medium text-[var(--accent-2)]">
                  {user.availability}
                </p>
                <p className="font-mono text-[10px] tracking-widest text-[var(--ink-muted)] mt-1">
                  STATUT ACTUEL
                </p>
              </div>
              <div className="flex flex-wrap gap-2 max-w-xs">
                {user.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] px-2 py-1 border border-[var(--line-strong)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="timeline pl-10 md:pl-16">
          {user.experiences.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-point" />

              <div className="mb-4 font-mono text-xs text-[var(--ink-muted)] tracking-wide">
                <FaCalendar className="text-[var(--accent)] inline mr-2" />{" "}
                {exp.period}{" "}
                <span className="text-[var(--line-strong)] mx-2">/</span>{" "}
                {exp.type}
              </div>

              <div className="border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--accent)] transition-colors">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-display text-xl md:text-2xl font-semibold">
                      {exp.role}
                    </h4>
                    <p className="text-[var(--ink-muted)] mt-1">
                      {exp.company} — {exp.location}
                    </p>
                  </div>
                  <div className="w-12 h-12 shrink-0 border border-[var(--line-strong)] flex items-center justify-center text-[var(--accent)] text-xl">
                    {exp.icon}
                  </div>
                </div>

                <p className="text-[var(--ink-muted)] mb-4">
                  {exp.description}
                </p>

                <div className="space-y-3 mb-4">
                  {exp.achievements.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 bg-[var(--accent)] shrink-0" />
                      <p className="text-sm text-[var(--ink)] leading-snug">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-1 border border-[var(--line)] text-[var(--ink-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reveal timeline points with IntersectionObserver (handled by hook) */}

        {/* RECOGNITION */}
        <div className="mt-4 border border-[var(--line-strong)] bg-[var(--surface)] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] text-2xl">
              <FaAward />
            </div>
            <div>
              <h4 className="font-display text-xl font-semibold">
                Projet innovant de l'année
              </h4>
              <p className="text-[var(--ink-muted)] text-sm">
                {user.certifications[0].organization} ·{" "}
                {user.certifications[0].date}
              </p>
            </div>
          </div>
          <a
            href={user.certifications[0].url}
            className="px-6 py-3 border border-[var(--line-strong)] font-mono text-xs tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
          >
            VOIR LE CERTIFICAT <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
