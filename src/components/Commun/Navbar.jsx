import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCheck, FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  /* ===== Scroll effect ===== */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== Lock body scroll when mobile menu open ===== */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMobileOpen]);

  /* ===== Close mobile menu on route change ===== */
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  /* ===== Auth check ===== */
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Expérience", path: "/projets" },
    { name: "Projets", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#08080a]/95 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">MH</span>
            </div>
            <h1 className="hidden sm:block text-white font-black tracking-widest text-lg uppercase italic">
              MORTADHA{" "}
              <span className="text-blue-500 font-light not-italic">
                HASSEN
              </span>
            </h1>
          </Link>

          {/* ===== Desktop Menu ===== */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white"
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
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition ${
                isAuthenticated
                  ? "bg-green-500/10 border border-green-500/40 text-green-500"
                  : "bg-white text-black hover:bg-blue-600 hover:text-white"
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

          {/* ===== Mobile Toggle ===== */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-full"
          >
            <FaBars size={18} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-40 bg-[#08080a] transition-transform duration-500 ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-full"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col h-full justify-center px-10 space-y-6">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              style={{ transitionDelay: `${index * 80}ms` }}
              className={`text-5xl font-black italic uppercase transition-all duration-500 ${
                location.pathname === item.path ? "text-blue-500" : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <Link
            to={isAuthenticated ? "/admin" : "/login"}
            className={`mt-12 w-full py-5 rounded-2xl text-center font-black uppercase tracking-widest ${
              isAuthenticated
                ? "border border-green-500 text-green-500"
                : "bg-blue-600 text-white"
            }`}
          >
            {isAuthenticated ? "Dashboard Admin" : "Se connecter"}
          </Link>

          <p className="text-zinc-600 text-[10px] text-center mt-10 uppercase tracking-widest">
            © 2024 Mortadha Hassen
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
