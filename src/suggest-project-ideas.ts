// src/ai/flows/suggest-project-ideas.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest project ideas based on the user's skills and job role.
 *
 * - suggestProjectIdeas - A function that suggests project ideas based on the user's skills and job role.
 * - SuggestProjectIdeasInput - The input type for the suggestProjectIdeas function.
 * - SuggestProjectIdeasOutput - The return type for the suggestProjectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectIdeasInputSchema = z.object({
  skills: z
    .string()
    .describe('The user\'s skills (e.g., React, Python, UI/UX Design, Marketing).'),
  jobRole: z.string().describe('The user\'s desired job role (e.g., Frontend Developer, Product Manager).'),
});
export type SuggestProjectIdeasInput = z.infer<typeof SuggestProjectIdeasInputSchema>;

const ProjectIdeaSchema = z.object({
    title: z.string().describe('A short, catchy title for the project idea.'),
    description: z.string().describe('A one or two sentence description of the project.'),
});

const SuggestProjectIdeasOutputSchema = z.object({
  projectIdeas: z.array(ProjectIdeaSchema).describe('A list of project ideas relevant to the user\'s skills and job role.'),
});
export type SuggestProjectIdeasOutput = z.infer<typeof SuggestProjectIdeasOutputSchema>;

export async function suggestProjectIdeas(input: SuggestProjectIdeasInput): Promise<SuggestProjectIdeasOutput> {
  return suggestProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectIdeasPrompt',
  input: {schema: SuggestProjectIdeasInputSchema},
  output: {schema: SuggestProjectIdeasOutputSchema},
  prompt: `You are an AI career advisor. A user will provide their skills (which can be technical or non-technical) and their desired job role. Your task is to suggest unique and practical project ideas that would be impressive for that job role, leveraging the specified skills. For each idea, provide a catchy title and a brief description.

Skills: {{{skills}}}
Job Role: {{{jobRole}}}

Project Ideas:`,
});

const suggestProjectIdeasFlow = ai.defineFlow(
  {
    name: 'suggestProjectIdeasFlow',
    inputSchema: SuggestProjectIdeasInputSchema,
    outputSchema: SuggestProjectIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
