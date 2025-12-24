"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { fetchRooms } from '@/store/bookingSlice';
import BookingForm from '@/components/BookingForm';

export default function RoomDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  
  const { rooms, loading, error } = useSelector((state) => state.bookings);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Function to get club logo URL
  const getClubLogo = (theme) => {
    const logoMap = {
      'Arsenal': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      'Barcelona': 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
      'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
      'Chelsea': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
      'Inter Milan': 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
      'Liverpool': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
      'Manchester City': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
      'Manchester United': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
      'Napoli': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Neapel.svg',
      'Real Madrid': 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg'
    };
    return logoMap[theme] || null;
  };

  // Function to get club colors
  const getClubColors = (theme) => {
    const colorMap = {
      'Arsenal': { gradient: 'bg-gradient-to-br from-red-600 to-red-800' },
      'Barcelona': { gradient: 'bg-gradient-to-br from-blue-600 to-purple-600' },
      'Bayern Munich': { gradient: 'bg-gradient-to-br from-red-700 to-red-900' },
      'Chelsea': { gradient: 'bg-gradient-to-br from-blue-500 to-blue-700' },
      'Inter Milan': { gradient: 'bg-gradient-to-br from-blue-600 to-black' },
      'Liverpool': { gradient: 'bg-gradient-to-br from-red-600 to-red-800' },
      'Manchester City': { gradient: 'bg-gradient-to-br from-sky-400 to-sky-600' },
      'Manchester United': { gradient: 'bg-gradient-to-br from-red-600 to-red-900' },
      'Napoli': { gradient: 'bg-gradient-to-br from-blue-400 to-blue-600' },
      'Real Madrid': { gradient: 'bg-gradient-to-br from-white to-purple-100' }
    };
    return colorMap[theme] || { gradient: 'bg-gradient-to-br from-gray-800 to-gray-900' };
  };

  // Fetch rooms on component mount
  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [rooms.length, dispatch]);

  // Find selected room and similar rooms using useMemo
  const { selectedRoom, similarRooms } = useMemo(() => {
    if (rooms.length === 0) return { selectedRoom: null, similarRooms: [] };
    
    const roomId = parseInt(params.id);
    const selectedRoom = rooms.find(r => r.id === roomId || r.room_number === params.id);
    
    if (!selectedRoom) return { selectedRoom: null, similarRooms: [] };
    
    const similarRooms = rooms.filter(r => 
      (r.room_type === selectedRoom.room_type || r.theme === selectedRoom.theme) && 
      r.id !== selectedRoom.id
    ).slice(0, 3);
    
    return { selectedRoom, similarRooms };
  }, [rooms, params.id]);

  // Handle booking
  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  if (loading && !selectedRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading room details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !selectedRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-4">Error Loading Room</h2>
            <p className="text-red-600 dark:text-red-400 mb-6">
              Could not load room details. Please try again.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => dispatch(fetchRooms())}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
              <Link
                href="/rooms"
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Back to Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-4">Room Not Found</h2>
            <p className="text-yellow-600 dark:text-yellow-400 mb-6">
              The room you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/rooms"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse All Rooms
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const colors = getClubColors(selectedRoom.theme);
  const roomStatus = (selectedRoom.current_status || selectedRoom.status || 'available').toLowerCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className={`${colors.gradient} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/rooms"
              className="flex items-center gap-2 text-white/80 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Rooms
            </Link>
            
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              roomStatus === 'available' 
                ? 'bg-green-500/30 text-green-100' 
                : 'bg-red-500/30 text-red-100'
            }`}>
              {roomStatus === 'available' ? 'Available' : 'Booked'}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {selectedRoom.room_number ? `Room ${selectedRoom.room_number}` : selectedRoom.name}
              </h1>
              <p className="text-xl opacity-90">{selectedRoom.theme} Theme</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{selectedRoom.room_type || 'Room'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>From ${selectedRoom.price_per_night || selectedRoom.price}/night</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              disabled={roomStatus !== 'available'}
              className={`px-8 py-3 rounded-lg text-lg font-semibold transition-all ${
                roomStatus === 'available'
                  ? 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-105'
                  : 'bg-gray-800/50 text-gray-400 cursor-not-allowed'
              }`}
            >
              {roomStatus === 'available' ? 'Book Now' : 'Currently Booked'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Image/Logo */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-96">
                {getClubLogo(selectedRoom.theme) ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full max-w-64 max-h-64">
                      <Image
                        src={getClubLogo(selectedRoom.theme)}
                        alt={`${selectedRoom.theme} logo`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`absolute inset-0 flex items-center justify-center ${colors.gradient}`}>
                    <span className="text-6xl">🏨</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Room</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedRoom.description || `Experience the ${selectedRoom.theme} themed room with premium amenities and comfort. This ${selectedRoom.room_type} room offers the perfect blend of luxury and functionality for your stay.`}
                </p>
              </div>
            </div>

            {/* Amenities */}
            {selectedRoom.amenities && selectedRoom.amenities.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Amenities & Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Form Modal */}
            {showBookingForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Book {selectedRoom.room_number ? `Room ${selectedRoom.room_number}` : selectedRoom.name}
                      </h3>
                      <button
                        onClick={() => setShowBookingForm(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <BookingForm 
                      preselectedRoomId={selectedRoom.id} 
                      onSuccess={() => {
                        setShowBookingForm(false);
                        dispatch(fetchRooms());
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info & Booking */}
          <div className="space-y-8">
            {/* Room Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Room Information</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Room Type</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedRoom.room_type}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Theme</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedRoom.theme}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Price Per Night</span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    ${selectedRoom.price_per_night || selectedRoom.price}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Max Capacity</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedRoom.max_capacity || 2} guests
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Room Size</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedRoom.room_type === 'Suite' ? '45 m²' : 
                     selectedRoom.room_type === 'Executive' ? '35 m²' : 
                     selectedRoom.room_type === 'Deluxe' ? '40 m²' : '30 m²'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 dark:text-gray-400">Bed Type</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedRoom.max_capacity > 2 ? 'King + Twin' : 'King Size'}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleBookNow}
                disabled={roomStatus !== 'available'}
                className={`w-full mt-8 py-4 rounded-xl text-lg font-semibold transition-all ${
                  roomStatus === 'available'
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {roomStatus === 'available' 
                  ? `Book Now - $${selectedRoom.price_per_night || selectedRoom.price}/night` 
                  : 'Currently Unavailable'}
              </button>
            </div>

            {/* Policies */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hotel Policies</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Check-in: 3:00 PM | Check-out: 11:00 AM</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free cancellation up to 48 hours before check-in</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Non-smoking room</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pets not allowed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Similar Rooms */}
        {similarRooms.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Similar Rooms</h2>
              <Link
                href="/rooms"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All Rooms
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarRooms.map(room => (
                <Link
                  key={room.id}
                  href={`/rooms/${room.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <div className="relative h-48">
                    <div className={`absolute inset-0 ${getClubColors(room.theme).gradient} flex items-center justify-center`}>
                      {getClubLogo(room.theme) && (
                        <div className="relative w-32 h-32">
                          <Image
                            src={getClubLogo(room.theme)}
                            alt={`${room.theme} logo`}
                            fill
                            className="object-contain opacity-80"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                      Room {room.room_number || room.id}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{room.theme}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        ${room.price_per_night || room.price}/night
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {room.max_capacity || 2} guests
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}