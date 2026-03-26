
'use server';

/**
 * @fileOverview A unified AI assistant for CampusFusion.
 * Handles programming doubts, career advice, and platform queries using live tools.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirebaseServices } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// Tool: Fetch live internships
const getLatestInternships = ai.defineTool(
  {
    name: 'getLatestInternships',
    description: 'Retrieves the 5 most recently posted internships on CampusFusion. Use this when students ask about job opportunities.',
    inputSchema: z.void(),
    outputSchema: z.array(z.object({
      title: z.string(),
      company: z.string(),
      location: z.string(),
      stipend: z.string(),
      deadline: z.string(),
    })),
  },
  async () => {
    try {
      const { db } = getFirebaseServices();
      if (!db) return [];
      const q = query(collection(db, 'internships'), orderBy('postedAt', 'desc'), limit(5));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          title: data.title || 'N/A',
          company: data.company || 'N/A',
          location: data.location || 'N/A',
          stipend: data.stipend || 'N/A',
          deadline: data.deadline || 'N/A',
        };
      });
    } catch (e) {
      console.error("Assistant Tool Error (Internships):", e);
      return [];
    }
  }
);

// Tool: Fetch upcoming events
const getUpcomingEvents = ai.defineTool(
    {
      name: 'getUpcomingEvents',
      description: 'Retrieves a list of upcoming campus events from CampusFusion.',
      inputSchema: z.void(),
      outputSchema: z.array(z.object({
        title: z.string(),
        date: z.string(),
        location: z.string(),
      })),
    },
    async () => {
      try {
        const { db } = getFirebaseServices();
        if (!db) return [];
        const q = query(collection(db, 'events'), orderBy('date', 'asc'), limit(5));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            title: data.title || 'N/A',
            date: data.date || 'N/A',
            location: data.location || 'N/A',
          };
        });
      } catch (e) {
        console.error("Assistant Tool Error (Events):", e);
        return [];
      }
    }
  );

const CampusAssistantInputSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'model', 'system']),
    content: z.string(),
  })),
});

export type CampusAssistantInput = z.infer<typeof CampusAssistantInputSchema>;

export async function campusAssistant(input: CampusAssistantInput): Promise<string> {
    try {
      return await campusAssistantFlow(input);
    } catch (error: any) {
      console.error("Campus Assistant Flow Error:", error);
      throw error;
    }
}

const campusAssistantFlow = ai.defineFlow(
    {
        name: 'campusAssistantFlow',
        inputSchema: CampusAssistantInputSchema,
        outputSchema: z.string(),
    },
    async (input) => {
        const response = await ai.generate({
            model: 'googleai/gemini-1.5-flash',
            system: `You are the CampusFusion AI Assistant. 
            CampusFusion is a student community platform.
            Your goal is to help students with:
            1. Finding internships (use getLatestInternships tool).
            2. Finding upcoming events (use getUpcomingEvents tool).
            3. Solving programming doubts (answer directly with code examples).
            4. Resume and career advice (provide actionable tips).
            
            Always format your responses with Markdown. Use code blocks for solutions.
            Be enthusiastic about technology and community!`,
            messages: input.messages.map(m => ({
                role: m.role,
                content: [{ text: m.content }]
            })),
            tools: [getLatestInternships, getUpcomingEvents],
        });

        return response.text;
    }
);
