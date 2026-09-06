import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- important
import "./index.css";
import App from "./App.jsx";

if (!import.meta.env.VITE_API_URL) {
  console.error(
    "Configuration manquante : VITE_API_URL doit être défini dans le fichier .env.local.",
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
