import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer le token
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);

    // Redirection vers login
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}
