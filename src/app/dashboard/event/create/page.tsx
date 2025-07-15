import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateEventPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto animate-in fade-in-50">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create a New Event</h1>
        <p className="text-muted-foreground">Fill in the details below to publish your event.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input id="event-name" placeholder="e.g., Annual Tech Summit" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-date">Date</Label>
                <Input id="event-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <Input id="event-location" placeholder="e.g., Mumbai, India" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-description">Description</Label>
              <Textarea id="event-description" placeholder="Describe your event in a few words..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="event-image">Event Banner Image</Label>
                <Input id="event-image" type="file" />
                <p className="text-xs text-muted-foreground">Upload an attractive banner for your event.</p>
            </div>
             <div className="space-y-2">
                <Label htmlFor="event-tags">Tags</Label>
                <Input id="event-tags" placeholder="e.g., Tech, Networking, AI (comma-separated)" />
            </div>
            <Button type="submit" className="w-full">Create Event</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
