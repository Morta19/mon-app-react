import { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm";

const API_URL = "https://6949231c1282f890d2d54f5d.mockapi.io/api/v1/projects";

const ProjectsAdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Erreur de chargement:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // FONCTION : CREER (POST)
  const handleCreate = async (projectData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      if (response.ok) {
        fetchProjects();
        alert("Projet ajouté avec succès !");
      }
    } catch (error) {
      console.error("Erreur creation:", error);
    }
  };

  // FONCTION : MODIFIER (PUT)
  const handleUpdate = async (id, projectData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      if (response.ok) {
        setEditingProject(null);
        fetchProjects();
        alert("Projet mis à jour !");
      }
    } catch (error) {
      console.error("Erreur modification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-8 text-white">
      <h1 className="text-2xl font-black uppercase mb-8 italic">
        Engine<span className="text-blue-500">.</span>Admin
      </h1>

      <div className="max-w-4xl mx-auto mb-10">
        <ProjectForm
          initialProject={editingProject}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={() => setEditingProject(null)}
        />
      </div>

      {/* Liste pour tester */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-zinc-900/50 p-6 rounded-[2rem] border border-white/5"
          >
            <h3 className="font-bold uppercase text-blue-400 mb-2">
              {p.title}
            </h3>
            <p className="text-xs text-zinc-500 mb-4 line-clamp-2">
              {p.description}
            </p>
            <button
              onClick={() => setEditingProject(p)}
              className="text-[10px] font-black uppercase bg-white/5 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all"
            >
              Éditer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAdminPage;
