// On définit la clé unique pour le stockage dans le navigateur
const STORAGE_KEY = 'local_submissions';

// Fonction utilitaire pour lire les données
const readLocal = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Fonction utilitaire pour écrire les données
const writeLocal = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export async function createFormSubmission(payload) {
  const submissions = readLocal();
  
  const newEntry = {
    id: Date.now().toString(), // Génère un ID unique
    nom: payload.nom || payload.fullName || payload.name, 
    email: payload.email,
    message: payload.message,
    priorité: payload.priorité || "moyenne",
    status: "new",
    createdAt: new Date().toISOString()
  };

  const updated = [newEntry, ...submissions];
  writeLocal(updated);
  return newEntry;
}

export async function getFormSubmissions() {
  // Simule un petit délai réseau pour garder l'effet de chargement (optionnel)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(readLocal());
    }, 300);
  });
}

export async function updateFormSubmission(id, payload) {
  const submissions = readLocal();
  const index = submissions.findIndex(s => s.id === id.toString());
  
  if (index !== -1) {
    submissions[index] = { ...submissions[index], ...payload };
    writeLocal(submissions);
    return submissions[index];
  }
  throw new Error("Message non trouvé");
}

export async function deleteFormSubmission(id) {
  const submissions = readLocal();
  const filtered = submissions.filter(s => s.id !== id.toString());
  writeLocal(filtered);
  return true;
}