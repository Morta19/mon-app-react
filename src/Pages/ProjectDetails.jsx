import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaLayerGroup,
  FaCalendarAlt,
} from "react-icons/fa";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // RÉCUPÉRATION DE L'URL DE BASE DEPUIS .env.local
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadProject() {
      if (!API_URL) return;

      try {
        setLoading(true);
        setError(null);

        // Appel à MockAPI via la variable d'environnement
        const res = await fetch(`${API_URL}/projects/${id}`);

        if (res.status === 404) {
          setError("Ce projet n'existe pas ou a été déplacé.");
          return;
        }

        if (!res.ok) throw new Error("Erreur lors du chargement des données.");

        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id, API_URL]);

  // Écran de chargement
  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  // Écran d'erreur
  if (error)
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-black text-white mb-4 uppercase italic">
          Oups !
        </h2>
        <p className="text-zinc-500 mb-8 max-w-md font-medium">{error}</p>
        <button
          onClick={() => navigate("/projects")}
          className="px-8 py-3 bg-blue-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        >
          Retour aux projets
        </button>
      </div>
    );

  if (!project) return null;

  // --- SÉCURISATION DU TECHSTACK ---
  let techArray = [];
  if (Array.isArray(project.techStack)) {
    techArray = project.techStack;
  } else if (typeof project.techStack === "string") {
    techArray = project.techStack.split(",").map((t) => t.trim());
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Retour */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors mb-12 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Retour à la galerie
        </Link>

        <div className="relative">
          {/* Header Projet */}
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-md">
                  {project.status || "Publié"}
                </span>
                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <FaCalendarAlt /> {project.year || "2024 — Présent"}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                {project.title}
              </h1>
            </div>

            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
                >
                  <FaGithub size={18} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-zinc-900 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all active:scale-95"
                >
                  <FaExternalLinkAlt size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Banner Visuel */}
          <div className="w-full h-[400px] bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/5 mb-16 relative">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-60"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaLayerGroup size={80} className="text-white/5" />
                </div>
              </>
            )}
          </div>

          {/* Description & Tech */}
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-8">
              <h3 className="text-xl font-bold border-b border-white/5 pb-4 uppercase tracking-tighter">
                À propos du projet
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                {project.description ||
                  "Aucune description disponible pour le moment."}
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-xl font-bold border-b border-white/5 pb-4 uppercase tracking-tighter">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {techArray.length > 0 ? (
                  techArray.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-bold text-zinc-300 hover:border-blue-500/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-zinc-600 text-xs italic font-medium uppercase tracking-widest">
                    Non spécifiées
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
