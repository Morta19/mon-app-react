import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../components/api/projectsApi";
import ProjectsTable from "./ProjectsTable";
import ProjectForm from "./ProjectForm";
import { FaPlus, FaTimes } from "react-icons/fa";

function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false); // Pour afficher/cacher le formulaire

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const API_BASE = import.meta.env.VITE_API_URL;
        if (!API_BASE) {
          setError(
            "VITE_API_URL non configurée — impossible de joindre l'API.",
          );
          return;
        }
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Erreur lors du chargement des projets:", err);
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleEditClick = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {error && (
        <div className="p-4 rounded-lg bg-red-600/10 border border-red-600/20 text-red-400">
          {error}
        </div>
      )}
      {/* HEADER DYNAMIQUE */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Gestion Projets<span className="text-blue-500">.</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
            {projects.length} Unités enregistrées
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
            isFormOpen
              ? "bg-zinc-800 text-white"
              : "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105"
          }`}
        >
          {isFormOpen ? (
            <>
              <FaTimes /> Fermer
            </>
          ) : (
            <>
              <FaPlus /> Nouveau Projet
            </>
          )}
        </button>
      </div>

      {/* ZONE FORMULAIRE (Conditionnelle avec animation) */}
      {isFormOpen && (
        <div className="animate-in slide-in-from-top-4 duration-500">
          <ProjectForm
            key={editingProject ? editingProject.id : "new"}
            initialProject={editingProject}
            onCreate={async (projectData) => {
              const newProject = await createProject(projectData);
              setProjects([...projects, newProject]); // Ajoute le projet à la liste sans recharger
              setIsFormOpen(false);
            }}
            onUpdate={async (id, projectData) => {
              const updated = await updateProject(id, projectData);
              setProjects(projects.map((p) => (p.id === id ? updated : p))); // Remplace l'ancien par le nouveau
              setEditingProject(null);
              setIsFormOpen(false);
            }}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* TABLEAU FUTURISTE */}
      <ProjectsTable
        projects={projects}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={async (id) => {
          await deleteProject(id);
          setProjects(projects.filter((p) => p.id !== id));
        }}
      />
    </div>
  );
}
export default ProjectsAdminPage;
