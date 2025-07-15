import type { Event } from '@/lib/types';
import EventCard from '@/components/events/event-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { events } from '@/lib/events-data';

export default function EventsPage() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Discover Events</h1>
        <p className="text-muted-foreground">Find events happening all over India.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search by event name, city, or tag..." className="pl-10" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
