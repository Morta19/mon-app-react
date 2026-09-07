import { useEffect, useRef, useState } from "react";
import "./AIAgent.css";

const initialMessage = {
  role: "assistant",
  content:
    "Bonjour, je suis l'agent AI de Mortadha. Je peux vous renseigner sur son parcours, ses compétences et ses projets.",
};

function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages, isLoading]);

  async function handleSubmit(event) {
    event.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(data.error || "Le service AI est indisponible.");
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: error.message, isError: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside className="ai-agent" aria-label="Assistant AI du portfolio">
      {isOpen && (
        <section
          className="ai-agent__panel"
          aria-label="Conversation avec l'assistant"
        >
          <header className="ai-agent__header">
            <div>
              <p className="ai-agent__eyebrow">PORTFOLIO AI</p>
              <h2 className="ai-agent__title">Assistant de Mortadha</h2>
            </div>
            <button
              className="ai-agent__close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chat"
            >
              ×
            </button>
          </header>

          <div className="ai-agent__messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                className={`ai-agent__message ai-agent__message--${message.role}${message.isError ? " ai-agent__message--error" : ""}`}
                key={`${message.role}-${index}`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="ai-agent__loading">
                L'assistant prépare sa réponse
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-agent__form" onSubmit={handleSubmit}>
            <input
              className="ai-agent__input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Posez votre question..."
              aria-label="Votre message"
              maxLength={2000}
              disabled={isLoading}
            />
            <button
              className="ai-agent__send"
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Envoyer le message"
            >
              Envoyer
            </button>
          </form>
        </section>
      )}

      <button
        className="ai-agent__toggle"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fermer l'assistant AI" : "Ouvrir l'assistant AI"}
      >
        <span className="ai-agent__toggle-icon" aria-hidden="true">
          ✦
        </span>
        {isOpen ? "Fermer" : "Parler à mon AI"}
      </button>
    </aside>
  );
}

export default AIAgent;
