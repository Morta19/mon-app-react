import { useEffect, useMemo, useRef, useState } from "react";
import { FaRocket, FaTimes } from "react-icons/fa";
import localData from "../../db.json";
import useReveal from "../hooks/useReveal";
import useTilt from "../hooks/useTilt";

const API_BASE = import.meta.env.VITE_PROJECTS_API_URL;

const STATUS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "online", label: "En ligne" },
  { key: "in-progress", label: "En cours" },
  { key: "offline", label: "Hors ligne" },
];

const STATUS_STYLES = {
  online: { color: "var(--accent-2)", label: "En ligne" },
  "in-progress": { color: "var(--accent-3)", label: "En cours" },
  offline: { color: "var(--ink-muted)", label: "Hors ligne" },
};

/** Alterne les 3 accents de la palette pour un rendu vif et cohérent. */
const ACCENTS = ["var(--accent)", "var(--accent-2)", "var(--accent-3)"];
const accentFor = (index) => ACCENTS[index % ACCENTS.length];

function toTechArray(techStack) {
  if (Array.isArray(techStack)) return techStack;
  if (typeof techStack === "string") {
    return techStack.split(",").map((tech) => tech.trim());
  }
  return [];
}

/** Choisit le projet à mettre en avant : mot-clé "smart" en priorité, sinon le premier. */
function pickFeatured(projects) {
  const smart = projects.find(
    (p) =>
      (p.title || "").toLowerCase().includes("smart") ||
      (p.description || "").toLowerCase().includes("smart city"),
  );
  return smart || projects[0] || null;
}

function matchesFilters(project, status, search) {
  const statusOk = status === "all" || project.status === status;
  if (!statusOk) return false;

  const query = search.trim().toLowerCase();
  if (!query) return true;

  return toTechArray(project.techStack).some((tech) =>
    tech.toLowerCase().includes(query),
  );
}

async function fetchProjects() {
  if (!API_BASE) {
    const data = Array.isArray(localData.projects) ? localData.projects : [];
    return data.filter((p) => p.status !== "archived");
  }

  const response = await fetch(`${API_BASE}/projects`);
  if (!response.ok) throw new Error("Erreur serveur lors de la récupération");

  const data = await response.json();
  return data.filter((p) => p.status !== "archived");
}

/** Gère le focus trap, l'échappement au clavier et le scroll de fond pendant qu'une modale est ouverte. */
function useModalBehavior(isOpen, { modalRef, backgroundRef, onClose }) {
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    lastActiveRef.current = document.activeElement;
    backgroundRef.current?.setAttribute("aria-hidden", "true");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = modalRef.current.querySelectorAll(focusableSelector);
    focusable[0]?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        event.preventDefault();
        return;
      }
      if (event.key !== "Tab") return;

      const visibleFocusable = Array.from(focusable).filter(
        (el) => el.offsetParent !== null,
      );
      if (visibleFocusable.length === 0) return;

      const first = visibleFocusable[0];
      const last = visibleFocusable[visibleFocusable.length - 1];

      if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow || "";
      backgroundRef.current?.removeAttribute("aria-hidden");
      lastActiveRef.current?.focus();
    };
  }, [isOpen, modalRef, backgroundRef, onClose]);
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--line-strong)] border-t-[var(--accent)]" />
    </div>
  );
}

function PageHeader() {
  return (
    <header className="mb-16 max-w-2xl" data-reveal="up">
      <p className="eyebrow mb-4">TRAVAUX SÉLECTIONNÉS</p>
      <h1 className="display-lg mb-6">
        Projets <span className="text-gradient-gold">concrets</span>.
      </h1>
      <hr className="section-rule w-40 mb-6" />
      <p className="text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg">
        Une sélection d'applications conçues et développées de bout en bout,
        du prototype à la mise en production.
      </p>
    </header>
  );
}

