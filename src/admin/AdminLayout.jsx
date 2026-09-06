import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFolderOpen,
  FaProjectDiagram,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaArrowLeft,
  FaShieldAlt,
  FaTerminal,
} from "react-icons/fa";

import mortaImg from "../assets/morta.jpg";

const AdminLayout = () => {
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  }

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Ajouter", path: "/admin/projects", icon: <FaFolderOpen /> },
    { name: "Mes Projets", path: "/admin/projets", icon: <FaProjectDiagram /> },
    { name: "Messages", path: "/admin/forms", icon: <FaEnvelope /> },
    { name: "Paramètres", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#030304] text-zinc-300 font-sans selection:bg-blue-500/30">
      {/* --- SIDEBAR DESIGN ULTRA-MODERNE --- */}
      <aside className="w-16 md:w-72 flex flex-col relative z-20 group">
        {/* Ligne de séparation verticale lumineuse */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>

        {/* Profil Header */}
        <div className="p-6 mb-4 flex items-center gap-4">
          <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
            <div className="relative w-full h-full bg-[#0d0d0f] border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">
              <img
                src={mortaImg}
                alt={"Portrait de Mortadha"}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0d0d0f] rounded-full" />
            </div>
          </div>
          <div className="hidden md:block">
            <h2 className="text-lg font-black text-white tracking-tighter uppercase italic leading-none">
              Masmoudi<span className="text-blue-500">.</span>
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-[1px] w-4 bg-blue-500/50" />
              <p className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.3em]">
                Admin System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group flex items-center gap-4 px-4 md:px-5 py-3 md:py-4 rounded-xl transition-all duration-500 overflow-hidden ${
                  isActive
                    ? "text-white bg-white/[0.03]"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {/* Indicateur actif stylisé */}
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-full shadow-[0_0_15px_#2563eb]"></div>
                )}

                <span
                  className={`text-lg transition-all duration-500 ${
                    isActive
                      ? "text-blue-500 scale-110"
                      : "group-hover:text-blue-400 group-hover:translate-x-1"
                  }`}
                >
                  {item.icon}
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:inline">
                  {item.name}
                </span>

                {/* Effet Hover Background */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="group flex items-center justify-between w-full p-4 rounded-2xl bg-[#0d0d0f] border border-white/5 hover:border-red-500/30 transition-all duration-500"
          >
            <div className="flex flex-col items-start">
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                Session
              </span>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter group-hover:text-red-400">
                Déconnexion
              </span>
            </div>
            <FaSignOutAlt className="text-zinc-700 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT ZONE --- */}
      <main className="flex-1 p-4 relative overflow-hidden ml-16 md:ml-72">
        {/* Glows d'ambiance en arrière-plan */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="h-full flex flex-col bg-[#0d0d0f]/60 backdrop-blur-3xl rounded-[2rem] border border-white/[0.05] shadow-2xl relative overflow-hidden">
          {/* Header minimaliste et flottant */}
          <header className="h-20 flex items-center justify-between px-10 border-b border-white/[0.03]">
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.4em]">
                  Panel Central
                </span>
                <span className="text-[8px] text-zinc-600 font-bold uppercase mt-1 flex items-center gap-2">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span>
                  Localisation: Tunisia / Sfax
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  Processeur d'état
                </span>
                <span className="text-[10px] font-bold text-blue-500">
                  SYNC OK
                </span>
              </div>
              <Link
                to="/"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5"
              >
                <FaArrowLeft className="text-xs" />
              </Link>
            </div>
          </header>

          {/* Contenu - Outlet */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Styles CSS injectés pour la scrollbar et animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(255, 255, 255, 0.05); 
          border-radius: 20px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(37, 99, 235, 0.2); }
      `,
        }}
      />
    </div>
  );
};

export default AdminLayout;
