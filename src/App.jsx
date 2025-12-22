import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

// Public Pages
import Layout from "./Pages/Layout.jsx";
import Hero from "./components/Accueil/Hero.jsx";
import About from "./components/Accueil/About.jsx";
import Experience from "./components/Accueil/Experience.jsx";
import ContactForm from "./components/Formulaire/FormulaireG6.jsx";
import ProjectsList from "./Pages/ProjectsList.jsx";
import ProjectDetails from "./Pages/ProjectDetails.jsx";

// Admin & Auth
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/Dashboard.jsx";
import AdminSettings from "./admin/Settings.jsx";
import AdminFormSubmissions from "./admin/AdminFormSubmissions.jsx";
import ProjectsAdminPage from "./admin/ProjectsAdminPage.jsx"; // La version complète
import Login from "./auth/Login.jsx";
import Logout from "./auth/Logout.jsx";

import AdminProjects from "./admin/projects.jsx";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#08080a] text-white font-sans">
      <h1 className="text-9xl font-black italic text-blue-600">404</h1>
      <p className="text-xl font-bold uppercase tracking-widest text-zinc-500 mb-8">
        Page introuvable
      </p>
      <a
        href="/"
        className="bg-white text-black font-black px-8 py-4 rounded-full"
      >
        Retour au site
      </a>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  return (
    <Routes>
      {/* --- PAGES PUBLIQUES --- */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="about" element={<About />} />
        <Route path="projets" element={<Experience />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
      </Route>

      {/* --- AUTHENTIFICATION --- */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />
      <Route
        path="/logout"
        element={<Logout setIsAuthenticated={setIsAuthenticated} />}
      />

      {/* --- ROUTES ADMIN PROTÉGÉES --- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* URL: /admin */}
        <Route index element={<AdminDashboard />} />

        {/* URL: /admin/projects -> Utilise la version avec Formulaire & Table */}
        <Route path="projects" element={<ProjectsAdminPage />} />

        {/* URL: /admin/forms -> Pour voir les messages reçus */}
        <Route path="forms" element={<AdminFormSubmissions />} />
        <Route path="projets" element={<AdminProjects />} />

        {/* URL: /admin/settings -> Pour changer ton profil */}
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* --- 404 GLOBALE --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
