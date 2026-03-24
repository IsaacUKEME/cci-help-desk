import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, Send, ChevronDown } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const WELCOME: Message = {
  role: "assistant",
  content:
    "👋 Welcome to CCI Help Desk! I'm here to help you find anything on our website — services, sermons, giving, events, and more. How can I assist you today? God bless you! 🙏",
};

const QUICK_PROMPTS = [
  "When are Sunday services?",
  "How do I give online?",
  "Where can I watch sermons?",
  "How do I connect with a cell group?",
];

async function streamChat(
  messages: Message[],
  onDelta: (d: string) => void,
  onDone: () => void,
  onError: (e: string) => void
) {
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/church-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || "Unable to connect to Help Desk right now.");
    return;
  }

  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let done = false;

  while (!done) {
    const { done: rd, value } = await reader.read();
    if (rd) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || !line.trim()) continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone();
}

export default function HelpDeskChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const history = messages.filter((m) => m !== WELCOME).concat(userMsg);
    let assistantSoFar = "";

    await streamChat(
      history,
      (chunk) => {
        assistantSoFar += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last !== WELCOME) {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
            );
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
      },
      () => setLoading(false),
      (err) => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `⚠️ ${err}` },
        ]);
        setLoading(false);
      }
    );
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-orange rounded-full flex items-center justify-center shadow-orange hover:scale-110 transition-transform ${
          open ? "hidden" : "flex"
        }`}
        aria-label="Open Help Desk"
      >
        <MessageCircle size={24} className="text-primary-foreground" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground rounded-full flex items-center justify-center">
          <span className="text-[9px] font-bold text-background">?</span>
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px] h-[540px] flex flex-col bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-orange px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="font-display text-sm font-bold tracking-wider text-primary-foreground">
                  CCI HELP DESK
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-primary-foreground/80 text-xs font-body">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-orange flex items-center justify-center shrink-0 mr-2 mt-1">
                    <span className="text-primary-foreground text-xs">✝</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm font-body leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-orange text-primary-foreground rounded-br-sm"
                      : "bg-church-surface text-foreground rounded-bl-sm border border-border"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-orange flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground text-xs">✝</span>
                </div>
                <div className="bg-church-surface border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-orange rounded-full chat-dot"
                      style={{ animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts (show only at start) */}
          {messages.length === 1 && !loading && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs font-body border border-orange/40 text-orange rounded-full px-3 py-1 hover:bg-orange/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 bg-church-surface rounded-xl px-3 py-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-8 h-8 bg-gradient-orange rounded-lg flex items-center justify-center disabled:opacity-40 transition-opacity"
              >
                <Send size={14} className="text-primary-foreground" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
