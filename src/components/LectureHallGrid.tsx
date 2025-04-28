"use client";

import { Building, Room } from "../types/booking";
import styles from "./LectureHallGrid.module.css";

interface LectureHallGridProps {
  buildings: Building[];
  selectedRoom?: Room;
  onRoomSelect?: (room: Room) => void;
}

export default function LectureHallGrid({
  buildings,
  selectedRoom,
  onRoomSelect,
}: LectureHallGridProps) {
  return (
    <div className="space-y-8">
      {buildings.map((building) => (
        <div key={building.id} className="space-y-4">
          <h3 className="text-xl font-semibold text-center mb-4">
            {building.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {building.rooms.map((room) => (
              <div key={room.id} className="w-full">
                <div
                  onClick={() => onRoomSelect?.(room)}
                  className={`${styles.room} ${
                    room.isBooked ? styles.booked : styles.available
                  } ${selectedRoom?.id === room.id ? styles.selected : ""}`}
                >
                  <span>{room.name}</span>
                </div>

                {/* Booking Details */}
                {selectedRoom?.id === room.id && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <h4 className="font-semibold text-lg mb-2">
                      Booking Details
                    </h4>
                    {room.currentBooking ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booked By:</span>
                          <span className="font-medium">
                            {room.currentBooking.bookedBy}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">
                            {room.currentBooking.date}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">
                            {room.currentBooking.startTime} -{" "}
                            {room.currentBooking.endTime}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Attendees:</span>
                          <span className="font-medium">
                            {room.currentBooking.attendees}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium capitalize">
                            {room.currentBooking.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Purpose:</span>
                          <span className="font-medium">
                            {room.currentBooking.purpose}
                          </span>
                        </div>
                        {room.currentBooking.notes && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Notes:</span>
                            <span className="font-medium">
                              {room.currentBooking.notes}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        This room is available for booking.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
