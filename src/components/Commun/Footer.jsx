import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#08080a] border-t border-white/5 py-12 relative overflow-hidden">
      {/* Effet de lueur subtile en arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand / Logo Section */}
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl font-black italic tracking-tighter text-white">
              MORTADHA<span className="text-blue-500">.</span>
            </h2>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Full-Stack Developer & Innovator
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Morta19"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white transition-colors text-xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mortadha-hassen-masmoudi-676530359/"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-blue-500 transition-colors text-xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/mortadhamasmoudi/"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-purple-500 transition-colors text-xl"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Copyright Section */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 hover:text-white transition-all"
            >
              Back to top
              <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
            </button>
            <span className="text-[11px] text-zinc-600 font-medium">
              © {new Date().getFullYear()}{" "}
              <span className="text-zinc-400">21C DIGITAL</span>. All Rights
              Reserved.
            </span>
          </div>
        </div>

        {/* Bottom Decorative Bar */}
        <div className="mt-12 flex justify-center">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] uppercase tracking-widest font-bold text-zinc-500">
            <li>
              <a
                href="#about"
                className="hover:text-blue-500 transition-colors"
              >
                A propos
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-blue-500 transition-colors"
              >
                Projets
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="hover:text-blue-500 transition-colors"
              >
                Expérience
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-blue-500 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
