import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCheck,
  FaSignInAlt,
  FaHome,
  FaInfoCircle,
  FaCode,
  FaBriefcase,
  FaFolderOpen,
  FaGraduationCap,
  FaEnvelope,
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuButtonRef = React.useRef(null);
  const mobileMenuRef = React.useRef(null);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";
    // hide main content from screen readers when menu open
    const main =
      document.querySelector("main") || document.querySelector("#root");
    if (main) {
      if (isMobileOpen) main.setAttribute("aria-hidden", "true");
      else main.removeAttribute("aria-hidden");
    }

    if (isMobileOpen) {
      // focus first link in mobile menu
      setTimeout(() => {
        const first = mobileMenuRef.current?.querySelector("a,button");
        first?.focus();
      }, 50);
    } else {
      // restore focus to menu button
      menuButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "auto";
      if (main) main.removeAttribute("aria-hidden");
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (!isMobileOpen) return;
      if (e.key === "Escape") setIsMobileOpen(false);
      if (e.key === "Tab") {
        // trap focus inside mobile menu
        const focusable = mobileMenuRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const focusableEls = Array.from(focusable).filter(
          (el) => el.offsetParent !== null,
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
        if (e.shiftKey && document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Expérience", path: "/projets" },
    { name: "Projets", path: "/projects" },
    { name: "Education", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`${scrolled ? "nav-glass shadow-sm" : ""} border-b`}
        ></div>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="corner-frame w-11 h-11 border border-[var(--line-strong)] flex items-center justify-center bg-[var(--surface)] rounded-md">
              <span className="font-mono text-[var(--ink)] font-semibold text-sm group-hover:text-(--accent) transition-colors">
                MH
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-semibold text-[var(--ink)] text-base">
                Mortadha Hassen
              </span>
              <span className="font-mono text-[10px] text-[var(--ink-muted)] tracking-wide">
                Développeur full-stack
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-[var(--ink)]"
                          : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[var(--accent)] origin-left transition-transform duration-300 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="h-6 w-px bg-[var(--line)]" />

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                to={isAuthenticated ? "/admin" : "/login"}
                className={`btn-primary flex items-center gap-2 text-xs font-mono tracking-wide ${
                  isAuthenticated ? "" : "opacity-95"
                }`}
              >
                {isAuthenticated ? (
                  <>
                    <FaUserCheck size={12} /> Admin
                  </>
                ) : (
                  <>
                    <FaSignInAlt size={12} /> Login
                  </>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-[var(--ink)] border border-[var(--line-strong)] bg-[var(--surface)] rounded-md"
              aria-label="Ouvrir le menu"
              aria-expanded={isMobileOpen}
            >
              <FaBars size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--surface)] bg-grid transition-transform duration-500 ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
        ref={mobileMenuRef}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-[var(--ink)] border border-[var(--line-strong)] bg-[var(--surface)]"
          aria-label="Fermer le menu"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col h-full justify-center px-10 space-y-2">
          {navigation.map((item, index) => {
            const iconsMap = {
              Accueil: <FaHome />,
              "À propos": <FaInfoCircle />,
              Skills: <FaCode />,
              Expérience: <FaBriefcase />,
              Projets: <FaFolderOpen />,
              Education: <FaGraduationCap />,
              Contact: <FaEnvelope />,
            };

            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-4 py-3 border-b border-[var(--line)]"
              >
                <span className="font-mono text-xs text-[var(--ink-muted)]">
                  0{index + 1}
                </span>
                <span className="text-2xl text-[var(--ink)]">
                  {iconsMap[item.name]}
                </span>
                <span
                  className={`font-display text-2xl font-semibold ${location.pathname === item.path ? "text-[var(--accent)]" : "text-[var(--ink)]"}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          <Link
            to={isAuthenticated ? "/admin" : "/login"}
            className="mt-10 w-full py-4 text-center font-mono text-xs tracking-widest border border-[var(--line-strong)] text-[var(--ink)]"
          >
            {isAuthenticated ? "DASHBOARD ADMIN" : "SE CONNECTER"}
          </Link>

          <p className="text-[var(--ink-muted)] text-[10px] text-center mt-10 font-mono tracking-widest">
            © 2024 — MORTADHA HASSEN
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
