'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing resume tips to students.
 *
 * - getResumeTips - A function that retrieves resume tips.
 * - GetResumeTipsInput - The input type for the getResumeTips function.
 * - GetResumeTipsOutput - The return type for the getResumeTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetResumeTipsInputSchema = z.object({
  query: z
    .string()
    .describe('The query from the user asking for resume tips.'),
});
export type GetResumeTipsInput = z.infer<typeof GetResumeTipsInputSchema>;

const GetResumeTipsOutputSchema = z.object({
  tips: z.string().describe('Resume improvement tips based on the query.'),
});
export type GetResumeTipsOutput = z.infer<typeof GetResumeTipsOutputSchema>;

export async function getResumeTips(input: GetResumeTipsInput): Promise<GetResumeTipsOutput> {
  return getResumeTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getResumeTipsPrompt',
  input: {schema: GetResumeTipsInputSchema},
  output: {schema: GetResumeTipsOutputSchema},
  prompt: `You are an AI assistant providing resume tips to students.

  Based on the student's query, provide helpful and actionable advice to improve their resume.

  Query: {{{query}}}
  `,
});

const getResumeTipsFlow = ai.defineFlow(
  {
    name: 'getResumeTipsFlow',
    inputSchema: GetResumeTipsInputSchema,
    outputSchema: GetResumeTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
