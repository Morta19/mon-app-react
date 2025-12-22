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
import { createFormSubmission } from "../api/formSubmissionsApi"; // Import de l'API locale

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
    message: "",
    priorité: "moyenne",
  });

  const [touched, setTouched] = useState({
    nom: false,
    email: false,
    message: false,
  });

  // Fonction de validation simplifiée
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

    // Mise à jour temps réel de l'état du bouton d'envoi
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

    const checks = validate(formData);
    if (!checks.all) return;

    setFormValid((prev) => ({ ...prev, sending: true }));

    try {
      // 1. Sauvegarde locale (Remplace MockAPI)
      await createFormSubmission(formData);

      // 2. Envoi de l'email via EmailJS
      try {
        await sendEmail({
          from_name: formData.nom,
          reply_to: formData.email,
          message: formData.message,
          priority: formData.priorité,
        });
      } catch (emailErr) {
        console.warn(
          "EmailJS non configuré ou erreur, mais message sauvé localement."
        );
      }

      // 3. Effet visuel de succès
      setFormValid((prev) => ({
        ...prev,
        sended: true,
        sending: false,
        send: false,
      }));

      // Réinitialisation du formulaire
      setFormData({ nom: "", email: "", message: "", priorité: "moyenne" });
      setTouched({ nom: false, email: false, message: false });

      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setFormValid((prev) => ({ ...prev, sended: false }));
      }, 5000);
    } catch (error) {
      console.error("Erreur critique :", error);
      setFormValid((prev) => ({ ...prev, sending: false }));
      alert("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  return (
    <section className="bg-[#08080a] text-white py-24 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.4em] mb-4">
            Connectons-nous
          </h2>
          <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter">
            DISCUTONS DE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              VOTRE PROJET.
            </span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Sidebar Infos */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
              <h4 className="text-xl font-bold mb-8 italic">
                Informations de contact
              </h4>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">
                      Email
                    </p>
                    <p className="text-sm font-medium">
                      mortadhahassenmasmoudi@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">
                      Téléphone
                    </p>
                    <p className="text-sm font-medium">+216 54 686 444</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">
                      Localisation
                    </p>
                    <p className="text-sm font-medium">Sfax, Tunisie</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-8 bg-zinc-900/30 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative">
            {formValid.sended && (
              <div className="absolute inset-0 bg-[#08080a]/95 z-50 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8">
                <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6">
                  <FaCheckCircle />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">
                  Message Envoyé !
                </h3>
                <p className="text-zinc-400">
                  Merci, je vous répondrai sous 24h.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest ml-1">
                    Nom Complet
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      onBlur={() => handleBlur("nom")}
                      className={`w-full bg-white/5 border-2 rounded-2xl px-6 py-4 outline-none transition-all ${
                        touched.nom
                          ? formValid.nom
                            ? "border-green-500/50 bg-green-500/5"
                            : "border-red-500/50 bg-red-500/5"
                          : "border-white/5 focus:border-blue-500/50"
                      }`}
                      placeholder="Ex: Jean Dupont"
                    />
                    <FaUser className="absolute right-5 top-5 text-zinc-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest ml-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      className={`w-full bg-white/5 border-2 rounded-2xl px-6 py-4 outline-none transition-all ${
                        touched.email
                          ? formValid.email
                            ? "border-green-500/50 bg-green-500/5"
                            : "border-red-500/50 bg-red-500/5"
                          : "border-white/5 focus:border-blue-500/50"
                      }`}
                      placeholder="nom@exemple.com"
                    />
                    <FaEnvelope className="absolute right-5 top-5 text-zinc-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest ml-1">
                  Votre Projet
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    rows="5"
                    className={`w-full bg-white/5 border-2 rounded-2xl px-6 py-4 outline-none transition-all resize-none ${
                      touched.message
                        ? formValid.message
                          ? "border-green-500/50 bg-green-500/5"
                          : "border-red-500/50 bg-red-500/5"
                        : "border-white/5 focus:border-blue-500/50"
                    }`}
                    placeholder="Dites-m'en plus sur vos besoins..."
                  />
                  <FaCommentDots className="absolute right-5 top-5 text-zinc-600" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-500 font-mono">
                    Priorité :
                  </span>
                  <select
                    name="priorité"
                    value={formData.priorité}
                    onChange={handleChange}
                    className="bg-[#121214] border border-white/10 rounded-xl px-4 py-2 text-sm outline-none cursor-pointer hover:border-blue-500/50 transition-colors"
                  >
                    <option value="moyenne">Normal</option>
                    <option value="haute">Urgent ⚡</option>
                    <option value="basse">Plus tard</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!formValid.send || formValid.sending}
                  className={`relative px-12 py-4 rounded-full font-bold transition-all duration-300 ${
                    formValid.send && !formValid.sending
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {formValid.sending
                      ? "Envoi en cours..."
                      : "Envoyer le message"}
                    {!formValid.sending && <FaPaperPlane className="text-xs" />}
                  </span>
                </button>
              </div>

              {/* Error Helper */}
              {((touched.nom && !formValid.nom) ||
                (touched.email && !formValid.email) ||
                (touched.message && !formValid.message)) && (
                <div className="flex items-center gap-2 text-red-400 text-xs font-medium animate-pulse">
                  <FaExclamationTriangle />
                  <span>
                    Veuillez compléter correctement tous les champs requis.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
