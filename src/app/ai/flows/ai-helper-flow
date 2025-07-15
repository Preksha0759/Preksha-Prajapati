// src/ai/flows/ai-helper-flow.ts
'use server';

/**
 * @fileOverview A Genkit flow for an AI assistant chatbot.
 *
 * - aiHelper - A function that acts as a personalized AI helper for the user.
 * - AiHelperInput - The input type for the aiHelper function.
 * - AiHelperOutput - The return type for the aiHelper function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiHelperInputSchema = z.object({
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })).describe('The history of the conversation.'),
  question: z.string().describe("The user's current question or message."),
});
export type AiHelperInput = z.infer<typeof AiHelperInputSchema>;

const AiHelperOutputSchema = z.object({
  answer: z.string().describe("The AI's response to the user's question."),
});
export type AiHelperOutput = z.infer<typeof AiHelperOutputSchema>;

export async function aiHelper(input: AiHelperInput): Promise<AiHelperOutput> {
  return aiHelperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHelperPrompt',
  input: { schema: AiHelperInputSchema },
  output: { schema: AiHelperOutputSchema },
  system: `You are a friendly and helpful AI assistant for an application called "Eventra". Your goal is to guide users, answer their questions about the app's features, and help them solve any problems they might encounter.

Eventra has the following key features:
1.  **Dashboard**: A summary page of the user's activities.
2.  **Events**: Users can discover events happening across India. They can see details, get AI-generated event banners, and register.
3.  **Create Event**: Users can create their own events by filling out a form.
4.  **My Applications**: Users can track the status of their applications to events (Pending, Approved, Rejected).
5.  **AI Project Assistant**: A powerful tool where users input their skills and desired job role to get personalized project ideas. They can then generate a full-blown roadmap for any idea, including a recommended tech stack, architecture, and step-by-step instructions.

When responding to the user, be concise, friendly, and act as a guide. If you don't know the answer, say so politely.
`,
  prompt: `The user has sent the following message. Please provide a helpful response.
Question: {{{question}}}
`,
  history: '{{#each history}}{{role}}: {{{content}}}\n{{/each}}'
});

const aiHelperFlow = ai.defineFlow(
  {
    name: 'aiHelperFlow',
    inputSchema: AiHelperInputSchema,
    outputSchema: AiHelperOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return { answer: output!.answer };
  }
);
