import {
  ChatError,
  requestGroqReply,
  sanitizeConversation,
} from "./_lib/chatLogic.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Méthode non autorisée." });
  }

  if (!process.env.GROQ_API_KEY) {
    return response.status(503).json({
      error: "Le service de chat n'est pas configuré pour le moment.",
    });
  }

  try {
    const conversation = sanitizeConversation(request.body?.messages);
    const message = await requestGroqReply(
      conversation,
      process.env.GROQ_API_KEY,
    );
    return response.status(200).json({ message });
  } catch (error) {
    if (error instanceof ChatError) {
      return response.status(error.statusCode).json({ error: error.message });
    }

    console.error("Chat API error:", error);
    return response.status(500).json({
      error: "Une erreur réseau est survenue. Réessayez dans un instant.",
    });
  }
}
