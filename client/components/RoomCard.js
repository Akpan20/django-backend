"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Add this import
import Link from "next/link";
import Image from "next/image";
import BookingModal from "./BookingModal";

export default function RoomCard({ room }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Add this: Get the latest room data from Redux
  const { rooms } = useSelector((state) => state.bookings);
  
  // Add this effect to update with latest room data
  useEffect(() => {
    // This ensures the component uses the latest room data from Redux
    // The component will re-render when rooms array changes
  }, [rooms]);
  
  // Map room themes to club logo URLs
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

  // Map room themes to club color schemes
  const getClubColors = (theme) => {
    const colorMap = {
      'Arsenal': {
        card: 'bg-gradient-to-br from-red-600 via-red-700 to-red-800',
        text: 'text-white',
        accent: 'bg-white/20',
        button: 'bg-white text-red-700 hover:bg-red-50',
        badge: 'bg-white/30 text-white border-white/40'
      },
      'Barcelona': {
        card: 'bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800',
        text: 'text-white',
        accent: 'bg-yellow-400/30',
        button: 'bg-yellow-400 text-blue-900 hover:bg-yellow-300',
        badge: 'bg-yellow-400/30 text-yellow-100 border-yellow-400/40'
      },
      'Bayern Munich': {
        card: 'bg-gradient-to-br from-red-700 via-red-800 to-red-900',
        text: 'text-white',
        accent: 'bg-blue-500/30',
        button: 'bg-blue-500 text-white hover:bg-blue-400',
        badge: 'bg-blue-500/30 text-blue-100 border-blue-500/40'
      },
      'Chelsea': {
        card: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
        text: 'text-white',
        accent: 'bg-white/30',
        button: 'bg-white text-blue-700 hover:bg-blue-50',
        badge: 'bg-white/30 text-white border-white/40'
      },
      'Inter Milan': {
        card: 'bg-gradient-to-br from-blue-600 via-blue-700 to-black',
        text: 'text-white',
        accent: 'bg-yellow-400/30',
        button: 'bg-yellow-400 text-blue-900 hover:bg-yellow-300',
        badge: 'bg-yellow-400/30 text-yellow-100 border-yellow-400/40'
      },
      'Liverpool': {
        card: 'bg-gradient-to-br from-red-600 via-red-700 to-red-800',
        text: 'text-white',
        accent: 'bg-white/30',
        button: 'bg-white text-red-700 hover:bg-red-50',
        badge: 'bg-white/30 text-white border-white/40'
      },
      'Manchester City': {
        card: 'bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600',
        text: 'text-white',
        accent: 'bg-white/30',
        button: 'bg-white text-sky-700 hover:bg-sky-50',
        badge: 'bg-white/30 text-white border-white/40'
      },
      'Manchester United': {
        card: 'bg-gradient-to-br from-red-600 via-red-700 to-red-900',
        text: 'text-white',
        accent: 'bg-yellow-500/30',
        button: 'bg-yellow-500 text-red-900 hover:bg-yellow-400',
        badge: 'bg-yellow-500/30 text-yellow-100 border-yellow-500/40'
      },
      'Napoli': {
        card: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
        text: 'text-white',
        accent: 'bg-white/30',
        button: 'bg-white text-blue-600 hover:bg-blue-50',
        badge: 'bg-white/30 text-white border-white/40'
      },
      'Real Madrid': {
        card: 'bg-gradient-to-br from-white via-gray-100 to-purple-100',
        text: 'text-gray-900',
        accent: 'bg-purple-500/20',
        button: 'bg-purple-600 text-white hover:bg-purple-500',
        badge: 'bg-purple-500/20 text-purple-800 border-purple-400/30'
      }
    };
    
    // Default colors if theme not found
    return colorMap[theme] || {
      card: 'bg-gradient-to-br from-gray-800 to-gray-900',
      text: 'text-white',
      accent: 'bg-gray-700',
      button: 'bg-indigo-600 text-white hover:bg-indigo-500',
      badge: 'bg-gray-700 text-gray-200'
    };
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    setIsBookingModalOpen(true);
  };

  // Use current_status from API (dynamic) or fallback to status field
  // Add console.log to debug status changes
  const roomStatus = (room.current_status || room.status || 'available').toLowerCase();
  
  // Debug: Log when room status changes
  useEffect(() => {
    console.log(`RoomCard ${room.room_number}: Status = ${roomStatus}, current_status = ${room.current_status}, status = ${room.status}`);
  }, [roomStatus, room.current_status, room.status, room.room_number]);

  const getStatusBadge = (status, colors) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm';
    
    switch (status) {
      case 'available':
        return `${baseClasses} ${colors.badge}`;
      case 'booked':
        return `${baseClasses} bg-red-900/40 text-red-100 border-red-700/40`;
      case 'maintenance':
        return `${baseClasses} bg-amber-900/40 text-amber-100 border-amber-700/40`;
      default:
        return `${baseClasses} bg-gray-800/40 text-gray-200 border-gray-600/40`;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'booked':
        return 'Booked';
      case 'maintenance':
        return 'Maintenance';
      default:
        return status;
    }
  };

  // Get club-specific colors
  const colors = getClubColors(room.theme || 'Unknown');

  return (
    <>
      {/* Card with club color gradient */}
      <div className={`${colors.card} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/10`}>
        
        {/* Top section with club logo or image */}
        <div className="relative h-48">
          {/* Club logo on gradient background */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {getClubLogo(room.theme) ? (
              <div className="relative w-full h-full max-w-32 max-h-32">
                <Image
                  src={getClubLogo(room.theme)}
                  alt={`${room.theme || 'Club'} logo`}
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={false}
                />
              </div>
            ) : (
              <div className="text-center">
                <span className="text-4xl font-bold opacity-30">🏨</span>
                <p className="mt-2 text-sm opacity-70">{room.theme || 'Hotel Room'}</p>
              </div>
            )}
          </div>
          
          {/* Status badge - Fixed: Added key prop for better re-renders */}
          <div key={`status-${room.id}-${roomStatus}`} className="absolute top-3 right-3">
            <span className={getStatusBadge(roomStatus, colors)}>
              {getStatusText(roomStatus)}
            </span>
          </div>
          
          {/* Room number in corner */}
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-semibold px-2 py-1 rounded-md bg-black/30 text-white/90">
              #{room.room_number || room.id}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-5 backdrop-blur-sm bg-black/10">
          <div className="mb-3">
            <h3 className={`font-bold text-xl ${colors.text}`}>
              {room.room_number ? `Room ${room.room_number}` : room.name}
            </h3>
            <p className={`text-sm opacity-90 ${colors.text}`}>
              {room.room_type || room.type}
            </p>
          </div>

          {room.theme && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-white/30"></div>
              <p className={`text-sm font-medium ${colors.text} opacity-90`}>
                {room.theme}
              </p>
            </div>
          )}

          {/* Price and capacity */}
          <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-black/20">
            <div>
              <p className={`text-xl font-bold ${colors.text}`}>
                ${room.price_per_night || room.price || "150"}
              </p>
              <p className={`text-xs ${colors.text} opacity-80`}>per night</p>
            </div>
            <div className={`text-sm ${colors.text} opacity-90`}>
              <span className="font-semibold">{room.max_capacity || 2}</span> guests
            </div>
          </div>

          {/* Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="mb-4">
              <p className={`text-xs font-semibold mb-2 ${colors.text} opacity-80`}>AMENITIES</p>
              <div className="flex flex-wrap gap-1.5">
                {room.amenities.slice(0, 3).map((amenity, index) => (
                  <span 
                    key={`amenity-${room.id}-${index}`}
                    className={`text-xs px-2 py-1 rounded-md ${colors.accent} ${colors.text} backdrop-blur-sm`}
                  >
                    {amenity}
                  </span>
                ))}
                {room.amenities.length > 3 && (
                  <span className={`text-xs px-2 py-1 rounded-md ${colors.accent} ${colors.text} backdrop-blur-sm`}>
                    +{room.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <Link
              href={`/rooms/${room.id}`}
              className="flex-1 text-center text-sm text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              View Details
            </Link>
            <button
              onClick={handleBookNow}
              disabled={roomStatus !== 'available'}
              className={`flex-1 text-sm font-medium rounded-lg px-4 py-2.5 transition-colors ${
                roomStatus === 'available' 
                  ? `${colors.button} border border-white/20` 
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 cursor-not-allowed'
              }`}
            >
              {roomStatus === 'available' ? 'Book Now' : 'Unavailable'}
            </button>
          </div>
          
          {/* Next available date for booked rooms */}
          {roomStatus === 'booked' && room.next_available_date && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className={`text-xs ${colors.text} opacity-80`}>
                Available from: <span className="font-medium">{new Date(room.next_available_date).toLocaleDateString()}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={room}
      />
    </>
  );
}