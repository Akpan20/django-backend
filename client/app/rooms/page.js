"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import RoomCard from "@/components/RoomCard";
import { fetchRooms, clearRooms } from "@/store/bookingSlice";

export default function RoomsPage() {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.bookings);
  const [filter, setFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Fetch rooms from API on component mount
  useEffect(() => {
    dispatch(fetchRooms());
    
    // Cleanup on unmount
    return () => {
      dispatch(clearRooms());
    };
  }, [dispatch]);

  const filteredRooms = rooms.filter((room) => {
    if (filter === "all") return true;
    if (filter === "available") return room.current_status === "available";
    if (filter === "booked") return room.current_status === "booked";
    return true;
  });

  const handleBookClick = (room) => {
    if (room.current_status === "available") {
      setSelectedRoom(room);
      setIsBookingModalOpen(true);
    }
  };

  if (loading && rooms.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-16 py-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  All Rooms - BOPHILL SUITES
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Premium hotel experience with themed rooms
                </p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading rooms...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error && rooms.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-16 py-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  All Rooms - BOPHILL SUITES
                </h1>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
              Error loading rooms
            </h3>
            <p className="text-red-600 dark:text-red-400 mb-4">
              {typeof error === 'string' ? error : 'Failed to load room data'}
            </p>
            <button
              onClick={() => dispatch(fetchRooms())}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-16 py-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  All Rooms - BOPHILL SUITES
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Premium hotel experience with themed rooms
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md transition ${
                  filter === "all" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                All Rooms
              </button>
              <button
                onClick={() => setFilter("available")}
                className={`px-4 py-2 rounded-md transition ${
                  filter === "available" 
                    ? "bg-green-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setFilter("booked")}
                className={`px-4 py-2 rounded-md transition ${
                  filter === "booked" 
                    ? "bg-yellow-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                Booked
              </button>
              
              {/* Refresh Button */}
              <button
                onClick={() => dispatch(fetchRooms())}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ml-auto flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Refresh Rooms
                  </>
                )}
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredRooms.length} of {rooms.length} rooms
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onBookClick={() => handleBookClick(room)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🏨</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No rooms found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {filter === "available" 
                  ? "No available rooms at the moment. Try refreshing or check back later."
                  : "Try changing your filter criteria"}
              </p>
              <button
                onClick={() => setFilter("all")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2"
              >
                Show All Rooms
              </button>
              <button
                onClick={() => dispatch(fetchRooms())}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Refresh Data
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Need a custom booking?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Contact us for group bookings or special requests
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedRoom(null);
        }}
        room={selectedRoom}
      />
    </>
  );
}