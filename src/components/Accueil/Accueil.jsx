import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBuilding,
  FaGraduationCap,
  FaRocket,
} from "react-icons/fa";
import Hero from "./Hero.jsx";
import useReveal from "../../hooks/useReveal";
import localData from "../../../db.json";

const API_BASE = import.meta.env.VITE_PROJECTS_API_URL;

/* Chiffres 100 % vérifiables : 2 projets (db.json), 3 expériences (Linio.io, BACAB ×2),
   10 technos listées dans le Hero, 1 prix d'innovation (IIT 2025). */
const STATS = [
  { value: 2, label: "Projets livrés de bout en bout" },
  { value: 3, label: "Expériences pro · Linio.io & BACAB" },
  { value: 10, label: "Technologies au quotidien" },
  { value: 1, label: "Prix d'innovation · IIT 2025" },
];

const COMPANIES = [
  {
    icon: <FaBuilding />,
    name: "Linio.io",
    meta: "USA · Remote · 2025",
    detail:
      "Applications web React & Flask, web scraping Selenium / Playwright, conception d'APIs REST.",
  },
  {
    icon: <FaRocket />,
    name: "BACAB Consulting",
    meta: "Tunisie · 2025 & 2026",
    detail:
      "Deux missions : gestion de stock en microservices, puis plateforme Smart City intégrant l'IA.",
  },
  {
    icon: <FaGraduationCap />,
    name: "IIT Sfax",
    meta: "Formation · 2026",
    detail:
      "Licence Génie Logiciel & Systèmes d'Information — mention très bien.",
  },
];

function toTechArray(techStack) {
  if (Array.isArray(techStack)) return techStack;
  if (typeof techStack === "string") {
    return techStack.split(",").map((tech) => tech.trim());
  }
  return [];
}

/** Projets réels : API si configurée, sinon db.json local (même logique que /projects). */
async function fetchHomeProjects() {
  if (API_BASE) {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      if (response.ok) {
        const data = await response.json();
        const visible = data.filter((p) => p.status !== "archived");
        if (visible.length > 0) return visible;
      }
    } catch {
      /* fallback silencieux vers les données locales */
    }
  }
  return (localData.projects || []).filter((p) => p.status !== "archived");
}

/** Compteur animé au scroll (léger, rAF natif, respecte prefers-reduced-motion). */
function CountUp({ value }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return undefined;
    }

    let raf;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const duration = 1100;
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

const STATUS_LABELS = { completed: "Livré", "in-progress": "En cours" };

function ProjectCover({ project, title }) {
  const cover = project.image || project.images?.[0] || "";
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-3)]">
      {cover ? (
        <img
          src={cover}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[var(--line-strong)] transition-colors duration-300 group-hover:text-[var(--accent)]">
          <FaRocket size={30} />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,7,13,0.30)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

function StatsBand() {
  return (
    <section
      id="accueil-suite"
      aria-label="Chiffres clés"
      className="scroll-mt-24 border-y border-[var(--line)] bg-[var(--surface-3)]/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 py-12 divide-x divide-[var(--line)] max-lg:divide-x-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 90}ms` }}
              className="px-4 lg:px-8 text-center lg:text-left"
            >
              <dd className="font-display text-4xl md:text-5xl font-bold text-[var(--accent)] tabular-nums leading-none">
                <CountUp value={stat.value} />
              </dd>
              <dt className="mt-3 text-[13px] leading-snug text-[var(--ink-muted)]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CompaniesBand() {
  return (
    <section className="py-20" aria-label="Expériences professionnelles">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="eyebrow mb-10" data-reveal="up">
          EXPÉRIENCES TERRAIN
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {COMPANIES.map((company, i) => (
            <article
              key={company.name}
              className="card p-7"
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 110}ms` }}
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-3)] text-lg text-[var(--accent)]"
                >
                  {company.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold leading-tight">
                    {company.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] tracking-wide text-[var(--ink-muted)]">
                    {company.meta}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">
                {company.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects({ projects }) {
  return (
    <section className="py-20" aria-label="Projets phares">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
          data-reveal="up"
        >
          <div>
            <p className="eyebrow mb-3">PROJETS PHARES</p>
            <h2 className="display-lg max-w-2xl">
              Des projets concrets,{" "}
              <span className="text-gradient-gold">livrés de bout en bout</span>.
            </h2>
          </div>
          <Link
            to="/projects"
            className="btn-ghost inline-flex items-center gap-2"
          >
            Tous les projets <FaArrowRight size={12} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const techArray = toTechArray(project.techStack);
            return (
              <article
                key={project.id || project.title}
                className="card group flex flex-col overflow-hidden"
                data-reveal="up"
                style={{ "--reveal-delay": `${(i % 2) * 120}ms` }}
              >
                <ProjectCover project={project} title={project.title} />
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {project.title}
                    </h3>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-medium text-[var(--ink-muted)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)]" />
                      {STATUS_LABELS[project.status] || project.status}
                    </span>
                  </div>

                  <p className="line-clamp-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                    {techArray.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-chip text-[11px]">
                        {tech}
                      </span>
                    ))}
                    {techArray.length > 4 && (
                      <span className="text-[11px] font-medium text-[var(--ink-muted)]">
                        +{techArray.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 border-t border-[var(--line)] pt-4">
                    <Link
                      to="/projects"
                      className="link-underline font-mono text-xs tracking-widest text-[var(--accent)]"
                    >
                      VOIR LE DÉTAIL
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline font-mono text-xs tracking-widest text-[var(--ink-muted)] hover:text-[var(--ink)]"
                      >
                        DÉMO EN LIGNE
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="pb-28 pt-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className="corner-frame border border-[var(--line-strong)] bg-[var(--surface)] p-12 text-center md:p-16"
          data-reveal="zoom"
        >
          <p className="eyebrow mb-4">DISPONIBLE POUR OPPORTUNITÉS</p>
          <h2 className="display-lg mb-6">
            Un projet en tête ?{" "}
            <span className="text-gradient-gold">Discutons-en.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[var(--ink-muted)] leading-relaxed">
            Mission, stage ou simple échange d'idées — je réponds en moins de
            24&nbsp;h.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Me contacter <FaArrowRight size={12} />
            </Link>
            <a
              href="mailto:Mortadhahassenmasmoudi@gmail.com"
              className="btn-ghost"
            >
              M'envoyer un e-mail
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const Accueil = () => {
  const homeRef = useReveal();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetchHomeProjects().then((data) => {
      if (!cancelled) setProjects(data.slice(0, 2));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={homeRef}>
      <Hero />
      <StatsBand />
      <CompaniesBand />
      {projects.length > 0 && <FeaturedProjects projects={projects} />}
      <FinalCTA />
    </div>
  );
};

export default Accueil;
