import { openai } from "@ai-sdk/openai";
import {
	convertToModelMessages,
	streamText,
	type UIMessage,
} from "ai";
import { giorgiChatSystemPrompt } from "@/content/chat-profile";

export const maxDuration = 30;

const DEFAULT_OPENAI_CHAT_MODEL = "gpt-4.1-mini";
const legacyModelIds = new Set([
	"gpt-4",
	"gpt-4-0314",
	"gpt-4-0613",
	"gpt-4-32k",
	"gpt-4-32k-0314",
	"gpt-4-32k-0613",
	"gpt-3.5-turbo-0301",
	"gpt-3.5-turbo-0613",
]);

function getChatModel() {
	const configured = process.env.OPENAI_CHAT_MODEL?.trim();
	if (!configured || legacyModelIds.has(configured)) {
		return DEFAULT_OPENAI_CHAT_MODEL;
	}

	return configured;
}

export async function POST(request: Request) {
	if (!process.env.OPENAI_API_KEY) {
		return Response.json(
			{
				error:
					"OPENAI_API_KEY is not configured. Add it on the server to enable live chat.",
			},
			{ status: 503 },
		);
	}

	const { messages } = (await request.json()) as { messages?: UIMessage[] };

	if (!Array.isArray(messages)) {
		return Response.json({ error: "Missing messages array." }, { status: 400 });
	}

	const result = streamText({
		model: openai(getChatModel()),
		system: giorgiChatSystemPrompt,
		messages: await convertToModelMessages(messages.slice(-10)),
		temperature: 0.35,
		maxOutputTokens: 650,
	});

	return result.toUIMessageStreamResponse();
}
