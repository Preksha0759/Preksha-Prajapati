
'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Application } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FilePlus2, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
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
import { useToast } from '@/hooks/use-toast';

const initialApplications: Application[] = [
  { id: '1', eventId: '1', eventName: 'Tech Conference 2024', eventDate: '2024-10-15', status: 'Approved' },
  { id: '2', eventId: '2', eventName: 'Startup Pitch Night', eventDate: '2024-09-22', status: 'Pending' },
  { id: '3', eventId: '3', eventName: 'Design Workshop', eventDate: '2024-11-05', status: 'Rejected' },
  { id: '4', eventId: '5', eventName: 'Literary Fest', eventDate: '2024-10-28', status: 'Approved' },
  { id: '5', eventId: '6', eventName: 'Hackathon 2024', eventDate: '2024-11-15', status: 'Pending' },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUnregister = (app: Application) => {
    setLoadingId(app.id);
    setTimeout(() => {
        setApplications(prev => prev.filter(a => a.id !== app.id));
        toast({
            title: 'Unregistered',
            description: `You have unregistered from ${app.eventName}.`,
            variant: 'destructive'
        });
        setLoadingId(null);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
        <p className="text-muted-foreground">Keep track of all your event applications and their status.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.eventName}</TableCell>
                  <TableCell>{new Date(app.eventDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={app.status === 'Approved' ? 'default' : app.status === 'Pending' ? 'secondary' : 'destructive'} 
                           className={`${app.status === 'Approved' ? 'bg-green-500/20 text-green-400 border-green-500/20' : app.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}`}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive" disabled={loadingId === app.id}>
                          {loadingId === app.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          <span className="ml-2 hidden sm:inline">Unregister</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will cancel your application for "{app.eventName}". This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleUnregister(app)}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
             <TableCaption>
              {applications.length === 0 ? "You haven't applied to any events yet." : "A list of your event applications."}
            </TableCaption>
          </Table>
           {applications.length === 0 && (
                <div className="text-center p-8">
                    <p className="mb-4 text-muted-foreground">Looks like you're new here!</p>
                    <Button asChild>
                        <Link href="/dashboard/events">
                            <FilePlus2 className="mr-2 h-4 w-4" />
                            Explore and Apply to Events
                        </Link>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
