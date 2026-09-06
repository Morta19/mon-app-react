import emailjs from "@emailjs/browser";

export const sendEmail = async (formData) => {
	try {
		await emailjs.send(
			"service_en63a3t",
			"template_j0izl5l",
			formData,
			"Z6IUcPuN7KMKnhCV7",
		);
		return { success: true };
	} catch (error) {
		console.error("Erreur EmailJS:", error);
		const status = error?.status;
		return {
			success: false,
			status,
			error: error?.text || error?.message || "Erreur EmailJS inconnue",
		};
	}
};