function StatusFilters({ value, onChange }) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Filtrer par statut"
    >
      {STATUS_FILTERS.map((status) => {
        const isActive = value === status.key;
        return (
          <button
            key={status.key}
            type="button"
            onClick={() => onChange(status.key)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--line)] bg-transparent text-[var(--ink-muted)] hover:border-[var(--accent)]/50 hover:text-[var(--ink)]"
            }`}
          >
            {status.label}
          </button>
        );
      })}
    </div>
  );
}

function TechSearchInput({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-72">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher une techno — React, Flask…"
        aria-label="Rechercher une technologie"
        className="w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-2 text-sm text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-muted)] focus:border-[var(--accent-2)]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink)]"
        >
          <FaTimes size={12} />
        </button>
      )}
    </div>
  );
}

function TechChips({ techStack }) {
  return (
    <div className="flex flex-wrap gap-2">
      {toTechArray(techStack).map((tech, index) => (
        <span
          key={tech}
          className="rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            borderColor: accentFor(index),
            color: accentFor(index),
          }}
        >
          {tech.trim()}
        </span>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const config = STATUS_STYLES[status] || {
    color: "var(--ink-muted)",
    label: "Publié",
  };

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium"
      style={{ color: config.color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}

function FeaturedProject({ project, onShowDetails }) {
  if (!project) return null;

  return (
    <div className="mb-10 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">
              Projet phare
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--ink)]">
              {project.title}
            </h2>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p className="max-w-3xl text-base leading-relaxed text-[var(--ink-muted)]">
          {project.description}
        </p>

        <TechChips techStack={project.techStack} />

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Voir en ligne
            </a>
          )}
          <button
            type="button"
            onClick={() => onShowDetails(project)}
            className="rounded-full border border-[var(--line-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onSelect }) {
  const techArray = toTechArray(project.techStack);
  const cover = project.image || project.images?.[0] || "";
  const tilt = useTilt(6);

  function selectProject() {
    onSelect(project);
  }

  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onClick={selectProject}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectProject();
        }
      }}
      role="button"
      tabIndex={0}
      data-reveal="up"
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
      className="tilt-card group flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-3)]">
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--line-strong)] transition-colors duration-300 group-hover:text-[var(--accent)]">
            <FaRocket size={26} />
          </div>
        )}
        {/* Voile dégradé au survol */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,7,13,0.35)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--accent)]">
            {project.title}
          </h2>
          <StatusBadge status={project.status} />
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--ink-muted)]">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {techArray.slice(0, 4).map((tech, techIndex) => (
            <span
              key={tech}
              className="rounded-full border px-2.5 py-1 text-[11px] font-medium transition-transform duration-200 group-hover:-translate-y-0.5"
              style={{
                borderColor: accentFor(techIndex),
                color: accentFor(techIndex),
              }}
            >
              {tech}
            </span>
          ))}
          {techArray.length > 4 && (
            <span className="rounded-full px-2.5 py-1 text-[11px] font-medium text-[var(--ink-muted)]">
              +{techArray.length - 4}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectGrid({ projects, onSelect }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function EmptyState({ isFiltered }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--line)] py-20 text-center">
      <p className="text-[var(--ink-muted)]">
        {isFiltered
          ? "Aucun projet ne correspond à ces critères."
          : "Aucun projet déployé pour le moment."}
      </p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--accent)]/30 py-20 text-center">
      <p className="text-sm font-medium text-[var(--accent)]">{message}</p>
    </div>
  );
}

function ProjectModal({ project, onClose, backgroundRef }) {
  const modalRef = useRef(null);

  useModalBehavior(Boolean(project), { modalRef, backgroundRef, onClose });

  if (!project) return null;

  const role =
    project.role ||
    (project.title.includes("Smart")
      ? "Full-Stack + IA"
      : "Full-Stack + Microservices");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-2xl md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="modal-title"
              className="text-2xl font-bold text-[var(--ink)]"
            >
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">
              {project.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="Fermer la fenêtre de détails"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-[var(--accent-2)]">
              Contexte & rôle
            </h3>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">{role}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--accent-2)]">
              Fonctionnalités
            </h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--ink-muted)]">
              {(project.features || []).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <h3 className="mt-5 text-sm font-semibold text-[var(--accent-2)]">
              Technologies
            </h3>
            <div className="mt-2">
              <TechChips techStack={project.techStack} />
            </div>
          </div>
        </div>

        {project.distinction && (
          <div className="mt-6 border-t border-[var(--line)] pt-4 text-sm text-[var(--ink-muted)]">
            <span className="font-semibold text-[var(--accent-3)]">
              Distinction —{" "}
            </span>
            {project.distinction}
          </div>
        )}
      </div>
    </div>
  );
}

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [techSearch, setTechSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [featured, setFeatured] = useState(null);

  const mainRef = useReveal();

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      setError(null);
      try {
        const visibleProjects = await fetchProjects();
        setProjects(visibleProjects);
        setFeatured(pickFeatured(visibleProjects));
      } catch (err) {
        console.error("Erreur chargement projets:", err);
        setError("Impossible de charger la galerie de projets.");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        matchesFilters(project, filterStatus, techSearch),
      ),
    [projects, filterStatus, techSearch],
  );

  const isFiltered = filterStatus !== "all" || techSearch.trim() !== "";

  if (loading) return <LoadingState />;

  return (
    <section className="min-h-screen bg-[var(--bg)] px-6 py-24 text-[var(--ink)] sm:py-32">
      <div id="projects-main" className="mx-auto max-w-7xl" ref={mainRef}>
        <PageHeader />

        {error ? (
          <ErrorState message={error} />
        ) : (
          <>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <StatusFilters value={filterStatus} onChange={setFilterStatus} />
              <TechSearchInput value={techSearch} onChange={setTechSearch} />
            </div>

            {!isFiltered && (
              <FeaturedProject
                project={featured}
                onShowDetails={setSelectedProject}
              />
            )}

            {filteredProjects.length === 0 ? (
              <EmptyState isFiltered={isFiltered} />
            ) : (
              <ProjectGrid
                projects={filteredProjects}
                onSelect={setSelectedProject}
              />
            )}
          </>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        backgroundRef={mainRef}
      />
    </section>
  );
};

export default ProjectsList;