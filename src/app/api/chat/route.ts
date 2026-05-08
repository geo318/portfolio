import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { type ModelMessage, streamText } from "ai";
import { giorgiChatSystemPrompt } from "@/content/chat-profile";

export const maxDuration = 30;

const DEFAULT_CHAT_MODEL = "gemini-2.5-flash-lite";
const CHAT_HISTORY_LIMIT = 10;

type ChatRequestMessage = {
	role?: unknown;
	text?: unknown;
};

function getChatModel() {
	return process.env.CHAT_MODEL?.trim() || DEFAULT_CHAT_MODEL;
}

function getChatApiKey() {
	return process.env.CHAT_API_KEY?.trim() || process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
}

function toModelMessages(messages: ChatRequestMessage[]): ModelMessage[] {
	return messages
		.filter(
			(message): message is { role: "user" | "assistant"; text: string } =>
				(message.role === "user" || message.role === "assistant") &&
				typeof message.text === "string" &&
				message.text.trim().length > 0,
		)
		.slice(-CHAT_HISTORY_LIMIT)
		.map((message) => ({
			role: message.role,
			content: message.text.trim(),
		}));
}

export async function POST(request: Request) {
	const apiKey = getChatApiKey();

	if (!apiKey) {
		return Response.json(
			{
				error:
					"CHAT_API_KEY is not configured. Add a server-side provider key to enable live chat.",
			},
			{ status: 503 },
		);
	}

	const body = (await request.json().catch(() => null)) as {
		messages?: ChatRequestMessage[];
	} | null;
	const messages = body?.messages;

	if (!Array.isArray(messages)) {
		return Response.json({ error: "Missing messages array." }, { status: 400 });
	}

	const modelMessages = toModelMessages(messages);

	if (modelMessages.length === 0) {
		return Response.json({ error: "Missing chat message text." }, { status: 400 });
	}

	const provider = createGoogleGenerativeAI({ apiKey });

	const result = streamText({
		model: provider(getChatModel()),
		system: giorgiChatSystemPrompt,
		messages: modelMessages,
		temperature: 0.35,
		maxOutputTokens: 650,
	});

	return result.toTextStreamResponse();
}
