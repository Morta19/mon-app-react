import { useState, useEffect, useMemo } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaGithub,
  FaLink,
  FaLayerGroup,
  FaCircle,
} from "react-icons/fa";

const API_URL = "http://localhost:4000/projects";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialFormState = {
    title: "",
    description: "",
    techStack: "",
    status: "online",
    githubUrl: "",
    liveUrl: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Erreur chargement:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fermer et Reset
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(initialFormState);
  };

  // Préparer l'édition
  const handleEditClick = (project) => {
    setEditingId(project.id);
    setFormData({
      ...project,
      techStack: Array.isArray(project.techStack)
        ? project.techStack.join(", ")
        : project.techStack,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectToSave = {
      ...formData,
      techStack: formData.techStack
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectToSave),
      });

      if (response.ok) {
        fetchProjects();
        handleCloseModal();
      }
    } catch (error) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce chef-d'œuvre ?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  return (
    <div className="p-2 sm:p-6 space-y-8 animate-in fade-in duration-700">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase flex items-center gap-3">
            <FaLayerGroup className="text-blue-500 text-3xl" />
            Engine<span className="text-blue-500">.</span>Projects
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 ml-1">
            Gestion du catalogue applicatif
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative group flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="FILTRER LES PROJETS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-80 bg-[#0d0d0f] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-blue-500/50 transition-all shadow-2xl"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-90"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* --- GRID DE CARTES (MODERNE) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-[#121214] border border-white/5 rounded-[2rem] p-6 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] -mr-10 -mt-10 group-hover:bg-blue-600/10 transition-colors"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <span
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                  project.status === "online"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-orange-500/10 text-orange-500"
                }`}
              >
                <FaCircle
                  className={project.status === "online" ? "animate-pulse" : ""}
                  size={6}
                />{" "}
                {project.status}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(project)}
                  className="p-2 bg-white/5 hover:bg-blue-600 text-zinc-400 hover:text-white rounded-xl transition-all"
                >
                  <FaEdit size={12} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 bg-white/5 hover:bg-red-600 text-zinc-400 hover:text-white rounded-xl transition-all"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-6 line-clamp-2 font-medium">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack?.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/5 border border-white/5 text-zinc-400 rounded-lg text-[9px] font-black uppercase tracking-widest group-hover:border-blue-500/20 transition-all"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <a
                href={project.githubUrl}
                target="_blank"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                className="text-zinc-500 hover:text-blue-500 transition-colors"
              >
                <FaLink size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL DESIGN --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={handleCloseModal}
          ></div>
          <div className="bg-[#0d0d0f] border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">
                {editingId ? "Éditer le" : "Nouveau"} Projet
                <span className="text-blue-500">.</span>
              </h2>
              <button
                onClick={handleCloseModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:bg-red-500 hover:text-white transition-all"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-3 tracking-[0.2em]">
                    Nom du Projet
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all font-bold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-3 tracking-[0.2em]">
                    Description Narrative
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-3 tracking-[0.2em]">
                    Technologies (Sép. virgule)
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="React, Node, Tailwind..."
                    value={formData.techStack}
                    onChange={(e) =>
                      setFormData({ ...formData, techStack: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-3 tracking-[0.2em]">
                    Statut Actuel
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6  focus:border-blue-500 outline-none transition-all font-bold appearance-none"
                  >
                    <option value="online">● Online / Live</option>
                    <option value="progress">● In Progress</option>
                    <option value="offline">● Offline / Paused</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-3 tracking-[0.2em]">
                    Repository GitHub
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all font-bold"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-3 tracking-[0.2em]">
                    Lien Demo
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all font-bold"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:bg-white/5 transition-all"
                >
                  Annuler l'action
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                >
                  {editingId
                    ? "Mettre à jour le système"
                    : "Déployer le projet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
