import { useEffect, useRef, useState } from "react";
function ProjectForm({ initialProject, onCreate, onUpdate, onCancel }) {
  const [title, setTitle] = useState(initialProject?.title || "");
  const [description, setDescription] = useState(
    initialProject?.description || ""
  );
  const [techStack, setTechStack] = useState(
    initialProject?.techStack?.join(", ") || ""
  );
  const [status, setStatus] = useState(initialProject?.status || "draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current?.focus();
  }, []);
  const isEditMode = Boolean(initialProject);
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Le titre est obligatoire");
      return;
    }
    const payload = {
      ...initialProject,
      title: title.trim(),
      description: description.trim(),
      techStack: techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status,
    };
    try {
      setLoading(true);
      if (isEditMode) {
        await onUpdate(initialProject.id, payload);
      } else {
        await onCreate(payload);
      }
      // reset si création
      if (!isEditMode) {
        setTitle("");
        setDescription("");
        setTechStack("");
        setStatus("draft");
        titleRef.current?.focus();
      }
    } catch (err) {
      setError(err.message || "Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  }

  // Remplace le contenu de ton return dans ProjectForm.jsx par celui-ci :
  return (
    <div className="bg-[#121214] rounded-3xl border border-white/5 p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>

      <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
        {isEditMode
          ? "Configuration du Module"
          : "Initialisation Nouveau Projet"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
              Titre du Projet
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
              placeholder="Ex: Système POS 2.0"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
              Stack Technique
            </label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50"
              placeholder="React, Tailwind, Node..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 h-[125px] resize-none"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex items-center justify-between border-t border-white/5 pt-6">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-white px-4 py-2 rounded-full border-none outline-none cursor-pointer"
          >
            <option value="draft">Brouillon</option>
            <option value="online">Opérationnel</option>
            <option value="archived">Archivé</option>
          </select>

          <div className="flex gap-3">
            {isEditMode && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition"
              >
                Annuler
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-600/20 hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading
                ? "Traitement..."
                : isEditMode
                ? "Sauvegarder Changements"
                : "Déployer Projet"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default ProjectForm;
