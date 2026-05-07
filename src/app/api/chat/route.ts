import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
	convertToModelMessages,
	streamText,
	type UIMessage,
} from "ai";
import { giorgiChatSystemPrompt } from "@/content/chat-profile";

export const maxDuration = 30;

const DEFAULT_CHAT_MODEL = "gemini-2.5-flash-lite";

function getChatModel() {
	return process.env.CHAT_MODEL?.trim() || DEFAULT_CHAT_MODEL;
}

function getChatApiKey() {
	return (
		process.env.CHAT_API_KEY?.trim() ||
		process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()
	);
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

	const { messages } = (await request.json()) as { messages?: UIMessage[] };

	if (!Array.isArray(messages)) {
		return Response.json({ error: "Missing messages array." }, { status: 400 });
	}

	const provider = createGoogleGenerativeAI({ apiKey });

	const result = streamText({
		model: provider(getChatModel()),
		system: giorgiChatSystemPrompt,
		messages: await convertToModelMessages(messages.slice(-10)),
		temperature: 0.35,
		maxOutputTokens: 650,
	});

	return result.toUIMessageStreamResponse();
}
