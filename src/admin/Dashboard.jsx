import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaProjectDiagram,
  FaEnvelope,
  FaChartLine,
  FaPlus,
  FaArrowUp,
  FaCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // 1. ÉTATS (States)
  const [projectCount, setProjectCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // RÉCUPÉRATION DE L'URL DE BASE DEPUIS .env.local (Vite)
  const API_BASE = import.meta.env.VITE_API_URL;

  // 2. FONCTION DE DÉCONNEXION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/login");
  };

  // 3. RÉCUPÉRATION DES DONNÉES DEPUIS MOCKAPI
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Récupération des projets
        const resProj = await fetch(`${API_BASE}/projects`);
        if (resProj.ok) {
          const projects = await resProj.json();
          setProjectCount(projects.length);
        }

        // Récupération des messages
        const resMsg = await fetch(`${API_BASE}/messages`);
        if (resMsg.ok) {
          const messages = await resMsg.json();
          setMessageCount(messages.length);
        }
      } catch (error) {
        console.error("Erreur API Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    if (API_BASE) {
      fetchDashboardData();
    }
  }, [API_BASE]);

  // 4. CONFIGURATION DES STATISTIQUES
  const stats = [
    {
      label: "Visiteurs",
      value: "1,234",
      change: "+12%",
      icon: <FaUsers />,
      color: "from-blue-500 to-cyan-400",
    },
    {
      label: "Projets Actifs",
      value: loading ? "..." : projectCount,
      change: "+2",
      icon: <FaProjectDiagram />,
      color: "from-purple-600 to-pink-500",
    },
    {
      label: "Messages",
      value: loading ? "..." : messageCount,
      change: "Nouveaux",
      icon: <FaEnvelope />,
      color: "from-orange-500 to-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-white p-4 md:p-10 font-sans">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Dashboard<span className="text-blue-500">.</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
            Status:{" "}
            <span className="text-emerald-500 animate-pulse">En ligne</span> •
            Mortadha Masmoudi
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/projects"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
          >
            <FaPlus /> Gérer Projets
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] active:scale-95"
          >
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative group overflow-hidden bg-[#121214] border border-white/5 p-6 rounded-3xl transition-all hover:border-blue-500/30"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.05] blur-2xl group-hover:opacity-20 transition-opacity`}
            ></div>

            <div className="flex justify-between items-start relative z-10">
              <div
                className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg shadow-black/20`}
              >
                {stat.icon}
              </div>
              <span className="flex items-center gap-1 text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                <FaArrowUp size={8} /> {stat.change}
              </span>
            </div>

            <div className="mt-6 relative z-10">
              <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                {stat.label}
              </h3>
              <p className="text-5xl font-black italic tracking-tighter mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- LOWER SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Flux d'Activités */}
        <div className="lg:col-span-2 bg-[#121214] border border-white/5 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <FaCircle className="text-blue-500 animate-pulse" size={8} /> Flux
              d'Activités
            </h2>
            <FaChartLine className="text-zinc-700" />
          </div>

          <div className="space-y-4">
            <ActivityItem
              icon={<FaProjectDiagram />}
              title="Base de données synchronisée"
              desc={`${projectCount} projets détectés`}
              color="text-blue-500"
              bgColor="bg-blue-500/10"
            />
            <ActivityItem
              icon={<FaEnvelope />}
              title="Nouveaux Messages"
              desc={`${messageCount} en attente`}
              color="text-orange-500"
              bgColor="bg-orange-500/10"
            />
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gradient-to-b from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h2 className="text-xl font-black italic tracking-tighter mb-4 relative z-10 uppercase">
            System Status
          </h2>
          <div className="space-y-6 relative z-10">
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
                <span>Santé Serveur</span>
                <span>Opérationnel</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                <div className="w-full h-full bg-emerald-400 rounded-full"></div>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-white text-blue-700 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-zinc-100 transition-all active:scale-95"
            >
              Forcer Rafraîchissement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ icon, title, desc, color, bgColor }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
    <div className="flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-white uppercase italic">{title}</p>
        <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
