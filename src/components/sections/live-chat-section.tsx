"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Send, Square } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { SectionShell } from "@/components/layout/section-shell";
import { chatSuggestions } from "@/content/chat-profile";
import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const initialMessages: UIMessage[] = [
	{
		id: "boot",
		role: "assistant",
		parts: [
			{
				type: "text",
				text: "Ask me about frontend architecture, real-time UI, Next.js/React work, DDD boundaries, the WebGL lab, or whether I fit a graphics-heavy product team.",
			},
		],
	},
];

export function LiveChatSection() {
	const transport = useMemo(
		() => new DefaultChatTransport({ api: "/api/chat" }),
		[],
	);
	const [input, setInput] = useState("");
	const { messages, sendMessage, status, error, stop } = useChat({
		transport,
		messages: initialMessages,
		experimental_throttle: 60,
	});
	const busy = status === "submitted" || status === "streaming";

	const submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const text = input.trim();
		if (!text || busy) return;
		setInput("");
		await sendMessage({ text });
	};

	const sendSuggestion = async (text: string) => {
		if (busy) return;
		await sendMessage({ text });
	};

	return (
		<SectionShell
			id="chat"
			eyebrow="// Sector 09 // Live Chat Interface"
			code="TERM_AI"
			title={
				<>
					Ask the portfolio.{" "}
					<span className="text-primary text-glow">Answers like me</span>.
				</>
			}
			subtitle="Prepared for OpenAI-backed live chat through Vercel AI SDK. The prompt is grounded in portfolio content and tuned to answer in my voice without overstating experience."
			scanLabel="AI Boundary"
		>
			<div className="corner-brackets scan-target relative overflow-hidden border border-primary/25 bg-background/80 shadow-[0_24px_100px_rgb(0_0_0/0.32)] backdrop-blur">
				<div className="flex items-center justify-between border-b border-border/70 bg-card/80 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
					<div className="flex items-center gap-2">
						<span className="size-3 rounded-full bg-[#ff3b4f]" />
						<span className="size-3 rounded-full bg-secondary" />
						<span className="size-3 rounded-full bg-primary" />
					</div>
					<span className="hidden text-secondary sm:inline">
						~/giorgi/live-profile-chat.ts
					</span>
					<span>UTF-8 / AI SDK</span>
				</div>

				<div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
					<aside className="border-b border-border/60 p-5 font-mono text-xs leading-7 text-muted-foreground lg:border-b-0 lg:border-r">
						<p className="text-primary">&gt; cat chat-readme.md</p>
						<div className="mt-6 space-y-5">
							<div>
								<p className="text-foreground"># Live profile terminal</p>
								<p className="mt-3">
									This is ready for an OpenAI route. It answers from a
									server-side prompt built around my portfolio content, contact
									links, code sample, and honesty boundaries.
								</p>
							</div>
							<ul className="space-y-2">
								<li>[1] First-person answers.</li>
								<li>[2] No invented background.</li>
								<li>[3] Three.js framed as focused lab work.</li>
								<li>[4] Contact and code links available.</li>
							</ul>
							<div className="space-y-1 pt-2">
								<p>-&gt; {profile.email}</p>
								<p>-&gt; github.com/geo318</p>
								<p>-&gt; linkedin.com/in/giorgi-lomidze-7569742bb</p>
							</div>
						</div>
					</aside>

					<div className="flex min-h-[34rem] flex-col">
						<div className="flex items-center justify-between border-b border-border/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
							<span className="text-primary">OpenAI Live Chat</span>
							<span
								className={cn(
									"inline-flex items-center gap-2",
									error ? "text-[#ff3b4f]" : "text-secondary",
								)}
							>
								<span className="size-2 rounded-full bg-current" />
								{error ? "Needs Server Key" : busy ? "Streaming" : "Ready"}
							</span>
						</div>

						<div className="flex-1 space-y-4 overflow-y-auto p-5">
							{messages.map((message) => (
								<ChatBubble key={message.id} message={message} />
							))}
							{error ? (
								<div className="border border-[#ff3b4f]/40 bg-[#ff3b4f]/8 p-3 font-mono text-xs leading-6 text-muted-foreground">
									Add <span className="text-foreground">OPENAI_API_KEY</span> to
									enable live responses. Optional: set{" "}
									<span className="text-foreground">OPENAI_CHAT_MODEL</span>.
								</div>
							) : null}
						</div>

						<div className="border-t border-border/60 p-4">
							<div className="mb-3 flex flex-wrap gap-2">
								{chatSuggestions.map((suggestion) => (
									<button
										key={suggestion}
										type="button"
										onClick={() => sendSuggestion(suggestion)}
										disabled={busy}
										className="border border-border/70 bg-background/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition hover:border-secondary/60 hover:text-secondary disabled:cursor-not-allowed disabled:opacity-45"
									>
										{suggestion}
									</button>
								))}
							</div>
							<form onSubmit={submit} className="flex gap-2">
								<input
									value={input}
									onChange={(event) => setInput(event.target.value)}
									placeholder="Ask about Giorgi's work..."
									className="min-w-0 flex-1 border border-border bg-background/80 px-3 py-3 font-mono text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
								/>
								<button
									type={busy ? "button" : "submit"}
									onClick={busy ? stop : undefined}
									className="inline-flex min-w-12 items-center justify-center border border-primary/55 bg-primary/10 px-4 text-primary transition hover:bg-primary/18"
									aria-label={busy ? "Stop response" : "Send message"}
								>
									{busy ? (
										<Square className="size-4" aria-hidden="true" />
									) : (
										<Send className="size-4" aria-hidden="true" />
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</SectionShell>
	);
}

function ChatBubble({ message }: { message: UIMessage }) {
	const mine = message.role === "user";
	const text = message.parts
		.filter((part) => part.type === "text")
		.map((part) => part.text)
		.join("");

	return (
		<div className={cn("flex", mine ? "justify-end" : "justify-start")}>
			<div
				className={cn(
					"max-w-[min(42rem,92%)] border px-4 py-3 text-sm leading-7",
					mine
						? "border-secondary/45 bg-secondary/10 text-foreground"
						: "border-primary/35 bg-card/70 text-muted-foreground",
				)}
			>
				<div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em]">
					{mine ? "Visitor" : "Giorgi_AI"}
				</div>
				<p className="whitespace-pre-wrap">{text}</p>
			</div>
		</div>
	);
}
