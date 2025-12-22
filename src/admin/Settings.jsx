import React, { useState, useEffect } from "react";
import { FaUser, FaCamera, FaSave, FaGlobe, FaLock } from "react-icons/fa";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    avatar: "",
    bio: "",
    email: "",
  });

  // RÉCUPÉRATION DE L'URL DE BASE DEPUIS .env.local
  const API_BASE = import.meta.env.VITE_API_URL;

  // 1. Charger les infos actuelles depuis MockAPI
  useEffect(() => {
    // Note : Assurez-vous d'avoir créé une ressource /profile sur MockAPI
    // Ou utilisez /profile/1 si vous avez une liste
    fetch(`${API_BASE}/profile/1`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => console.error("Erreur chargement profil:", err));
  }, [API_BASE]);

  // 2. Sauvegarder les modifications
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // MockAPI utilise souvent PUT sur l'ID de la ressource (ex: /profile/1)
      const response = await fetch(`${API_BASE}/profile/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        alert("Profil mis à jour avec succès !");
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      alert("Erreur lors de la sauvegarde : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl animate-in fade-in duration-500 p-4 md:p-0">
      <div className="mb-8">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
          Settings<span className="text-blue-500">.</span>
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
          Configuration de votre identité numérique
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar de Navigation interne */}
        <div className="w-full md:w-64 space-y-2">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "general"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-white/5 text-zinc-500 hover:bg-white/10"
            }`}
          >
            <FaUser /> Profil Public
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "social"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-white/5 text-zinc-500 hover:bg-white/10"
            }`}
          >
            <FaGlobe /> Liens Sociaux
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 text-zinc-700 cursor-not-allowed">
            <FaLock /> Sécurité
          </button>
        </div>

        {/* Formulaire Principal */}
        <div className="flex-1 bg-[#121214] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
          {activeTab === "general" && (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Photo de profil */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
                <div className="relative group">
                  <img
                    src={profile.avatar || "https://via.placeholder.com/150"}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-500/50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <FaCamera className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm uppercase">
                    Photo de profil
                  </h3>
                  <p className="text-zinc-500 text-[10px] uppercase font-medium mt-1">
                    Format URL (MockAPI). Max 1MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-2">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-2">
                    Rôle Professionnel
                  </label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) =>
                      setProfile({ ...profile, role: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-2">
                    URL de l'image (Avatar)
                  </label>
                  <input
                    type="text"
                    value={profile.avatar}
                    onChange={(e) =>
                      setProfile({ ...profile, avatar: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-2">
                    Bio Courte
                  </label>
                  <textarea
                    rows="4"
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none transition-all"
                  ></textarea>
                </div>
              </div>

              <div className="pt-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 active:scale-95"
                >
                  <FaSave />{" "}
                  {loading
                    ? "Enregistrement..."
                    : "Sauvegarder les changements"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "social" && (
            <div className="text-center py-20 text-zinc-500">
              <FaGlobe className="mx-auto text-4xl mb-4 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest">
                Section en cours de développement
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
