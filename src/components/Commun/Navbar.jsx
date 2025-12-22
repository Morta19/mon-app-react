import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCheck, FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // 1. Détection du scroll pour changer l'apparence
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Bloquer le scroll de l'écran quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
  }, [isMobileOpen]);

  // 3. Simuler/Vérifier l'authentification
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(Boolean(token));
  }, [location.pathname]);

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Expérience", path: "/projets" },
    { name: "Projets", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  // Fonction pour fermer proprement le menu mobile
  const closeMenu = () => setIsMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-[#08080a]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-black text-sm">MH</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-black tracking-widest text-lg leading-none uppercase italic">
                MORTADHA{" "}
                <span className="text-blue-500 font-light not-italic">
                  HASSEN
                </span>
              </h1>
            </div>
          </Link>

          {/* MENU DESKTOP (Cache sur Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`px-5 py-2 block rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                      location.pathname === item.path
                        ? "text-white bg-blue-600 shadow-lg shadow-blue-600/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to={isAuthenticated ? "/admin" : "/login"}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                isAuthenticated
                  ? "bg-green-500/10 border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white"
                  : "bg-white text-black hover:bg-blue-600 hover:text-white border-transparent"
              }`}
            >
              {isAuthenticated ? (
                <>
                  <FaUserCheck /> Admin
                </>
              ) : (
                <>
                  <FaSignInAlt /> Login
                </>
              )}
            </Link>
          </div>

          {/* BOUTON MENU MOBILE (Hamburger) */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden relative z-[110] w-10 h-10 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-full"
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-[#08080a] z-[105] md:hidden transition-all duration-700 ease-in-out ${
          isMobileOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {/* Décoration de fond mobile */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>

        <div className="flex flex-col h-full justify-center px-10">
          <div className="space-y-6">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                style={{
                  transitionDelay: isMobileOpen ? `${index * 100}ms` : "0ms",
                  transform: isMobileOpen
                    ? "translateX(0)"
                    : "translateX(50px)",
                  opacity: isMobileOpen ? 1 : 0,
                }}
                className={`block text-5xl font-black italic uppercase tracking-tighter transition-all duration-500 ${
                  location.pathname === item.path
                    ? "text-blue-500"
                    : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div
            className="mt-16 transition-all duration-700 delay-500"
            style={{ opacity: isMobileOpen ? 1 : 0 }}
          >
            <Link
              to={isAuthenticated ? "/admin" : "/login"}
              onClick={closeMenu}
              className={`inline-flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm border-2 ${
                isAuthenticated
                  ? "border-green-500 text-green-500 bg-green-500/5"
                  : "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-600/20"
              }`}
            >
              {isAuthenticated ? (
                <>
                  <FaUserCheck size={20} /> Dashboard Admin
                </>
              ) : (
                "Se Connecter"
              )}
            </Link>

            <p className="text-zinc-600 text-[10px] text-center mt-8 uppercase tracking-[0.3em] font-bold">
              © 2024 Mortadha Hassen
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
