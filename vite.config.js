import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import {
  ChatError,
  requestGroqReply,
  sanitizeConversation,
} from "./api/_lib/chatLogic.js";

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function groqDevProxy(apiKey) {
  return {
    name: "groq-chat-dev-proxy",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        if (req.method !== "POST") {
          res.setHeader("Allow", "POST");
          return sendJson(res, 405, { error: "Méthode non autorisée." });
        }

        if (!apiKey) {
          return sendJson(res, 503, {
            error: "Le service de chat n'est pas configuré pour le moment.",
          });
        }

        let messages;
        try {
          const rawBody = await readBody(req);
          messages = JSON.parse(rawBody || "{}").messages;
        } catch {
          return sendJson(res, 400, { error: "Requête invalide." });
        }

        try {
          const conversation = sanitizeConversation(messages);
          const message = await requestGroqReply(conversation, apiKey);
          return sendJson(res, 200, { message });
        } catch (error) {
          if (error instanceof ChatError) {
            return sendJson(res, error.statusCode, { error: error.message });
          }
          console.error("Chat dev proxy error:", error);
          return sendJson(res, 500, {
            error: "Une erreur réseau est survenue. Réessayez dans un instant.",
          });
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), groqDevProxy(env.GROQ_API_KEY)],
  };
});
