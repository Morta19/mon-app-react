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

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // RÉCUPÉRATION DE L'URL DEPUIS .env (Comme dans ProjectsList)
  const API_BASE = import.meta.env.VITE_API_URL;
  const API_URL = `${API_BASE}/projects`;

  const initialFormState = {
    title: "",
    description: "",
    techStack: "",
    status: "online",
    githubUrl: "",
    liveUrl: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // --- CHARGEMENT DES DONNÉES (Logique identique à ProjectsList) ---
  const fetchProjects = async () => {
    if (!API_BASE) return;
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erreur serveur");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Erreur Admin Fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [API_BASE]);

  // --- ACTIONS ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleEditClick = (project) => {
    setEditingId(project.id);
    setFormData({
      ...project,
      // Sécurisation techStack pour le formulaire (Array -> String)
      techStack: Array.isArray(project.techStack)
        ? project.techStack.join(", ")
        : project.techStack || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transformation String -> Array pour l'API
    const projectToSave = {
      ...formData,
      techStack:
        typeof formData.techStack === "string"
          ? formData.techStack
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== "")
          : formData.techStack,
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
      console.error("Erreur lors de l'enregistrement du projet:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer définitivement ce projet ?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setProjects(projects.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du projet:", error);
        alert("Erreur lors de la suppression");
      }
    }
  };

  // --- FILTRAGE ---
  const filteredProjects = useMemo(() => {
    return projects.filter((p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [projects, searchTerm]);

  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-in fade-in duration-700 bg-[#050505] min-h-screen text-white">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase flex items-center gap-3">
            <FaLayerGroup className="text-blue-500" />
            Console<span className="text-blue-500">.</span>Admin
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">
            Base de données : {API_BASE ? "Connectée" : "Déconnectée"}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative group flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="RECHERCHER UN PROJET..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-80 bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* --- GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          // --- SÉCURISATION TECHSTACK POUR L'AFFICHAGE ---
          const techArray = Array.isArray(project.techStack)
            ? project.techStack
            : typeof project.techStack === "string"
              ? project.techStack.split(",")
              : [];

          return (
            <div
              key={project.id}
              className="group bg-zinc-900/30 border border-white/5 rounded-[2rem] p-6 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter bg-white/5 ${
                    project.status === "online"
                      ? "text-green-400"
                      : "text-blue-400"
                  }`}
                >
                  <FaCircle
                    className={
                      project.status === "online" ? "animate-pulse" : ""
                    }
                    size={6}
                  />
                  {project.status || "online"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(project)}
                    className="p-2 bg-white/5 hover:bg-blue-600 rounded-xl transition-all"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 bg-white/5 hover:bg-red-600 rounded-xl transition-all"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold uppercase italic tracking-tighter mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-500 text-xs mb-6 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {techArray.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[9px] font-bold text-zinc-400 uppercase"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5 text-zinc-500">
                {project.githubUrl && <FaGithub size={16} />}
                {project.liveUrl && <FaLink size={16} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 backdrop-blur-md">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleCloseModal}
          ></div>
          <div className="bg-[#0d0d0f] border border-white/10 w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl relative z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                {editingId ? "Éditer" : "Nouveau"} Projet
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                required
                placeholder="NOM DU PROJET"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-white/5 border border-white/5 rounded-xl py-4 px-6 text-sm focus:border-blue-500 outline-none transition-all"
              />
              <textarea
                required
                placeholder="DESCRIPTION"
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-white/5 border border-white/5 rounded-xl py-4 px-6 text-sm focus:border-blue-500 outline-none transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="TECHS (REACT, NODE...)"
                  value={formData.techStack}
                  onChange={(e) =>
                    setFormData({ ...formData, techStack: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-4 px-6 text-sm focus:border-blue-500 outline-none transition-all"
                />
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="bg-zinc-900 border border-white/5 rounded-xl px-4 text-sm outline-none"
                >
                  <option value="online">Online</option>
                  <option value="progress">In Progress</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Lien GitHub"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-4 px-6 text-sm outline-none"
                />
                <input
                  placeholder="Lien Demo"
                  value={formData.liveUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, liveUrl: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-4 px-6 text-sm outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase py-5 rounded-2xl transition-all"
              >
                {editingId ? "Mettre à jour" : "Déployer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
