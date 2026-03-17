import { useState, useRef, useEffect, useCallback } from "react";
import { GoogleGenAI } from "@google/genai/web";
import "./ChatAssistant.css";

const GEORGIAN_LEARNING_SYSTEM_PROMPT = `You are a friendly, patient tutor helping users learn Georgian (Kartuli) on KartvelLingo, a Georgian language learning app. You are a master of georgian and you know all phrases and transliterations necessary. Your english equivalents to some georgian letters are: q' for ყ, ch' for ჭ, ts' for წ, ch' for ჭ, sh for შ. Your role is to:

- Answer questions about Georgian grammar, vocabulary, pronunciation, and the alphabet
- Explain Georgian letters, words, and phrases clearly with examples
- Help with translations between English and Georgian
- Give cultural context when relevant (e.g., Georgian traditions, food, greetings like "Gagimarjos")
- Keep responses concise and educational—avoid long essays unless the user asks for detail
- Use the Georgian script (ქართული მხედრული) when showing Georgian words
- Be encouraging and supportive—learning Georgian is challenging but rewarding!

When the user sends an audio recording for pronunciation practice:
- Listen carefully to what they said
- Identify which Georgian word or phrase they attempted
- Give specific feedback on their pronunciation
- Suggest improvements with phonetic guidance
- Be encouraging even when corrections are needed

If asked about something outside Georgian language learning, gently steer the conversation back or give a brief answer.`;

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
  const chatRef = useRef<ReturnType<InstanceType<typeof GoogleGenAI>["chats"]["create"]> | null>(null);
  const aiRef = useRef<InstanceType<typeof GoogleGenAI> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("API key not configured. Add VITE_GEMINI_API_KEY to your .env file.");
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey });
      aiRef.current = ai;
      chatRef.current = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: GEORGIAN_LEARNING_SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });
      setError(null);
    } catch {
      setError("Failed to initialize chat. Please check your API key.");
    }
  }, [apiKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || !chatRef.current || error) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatRef.current.sendMessage({ message: trimmed });
      const text = response.text ?? "";
      setMessages((prev) => [...prev, { role: "model", text }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
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
        await sendAudioToGemini(audioBlob);
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

  const sendAudioToGemini = async (audioBlob: Blob) => {
    if (!aiRef.current) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: "🎤 [Voice message sent]", isAudio: true }]);

    try {
      const base64 = await blobToBase64(audioBlob);

      const historyContext = messages
        .slice(-6)
        .map((m) => `${m.role === "user" ? "User" : "Tutor"}: ${m.text}`)
        .join("\n");

      const response = await aiRef.current.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: GEORGIAN_LEARNING_SYSTEM_PROMPT,
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: historyContext
                  ? `Here is our recent conversation for context:\n${historyContext}\n\nThe user just sent a voice recording. Listen to their pronunciation and give feedback. If they're attempting a Georgian word or phrase, identify what they said, evaluate their pronunciation, and suggest improvements. Be specific and encouraging.`
                  : `The user just sent a voice recording for pronunciation practice. Listen to their pronunciation and give feedback. If they're attempting a Georgian word or phrase, identify what they said, evaluate their pronunciation, and suggest improvements. Be specific and encouraging.`,
              },
              {
                inlineData: {
                  mimeType: "audio/webm",
                  data: base64,
                },
              },
            ],
          },
        ],
      });

      const text = response.text ?? "I couldn't analyze the audio. Please try again.";
      setMessages((prev) => [...prev, { role: "model", text }]);
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
                <ul>
                  <li>"How do I say hello in Georgian?"</li>
                  <li>"Explain the Georgian alphabet"</li>
                  <li>"What does Gagimarjos mean?"</li>
                </ul>
                <p className="chat-assistant-mic-hint">
                  Press the mic button to practice pronunciation!
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
              disabled={isLoading || isRecording || !!error}
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
            <button type="submit" disabled={isLoading || !input.trim() || !!error}>
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
