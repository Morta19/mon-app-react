import { useState, useEffect } from "react";

function ProjectForm({ initialProject, onCreate, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "", // On le gère en texte dans l'input (ex: "React, Node")
    status: "online",
    githubUrl: "",
    liveUrl: "",
  });

  useEffect(() => {
    if (initialProject) {
      setFormData({
        ...initialProject,
        techStack: Array.isArray(initialProject.techStack)
          ? initialProject.techStack.join(", ")
          : initialProject.techStack,
      });
    }
  }, [initialProject]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Nettoyage des données avant envoi
    const projectData = {
      ...formData,
      // Conversion de la string "React, Node" en tableau ["React", "Node"]
      techStack:
        typeof formData.techStack === "string"
          ? formData.techStack
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== "")
          : formData.techStack,
    };

    if (initialProject) {
      onUpdate(initialProject.id, projectData);
    } else {
      onCreate(projectData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#121214] border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-2xl"
    >
      <h2 className="text-xl font-black uppercase italic text-blue-500 mb-4">
        {initialProject ? "Modifier l'unité" : "Configuration nouveau projet"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Titre */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-zinc-500 mb-2 block">
            Nom du Projet
          </label>
          <input
            required
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none transition-all"
            placeholder="Ex: Crypto Dashboard"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-zinc-500 mb-2 block">
            Description (Détails)
          </label>
          <textarea
            required
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="text-[10px] font-black uppercase text-zinc-500 mb-2 block">
            Tech Stack (séparées par virgule)
          </label>
          <input
            required
            type="text"
            value={formData.techStack}
            onChange={(e) =>
              setFormData({ ...formData, techStack: e.target.value })
            }
            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none transition-all"
            placeholder="React, Tailwind, Node.js"
          />
        </div>

        {/* Statut */}
        <div>
          <label className="text-[10px] font-black uppercase text-zinc-500 mb-2 block">
            Statut
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none appearance-none"
          >
            <option value="online">Online</option>
            <option value="progress">In Progress</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Liens */}
        <div>
          <label className="text-[10px] font-black uppercase text-zinc-500 mb-2 block">
            Lien GitHub
          </label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) =>
              setFormData({ ...formData, githubUrl: e.target.value })
            }
            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-zinc-500 mb-2 block">
            Lien Live Demo
          </label>
          <input
            type="url"
            value={formData.liveUrl}
            onChange={(e) =>
              setFormData({ ...formData, liveUrl: e.target.value })
            }
            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none"
            placeholder="https://demo.com"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white font-black uppercase py-4 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
        >
          {initialProject ? "Mettre à jour" : "Déployer le projet"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 bg-zinc-800 text-white font-black uppercase py-4 rounded-xl hover:bg-zinc-700 transition-all"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
