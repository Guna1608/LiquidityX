import { chatFallback, chatKnowledgeBase, type ChatAction, type KnowledgeEntry } from "@/config/chatKnowledgeBase";

export type ChatReply = { text: string; actions: ChatAction[]; matchedId: string | null; source: "local" | "ai" };

/**
 * Provider contract. The local matcher ships today; an AI provider
 * (Anthropic / OpenAI / Gemini) can implement the same interface later and be
 * selected via `/api/chat` without touching UI code.
 */
export interface ChatProvider {
  id: string;
  reply(message: string, history: { role: "user" | "assistant"; text: string }[]): Promise<ChatReply>;
}

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFC")
    .replace(/[?!.,;:()"'`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function score(entry: KnowledgeEntry, text: string, tokens: Set<string>) {
  if (normalise(entry.question) === text) return 100;
  let s = 0;
  for (const kw of entry.keywords) {
    const k = normalise(kw);
    if (!k) continue;
    if (k.includes(" ")) {
      if (text.includes(k)) s += 3 + k.split(" ").length;
    } else if (tokens.has(k)) {
      s += 3;
    } else if (k.length >= 4 && text.includes(k)) {
      // partial matches, e.g. "recording" inside "recordings"
      s += 2;
    }
  }
  return s;
}

export function matchLocal(message: string): ChatReply {
  const text = normalise(message);
  const tokens = new Set(text.split(" "));
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;
  for (const entry of chatKnowledgeBase) {
    const s = score(entry, text, tokens);
    if (s > bestScore) {
      best = entry;
      bestScore = s;
    }
  }
  if (!best || bestScore < 3) {
    return { text: chatFallback.answer, actions: chatFallback.actions, matchedId: null, source: "local" };
  }
  return { text: best.answer, actions: best.actions ?? [], matchedId: best.id, source: "local" };
}

export const localProvider: ChatProvider = {
  id: "local",
  async reply(message) {
    return matchLocal(message);
  },
};

export function entryById(id: string) {
  return chatKnowledgeBase.find((e) => e.id === id) ?? null;
}
