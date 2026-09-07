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

const API_URL = import.meta.env.VITE_PROJECTS_API_URL;
const NOT_FOUND_MESSAGE = "Ce projet n'existe pas ou a été déplacé.";

const STATUS_STYLES = {
  online: { color: "var(--accent-2)", label: "En ligne" },
  "in-progress": { color: "var(--accent-3)", label: "En cours" },
  offline: { color: "var(--ink-muted)", label: "Hors ligne" },
};

/**
 * Fetches a single project either from the remote API (if configured)
 * or from the local `db.json` fallback.
 */
async function fetchProject(id) {
  if (!API_URL) {
    const project = Array.isArray(localData.projects)
      ? localData.projects.find((p) => p.id == id) // eslint-disable-line eqeqeq
      : null;

    if (!project) {
      throw new Error(NOT_FOUND_MESSAGE);
    }
    return project;
  }

  const response = await fetch(`${API_URL}/projects/${id}`);

  if (response.status === 404) {
    throw new Error(NOT_FOUND_MESSAGE);
  }
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des données.");
  }

  return response.json();
}

/** Normalizes fields that may come as arrays, strings, or be missing. */
function normalizeProject(project) {
  const techStack = Array.isArray(project.techStack)
    ? project.techStack
    : typeof project.techStack === "string"
      ? project.techStack.split(",").map((tech) => tech.trim())
      : [];

  const features = Array.isArray(project.features) ? project.features : [];
  const gallery = Array.isArray(project.images) ? project.images : [];
  const coverImage = gallery[0] || project.image;

  return { techStack, features, gallery, coverImage };
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--line-strong)] border-t-[var(--accent)]" />
    </div>
  );
}

function ErrorState({ message, onBack }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4 text-center">
      <h2 className="text-3xl font-bold text-[var(--ink)]">
        Projet introuvable
      </h2>
      <p className="mt-4 max-w-md text-[var(--ink-muted)]">{message}</p>
      <button
        type="button"
        onClick={onBack}
        className="mt-8 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
      >
        Retour aux projets
      </button>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/projects"
      className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]"
    >
      <FaArrowLeft
        size={13}
        className="transition-transform group-hover:-translate-x-1"
      />
      Retour aux projets
    </Link>
  );
}

function StatusBadge({ status }) {
  const config = STATUS_STYLES[status] || {
    color: "var(--ink-muted)",
    label: "Publié",
  };

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
      style={{ borderColor: config.color, color: config.color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}

function ProjectHero({ project }) {
  return (
    <div className="grid gap-10 border-b border-[var(--line)] pb-12 lg:grid-cols-[1fr_260px] lg:items-end lg:gap-16">
      <div className="max-w-3xl">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="flex items-center gap-1.5 text-sm text-[var(--ink-muted)]">
            <FaCalendarAlt size={12} className="text-[var(--accent)]" />
            {project.year || "2024 — présent"}
          </span>
        </div>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--ink-muted)]">
          {project.description ||
            "Aucune description disponible pour le moment."}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
          >
            <FaGithub size={15} /> Voir le code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <FaExternalLinkAlt size={13} /> Démo en ligne
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectGallery({ title, coverImage, gallery, onImageClick }) {
  return (
    <div className="mt-10 grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(180px,0.7fr)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
        {coverImage ? (
          <button
            type="button"
            onClick={() => onImageClick(0)}
            className="group h-full w-full"
            aria-label={`Agrandir l'image de ${title}`}
          >
            <img
              src={coverImage}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </button>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[var(--line-strong)]">
            <FaLayerGroup size={44} />
            <span className="text-xs text-[var(--ink-muted)]">
              Aperçu à venir
            </span>
          </div>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {gallery.slice(1, 3).map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => onImageClick(i + 1)}
              className="group relative min-h-32 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]"
              aria-label={`Agrandir l'aperçu ${i + 2} de ${title}`}
            >
              <img
                src={img}
                alt={`${title} aperçu ${i + 2}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FeatureList({ features }) {
  if (features.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-[var(--ink)]">
        Fonctionnalités
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink)] transition-colors hover:border-[var(--accent)]/50"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectSidebar({ project, techStack }) {
  return (
    <aside className="space-y-9">
      <div>
        <h3 className="text-sm font-semibold text-[var(--accent)]">Rôle</h3>
        <p className="mt-2 text-base font-medium leading-snug text-[var(--ink)]">
          {project.role || "Développeur Full-Stack"}
        </p>
      </div>

      {project.distinction && (
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <h3 className="text-sm font-semibold text-[var(--accent)]">
            Distinction
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">
            {project.distinction}
          </p>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-[var(--accent)]">Stack</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {techStack.length > 0 ? (
            techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {tech}
              </span>
            ))
          ) : (
            <span className="text-xs text-[var(--ink-muted)]">
              Non spécifiée
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:border-white"
        aria-label="Fermer l'image"
      >
        <FaTimes />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[88vh] max-w-full object-contain"
      />
    </div>
  );
}

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadProject() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProject(id);
        if (!isCancelled) setProject(data);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    loadProject();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (loading) return <LoadingState />;
  if (error) {
    return <ErrorState message={error} onBack={() => navigate("/projects")} />;
  }
  if (!project) return null;

  const { techStack, features, gallery, coverImage } =
    normalizeProject(project);

  return (
    <section className="min-h-screen bg-[var(--bg)] px-6 pb-24 pt-28 text-[var(--ink)] sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <BackLink />
        <ProjectHero project={project} />
        <ProjectGallery
          title={project.title}
          coverImage={coverImage}
          gallery={gallery}
          onImageClick={setLightboxIndex}
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--ink)]">
              À propos du projet
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-muted)]">
              {project.description ||
                "Aucune description disponible pour le moment."}
            </p>

            <FeatureList features={features} />
          </div>

          <ProjectSidebar project={project} techStack={techStack} />
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          src={gallery[lightboxIndex] || project.image}
          alt={`${project.title} — aperçu ${lightboxIndex + 1}`}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
};

export default ProjectDetails;
