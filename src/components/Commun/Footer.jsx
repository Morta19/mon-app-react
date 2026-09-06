import React from "react";
import { FaArrowUp, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sitemap = [
    { label: "À propos", href: "#about" },
    { label: "Projets", href: "#projects" },
    { label: "Expérience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface-3)] py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 pb-12 md:grid-cols-[1.4fr_0.8fr_1fr] md:gap-16">
          <div className="space-y-5">
            <div>
              <p className="font-mono text-[10px] font-semibold tracking-[0.28em] text-[var(--accent)]">
                PORTFOLIO / 2026
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--ink)]">
                Mortadha Hassen Masmoudi
                <span className="text-[var(--accent)]">.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[var(--ink-muted)]">
              Développeur full-stack basé à Sfax, je conçois des expériences web
              claires, rapides et pensées pour durer.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/Morta19"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/mortadha-hassen-masmoudi-676530359/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <nav aria-label="Navigation secondaire">
            <p className="mb-5 font-mono text-[10px] font-semibold tracking-[0.22em] text-[var(--ink-muted)]">
              EXPLORER
            </p>
            <ul className="space-y-3">
              {sitemap.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                  >
                    <span className="h-px w-0 bg-[var(--accent)] transition-all group-hover:w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-l-2 border-[var(--accent)] pl-5">
            <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-[var(--ink-muted)]">
              PARLONS DE VOTRE PROJET
            </p>
            <a
              href="mailto:Mortadhahassenmasmoudi@gmail.com"
              className="mt-4 block break-words text-sm font-medium leading-6 text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
            >
              Mortadhahassenmasmoudi@gmail.com
            </a>
            <p className="mt-2 font-mono text-xs text-[var(--ink-muted)]">
              +216 54 686 444 · Sfax, Tunisie
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--line)] pt-6 text-[10px] font-mono tracking-[0.12em] text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} MORTADHA HASSEN MASMOUDI · TOUS DROITS
            RÉSERVÉS
          </span>
          <button
            onClick={scrollToTop}
            aria-label="Retourner en haut de la page"
            className="group inline-flex items-center gap-2 self-start text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)] sm:self-auto"
          >
            RETOUR EN HAUT
            <FaArrowUp className="transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
