import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaChevronRight, FaLock } from "react-icons/fa";
import { loginWithJson } from "../components/api/authApi.js";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await loginWithJson(email, password);
      if (token) {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        navigate(from, { replace: true });
      } else {
        throw new Error("FAIL");
      }
    } catch (err) {
      if (err?.message === "API_BASE_UNSET") {
        setError(
          "Erreur de configuration : VITE_API_URL non défini. Backend indisponible.",
        );
      } else if (
        err?.message?.toLowerCase().includes("network") ||
        err?.message === "FAIL"
      ) {
        setError("Impossible de se connecter au serveur d'authentification.");
      } else {
        setError("Identifiants invalides.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 w-[520px] h-[520px] bg-gradient-to-br from-[rgba(11,109,240,0.06)] to-[rgba(6,182,212,0.03)] rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute right-0 bottom-[-80px] w-[420px] h-[420px] bg-gradient-to-tr from-[rgba(6,182,212,0.04)] to-[rgba(11,109,240,0.02)] rounded-full blur-[90px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 lg:col-span-8 hidden md:flex items-center">
            <div className="w-full p-8 md:p-12 rounded-3xl bg-gradient-to-tr from-[rgba(11,109,240,0.04)] to-[rgba(6,182,212,0.02)] border border-white/5 backdrop-blur-sm shadow-lg">
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl font-display font-extrabold text-[var(--ink)]">
                  Espace sécurisé
                </h2>
                <p className="text-[var(--ink-muted)] max-w-xl">
                  Accédez au panneau d'administration. Connexion sécurisée via
                  identifiants.
                </p>

                <div className="relative mt-6 h-56 rounded-2xl overflow-hidden bg-[var(--surface-3)] border border-[var(--line)]">
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    viewBox="0 0 800 400"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      stroke="rgba(11,109,240,0.12)"
                      strokeWidth="1"
                    >
                      <circle cx="80" cy="80" r="60" />
                      <rect x="260" y="40" width="120" height="120" rx="12" />
                      <circle cx="600" cy="180" r="100" />
                    </g>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white shadow-xl mb-4">
                        <FaLock />
                      </div>
                      <p className="text-sm text-[var(--ink-muted)]">
                        Connexion chiffrée • Session sécurisée
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4">
            <div className="bg-[var(--surface)] rounded-3xl p-8 md:p-10 shadow-2xl border border-[var(--line)]">
              <div className="mb-6">
                <h1 className="font-display text-2xl md:text-3xl font-extrabold">
                  Connexion
                </h1>
                <p className="text-sm text-[var(--ink-muted)] mt-1">
                  Entrez vos identifiants pour accéder à l'espace
                  administrateur.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg"
                >
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                aria-label="Formulaire de connexion"
              >
                <div>
                  <label
                    htmlFor="login-email"
                    className="text-xs font-mono text-[var(--ink-muted)]"
                  >
                    Identifiant
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-2 w-full bg-transparent border border-[var(--line)] rounded-xl px-4 py-3 focus:border-[var(--accent)] focus:shadow-[0_6px_24px_rgba(11,109,240,0.12)] outline-none transition-all"
                    aria-invalid={false}
                  />
                </div>

                <div>
                  <label
                    htmlFor="login-pass"
                    className="text-xs font-mono text-[var(--ink-muted)]"
                  >
                    Mot de passe
                  </label>
                  <input
                    id="login-pass"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-2 w-full bg-transparent border border-[var(--line)] rounded-xl px-4 py-3 focus:border-[var(--accent)] focus:shadow-[0_6px_24px_rgba(11,109,240,0.12)] outline-none transition-all"
                    aria-invalid={false}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white font-black py-3 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-60"
                >
                  {loading ? "Vérification..." : "Se connecter"}
                  {!loading && <FaChevronRight />}
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-[var(--ink-muted)]">
                <Link to="/" className="hover:text-[var(--accent)]">
                  Retour au site public
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
