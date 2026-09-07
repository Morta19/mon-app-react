export const MODEL = "openai/gpt-oss-120b";
export const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
export const GROQ_TIMEOUT_MS = 25000;

export const SYSTEM_PROMPT = `Tu es l'agent conversationnel du portfolio de Mortadha Hassen Masmoudi. Réponds en français, de façon concise, professionnelle et chaleureuse.

Contexte vérifié du profil :
- Mortadha Hassen Masmoudi est développeur full-stack.
- Il prépare une licence en génie logiciel, prévue en 2026.
- Ses expériences incluent Linio.io et BACAD Consulting.
- Ses compétences couvrent Python/Flask, Java/Spring Boot, C#/.NET Core MVC, JavaScript, React.js, Vue.js, Dart/Flutter, HTML/CSS, SQL, Playwright et Selenium.
- Il a travaillé sur un projet de détection avec YOLOv8 pour des plateformes Smart City.

Réponds uniquement à partir de ce contexte et des informations présentes dans les messages. Ne fabrique pas de dates, de responsabilités, de résultats ou de coordonnées. Si une information manque, dis-le clairement et invite le visiteur à utiliser la page Contact. Tu peux expliquer les technologies et relier les compétences aux projets, mais ne prétends pas être Mortadha.`;

export class ChatError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "ChatError";
    this.statusCode = statusCode;
  }
}

export function sanitizeConversation(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new ChatError(400, "Aucun message reçu.");
  }

  const conversation = messages
    .filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string",
    )
    .slice(-12)
    .map(({ role, content }) => ({
      role,
      content: content.trim().slice(0, 2000),
    }));

  if (!conversation.some((message) => message.role === "user")) {
    throw new ChatError(400, "Aucun message utilisateur reçu.");
  }

  return conversation;
}

export async function requestGroqReply(conversation, apiKey) {
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), GROQ_TIMEOUT_MS);

  let groqResponse;
  try {
    groqResponse = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 500,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...conversation],
      }),
      signal: abortController.signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new ChatError(
        504,
        "La réponse prend trop de temps. Réessayez dans un instant.",
      );
    }
    console.error("Groq réseau erreur:", error);
    throw new ChatError(
      500,
      "Une erreur réseau est survenue. Réessayez dans un instant.",
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!groqResponse.ok) {
    console.error("Groq API error:", groqResponse.status);
    throw new ChatError(
      502,
      "Le service AI est momentanément indisponible. Réessayez dans un instant.",
    );
  }

  const data = await groqResponse.json();
  const message = data.choices?.[0]?.message?.content;
  if (!message) {
    throw new ChatError(502, "La réponse AI est vide. Réessayez.");
  }

  return message;
}
