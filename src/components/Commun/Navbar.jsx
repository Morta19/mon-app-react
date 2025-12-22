import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCheck } from "react-icons/fa";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // 1. Détection du scroll pour le style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Vérification de l'auth (basée sur la présence d'un token)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(Boolean(token));
  }, [location.pathname]); // Vérifie à chaque changement de page

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Expérience", path: "/projets" },
    { name: "Projets", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-[#08080a]/90 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="group flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-600 rounded-lg blur-md opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-zinc-800 to-black border border-white/10 rounded-lg flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-xs uppercase tracking-tighter">
                  MH
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white font-black tracking-[0.05em] text-lg leading-none uppercase italic">
                MORTADHA{" "}
                <span className="text-blue-500 font-light not-italic">
                  HASSEN
                </span>
              </h1>
            </div>
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`relative px-5 py-2 block rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      location.pathname === item.path
                        ? "text-white"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {location.pathname === item.path && (
                      <div className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                    )}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* BOUTON DYNAMIQUE (Login ou Connecté) */}
            <Link
              to={isAuthenticated ? "/admin" : "/login"}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                isAuthenticated
                  ? "bg-green-500/10 border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white"
                  : "bg-white/5 border-white/10 text-white hover:bg-white hover:text-black"
              }`}
            >
              {isAuthenticated ? (
                <>
                  <FaUserCheck className="text-sm" />
                  Connecté
                </>
              ) : (
                "Login"
              )}
            </Link>
          </div>

          {/* MENU MOBILE BUTTON */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-zinc-400 hover:text-white transition"
          >
            {isMobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* OVERLAY MOBILE */}
      <div
        className={`fixed inset-0 bg-[#08080a] z-50 md:hidden transition-all duration-500 ${
          isMobileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full p-10 pt-32 space-y-6">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-8 right-8 text-zinc-500"
          >
            <FaTimes size={28} />
          </button>

          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className="text-4xl font-black italic text-white uppercase tracking-tighter hover:text-blue-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {/* Bouton Login/Connecté Mobile */}
          <Link
            to={isAuthenticated ? "/admin" : "/login"}
            onClick={() => setIsMobileOpen(false)}
            className={`mt-10 block w-full py-4 text-center font-black uppercase tracking-widest rounded-xl transition-all ${
              isAuthenticated
                ? "bg-green-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {isAuthenticated ? "Espace Admin (Connecté)" : "Se Connecter"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
