import { useState, useEffect } from "react";

function ProjectForm({ initialProject, onCreate, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    status: "online",
    githubUrl: "",
    liveUrl: "",
    internalid: "", // Nouveau champ basé sur votre capture MockAPI
  });

  useEffect(() => {
    if (initialProject) {
      setFormData({
        ...initialProject,
        techStack: Array.isArray(initialProject.techStack)
          ? initialProject.techStack.join(", ")
          : initialProject.techStack || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        techStack: "",
        status: "online",
        githubUrl: "",
        liveUrl: "",
        internalid: "",
      });
    }
  }, [initialProject]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      // On s'assure que techStack est envoyé sous forme de texte simple comme défini dans votre MockAPI
      techStack: formData.techStack,
      // Optionnel : si vous voulez que ce soit un tableau, décommentez la ligne ci-dessous :
      // techStack: formData.techStack.split(',').map(s => s.trim())
    };

    if (initialProject) {
      onUpdate(initialProject.id, projectData);
    } else {
      onCreate(projectData);
      // Reset après création
      setFormData({
        title: "",
        description: "",
        techStack: "",
        status: "online",
        githubUrl: "",
        liveUrl: "",
        internalid: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#121214] border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-2xl"
    >
      <h2 className="text-xl font-black uppercase italic text-blue-500">
        {initialProject ? "Mise à jour Module" : "Configuration Système"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Titre & Internal ID */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block ml-2">
              Nom du Projet
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full bg-black border border-white/5 rounded-2xl py-3 px-4 text-white focus:border-blue-500 outline-none"
              placeholder="Titre"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block ml-2">
              ID Interne (Schema)
            </label>
            <input
              required
              type="text"
              value={formData.internalid}
              onChange={(e) =>
                setFormData({ ...formData, internalid: e.target.value })
              }
              className="w-full bg-black border border-white/5 rounded-2xl py-3 px-4 text-white focus:border-blue-500 outline-none"
              placeholder="Ex: PRJ-001"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block ml-2">
            Description
          </label>
          <textarea
            required
            rows="4"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-black border border-white/5 rounded-2xl py-3 px-4 text-white focus:border-blue-500 outline-none resize-none"
          />
        </div>

        {/* Tech Stack & Status */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block ml-2">
              Technologies
            </label>
            <input
              required
              type="text"
              value={formData.techStack}
              onChange={(e) =>
                setFormData({ ...formData, techStack: e.target.value })
              }
              className="w-full bg-black border border-white/5 rounded-2xl py-3 px-4 text-white focus:border-blue-500 outline-none"
              placeholder="React, Tailwind..."
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block ml-2">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full bg-black border border-white/5 rounded-2xl py-3 px-4 text-white focus:border-blue-500 outline-none"
            >
              <option value="online">Online</option>
              <option value="progress">In Progress</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Liens */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) =>
              setFormData({ ...formData, githubUrl: e.target.value })
            }
            className="w-full bg-black border border-white/5 rounded-2xl py-3 px-4 text-white focus:border-blue-500 outline-none"
            placeholder="GitHub URL"
          />
          <input
            type="url"
            value={formData.liveUrl}
            onChange={(e) =>
              setFormData({ ...formData, liveUrl: e.target.value })
            }
            className="w-full bg-black border border-white/5 rounded-2xl py-3 px-4 text-white focus:border-blue-500 outline-none"
            placeholder="Live Demo URL"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white font-black uppercase py-4 rounded-2xl hover:bg-blue-500 transition-all"
        >
          {initialProject ? "Mettre à jour" : "Déployer sur MockAPI"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-8 bg-zinc-800 text-white font-black uppercase py-4 rounded-2xl hover:bg-zinc-700"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
