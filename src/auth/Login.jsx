import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaKey, FaChevronRight, FaGlobeAmericas } from "react-icons/fa";
import { loginWithJson } from "../components/api/authApi.js";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await loginWithJson(email, password);
      if (token) {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        navigate(from, { replace: true });
      } else {
        throw new Error("FAIL");
      }
    } catch (err) {
      setError("FRAGMENT DE CLÉ INVALIDE");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] relative overflow-hidden font-sans">
      {/* 1. BACKGROUND DYNAMIQUE - EFFET DE NEBULEUSE */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      {/* 2. TEXTE DE FOND GÉANT (BRUTALISTE) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[20vw] font-black text-white/[0.02] leading-none uppercase italic tracking-tighter">
          SYSTEM
        </h1>
      </div>

      <div className="w-full max-w-[480px] relative z-10 px-6">
        {/* CARTE CENTRALE ASYMÉTRIQUE */}
        <div className="relative group">
          {/* Bordure animée sur le côté */}
          <div className="absolute -left-4 top-10 bottom-10 w-[2px] bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>

          <div className="bg-[#08080a]/60 backdrop-blur-3xl border border-white/10 p-10 md:p-14 rounded-tr-[5rem] rounded-bl-[5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-start mb-14">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-blue-500 mb-2">
                  Protocol 01
                </h2>
                <h1 className="text-3xl font-light text-white tracking-tighter">
                  Accès <span className="font-black italic">Core</span>
                </h1>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 animate-pulse">
                <FaKey className="text-blue-500 text-xl" />
              </div>
            </div>

            {error && (
              <div className="mb-10 text-[10px] font-bold text-red-500 flex items-center gap-3 tracking-[0.2em] border-l-2 border-red-500 pl-4 py-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="relative group/field">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                  placeholder="IDENTIFIANT_SYSTÈME"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 group-focus-within/field:w-full transition-all duration-500"></div>
              </div>

              <div className="relative group/field">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                  placeholder="CLÉ_DE_CRYPTAGE"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 group-focus-within/field:w-full transition-all duration-500"></div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full h-16 flex items-center justify-center overflow-hidden transition-all active:scale-95"
              >
                {/* Background du bouton asymétrique */}
                <div className="absolute inset-0 bg-white group-hover:bg-blue-600 skew-x-[-12deg] transition-all duration-500"></div>
                <span className="relative z-10 text-black group-hover:text-white font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-3 transition-colors duration-500">
                  {loading ? "VÉRIFICATION..." : "INITIALISER LA CONNEXION"}
                  {!loading && (
                    <FaChevronRight className="group-hover:translate-x-2 transition-transform" />
                  )}
                </span>
              </button>
            </form>

            <div className="mt-14 flex items-center justify-between text-[8px] text-zinc-600 font-black uppercase tracking-widest">
              <Link
                to="/"
                className="hover:text-blue-500 transition-colors tracking-[0.3em] flex items-center gap-2"
              >
                <FaGlobeAmericas /> Quitter l'orbite
              </Link>
              <span className="opacity-30">ENCRYPT_MODE: ON</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BAR DÉCORATIVE */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </div>
  );
}

export default Login;
