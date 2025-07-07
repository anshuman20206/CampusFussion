"use server";

import { programmingDoubtSolver, ProgrammingDoubtSolverOutput } from "@/ai/flows/programming-doubt-solver";
import { getResumeTips, GetResumeTipsOutput } from "@/ai/flows/get-resume-tips";

type ChatResponse = 
    | { type: 'programming', data: ProgrammingDoubtSolverOutput }
    | { type: 'resume', data: GetResumeTipsOutput }
    | { type: 'error', message: string };

export async function getAiResponse(userInput: string): Promise<ChatResponse> {
  try {
    const lowercasedInput = userInput.toLowerCase();
    
    // Simple routing logic
    if (lowercasedInput.includes('resume') || lowercasedInput.includes('cv') || lowercasedInput.includes('interview')) {
        const response = await getResumeTips({ query: userInput });
        return { type: 'resume', data: response };
    } else {
        // Default to programming solver
        const response = await programmingDoubtSolver({ programmingQuestion: userInput });
        return { type: 'programming', data: response };
    }
  } catch (error) {
    console.error("Error getting AI response:", error);
    return { type: 'error', message: "Sorry, I couldn't process your request right now. Please try again later." };
  }
}
