"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LectureHallGrid from "../../../components/LectureHallGrid";
import { Building, Room, Booking } from "../../../types/booking";
import { mockBuildings } from "../../../data/mockData";

function isTimeOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
) {
  return startA < endB && startB < endA;
}

export default function NewBookingPage() {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    attendees: "",
    bookedBy: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [buildings, setBuildings] = useState<Building[]>(mockBuildings);

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!selectedRoom) {
      setError("Please select a room first");
      return;
    }

    // Load existing bookings
    const existingBookings: Booking[] = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    // Check for clash
    const clash = existingBookings.some(
      (b) =>
        b.roomId === selectedRoom.id &&
        b.date === formData.date &&
        isTimeOverlap(
          formData.startTime,
          formData.endTime,
          b.startTime,
          b.endTime
        )
    );

    if (clash) {
      setError(
        "Booking cannot be created: Time slot already booked for this lecture hall."
      );
      return;
    }

    // Create new booking
    const newBooking: Booking = {
      id: Date.now().toString(),
      roomId: selectedRoom.id,
      bookedBy: formData.bookedBy,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      purpose: formData.purpose,
      attendees: parseInt(formData.attendees),
      status: "confirmed",
    };

    // Update room status and current booking
    const updatedBuildings = buildings.map((building) => ({
      ...building,
      rooms: building.rooms.map((room) =>
        room.id === selectedRoom.id
          ? { ...room, isBooked: true, currentBooking: newBooking }
          : room
      ),
    }));

    setBuildings(updatedBuildings);
    setShowSuccess(true);

    // Store booking in localStorage
    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    // Reset form
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      purpose: "",
      attendees: "",
      bookedBy: "",
    });
    setSelectedRoom(null);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-5xl flex flex-col items-center justify-center">
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Booking created successfully!
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="w-full space-y-8">
        {/* Lecture Hall Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Select a Room
          </h2>
          <LectureHallGrid
            buildings={buildings}
            selectedRoom={selectedRoom || undefined}
            onRoomSelect={handleRoomSelect}
          />
        </div>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Booking Details
          </h2>
          {selectedRoom ? (
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Selected Room
                </label>
                <div className="mt-1 p-2 bg-gray-50 rounded text-center">
                  {selectedRoom.name}
                </div>
              </div>

              <div>
                <label
                  htmlFor="bookedBy"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="bookedBy"
                  name="bookedBy"
                  required
                  value={formData.bookedBy}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    required
                    value={formData.startTime}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    required
                    value={formData.endTime}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="purpose"
                  className="block text-sm font-medium text-gray-700"
                >
                  Purpose
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  required
                  value={formData.purpose}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="attendees"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Attendees
                </label>
                <input
                  type="number"
                  id="attendees"
                  name="attendees"
                  required
                  min="1"
                  value={formData.attendees}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Booking
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Please select a room first
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
