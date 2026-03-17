import { useState, useRef, useEffect, useCallback } from "react";
import "./ChatAssistant.css";

type Message = {
  role: "user" | "model";
  text: string;
  isAudio?: boolean;
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setInput("");
    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      setMessages((prev) => [...prev, { role: "model", text: `Sorry, I couldn't respond: ${msg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await sendAudio(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      setError("Microphone access denied. Please allow microphone permission.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const sendAudio = async (audioBlob: Blob) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: "🎤 [Voice message sent]", isAudio: true }]);

    try {
      const base64 = await blobToBase64(audioBlob);

      const res = await fetch("/api/chat-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio: base64,
          mimeType: "audio/webm",
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to process audio.";
      setError(msg);
      setMessages((prev) => [...prev, { role: "model", text: `Sorry, I couldn't analyze your pronunciation: ${msg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="chat-assistant-toggle"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open learning assistant"}
        title="Learning Assistant"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chat-assistant-panel">
          <div className="chat-assistant-header">
            <h3>Georgian Learning Assistant</h3>
            <p className="chat-assistant-subtitle">Ask me anything or practice pronunciation!</p>
          </div>

          <div className="chat-assistant-messages">
            {messages.length === 0 && !error && (
              <div className="chat-assistant-welcome">
                <p>გამარჯობა! (Hello!)</p>
                <p>I'm here to help you learn Georgian. Try:</p>
                <div className="chat-suggestion-pills">
                  {[
                    "How do I say hello in Georgian?",
                    "Explain the Georgian alphabet",
                    "What does Gagimarjos mean?",
                    "Teach me Georgian greetings",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      className="chat-suggestion-pill"
                      onClick={() => setInput(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <p className="chat-assistant-mic-hint">
                  🎤 Press the mic button to practice pronunciation!
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-message chat-message-${m.role}${m.isAudio ? " chat-message-audio" : ""}`}
              >
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message chat-message-model chat-message-loading">
                {isRecording ? "Recording..." : "Thinking..."}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && !isLoading && (
            <div className="chat-assistant-error">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="chat-assistant-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRecording ? "Recording..." : "Ask about Georgian..."}
              disabled={isLoading || isRecording}
              autoComplete="off"
            />
            <button
              type="button"
              className={`chat-mic-btn${isRecording ? " recording" : ""}`}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading && !isRecording}
              title={isRecording ? "Stop recording" : "Record pronunciation"}
              aria-label={isRecording ? "Stop recording" : "Record pronunciation"}
            >
              {isRecording ? "⏹" : "🎤"}
            </button>
            <button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
