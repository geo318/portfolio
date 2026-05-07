"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { LoaderCircle, Send, Square } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ScanLabel } from "@/components/layout/scan-label";
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
				text: "Ask me about my CV, Alpheya, Proxied, React/Next.js, backend/API work, public GitHub repos, or contact details.",
			},
		],
	},
];

const CHAT_CACHE_LIMIT = 24;

function normalizePrompt(value: string) {
	return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function createTextMessage(
	role: "user" | "assistant",
	text: string,
): UIMessage {
	return {
		id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
		role,
		parts: [{ type: "text", text }],
	};
}

function getMessageText(message: UIMessage) {
	return message.parts
		.filter((part) => part.type === "text")
		.map((part) => part.text)
		.join("");
}

function trimCache(cache: Map<string, string>) {
	while (cache.size > CHAT_CACHE_LIMIT) {
		const [firstKey] = cache.keys();
		if (!firstKey) return;
		cache.delete(firstKey);
	}
}

export function LiveChatSection() {
	const transport = useMemo(
		() => new DefaultChatTransport({ api: "/api/chat" }),
		[],
	);
	const [input, setInput] = useState("");
	const { messages, sendMessage, setMessages, status, error, stop } = useChat({
		transport,
		messages: initialMessages,
		experimental_throttle: 24,
	});
	const busy = status === "submitted" || status === "streaming";
	const waitingForFirstToken = status === "submitted";
	const canSubmit = input.trim().length > 0 && !busy;
	const chatPanelRef = useRef<HTMLDivElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const responseCacheRef = useRef(new Map<string, string>());
	const chatHasActivityRef = useRef(false);
	const lastSubmittedPromptRef = useRef<string | null>(null);
	const lastCachedAssistantIdRef = useRef<string | null>(null);
	const lastViewportScrollAtRef = useRef(0);

	useEffect(() => {
		if (!chatHasActivityRef.current) return;

		messagesEndRef.current?.scrollIntoView({
			block: "end",
			behavior: "smooth",
		});

		if (status === "submitted" || status === "streaming") {
			const now = performance.now();
			if (now - lastViewportScrollAtRef.current > 650) {
				lastViewportScrollAtRef.current = now;
				chatPanelRef.current?.scrollIntoView({
					block: "nearest",
					behavior: "smooth",
				});
			}
		}
	}, [messages, status]);

	useEffect(() => {
		if (status !== "ready") return;

		const cacheKey = lastSubmittedPromptRef.current;
		if (!cacheKey) return;

		const assistantMessage = [...messages]
			.reverse()
			.find((message) => message.role === "assistant");

		if (
			!assistantMessage ||
			assistantMessage.id === "boot" ||
			assistantMessage.id === lastCachedAssistantIdRef.current
		) {
			return;
		}

		const assistantText = getMessageText(assistantMessage).trim();
		if (!assistantText) return;

		responseCacheRef.current.set(cacheKey, assistantText);
		trimCache(responseCacheRef.current);
		lastCachedAssistantIdRef.current = assistantMessage.id;
		lastSubmittedPromptRef.current = null;
	}, [messages, status]);

	const sendCachedOrNetwork = async (text: string) => {
		if (!text || busy) return;
		chatHasActivityRef.current = true;
		const cacheKey = normalizePrompt(text);
		const cachedResponse = responseCacheRef.current.get(cacheKey);

		if (cachedResponse) {
			setMessages((currentMessages) => [
				...currentMessages,
				createTextMessage("user", text),
				createTextMessage("assistant", cachedResponse),
			]);
			window.requestAnimationFrame(() => {
				chatPanelRef.current?.scrollIntoView({
					block: "nearest",
					behavior: "smooth",
				});
				messagesEndRef.current?.scrollIntoView({
					block: "end",
					behavior: "smooth",
				});
			});
			return;
		}

		lastSubmittedPromptRef.current = cacheKey;
		await sendMessage({ text });
	};

	const submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const text = input.trim();
		if (!text || busy) return;
		setInput("");
		await sendCachedOrNetwork(text);
	};

	const sendSuggestion = async (text: string) => {
		if (busy) return;
		await sendCachedOrNetwork(text);
	};

	return (
		<SectionShell
			id="chat"
			eyebrow="// Sector 09 // Live Chat Interface"
			code="TERM_AI"
			title={
				<>
					Ask me directly.{" "}
					<span className="text-primary text-glow">CV-grounded answers</span>.
				</>
			}
			subtitle="The server prompt answers in my voice using CV, LinkedIn handle, GitHub repos, projects, stack, contact links, and claim boundaries."
			scanLabel="AI SDK Chat"
			scanDetail="useChat + DefaultChatTransport send UI messages to POST /api/chat."
		>
			<div
				ref={chatPanelRef}
				className="corner-brackets scan-target relative overflow-hidden border border-primary/25 bg-background/80 shadow-[0_24px_100px_rgb(0_0_0/0.32)] backdrop-blur"
			>
				<ScanLabel detail="Client state + session Map memo cache; server route streams provider output.">
					AI Stream Panel
				</ScanLabel>
				<div className="flex items-center justify-between border-b border-border/70 bg-card/80 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
					<div className="flex items-center gap-2">
						<span className="size-3 rounded-full bg-[#ff3b4f]" />
						<span className="size-3 rounded-full bg-secondary" />
						<span className="size-3 rounded-full bg-primary" />
					</div>
					<span className="hidden text-secondary sm:inline">
						~/giorgi/live-profile-chat.ts
					</span>
					<span>UTF-8 / CHAT API</span>
				</div>

				<div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
					<aside className="border-b border-border/60 p-5 font-mono text-xs leading-7 text-muted-foreground lg:border-b-0 lg:border-r">
						<p className="text-primary">&gt; cat chat-readme.md</p>
						<div className="mt-6 space-y-5">
							<div>
								<p className="text-foreground"># Live CV terminal</p>
								<p className="mt-3">
									This answers as me from a server-side prompt grounded in CV,
									LinkedIn, GitHub, projects, stack, and contact details.
								</p>
							</div>
							<ul className="space-y-2">
								<li>[1] Answers in my voice.</li>
								<li>[2] No invented background.</li>
								<li>[3] CV + GitHub grounded.</li>
								<li>[4] Streaming response path.</li>
							</ul>
							<div className="space-y-1 pt-2">
								<p>-&gt; {profile.email}</p>
								<p>-&gt; github.com/geo318</p>
								<p>-&gt; linkedin.com/in/geo318</p>
							</div>
						</div>
					</aside>

					<div className="flex min-h-[34rem] flex-col">
						<div className="flex items-center justify-between border-b border-border/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
							<span className="text-primary">Live Profile Chat</span>
							<span
								className={cn(
									"inline-flex items-center gap-2",
									error ? "text-[#ff3b4f]" : "text-secondary",
								)}
							>
								<span className="size-2 rounded-full bg-current" />
								{error
									? "Setup Required"
									: waitingForFirstToken
										? "Thinking"
										: status === "streaming"
											? "Streaming"
											: "Ready"}
							</span>
						</div>

						<div className="flex-1 space-y-4 overflow-y-auto p-5">
							{messages.map((message) => (
								<ChatBubble key={message.id} message={message} />
							))}
							{waitingForFirstToken ? <ThinkingBubble /> : null}
							{error ? (
								<div className="border border-[#ff3b4f]/40 bg-[#ff3b4f]/8 p-3 font-mono text-xs leading-6 text-muted-foreground">
									Check <span className="text-foreground">CHAT_API_KEY</span>{" "}
									and <span className="text-foreground">CHAT_MODEL</span>. If
									those are correct, check provider quota or rate limits.
									{error.message ? (
										<span className="mt-2 block text-[#ffb4c4]">
											{error.message.slice(0, 180)}
										</span>
									) : null}
								</div>
							) : null}
							<div ref={messagesEndRef} />
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
									disabled={busy}
									placeholder="Ask me about my CV..."
									className="min-w-0 flex-1 border border-border bg-background/80 px-3 py-3 font-mono text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
								/>
								<button
									type={busy ? "button" : "submit"}
									onClick={status === "streaming" ? stop : undefined}
									disabled={waitingForFirstToken || (!busy && !canSubmit)}
									className="inline-flex min-w-12 items-center justify-center border border-primary/55 bg-primary/10 px-4 text-primary transition hover:bg-primary/18 disabled:cursor-not-allowed disabled:opacity-45"
									aria-label={
										status === "streaming" ? "Stop response" : "Send message"
									}
								>
									{status === "streaming" ? (
										<Square className="size-4" aria-hidden="true" />
									) : waitingForFirstToken ? (
										<LoaderCircle
											className="size-4 animate-spin"
											aria-hidden="true"
										/>
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

function ThinkingBubble() {
	return (
		<div className="flex justify-start">
			<div className="max-w-[min(42rem,92%)] border border-primary/35 bg-card/70 px-4 py-3 text-sm leading-7 text-muted-foreground">
				<div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
					Giorgi
				</div>
				<div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
					<LoaderCircle className="size-4 animate-spin text-secondary" />
					Thinking
				</div>
			</div>
		</div>
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
					{mine ? "Visitor" : "Giorgi"}
				</div>
				<p className="whitespace-pre-wrap">{text}</p>
			</div>
		</div>
	);
}
