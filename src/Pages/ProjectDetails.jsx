import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaLayerGroup,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import localData from "../../db.json";
import mortaImg from "../assets/morta.jpg";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      setError(null);

      // Fallback local si aucune API définie
      if (!API_URL) {
        try {
          const data =
            (Array.isArray(localData.projects) &&
              localData.projects.find((p) => p.id == id)) ||
            null;
          if (!data) {
            setError("Ce projet n'existe pas ou a été déplacé.");
            setLoading(false);
            return;
          }
          setProject(data);
        } catch {
          setError("Erreur lecture locale projet.");
        } finally {
          setLoading(false);
        }
        return;
      }

      try {
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

  if (loading)
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--line-strong)] border-t-[var(--accent)] rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-display text-4xl font-semibold mb-4">Oups !</h2>
        <p className="text-[var(--ink-muted)] mb-8 max-w-md">{error}</p>
        <button
          onClick={() => navigate("/projects")}
          className="px-8 py-3 bg-[var(--ink)] text-[var(--bg)] font-mono text-xs tracking-widest hover:bg-[var(--accent)] transition-colors"
        >
          RETOUR AUX PROJETS
        </button>
      </div>
    );

  if (!project) return null;

  let techArray = [];
  if (Array.isArray(project.techStack)) {
    techArray = project.techStack;
  } else if (typeof project.techStack === "string") {
    techArray = project.techStack.split(",").map((t) => t.trim());
  }

  return (
    <section className="min-h-screen bg-[var(--bg)] bg-grid text-[var(--ink)] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors mb-12 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          RETOUR À L'INDEX
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16 pb-16 border-b border-[var(--line)]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 border border-[var(--line-strong)] text-[var(--accent)] font-mono text-[10px] tracking-widest">
                {project.status || "PUBLIÉ"}
              </span>
              <span className="text-[var(--ink-muted)] text-[10px] font-mono tracking-widest flex items-center gap-2">
                <FaCalendarAlt /> {project.year || "2024 — présent"}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              {project.title}
            </h1>
          </div>

          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[var(--ink)] text-[var(--bg)] font-mono text-xs tracking-widest hover:bg-[var(--accent)] transition-colors"
              >
                <FaGithub size={16} /> CODE
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-[var(--line-strong)] font-mono text-xs tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <FaExternalLinkAlt size={14} /> LIVE DEMO
              </a>
            )}
          </div>
        </div>

        <div className="corner-frame w-full h-[400px] bg-[var(--surface)] overflow-hidden border border-[var(--line-strong)] mb-16 relative">
          {project.images && project.images.length > 0 ? (
            <div className="w-full h-full grid grid-cols-3 gap-2 p-2">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="overflow-hidden rounded-md"
                >
                  <img
                    src={img}
                    alt={`${project.title}-${i}`}
                    className="w-full h-36 object-cover"
                  />
                </button>
              ))}
            </div>
          ) : project.image ? (
            <button
              onClick={() => setLightboxIndex(0)}
              className="w-full h-full block"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaLayerGroup size={64} className="text-[var(--line-strong)]" />
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-mono text-[11px] tracking-widest text-[var(--ink-muted)] border-b border-[var(--line)] pb-4">
              À PROPOS DU PROJET
            </h3>
            <p className="text-[var(--ink-muted)] text-lg leading-relaxed">
              {project.description ||
                "Aucune description disponible pour le moment."}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-mono text-[11px] tracking-widest text-[var(--ink-muted)] border-b border-[var(--line)] pb-4">
              TECHNOLOGIES
            </h3>
            <div className="flex flex-wrap gap-2">
              {techArray.length > 0 ? (
                techArray.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 border border-[var(--line)] font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] transition-colors"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <span className="text-[var(--ink-muted)] text-xs font-mono tracking-widest">
                  NON SPÉCIFIÉES
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center modal-zoom">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            <FaTimes />
          </button>
          <img
            src={
              (project.images && project.images[lightboxIndex]) ||
              project.image ||
              mortaImg
            }
            alt="lightbox"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default ProjectDetails;
