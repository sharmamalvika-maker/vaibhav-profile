import { readFileSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function getOpenRouterApiKey(): string | undefined {
  const fromEnv = process.env.OPENROUTER_API_KEY?.trim();
  if (fromEnv) {
    return fromEnv;
  }

  // Fallback for this workspace layout:
  // key is provided in the parent project's root `.env`.
  try {
    const envPath = path.resolve(process.cwd(), "..", ".env");
    const raw = readFileSync(envPath, "utf8");
    const match = raw.match(/^\s*OPENROUTER_API_KEY\s*=\s*(.+)\s*$/m);
    if (!match) {
      return undefined;
    }
    return match[1].trim().replace(/^['"]|['"]$/g, "");
  } catch {
    return undefined;
  }
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }
        if (
          part &&
          typeof part === "object" &&
          "text" in part &&
          typeof (part as { text?: unknown }).text === "string"
        ) {
          return (part as { text: string }).text;
        }
        return "";
      })
      .join("\n")
      .trim();
  }
  return "";
}

const digitalTwinSystemPrompt = `You are the professional digital twin of Vaibhav Gupta.
You answer as a concise, articulate career guide based ONLY on the profile below.
If information is not present, say so clearly and suggest asking Vaibhav directly.
Do not invent companies, dates, or achievements.
Keep answers helpful, professional, and crisp.
Use plain ASCII punctuation and standard hyphen bullets when listing points.

Profile facts:
- Name: Vaibhav Gupta
- Role: Site Reliability Engineer at Google (Software Engineer III, SRE)
- Location: New York, United States
- Previous: Meta (Facebook) Software Engineer, London
- Google tenure: roles in Dublin and New York; led reliability/platform efforts
- Key work:
  - Trusted pipeline for Google corporate containers with provenance and isolation
  - Rollout framework enforcement across corporate clusters (thousands of VMs)
  - VM provisioning platform using Kubernetes, Anthos Bare Metal, KubeVirt (thousands of workloads)
- Research:
  - Reinforcement learning and transfer learning collaborations (IIIT-H, IIT Madras)
  - Publications in top venues (AAMAS, AAAI context from profile)
- Leadership & mentoring:
  - Mentored Googlers in SRE best practices
  - Teaching assistant and student leadership roles at IIIT Hyderabad
  - Google Summer of Code mentor/contributor
- Education:
  - B.Tech + M.S. in Computer Science and Engineering, IIIT Hyderabad (2015-2020)
- Skills:
  - C++, C, Python, Go, JavaScript, Kubernetes, Linux, distributed systems`;

export async function POST(req: Request) {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OpenRouter API key not found. Set OPENROUTER_API_KEY in vaibhav-site/.env.local or parent .env.",
      },
      { status: 500 },
    );
  }

  let body: { messages?: OpenRouterMessage[] };
  try {
    body = (await req.json()) as { messages?: OpenRouterMessage[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const safeMessages = incoming
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-12);

  if (safeMessages.length === 0) {
    return NextResponse.json(
      { error: "Please provide at least one message." },
      { status: 400 },
    );
  }

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Vaibhav Digital Twin",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:free",
      messages: [
        { role: "system", content: digitalTwinSystemPrompt },
        ...safeMessages,
      ],
      temperature: 0.4,
    }),
  });

  if (!upstream.ok) {
    const errorText = await upstream.text();
    return NextResponse.json(
      { error: `OpenRouter error (${upstream.status}): ${errorText}` },
      { status: 502 },
    );
  }

  const data = (await upstream.json()) as {
    choices?: Array<{ message?: { content?: unknown } }>;
  };

  const assistantText = extractTextContent(data.choices?.[0]?.message?.content);
  if (!assistantText) {
    return NextResponse.json(
      { error: "No response content from model." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reply: assistantText });
}
