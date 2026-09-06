import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaCheckCircle,
  FaPaperPlane,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { sendEmail } from "../../emailService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const FORM_SUBMISSIONS_URL = `${API_URL}/formSubmissions`;

const ContactForm = () => {
  const [formValid, setFormValid] = useState({
    nom: false,
    email: false,
    message: false,
    priorité: true,
    send: false,
    sended: false,
    sending: false,
  });

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    tel: "",
    message: "",
    priorité: "moyenne",
    sujet: "",
  });

  const [touched, setTouched] = useState({
    nom: false,
    email: false,
    message: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validate = (data) => {
    const isNomValid = data.nom.trim().length >= 3;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    const isMessageValid = data.message.trim().length >= 10;

    return {
      nom: isNomValid,
      email: isEmailValid,
      message: isMessageValid,
      all: isNomValid && isEmailValid && isMessageValid,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    const checks = validate(newFormData);
    setFormValid((prev) => ({
      ...prev,
      nom: checks.nom,
      email: checks.email,
      message: checks.message,
      send: checks.all,
    }));
  };

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const checks = validate(formData);
    if (!checks.all) {
      // focus on first invalid field and announce
      if (!checks.nom) {
        document.getElementById("nom")?.focus();
      } else if (!checks.email) {
        document.getElementById("email")?.focus();
      } else if (!checks.message) {
        document.getElementById("message")?.focus();
      }
      return;
    }

    setFormValid((prev) => ({ ...prev, sending: true }));

    try {
      // 1. Sauvegarde locale pour l'affichage dans l'espace administrateur
      const response = await fetch(FORM_SUBMISSIONS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          tel: formData.tel,
          message: formData.message,
          priorité: formData.priorité,
          createdAt: new Date().toISOString(),
          status: "new",
        }),
      });

      if (!response.ok) throw new Error(`Erreur API (${response.status})`);

      // 2. Envoi de l'e-mail via EmailJS
      // Les noms ci-dessous doivent correspondre EXACTEMENT aux variables
      // {{nom}}, {{time}}, {{email}}, {{tel}}, {{message}} utilisées dans le template EmailJS.
      const emailResult = await sendEmail({
        nom: formData.nom,
        time: new Date().toLocaleString("fr-FR"),
        email: formData.email,
        tel: formData.tel || "Non renseigné",
        message: formData.message,
      });

      if (!emailResult.success) {
        alert(
          `Message enregistré dans l'espace administrateur, mais l'e-mail n'a pas pu être envoyé. Erreur EmailJS : ${emailResult.error}`,
        );
      }

      // 3. SUCCÈS VISUEL
      setFormValid((prev) => ({
        ...prev,
        sended: true,
        sending: false,
        send: false,
      }));

      setFormData({
        nom: "",
        email: "",
        tel: "",
        message: "",
        priorité: "moyenne",
        sujet: "",
      });
      setTouched({ nom: false, email: false, message: false });

      setTimeout(() => {
        setFormValid((prev) => ({ ...prev, sended: false }));
      }, 5000);
    } catch (error) {
      console.error("Erreur critique :", error);
      setFormValid((prev) => ({ ...prev, sending: false }));
      alert("Impossible d'envoyer le message. Vérifiez votre connexion.");
    }
  };

  // Build accessible live error message when submission attempted
  const liveErrors = [];
  if (submitAttempted && !formValid.nom)
    liveErrors.push("Le nom est trop court (3 caractères minimum).");
  if (submitAttempted && !formValid.email)
    liveErrors.push("L'email semble invalide.");
  if (submitAttempted && !formValid.message)
    liveErrors.push("Le message doit contenir au moins 10 caractères.");
  const liveMessage = liveErrors.join(" ");

  return (
    <section className="bg-[var(--bg)] text-[var(--ink)] py-20 relative overflow-hidden">
      <div className="absolute -left-24 top-8 w-[420px] h-[420px] bg-gradient-to-br from-[rgba(11,109,240,0.06)] to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-0 bottom-[-60px] w-[360px] h-[360px] bg-gradient-to-tr from-[rgba(6,182,212,0.04)] to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-8 shadow-2xl">
              <h2 className="text-sm font-mono text-[var(--accent)] uppercase tracking-widest mb-2">
                Contact
              </h2>
              <h3 className="text-2xl font-display font-extrabold mb-4">
                Mortadha Hassen MASMOUDI
              </h3>
              <p className="text-[var(--ink-muted)] mb-6">
                Développeur full-stack
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-3)] flex items-center justify-center text-[var(--accent)]">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--ink-muted)] uppercase tracking-widest">
                      Téléphone
                    </p>
                    <p className="font-bold">+216 54 686 444</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-3)] flex items-center justify-center text-[var(--accent)]">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--ink-muted)] uppercase tracking-widest">
                      Email
                    </p>
                    <p className="font-bold break-all">
                      mortadhahassenmasmoudi@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-3)] flex items-center justify-center text-[var(--accent)]">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--ink-muted)] uppercase tracking-widest">
                      Localisation
                    </p>
                    <p className="font-bold">Sfax, Tunisie</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[var(--surface)] rounded-3xl p-8 md:p-10 shadow-2xl border border-[var(--line)]">
              {formValid.sended ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4">
                    <FaCheckCircle size={28} />
                  </div>
                  <h3 className="text-xl font-bold">Message envoyé</h3>
                  <p className="text-[var(--ink-muted)] mt-2">
                    Merci — je vous répondrai sous 24h.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  aria-label="Formulaire de contact premium"
                >
                  <div
                    id="form-errors-live"
                    aria-live="assertive"
                    aria-atomic="true"
                    className="sr-only"
                  >
                    {liveMessage}
                  </div>
                  <div>
                    <label
                      htmlFor="nom"
                      className="text-xs font-mono text-[var(--ink-muted)]"
                    >
                      Nom
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      value={formData.nom}
                      onChange={handleChange}
                      onBlur={() => handleBlur("nom")}
                      required
                      className="mt-2 w-full bg-transparent border border-[var(--line)] rounded-xl px-4 py-3 focus:border-[var(--accent)] outline-none transition-all"
                      aria-invalid={
                        (submitAttempted || touched.nom) && !formValid.nom
                      }
                      aria-describedby={
                        !formValid.nom && submitAttempted
                          ? "nom-error"
                          : undefined
                      }
                    />
                    {submitAttempted && !formValid.nom && (
                      <p
                        id="nom-error"
                        role="alert"
                        className="text-sm mt-2 text-[var(--danger)]"
                      >
                        Le nom doit contenir au moins 3 caractères.
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-mono text-[var(--ink-muted)]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      required
                      className="mt-2 w-full bg-transparent border border-[var(--line)] rounded-xl px-4 py-3 focus:border-[var(--accent)] outline-none transition-all"
                      aria-invalid={
                        (submitAttempted || touched.email) && !formValid.email
                      }
                      aria-describedby={
                        !formValid.email && submitAttempted
                          ? "email-error"
                          : undefined
                      }
                    />
                    {submitAttempted && !formValid.email && (
                      <p
                        id="email-error"
                        role="alert"
                        className="text-sm mt-2 text-[var(--danger)]"
                      >
                        Entrez une adresse email valide.
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="tel"
                      className="text-xs font-mono text-[var(--ink-muted)]"
                    >
                      Téléphone
                    </label>
                    <input
                      id="tel"
                      name="tel"
                      type="tel"
                      value={formData.tel}
                      onChange={handleChange}
                      className="mt-2 w-full bg-transparent border border-[var(--line)] rounded-xl px-4 py-3 focus:border-[var(--accent)] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sujet"
                      className="text-xs font-mono text-[var(--ink-muted)]"
                    >
                      Sujet
                    </label>
                    <input
                      id="sujet"
                      name="sujet"
                      type="text"
                      value={formData.sujet || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, sujet: e.target.value })
                      }
                      className="mt-2 w-full bg-transparent border border-[var(--line)] rounded-xl px-4 py-3 focus:border-[var(--accent)] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-xs font-mono text-[var(--ink-muted)]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur("message")}
                      required
                      className="mt-2 w-full bg-transparent border border-[var(--line)] rounded-xl px-4 py-3 focus:border-[var(--accent)] outline-none transition-all resize-none"
                      aria-invalid={
                        (submitAttempted || touched.message) &&
                        !formValid.message
                      }
                      aria-describedby={
                        !formValid.message && submitAttempted
                          ? "message-error"
                          : undefined
                      }
                    ></textarea>
                    {submitAttempted && !formValid.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className="text-sm mt-2 text-[var(--danger)]"
                      >
                        Le message doit contenir au moins 10 caractères.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={!formValid.send || formValid.sending}
                      className={`flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] hover:scale-[1.01] active:scale-[0.99] transition-transform ${formValid.send ? "" : "opacity-60 cursor-not-allowed"}`}
                    >
                      {formValid.sending ? "Envoi..." : "Envoyer le message"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          nom: "",
                          email: "",
                          tel: "",
                          message: "",
                          priorité: "moyenne",
                          sujet: "",
                        });
                        setTouched({
                          nom: false,
                          email: false,
                          message: false,
                        });
                        setSubmitAttempted(false);
                      }}
                      className="px-4 py-3 rounded-xl bg-[var(--surface-3)] border border-[var(--line)]"
                    >
                      Effacer
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
