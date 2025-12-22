// src/pages/ProjectsList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCode, FaRocket } from "react-icons/fa";

const API_URL = "http://localhost:4000/projects";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Erreur serveur");
        const data = await res.json();
        // On ne montre que les projets opérationnels ou en brouillon, pas les archivés
        setProjects(data.filter((p) => p.status !== "archived"));
      } catch (err) {
        setError("Impossible de charger les projets.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <section className="min-h-screen bg-[#050505] text-white py-32 px-6 relative overflow-hidden">
      {/* Effets de lumière en arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-blue-500"></span>
            <span className="text-blue-500 font-mono tracking-[0.3em] uppercase text-xs">
              Portfolio
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
            Projets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">
              Sélectionnés.
            </span>
          </h1>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="group relative bg-zinc-900/30 border border-white/5 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm"
            >
              {/* Overlay Gradient au hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Visuel du haut */}
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover:scale-110 transition-transform duration-700"></div>
                {/* Badge Statut */}
                <div className="absolute top-6 right-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      project.status === "online"
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <FaCode className="absolute bottom-6 left-6 text-white/10 text-6xl group-hover:text-blue-500/20 transition-colors" />
              </div>

              {/* Contenu textuel */}
              <div className="p-8 space-y-4 relative">
                <h2 className="text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>

                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 font-medium">
                  {project.description}
                </p>

                {/* Tags de Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-black uppercase tracking-tighter px-2 py-1 bg-white/5 border border-white/5 rounded text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack?.length > 3 && (
                    <span className="text-[9px] font-black text-zinc-600">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                    Détails{" "}
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <FaRocket
                      size={12}
                      className="group-hover:text-white text-zinc-500"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
            <p className="text-zinc-500 font-mono uppercase tracking-widest">
              Aucun projet déployé pour le moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsList;
