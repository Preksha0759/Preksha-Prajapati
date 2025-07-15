export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string; // Made optional
  tags: string[];
}

export interface Application {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
