import { useState } from "react";
import { chatSeed } from "../data/mock.js";
import "./AiChatPanel.css";

export default function AiChatPanel() {
  const [messages, setMessages] = useState(chatSeed);
  const [draft, setDraft] = useState("");

  function send(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      {
        from: "ai",
        text: "Good question. I'm re-reading your latest panel and habit log to answer that clearly.",
      },
    ]);
    setDraft("");
  }

  return (
    <section className="chat">
      <header className="chat-head">
        <span className="chat-avatar">✚</span>
        <div>
          <strong>MedAI Assistant</strong>
          <span>Always active &amp; HIPAA secure</span>
        </div>
      </header>

      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`bubble bubble--${message.from}`}>
            {message.text}
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={send}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask anything about your health..."
        />
        <button type="submit" aria-label="Send">
          ➤
        </button>
      </form>
    </section>
  );
}
