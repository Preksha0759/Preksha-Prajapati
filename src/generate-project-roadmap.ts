// src/ai/flows/generate-project-roadmap.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a detailed roadmap for a software project.
 *
 * - generateProjectRoadmap - A function that creates a project roadmap.
 * - GenerateProjectRoadmapInput - The input type for the function.
 * - GenerateProjectRoadmapOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProjectRoadmapInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  projectDescription: z.string().describe('A brief description of the project.'),
  userSkills: z.string().describe("The user's existing skills (e.g., React, Python, UI/UX Design)."),
  jobRole: z.string().describe("The user's desired job role (e.g., Frontend Developer, Product Manager)."),
});
export type GenerateProjectRoadmapInput = z.infer<typeof GenerateProjectRoadmapInputSchema>;

const StepSchema = z.object({
  title: z.string().describe('A short, clear title for the step.'),
  description: z.string().describe('A detailed description of the tasks involved in this step.'),
});

const GenerateProjectRoadmapOutputSchema = z.object({
  techStack: z.array(z.string()).describe('A list of recommended technologies (languages, frameworks, libraries, tools).'),
  architecture: z.string().describe('A high-level overview of the project architecture (e.g., Frontend, Backend, Database, API design). Explain how components connect.'),
  steps: z.array(StepSchema).describe('A step-by-step plan to build the project. Each step should be a logical unit of work.'),
});
export type GenerateProjectRoadmapOutput = z.infer<typeof GenerateProjectRoadmapOutputSchema>;

export async function generateProjectRoadmap(input: GenerateProjectRoadmapInput): Promise<GenerateProjectRoadmapOutput> {
  return generateProjectRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectRoadmapPrompt',
  input: { schema: GenerateProjectRoadmapInputSchema },
  output: { schema: GenerateProjectRoadmapOutputSchema },
  prompt: `You are a Senior Software Architect and Career Mentor. A user wants to build a project to enhance their portfolio for a specific job role. Your task is to provide a detailed, actionable roadmap to help them build it.

Consider the user's existing skills and desired job role to recommend a practical and impressive tech stack.

**User Information:**
- **Desired Job Role:** {{{jobRole}}}
- **Existing Skills:** {{{userSkills}}}

**Project Idea:**
- **Title:** {{{projectTitle}}}
- **Description:** {{{projectDescription}}}

**Your Task:**
Generate a clear and concise project roadmap with the following sections:

1.  **Tech Stack:** Recommend specific languages, frameworks, databases, and tools. The choices should be relevant to the project and the user's career goals.
2.  **Architecture:** Provide a high-level overview of the project's structure. Describe the main components (e.g., frontend, backend, database) and how they will interact.
3.  **Steps:** Create a step-by-step guide from project setup to deployment. Each step should have a clear title and a description of what needs to be done. The steps should be logical and easy to follow.
`,
});

const generateProjectRoadmapFlow = ai.defineFlow(
  {
    name: 'generateProjectRoadmapFlow',
    inputSchema: GenerateProjectRoadmapInputSchema,
    outputSchema: GenerateProjectRoadmapOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
