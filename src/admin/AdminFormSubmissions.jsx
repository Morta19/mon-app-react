import { useEffect, useState } from "react";
import { FaTrash, FaInbox, FaUser, FaEnvelope, FaCircle } from "react-icons/fa";

// URL DE VOTRE MOCKAPI
const MOCK_API_URL =
  "https://69497e321282f890d2d65641.mockapi.io/api/v1/formSubmissions";

function AdminFormSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. CHARGEMENT (GET)
  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch(MOCK_API_URL);
      if (!response.ok) throw new Error("Erreur serveur");
      const data = await response.json();

      // Tri par date : les plus récents en haut
      setSubmissions(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      setError("Impossible de charger les messages.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "done":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // 2. MISE À JOUR DU STATUT (PUT)
  async function handleChangeStatus(id, newStatus) {
    const current = submissions.find((s) => s.id === id);
    if (!current) return;

    try {
      const response = await fetch(`${MOCK_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...current, status: newStatus }),
      });

      if (response.ok) {
        const updated = await response.json();
        setSubmissions((prev) => prev.map((s) => (s.id === id ? updated : s)));
      }
    } catch (err) {
      alert("Erreur lors de la mise à jour sur MockAPI");
    }
  }

  // 3. SUPPRESSION (DELETE)
  async function handleDelete(id) {
    if (!window.confirm("Supprimer définitivement ce message du Cloud ?"))
      return;
    try {
      const response = await fetch(`${MOCK_API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      alert("Erreur lors de la suppression sur le serveur");
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FaInbox className="text-blue-600" /> Messagerie Cloud
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gérez vos prospects en temps réel.
          </p>
        </div>
        <div className="text-sm font-medium bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
          Total :{" "}
          <span className="text-blue-600 font-bold">{submissions.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
                  Expéditeur
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
                  Message
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">
                  Statut
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {submissions.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <FaUser className="text-blue-400 text-[10px]" />
                        {s.name || s.nom || "Anonyme"}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                        <FaEnvelope className="text-gray-300 text-[10px]" />{" "}
                        {s.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 line-clamp-1 italic">
                      "{s.message}"
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-gray-400 font-mono">
                        {s.createdAt
                          ? new Date(s.createdAt).toLocaleDateString()
                          : "Date inconnue"}
                      </span>
                      {(s.priority || s.priorité) && (
                        <span
                          className={`flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            s.priority === "haute" || s.priorité === "haute"
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <FaCircle size={6} /> {s.priority || s.priorité}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={s.status || "new"}
                      onChange={(e) => handleChangeStatus(s.id, e.target.value)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-full border focus:outline-none cursor-pointer ${getStatusStyle(
                        s.status || "new"
                      )}`}
                    >
                      <option value="new">Nouveau</option>
                      <option value="in-progress">En cours</option>
                      <option value="done">Traité</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-2 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {submissions.length === 0 && !loading && (
          <div className="py-20 text-center text-gray-400 italic">
            Aucun message trouvé.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFormSubmissions;
