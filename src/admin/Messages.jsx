import React, { useState } from "react";
import {
  FaEnvelope,
  FaTrash,
  FaReply,
  FaCircle,
  FaSearch,
} from "react-icons/fa";

const AdminMessages = () => {
  // Simulation de données (à remplacer par ton appel API plus tard)
  const [messages] = useState([
    {
      id: 1,
      name: "Jean Dupont",
      email: "j.dupont@email.com",
      subject: "Projet de Refonte Web",
      date: "Aujourd'hui, 14:20",
      status: "unread",
      content:
        "Bonjour Mortadha, j'ai vu votre portfolio et je suis impressionné par votre style. Seriez-vous disponible pour un projet de refonte ?",
    },
    {
      id: 2,
      name: "Sarah Ben Ali",
      email: "sarah.ba@tech.tn",
      subject: "Collaboration UI/UX",
      date: "Hier, 09:15",
      status: "read",
      content:
        "Hello ! Notre agence cherche un freelance pour une mission de 3 mois...",
    },
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Messages<span className="text-blue-500">.</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Gestion des contacts entrants
          </p>
        </div>

        {/* Barre de recherche style Dark */}
        <div className="relative w-full md:w-72 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Rechercher un contact..."
            className="w-full bg-[#121214] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* MESSAGES LIST */}
      <div className="bg-[#121214] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Expéditeur
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Sujet
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {msg.status === "unread" && (
                        <FaCircle
                          className="text-blue-500 animate-pulse"
                          size={8}
                        />
                      )}
                      <div>
                        <p
                          className={`text-sm ${
                            msg.status === "unread"
                              ? "font-black text-white"
                              : "font-medium text-zinc-400"
                          }`}
                        >
                          {msg.name}
                        </p>
                        <p className="text-[10px] text-zinc-600">{msg.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p
                      className={`text-sm ${
                        msg.status === "unread"
                          ? "font-bold text-zinc-200"
                          : "text-zinc-500"
                      }`}
                    >
                      {msg.subject}
                    </p>
                    <p className="text-[11px] text-zinc-600 truncate max-w-[200px]">
                      {msg.content}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">
                    {msg.date}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                        <FaReply size={12} />
                      </button>
                      <button className="p-2 bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EMPTY STATE (Si pas de messages) */}
      {messages.length === 0 && (
        <div className="text-center py-20 bg-[#121214] border border-dashed border-white/10 rounded-3xl">
          <FaEnvelope className="mx-auto text-zinc-800 mb-4" size={40} />
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
            Aucun message pour le moment
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
