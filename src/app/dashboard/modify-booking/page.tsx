"use client";

import { useState, useEffect } from "react";
import { Booking, Room } from "../../../types/booking";
import { mockRooms } from "../../../data/mockData";

export default function ModifyBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    bookedBy: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    attendees: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  const handleBookingSelect = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      setFormData({
        bookedBy: booking.bookedBy,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        purpose: booking.purpose,
        attendees: booking.attendees.toString(),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingId) return;

    const updatedBookings = bookings.map((b) =>
      b.id === selectedBookingId
        ? {
            ...b,
            bookedBy: formData.bookedBy,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            purpose: formData.purpose,
            attendees: parseInt(formData.attendees),
          }
        : b
    );

    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getRoomName = (roomId: string) => {
    const room = mockRooms.find((r) => r.id === roomId);
    return room ? room.name : roomId;
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Modify Booking</h1>
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Booking updated successfully!
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Booking Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Select Booking to Modify
          </h2>
          <div className="space-y-4">
            {bookings.length === 0 && (
              <div className="text-gray-500 text-center">
                No bookings found.
              </div>
            )}
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedBookingId === booking.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleBookingSelect(booking.id)}
              >
                <div className="font-medium">{getRoomName(booking.roomId)}</div>
                <div className="text-sm text-gray-600">
                  {booking.date} | {booking.startTime} - {booking.endTime}
                </div>
                <div className="text-sm text-gray-500">{booking.purpose}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modification Form */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Modify Booking Details
          </h2>
          {selectedBookingId ? (
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
              <div>
                <label
                  htmlFor="bookedBy"
                  className="block text-sm font-medium text-gray-700"
                >
                  Booked By
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
                  Update Booking
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Please select a booking to modify
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
