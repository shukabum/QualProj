export interface Room {
  id: string;
  name: string;
  isBooked: boolean;
  currentBooking?: Booking;
}

export interface Booking {
  id: string;
  roomId: string;
  bookedBy: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendees: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
}

export interface Building {
  id: string;
  name: string;
  rooms: Room[];
}
