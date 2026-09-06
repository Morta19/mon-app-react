import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";

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
    <footer className="relative bg-[var(--bg)] border-t border-[var(--line)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-[var(--line)]">
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
              Mortadha Hassen MASMOUDI
              <span className="text-[var(--accent)]">.</span>
            </h2>
            <p className="font-mono text-xs text-[var(--ink-muted)] tracking-wide">
              Développeur full-stack — Sfax, Tunisie
            </p>
            <div className="pt-3 text-sm text-[var(--ink-muted)] font-mono">
              <div>Tel: +216 54686444</div>
              <div>
                Email:{" "}
                <a
                  href="mailto:Mortadhahassenmasmoudi@gmail.com"
                  className="hover:text-[var(--accent)]"
                >
                  Mortadhahassenmasmoudi@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/Morta19"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors text-lg"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/mortadha-hassen-masmoudi-676530359/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors text-lg"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-widest text-[var(--ink-muted)] mb-4">
              PLAN DU SITE
            </p>
            <ul className="space-y-2">
              {sitemap.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col md:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--ink-muted)] hover:text-[var(--ink)] transition-all"
            >
              Haut de page
              <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
            </button>
            <span className="text-[11px] text-[var(--ink-muted)] font-mono mt-6 md:mt-0">
              © {new Date().getFullYear()} Mortadha Hassen MASMOUDI
            </span>
          </div>
        </div>

        <p className="pt-8 text-center text-[10px] font-mono text-[var(--ink-muted)] tracking-widest">
          CONSTRUIT AVEC REACT · FLASK
        </p>
      </div>
    </footer>
  );
};

export default Footer;
