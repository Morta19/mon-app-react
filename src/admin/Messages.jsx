import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaTrash,
  FaSearch,
  FaClock,
  FaInbox,
} from "react-icons/fa";

const MOCK_API_URL = `${import.meta.env.VITE_API_URL}/formSubmissions`;

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Charger les messages depuis MockAPI
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(MOCK_API_URL);
      if (response.ok) {
        const data = await response.json();
        // Trier par date la plus récente (du haut vers le bas)
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setMessages(sortedData);
      }
    } catch (error) {
      console.error("Erreur de chargement MockAPI:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. Supprimer un message sur MockAPI
  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce message définitivement du Cloud ?")) {
      try {
        const response = await fetch(`${MOCK_API_URL}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Mise à jour locale de l'état pour éviter un rechargement complet
          setMessages(messages.filter((msg) => msg.id !== id));
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du message:", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  // 3. Filtrage des messages (Recherche)
  // Note : On vérifie msg.name car MockAPI utilise souvent 'name' au lieu de 'nom'
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.name || msg.nom)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-8 bg-[#09090b] min-h-screen text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-3">
            <FaInbox className="text-blue-500 text-2xl" />
            Inbox<span className="text-blue-500">.</span>
          </h1>
          <p className="text-zinc-500 text-sm">
            {loading
              ? "Connexion au serveur..."
              : `Vous avez ${messages.length} messages stockés dans le cloud.`}
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full bg-[#121214] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="grid gap-4">
        {loading ? (
          <div className="py-20 text-center animate-pulse text-zinc-500 uppercase tracking-widest text-xs">
            Synchronisation avec MockAPI...
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className="group bg-[#121214] border border-white/5 p-6 rounded-2xl hover:border-blue-500/50 transition-all relative overflow-hidden shadow-xl"
            >
              {/* Barre de priorité */}
              <div
                className={`absolute top-0 left-0 w-1.5 h-full ${
                  msg.priority === "haute" || msg.priorité === "haute"
                    ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                    : "bg-blue-500"
                }`}
              ></div>

              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-zinc-100">
                      {msg.name || msg.nom}
                    </h3>
                    {(msg.priority === "haute" || msg.priorité === "haute") && (
                      <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-red-500/20 animate-pulse">
                        Urgent ⚡
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-zinc-500">
                    <a
                      href={`mailto:${msg.email}`}
                      className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                    >
                      <FaEnvelope size={12} /> {msg.email}
                    </a>
                    <span className="flex items-center gap-1.5">
                      <FaClock size={12} />
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString("fr-FR")
                        : "Date inconnue"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="md:opacity-0 group-hover:opacity-100 p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
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
          ))
        )}

        {/* Empty State */}
        {!loading && filteredMessages.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-[#121214]/30">
            <p className="text-zinc-600 uppercase text-xs font-bold tracking-[0.2em]">
              Aucun message dans la boîte de réception
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
