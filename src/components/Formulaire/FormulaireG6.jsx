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
import { createFormSubmission } from "../api/formSubmissionsApi.js";

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

  const errorMessage = {
    nom: "Le nom doit contenir au moins 3 caractères",
    email: "Merci d'entrer un email valide",
    message: "Le message doit contenir au moins 10 caractères",
  };

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

  const verificationFormulaire = () => {
    const newValidState = {
      nom: formData.nom.length > 3,
      email: formData.email.includes("@") && formData.email.includes("."),
      message: formData.message.length > 10,
      priorité: true,
    };

    const allValid =
      newValidState.nom && newValidState.email && newValidState.message;

    setFormValid({
      ...formValid,
      ...newValidState,
      send: allValid,
    });

    return allValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (touched[e.target.name]) {
      setTimeout(() => verificationFormulaire(), 100);
    }
  };

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    verificationFormulaire();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationFormulaire()) return;
    await createFormSubmission({
      ...formData,
      createdAt: new Date().toISOString(),
      status: "new", // new | in-progress | done
    });

    setFormValid({ ...formValid, sending: true });

    try {
      await sendEmail({
        from_name: formData.nom,
        reply_to: formData.email,
        message: formData.message,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFormValid({ ...formValid, sended: true, sending: false });

      setFormData({ nom: "", email: "", message: "", priorité: "moyenne" });
      setTouched({ nom: false, email: false, message: false });

      setTimeout(() => {
        setFormValid((prev) => ({ ...prev, sended: false, send: false }));
      }, 5000);
    } catch (error) {
      setFormValid({ ...formValid, sending: false });
    }
  };

  return (
    <section className="bg-[#08080a] text-white py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
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
          {/* --- CONTACT INFO (Side) --- */}
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

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-800 hidden md:block">
              <p className="text-white/80 italic leading-relaxed">
                "Toujours à la recherche de nouveaux défis techniques et de
                collaborations innovantes."
              </p>
            </div>
          </div>

          {/* --- FORM CONTAINER --- */}
          <div className="lg:col-span-8 bg-zinc-900/30 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative">
            {/* Success Overlay */}
            {formValid.sended && (
              <div className="absolute inset-0 bg-[#08080a]/90 z-50 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6 animate-bounce">
                  <FaCheckCircle />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">
                  Message Envoyé !
                </h3>
                <p className="text-zinc-400">
                  Merci {formData.nom}, je vous répondrai sous 24h.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Nom */}
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

                {/* Email */}
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

              {/* Message */}
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

              {/* Priorité Style Custom */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-500">Priorité :</span>
                  <select
                    name="priorité"
                    onChange={handleChange}
                    className="bg-zinc-800 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none cursor-pointer hover:bg-zinc-700 transition"
                  >
                    <option value="moyenne">Normal</option>
                    <option value="haute">Urgent ⚡</option>
                    <option value="basse">Plus tard</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!formValid.send || formValid.sending}
                  className={`relative group px-12 py-4 rounded-full font-bold overflow-hidden transition-all ${
                    formValid.send && !formValid.sending
                      ? "bg-white text-black hover:pr-14 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {formValid.sending ? "Transmission..." : "Envoyer"}
                    {!formValid.sending && (
                      <FaPaperPlane className="text-xs group-hover:translate-x-2 transition-transform" />
                    )}
                  </span>
                  {formValid.sending && (
                    <div className="absolute inset-0 bg-blue-600 animate-pulse"></div>
                  )}
                </button>
              </div>

              {/* Erreurs discrètes */}
              {(touched.nom && !formValid.nom) ||
              (touched.email && !formValid.email) ||
              (touched.message && !formValid.message) ? (
                <div className="flex items-center gap-2 text-red-400 text-xs font-medium animate-pulse">
                  <FaExclamationTriangle />
                  <span>Veuillez vérifier les champs surlignés en rouge.</span>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
