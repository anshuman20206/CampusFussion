
"use server";

import { campusAssistant } from "@/ai/flows/campus-assistant";

interface Message {
    role: 'user' | 'model' | 'system';
    content: string;
}

export async function getAiResponse(history: Message[]) {
  try {
    const response = await campusAssistant({ messages: history });
    return { type: 'success', content: response };
  } catch (error: any) {
    console.error("Genkit Assistant Error:", error);
    // Provide a more helpful error message to the user
    const message = error.message?.includes('API_KEY') 
      ? "API key is missing or invalid. Please check your GOOGLE_GENAI_API_KEY environment variable."
      : error.message || "I'm having trouble connecting to my brain. Please try again in a few moments.";
      
    return { 
        type: 'error', 
        message: message
    };
  }
}
