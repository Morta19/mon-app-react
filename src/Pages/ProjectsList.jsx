import { useEffect, useState, useRef } from "react";
import { FaArrowRight, FaRocket } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import localData from "../../db.json";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [techSearch, setTechSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [featured, setFeatured] = useState(null);

  // RÉCUPÉRATION DE L'URL DE BASE DEPUIS .env.local (Vite)
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      setError(null);

      // Fallback local: si aucune API distante n'est configurée, utiliser le fichier db.json
      if (!API_BASE) {
        try {
          const data =
            localData && Array.isArray(localData.projects)
              ? localData.projects
              : [];
          const visibleProjects = data.filter((p) => p.status !== "archived");
          setProjects(visibleProjects);
          // Définir un projet mis en avant: recherche par mot-clé 'smart' ou fallback
          const smart = visibleProjects.find(
            (p) =>
              (p.title || "").toLowerCase().includes("smart") ||
              (p.description || "").toLowerCase().includes("smart city"),
          );
          setFeatured(smart || visibleProjects[0] || null);
        } catch (err) {
          console.error("Erreur lecture locale projects:", err);
          setError("Impossible de charger la galerie de projets (local).");
        } finally {
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/projects`);
        if (!res.ok) throw new Error("Erreur serveur lors de la récupération");

        const data = await res.json();

        // Filtrage : on ne montre pas les projets archivés
        const visibleProjects = data.filter((p) => p.status !== "archived");
        setProjects(visibleProjects);
        const smart = visibleProjects.find(
          (p) =>
            (p.title || "").toLowerCase().includes("smart") ||
            (p.description || "").toLowerCase().includes("smart city"),
        );
        setFeatured(smart || visibleProjects[0] || null);
      } catch (err) {
        console.error("Erreur List:", err);
        setError("Impossible de charger la galerie de projets.");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [API_BASE]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Refs for modal focus management
  const modalRef = useRef(null);
  const lastActiveRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    if (selectedProject) {
      // store last active element
      lastActiveRef.current = document.activeElement;
      // hide background from assistive tech
      if (mainRef.current) mainRef.current.setAttribute("aria-hidden", "true");
      // prevent background scroll
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // focus first focusable in modal
      const focusable = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      if (first) first.focus();

      const trap = (e) => {
        if (e.key === "Escape") {
          setSelectedProject(null);
          e.preventDefault();
          return;
        }
        if (e.key === "Tab") {
          // focus trap
          const focusableEls = Array.from(focusable).filter(
            (el) => el.offsetParent !== null,
          );
          if (focusableEls.length === 0) return;
          const firstEl = focusableEls[0];
          const lastEl = focusableEls[focusableEls.length - 1];
          if (!e.shiftKey && document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
          if (e.shiftKey && document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        }
      };

      window.addEventListener("keydown", trap);

      return () => {
        window.removeEventListener("keydown", trap);
        document.body.style.overflow = prev || "";
        if (mainRef.current) mainRef.current.removeAttribute("aria-hidden");
        // restore focus
        lastActiveRef.current?.focus();
      };
    }
  }, [selectedProject]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <section className="min-h-screen bg-grid text-[var(--ink)] py-32 px-6 relative overflow-hidden">
      {/* Effets de lumière en arrière-plan */}
      <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[320px] md:h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-0" />

      <div className="max-w-7xl mx-auto relative z-10" ref={mainRef}>
        <header className="mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-blue-500"></span>
            <span className="text-blue-500 font-mono tracking-[0.3em] uppercase text-xs">
              Portfolio
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none">
            Projets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgba(15,27,45,0.9)] to-[var(--accent)]">
              Sélectionnés.
            </span>
          </h1>
        </header>

        {error ? (
          <div className="text-center py-20 border border-dashed border-red-500/20 rounded-[3rem]">
            <p className="text-red-400 font-mono uppercase tracking-widest text-sm">
              {error}
            </p>
          </div>
        ) : (
          <>
            {/* CONTROLS */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                {["all", "online", "in-progress", "offline"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-2 text-xs font-mono uppercase tracking-widest border rounded-full ${filterStatus === s ? "bg-blue-500 text-white border-blue-500" : "bg-transparent text-zinc-400 border-white/5"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <input
                  value={techSearch}
                  onChange={(e) => setTechSearch(e.target.value)}
                  placeholder="Rechercher une techno (React, Flask...)"
                  className="px-4 py-2 bg-transparent border border-white/5 rounded-md text-sm"
                />
              </div>
            </div>

            {/* FEATURED */}
            {featured && (
              <div className="mb-8 border border-[var(--line)] rounded-2xl bg-[var(--surface)] p-6 md:p-8">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)]">
                        Projet mis en avant
                      </p>
                      <h2 className="text-3xl font-black mt-2">
                        {featured.title}
                      </h2>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20 bg-green-500/10 text-green-400">
                      {featured.status || "Publié"}
                    </span>
                  </div>
                  <p className="max-w-4xl text-zinc-400 leading-relaxed">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(featured.techStack)
                      ? featured.techStack
                      : (featured.techStack || "").split(",")
                    ).map((tech, index) => (
                      <span key={index} className="tech-chip">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {featured.liveUrl && (
                      <a
                        href={featured.liveUrl}
                        className="px-4 py-2 btn-primary rounded-md text-sm"
                      >
                        Voir en ligne
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(featured)}
                      className="px-4 py-2 btn-ghost rounded-md text-sm"
                    >
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, idx) => {
                // --- SÉCURISATION DU TECHSTACK ---
                // On s'assure que techArray est toujours un tableau pour éviter le crash .map()
                let techArray = [];
                if (Array.isArray(project.techStack)) {
                  techArray = project.techStack;
                } else if (typeof project.techStack === "string") {
                  techArray = project.techStack.split(",").map((t) => t.trim());
                }

                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setSelectedProject(project);
                    }}
                    role="button"
                    tabIndex={0}
                    className="group relative card overflow-hidden hover:border-[var(--accent)]/50 transition-all duration-500 backdrop-blur-sm animate-rise cursor-pointer"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="project-idx">
                      #{String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="project-category">
                      {project.id === "smartcity"
                        ? "Projet principal"
                        : "Projet"}
                    </div>
                    {/* Contenu textuel */}
                    <div className="p-6 md:p-8 space-y-4 relative">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-2xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors">
                          {project.title}
                        </h2>
                        <span
                          className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            project.status === "online"
                              ? "bg-green-500/10 border-green-500/20 text-green-400"
                              : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          }`}
                        >
                          {project.status || "Publié"}
                        </span>
                      </div>

                      <p className="text-[var(--muted-2)] text-sm leading-relaxed line-clamp-3 font-medium">
                        {project.description}
                      </p>

                      {/* Tags de Tech Stack (Affichage sécurisé) */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {techArray.map((tech, index) => (
                          <span key={index} className="tech-chip" title={tech}>
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-6 flex items-center justify-between border-t border-[var(--line)]">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-2)] flex items-center gap-2">
                          Détails{" "}
                          <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[var(--surface-2)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
                          <FaRocket
                            size={12}
                            className="group-hover:text-white text-[var(--muted-2)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!loading && projects.length === 0 && !error && (
          <div className="text-center py-20 border border-dashed border-[var(--line)] rounded-2xl">
            <p className="text-zinc-500 font-mono uppercase tracking-widest">
              Aucun projet déployé pour le moment.
            </p>
          </div>
        )}
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target.classList.contains("modal-backdrop"))
              setSelectedProject(null);
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={modalRef}
            tabIndex={-1}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 id="modal-title" className="text-2xl font-bold">
                  {selectedProject.title}
                </h2>
                <p className="text-sm text-[var(--muted-2)] mt-2">
                  {selectedProject.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-ghost"
                aria-label="Fermer la fenêtre de détails"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-display text-lg font-semibold">
                  Contexte & Rôle
                </h4>
                <p className="text-[var(--muted-2)] text-sm mt-2">
                  {selectedProject.role ||
                    (selectedProject.title.includes("Smart")
                      ? "Full-Stack + IA"
                      : "Full-Stack + Microservices")}
                </p>
              </div>

              <div>
                <h4 className="font-display text-lg font-semibold">
                  Fonctionnalités
                </h4>
                <ul className="list-disc list-inside mt-2 text-[var(--muted-2)]">
                  {(selectedProject.features || []).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>

                <h4 className="font-display text-lg font-semibold mt-4">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(Array.isArray(selectedProject.techStack)
                    ? selectedProject.techStack
                    : (selectedProject.techStack || "").split(",")
                  ).map((t, i) => (
                    <span key={i} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {selectedProject.distinction && (
              <div className="mt-6 border-t pt-4 text-sm text-[var(--muted-2)]">
                <strong>Distinction: </strong>
                {selectedProject.distinction}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsList;
