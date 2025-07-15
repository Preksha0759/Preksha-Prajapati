
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar, FileText, BrainCircuit, MapPin, Loader2, Trash2 } from 'lucide-react';
import type { Application, Event } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { events } from '@/lib/events-data';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const initialApplications: Application[] = [
  { id: 'app2', eventId: '2', eventName: 'Startup Pitch Night', eventDate: '2024-09-22', status: 'Pending' },
  { id: 'app3', eventId: '3', eventName: 'Design Workshop', eventDate: '2024-11-05', status: 'Rejected' },
];

export default function DashboardPage() {
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [loadingState, setLoadingState] = useState({ register: false, unregister: false });
  const { toast } = useToast();

  useEffect(() => {
    const appliedEventIds = new Set(applications.map(app => app.eventId));
    const availableEvents = events.filter(event => !appliedEventIds.has(event.id));
    if (availableEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableEvents.length);
      setUpcomingEvent(availableEvents[randomIndex]);
    } else {
        // Find an event the user has applied to show, if all are applied.
        const appliedEvent = events.find(e => appliedEventIds.has(e.id));
        setUpcomingEvent(appliedEvent || null);
    }
  }, [applications]);

  const handleRegister = () => {
    if (!upcomingEvent) return;
    setLoadingState(prev => ({ ...prev, register: true }));

    setTimeout(() => {
      const newApplication: Application = {
        id: `app${Date.now()}`,
        eventId: upcomingEvent.id,
        eventName: upcomingEvent.name,
        eventDate: upcomingEvent.date,
        status: 'Pending',
      };
      setApplications(prev => [newApplication, ...prev]);
      toast({
        title: 'Registration Successful!',
        description: `You have applied for ${upcomingEvent.name}.`,
      });
      setLoadingState(prev => ({ ...prev, register: false }));
    }, 1000);
  };

  const handleUnregister = (eventId: string) => {
    if (!eventId) return;
    setLoadingState(prev => ({ ...prev, unregister: true }));
    setTimeout(() => {
        const eventName = applications.find(app => app.eventId === eventId)?.eventName;
        setApplications(prev => prev.filter(app => app.eventId !== eventId));
        toast({
            title: 'Unregistered',
            description: `You have successfully unregistered from ${eventName}.`,
            variant: 'destructive',
        });
        setLoadingState(prev => ({ ...prev, unregister: false }));
    }, 1000);
  };

  const isAlreadyRegistered = upcomingEvent && applications.some(app => app.eventId === upcomingEvent.id);

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Featured Event</CardTitle>
            <CardDescription>A randomly selected event for you.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center">
            {upcomingEvent ? (
              <div className="space-y-2">
                  <h4 className="font-semibold text-lg">{upcomingEvent.name}</h4>
                  <div className="text-muted-foreground space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(upcomingEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{upcomingEvent.location}</span>
                      </div>
                  </div>
              </div>
            ) : (
             <p className="text-muted-foreground">No new events to suggest.</p>
            )}
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-2">
             {upcomingEvent && (
                isAlreadyRegistered ? (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full" disabled={loadingState.unregister}>
                                {loadingState.unregister ? <><Loader2 className="animate-spin" /> Unregistering...</> : 'Unregister'}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will cancel your registration for {upcomingEvent.name}. This action cannot be undone.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleUnregister(upcomingEvent.id)}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                ) : (
                    <Button onClick={handleRegister} disabled={loadingState.register} className="w-full">
                        {loadingState.register ? <><Loader2 className="animate-spin" /> Registering...</> : 'Register Now'}
                    </Button>
                )
             )}
             <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/events">Explore More Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
             </Button>
          </CardFooter>
        </Card>
        
        <Card className="lg:col-span-2 flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Recent Applications</CardTitle>
            <CardDescription>Track the status of your event applications.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length > 0 ? (
                  applications.slice(0, 3).map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.eventName}</TableCell>
                      <TableCell>{new Date(app.eventDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={app.status === 'Approved' ? 'default' : app.status === 'Pending' ? 'secondary' : 'destructive'} 
                              className={`${app.status === 'Approved' ? 'bg-green-500/20 text-green-400 border-green-500/20' : app.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}`}>
                          {app.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">No recent applications.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
           <CardFooter>
             <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/applications">View All Applications <ArrowRight className="ml-2 h-4 w-4" /></Link>
             </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
           <CardHeader>
             <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-primary" /> AI Project Assistant</CardTitle>
             <CardDescription>Get unique project ideas tailored to your tech stack and career goals.</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="flex flex-col items-center justify-center text-center p-6 bg-accent/10 rounded-lg">
                <p className="text-muted-foreground mb-4">Unsure what to build next? Let our AI guide you.</p>
                <Button asChild>
                    <Link href="/dashboard/project-ideas">Get Project Ideas <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
             </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
