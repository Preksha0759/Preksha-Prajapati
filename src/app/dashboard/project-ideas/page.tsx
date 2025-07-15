
'use client';

import { useState } from 'react';
import { suggestProjectIdeas, type SuggestProjectIdeasOutput } from '@/ai/flows/suggest-project-ideas';
import { generateProjectRoadmap, type GenerateProjectRoadmapOutput } from '@/ai/flows/generate-project-roadmap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, BrainCircuit, Wand2, ArrowRight, Lightbulb, Zap, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ProjectIdea = SuggestProjectIdeasOutput['projectIdeas'][0];

export default function ProjectIdeasPage() {
  const [skills, setSkills] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null);
  const [roadmap, setRoadmap] = useState<GenerateProjectRoadmapOutput | null>(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);


  const skillsSuggestions = [
    { label: 'Frontend Dev', value: 'React, Next.js, Tailwind CSS, TypeScript' },
    { label: 'Backend Dev', value: 'Node.js, Express, PostgreSQL, Docker' },
    { label: 'UI/UX Design', value: 'Figma, User Research, Prototyping, Wireframing' },
    { label: 'Digital Marketing', value: 'SEO, Content Marketing, Google Analytics, Social Media Ads' },
    { label: 'Product Management', value: 'Agile, Scrum, Roadmapping, User Stories, JIRA' },
  ];

  const jobRoleSuggestions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Product Manager',
    'Digital Marketer',
    'Data Analyst',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIdeas([]);
    try {
      const result = await suggestProjectIdeas({ skills, jobRole });
      setIdeas(result.projectIdeas);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate project ideas. Please try again later.',
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartBuilding = async (idea: ProjectIdea) => {
    setSelectedIdea(idea);
    setRoadmap(null);
    setRoadmapLoading(true);
    try {
        const result = await generateProjectRoadmap({
            projectTitle: idea.title,
            projectDescription: idea.description,
            userSkills: skills,
            jobRole: jobRole,
        });
        setRoadmap(result);
    } catch (err) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to generate project roadmap. Please try again.',
        });
        setSelectedIdea(null);
    } finally {
        setRoadmapLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Project Assistant</h1>
        <p className="text-muted-foreground">
          Enter your skills and career goals to get unique, industry-relevant project ideas.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Ideas</CardTitle>
          <CardDescription>Fill out the form below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="skills">Your Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g., React, Figma, SEO"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  required
                />
                 <Select onValueChange={setSkills} value={skills}>
                  <SelectTrigger className="text-muted-foreground">
                    <SelectValue placeholder="Or pick a suggestion..." />
                  </SelectTrigger>
                  <SelectContent>
                    {skillsSuggestions.map((suggestion) => (
                      <SelectItem key={suggestion.label} value={suggestion.value}>
                        {suggestion.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-role">Desired Job Role</Label>
                <Input
                  id="job-role"
                  placeholder="e.g., Frontend Developer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  required
                />
                <Select onValueChange={setJobRole} value={jobRole}>
                  <SelectTrigger className="text-muted-foreground">
                    <SelectValue placeholder="Or pick a suggestion..." />
                  </SelectTrigger>
                  <SelectContent>
                    {jobRoleSuggestions.map((suggestion) => (
                      <SelectItem key={suggestion} value={suggestion}>
                        {suggestion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={loading || !skills || !jobRole} className="w-full md:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Suggest Projects
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {ideas.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Your Project Ideas</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea, index) => (
              <Card key={index} className="flex flex-col transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 duration-300">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{idea.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{idea.description}</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleStartBuilding(idea)}>
                        Start Building <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Dialog open={!!selectedIdea} onOpenChange={(isOpen) => !isOpen && setSelectedIdea(null)}>
        <DialogContent className="max-w-3xl h-[90vh]">
            <DialogHeader>
                <DialogTitle className="text-2xl">{selectedIdea?.title}</DialogTitle>
                <DialogDescription>{selectedIdea?.description}</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto pr-4 -mr-4 space-y-6">
            {roadmapLoading ? (
                 <div className="flex flex-col items-center justify-center h-full gap-4">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-muted-foreground">Generating your project roadmap...</p>
                 </div>
            ) : roadmap && (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Zap className="h-5 w-5 text-primary"/>Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {roadmap.techStack.map(tech => (
                                <div key={tech} className="bg-secondary text-secondary-foreground px-3 py-1 text-sm rounded-full">{tech}</div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Code className="h-5 w-5 text-primary"/>Architecture</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{roadmap.architecture}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>Steps</h3>
                         <ul className="space-y-4">
                            {roadmap.steps.map((step, index) => (
                                <li key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{index + 1}</div>
                                    <div>
                                        <h4 className="font-semibold">{step.title}</h4>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
