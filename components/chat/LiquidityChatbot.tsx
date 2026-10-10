"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { answerOf, chatGreeting, type ChatAction } from "@/config/chatKnowledgeBase";
import { entryById, matchLocal, type ChatReply } from "@/lib/chat/engine";
import { Chat, Close, Send, WhatsApp } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { QuickQuestions } from "./QuickQuestions";

type Msg = { id: number; role: "user" | "assistant"; text: string; actions?: ChatAction[] };

async function ask(message: string, history: Msg[]): Promise<ChatReply> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history.map((m) => ({ role: m.role, text: m.text })) }),
    });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as ChatReply;
  } catch {
    return matchLocal(message); // offline / API unavailable → local knowledge base
  }
}

export function LiquidityChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, role: "assistant", text: chatGreeting }]);
  const [asked, setAsked] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const seq = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const push = useCallback((m: Omit<Msg, "id">) => setMessages((prev) => [...prev, { ...m, id: seq.current++ }]), []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // lets the floating WhatsApp button step aside while the panel is open
  useEffect(() => {
    document.documentElement.toggleAttribute("data-chat-open", open);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const respond = async (text: string, presetId?: string) => {
    push({ role: "user", text });
    setTyping(true);
    const started = Date.now();
    let reply: ChatReply;
    const preset = presetId ? entryById(presetId) : null;
    if (preset) reply = { text: answerOf(preset), actions: preset.actions ?? [], matchedId: preset.id, source: "local" };
    else reply = await ask(text, messages);
    const wait = Math.max(0, 450 - (Date.now() - started));
    setTimeout(() => {
      setTyping(false);
      push({ role: "assistant", text: reply.text, actions: reply.actions });
      if (reply.matchedId) setAsked((a) => (a.includes(reply.matchedId!) ? a : [...a, reply.matchedId!]));
    }, wait);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    void respond(text);
  };

  return (
    <>
      <div className="fixed bottom-[5.4rem] right-3 z-[72] md:bottom-6 md:right-6">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close LiquidityX Assistant" : "Ask LiquidityX — open assistant"}
          className="group peer relative grid size-12 place-items-center md:size-14 rounded-full border border-gold-400/40 bg-[radial-gradient(circle_at_30%_25%,#1b2029,#07090d_70%)] shadow-[0_20px_60px_-15px_rgba(139,92,246,0.45)] transition-transform duration-500 ease-[var(--ease-expo)] hover:scale-105"
        >
          {!open && (
            <>
              <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full border border-gold-300/60" />
              <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan-300/40 [animation-delay:1.3s]" />
            </>
          )}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <Close size={20} className="text-gold-200" />
              </motion.span>
            ) : (
              <motion.span key="lx" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
                <Chat size={26} className="text-gold-200" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        {!open && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-white/10 bg-ink/90 px-3 py-1.5 text-[12px] font-medium text-gold-200 opacity-0 backdrop-blur transition-all duration-300 peer-hover:translate-x-0 peer-hover:opacity-100 peer-focus-visible:translate-x-0 peer-focus-visible:opacity-100 md:block"
          >
            Ask LiquidityX
          </span>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="LiquidityX Assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "100% 100%" }}
            className="panel-blur fixed inset-x-3 bottom-[9.5rem] z-[85] flex max-h-[min(72dvh,640px)] flex-col overflow-hidden rounded-3xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)] md:inset-x-auto md:bottom-24 md:right-6 md:w-[392px]"
            data-lenis-prevent
          >
            <div className="relative flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
              <div className="grid size-10 place-items-center rounded-full border border-gold-400/30 bg-ink">
                <Chat size={20} className="text-gold-200" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-[0.95rem] font-medium text-bone">LiquidityX Assistant</p>
                <p className="text-xs text-mist">How can we help?</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="ml-auto grid size-9 place-items-center rounded-full text-mist hover:bg-white/5 hover:text-bone"
              >
                <Close size={16} />
              </button>
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
            </div>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite" aria-relevant="additions">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.86rem] leading-relaxed",
                      m.role === "user" ? "rounded-br-md bg-gold-300/90 text-ink" : "rounded-bl-md border border-white/[0.07] bg-white/[0.03] text-bone",
                    )}
                  >
                    <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
                    {m.text}
                    {!!m.actions?.length && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.actions.map((a) =>
                          a.kind === "link" ? (
                            <Link
                              key={a.href}
                              href={a.href}
                              onClick={() => setOpen(false)}
                              className="rounded-full border border-gold-400/40 px-3 py-1 text-xs text-gold-200 hover:bg-gold-400/10"
                            >
                              {a.label}
                            </Link>
                          ) : (
                            <a
                              key={a.href}
                              href={a.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-gold-300 px-3 py-1 text-xs font-medium text-ink hover:bg-gold-200"
                            >
                              {a.kind === "whatsapp" && <WhatsApp size={13} />}
                              {a.label}
                            </a>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-1.5 px-1" aria-label="Assistant is typing">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-1.5 animate-blink rounded-full bg-gold-300" style={{ animationDelay: `${i * 0.18}s` }} />
                  ))}
                </div>
              )}
              <QuickQuestions exclude={asked} onPick={(id, q) => !typing && void respond(q, id)} />
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/[0.07] p-3">
              <label htmlFor={`${panelId}-input`} className="sr-only">
                Ask a question
              </label>
              <input
                id={`${panelId}-input`}
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                maxLength={500}
                autoComplete="off"
                className="h-11 min-w-0 flex-1 rounded-full border border-white/10 bg-ink/60 px-4 text-sm text-bone placeholder:text-smoke focus:border-gold-400/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim() || typing}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-300 text-ink transition-opacity disabled:opacity-40"
              >
                <Send size={17} />
              </button>
            </form>
            <p className="px-5 pb-3 text-[0.62rem] leading-snug text-smoke">Automated answers from approved LiquidityX course information. For anything else, message us on WhatsApp. Educational only — not financial advice.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
