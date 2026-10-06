"use client";

import { chatKnowledgeBase, quickQuestionIds } from "@/config/chatKnowledgeBase";

export function QuickQuestions({ onPick, exclude = [] }: { onPick: (id: string, question: string) => void; exclude?: string[] }) {
  const items = quickQuestionIds
    .filter((id) => !exclude.includes(id))
    .map((id) => chatKnowledgeBase.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => !!e);

  if (!items.length) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Suggested questions">
      {items.map((e) => (
        <li key={e.id}>
        <button
          type="button"
          onClick={() => onPick(e.id, e.question)}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-left text-[0.78rem] leading-snug text-mist transition-all duration-300 hover:-translate-y-px hover:border-gold-400/50 hover:text-gold-100"
        >
          {e.question}
        </button>
        </li>
      ))}
    </ul>
  );
}
