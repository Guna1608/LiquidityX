import { NextResponse } from "next/server";
import { localProvider, type ChatProvider } from "@/lib/chat/engine";

/**
 * Chat endpoint. Today it always answers from the approved local knowledge
 * base. To add an AI model later, implement `ChatProvider` (grounded on
 * config/chatKnowledgeBase.ts) and return it from `resolveProvider` when
 * CHAT_AI_PROVIDER / CHAT_AI_API_KEY are set.
 */
function resolveProvider(): ChatProvider {
  return localProvider;
}

export async function POST(req: Request) {
  let body: { message?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const message = typeof body.message === "string" ? body.message.slice(0, 500) : "";
  if (!message.trim()) return NextResponse.json({ error: "Empty message" }, { status: 400 });
  const history = Array.isArray(body.history) ? (body.history as { role: "user" | "assistant"; text: string }[]).slice(-10) : [];
  const reply = await resolveProvider().reply(message, history);
  return NextResponse.json(reply);
}
