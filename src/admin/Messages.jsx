import React, { useState, useEffect } from "react";
import { FaEnvelope, FaTrash, FaSearch, FaClock } from "react-icons/fa";
// Importation des fonctions centralisées
import {
  getFormSubmissions,
  deleteFormSubmission,
} from "../api/formSubmissionsApi";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fonction pour charger les données via l'API locale
  const loadData = async () => {
    try {
      const data = await getFormSubmissions();
      // Le tri est déjà géré dans l'API, mais on assure ici la sécurité
      setMessages(data);
    } catch (error) {
      console.error("Erreur de chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Écoute les changements si on envoie un message depuis un autre onglet
    const handleStorageChange = (e) => {
      if (e.key === "local_submissions") loadData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce message définitivement ?")) {
      await deleteFormSubmission(id);
      loadData(); // Recharger la liste après suppression
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8 bg-[#09090b] min-h-screen text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">
            Inbox<span className="text-blue-500">.</span>
          </h1>
          <p className="text-zinc-500 text-sm">
            {loading
              ? "Chargement..."
              : `Vous avez ${messages.length} messages au total.`}
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Rechercher un client..."
            className="w-full bg-[#121214] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="grid gap-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className="group bg-[#121214] border border-white/5 p-6 rounded-2xl hover:border-blue-500/50 transition-all relative overflow-hidden"
          >
            {/* Barre latérale de priorité dynamique */}
            <div
              className={`absolute top-0 left-0 w-1.5 h-full ${
                msg.priorité === "haute"
                  ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  : msg.priorité === "basse"
                  ? "bg-zinc-700"
                  : "bg-blue-500"
              }`}
            ></div>

            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg">{msg.nom}</h3>
                  {msg.priorité === "haute" && (
                    <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-red-500/20 animate-pulse">
                      Urgent ⚡
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                    <FaEnvelope size={12} /> {msg.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaClock size={12} />{" "}
                    {new Date(msg.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(msg.id)}
                className="opacity-0 group-hover:opacity-100 p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 active:scale-90"
                title="Supprimer définitivement"
              >
                <FaTrash size={14} />
              </button>
            </div>

            <div className="mt-4 p-4 bg-white/[0.02] rounded-xl border border-white/5 group-hover:bg-white/[0.04] transition-colors">
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {!loading && filteredMessages.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-[#121214]/30">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4 text-zinc-700">
              <FaEnvelope size={24} />
            </div>
            <p className="text-zinc-600 uppercase text-xs font-bold tracking-[0.2em]">
              Aucun message trouvé
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
