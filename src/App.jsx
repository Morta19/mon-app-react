import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// Public Pages
import Layout from "./Pages/Layout.jsx";
import Hero from "./components/Accueil/Hero.jsx";
import About from "./components/Accueil/About.jsx";
import Experience from "./components/Accueil/Experience.jsx";
import ContactForm from "./components/Formulaire/FormulaireG6.jsx";
import ProjectsList from "./Pages/ProjectsList.jsx";
import ProjectDetails from "./Pages/ProjectDetails.jsx";
import Skills from "./components/Skills/Skills.jsx";

// Admin & Auth
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/Dashboard.jsx";
import AdminSettings from "./admin/Settings.jsx";
import AdminFormSubmissions from "./admin/AdminFormSubmissions.jsx";
import ProjectsAdminPage from "./admin/ProjectsAdminPage.jsx"; // La version complète
import Login from "./auth/Login.jsx";
import Logout from "./auth/Logout.jsx";
import AIAgent from "./components/AIAgent.jsx";

import AdminProjects from "./admin/projects.jsx";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--ink)] font-sans px-6 text-center">
      <p className="font-mono text-xs tracking-widest text-[var(--accent)] mb-4">
        ERREUR 404
      </p>
      <h1 className="font-display text-7xl md:text-9xl font-bold text-[var(--ink)]">
        404
      </h1>
      <p className="text-[var(--ink-muted)] mb-10 mt-2">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <a
        href="/"
        className="border border-[var(--line-strong)] px-8 py-4 font-mono text-xs tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
      >
        RETOUR AU SITE
      </a>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken"),
  );

  return (
    <ThemeProvider>
      <AIAgent />
      <Routes>
        {/* --- PAGES PUBLIQUES --- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
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
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsAdminPage />} />
          <Route path="forms" element={<AdminFormSubmissions />} />
          <Route path="projets" element={<AdminProjects />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* --- 404 GLOBALE --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
