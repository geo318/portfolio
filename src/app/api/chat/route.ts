import { openai } from "@ai-sdk/openai";
import {
	convertToModelMessages,
	streamText,
	type UIMessage,
} from "ai";
import { giorgiChatSystemPrompt } from "@/content/chat-profile";

export const maxDuration = 30;

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
		model: openai(process.env.OPENAI_CHAT_MODEL ?? "gpt-4.1-mini"),
		system: giorgiChatSystemPrompt,
		messages: await convertToModelMessages(messages.slice(-10)),
		temperature: 0.35,
		maxOutputTokens: 650,
	});

	return result.toUIMessageStreamResponse();
}
