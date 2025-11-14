'use server';

/**
 * @fileOverview An AI agent for solving programming doubts.
 *
 * - programmingDoubtSolver - A function that handles the doubt solving process.
 * - ProgrammingDoubtSolverInput - The input type for the programmingDoubtSolver function.
 * - ProgrammingDoubtSolverOutput - The return type for the programmingDoubtSolver function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProgrammingDoubtSolverInputSchema = z.object({
  programmingQuestion: z
    .string()
    .describe('The programming question that the student has.'),
});
export type ProgrammingDoubtSolverInput = z.infer<typeof ProgrammingDoubtSolverInputSchema>;

const ProgrammingDoubtSolverOutputSchema = z.object({
  solution: z
    .string()
    .describe('The detailed solution to the programming question.'),
  explanation: z
    .string()
    .describe('The explanation of the solution to the programming question.'),
});
export type ProgrammingDoubtSolverOutput = z.infer<typeof ProgrammingDoubtSolverOutputSchema>;

export async function programmingDoubtSolver(input: ProgrammingDoubtSolverInput): Promise<ProgrammingDoubtSolverOutput> {
  return programmingDoubtSolverFlow(input);
}

const prompt = ai.definePrompt({
  name: 'programmingDoubtSolverPrompt',
  input: {schema: ProgrammingDoubtSolverInputSchema},
  output: {schema: ProgrammingDoubtSolverOutputSchema},
  prompt: `You are an expert programming tutor.

You will use this information to solve the programming question and provide a detailed explanation.

Question: {{{programmingQuestion}}}`,
});

const programmingDoubtSolverFlow = ai.defineFlow(
  {
    name: 'programmingDoubtSolverFlow',
    inputSchema: ProgrammingDoubtSolverInputSchema,
    outputSchema: ProgrammingDoubtSolverOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
