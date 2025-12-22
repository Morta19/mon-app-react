// // src/api/axios.js
// import axios from "axios";
// const api = axios.create({
// baseURL: "https://reqres.in/api", // ou ton backend: "http://localhost:5000/api"
// headers: {
// "Content-Type": "application/json",
// "x-api-key": "reqres_ca9b10808a2342e9b2ca52cd2f674651",
// },
// });
// // Intercepteur pour ajouter le token si tu utilises l’auth
// api.interceptors.request.use(
// (config) => {
// const token = localStorage.getItem("authToken"); // adapte à ton storage
// if (token) {
// config.headers.Authorization =

// `Bearer ${token}`
// ;

// }
// return config;
// },
// (error) => Promise.reject(error)
// );
// // Intercepteur de réponse (gestion globale des erreurs / 401, etc.)
// api.interceptors.response.use(
// (response) => response,
// (error) => {
// if (error.response && error.response.status === 401) {
// // ex: rediriger vers /login ou nettoyer le storage
// // localStorage.removeItem("authToken");
// }
// return Promise.reject(error);
// }
// );
// export default api;
// import axios from 'axios';

// const axiosClient = axios.create({
// baseURL: 'http://localhost:4000'
// ,

// headers: {
// 'Content-Type': 'application/json'
// ,

// },
// });

// export default axiosClient;
import axios from 'axios';

// Utilise la variable d'environnement définie dans .env.local
// Si la variable n'existe pas (ex: en local), on utilise l'URL par défaut
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;