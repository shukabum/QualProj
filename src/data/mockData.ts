import { Building, Room, Booking } from "../types/booking";

export const mockRooms: Room[] = [
  {
    id: "1-1",
    name: "Room 101",
    isBooked: false,
  },
  {
    id: "1-2",
    name: "Room 102",
    isBooked: true,
    currentBooking: {
      id: "b1",
      roomId: "1-2",
      bookedBy: "John Doe",
      date: "2024-04-30",
      startTime: "09:00",
      endTime: "11:00",
      purpose: "Computer Science Lecture",
      attendees: 45,
      status: "confirmed",
      notes: "Need projector setup",
    },
  },
  {
    id: "1-3",
    name: "Room 103",
    isBooked: false,
  },
  {
    id: "2-1",
    name: "Room 201",
    isBooked: false,
  },
  {
    id: "2-2",
    name: "Room 202",
    isBooked: true,
    currentBooking: {
      id: "b2",
      roomId: "2-2",
      bookedBy: "Jane Smith",
      date: "2024-04-30",
      startTime: "14:00",
      endTime: "16:00",
      purpose: "Mathematics Workshop",
      attendees: 30,
      status: "confirmed",
    },
  },
  {
    id: "2-3",
    name: "Room 203",
    isBooked: false,
  },
];

export const mockBuildings: Building[] = [
  {
    id: "1",
    name: "Science Building",
    rooms: mockRooms.filter((room) => room.id.startsWith("1-")),
  },
  {
    id: "2",
    name: "Engineering Building",
    rooms: mockRooms.filter((room) => room.id.startsWith("2-")),
  },
];
