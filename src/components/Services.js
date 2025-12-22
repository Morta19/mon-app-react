
const sendEmail = async (formData) => {
  try {
    const response = await fetch("https://formspree.io/f/votre_form_id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      return { success: true, message: "Email envoyé" };
    } else {
      return { success: false, message: "Erreur d'envoi" };
    }
  } catch (error) {
    return { success: false, message: "Erreur réseau" };
  }
};
