"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchMyBookings } from '@/store/bookingSlice';

// Guest Lookup Form Component
function GuestLookupForm({ onSubmit, loading }) {
  const [email, setEmail] = useState('');
  const [reference, setReference] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, reference);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Find Your Booking</h2>
        <p className="text-gray-600 dark:text-gray-400">Enter your email and booking reference to view your confirmation</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Booking Reference
          </label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value.toUpperCase())}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
            placeholder="e.g., BH123456"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Searching...
            </>
          ) : (
            'Find Booking'
          )}
        </button>
      </form>
    </div>
  );
}

export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { list: bookings, loading } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.auth);
  
  const [booking, setBooking] = useState(null);
  const [showGuestLookup, setShowGuestLookup] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  // Try to find booking by ID or reference
  const findBooking = (bookingsList, identifier) => {
    return bookingsList.find(b => 
      b.booking_reference === identifier || 
      b.id === parseInt(identifier) ||
      b.booking_reference === identifier.toUpperCase()
    );
  };

  // Initial load - check existing bookings or fetch user bookings
  useEffect(() => {
    if (!params.id) return;

    const existingBooking = findBooking(bookings, params.id);
    
    if (existingBooking) {
      setBooking(existingBooking);
      setSearchAttempted(true);
    } else if (user && !searchAttempted) {
      // User is logged in, fetch their bookings
      dispatch(fetchMyBookings()).then(() => {
        setSearchAttempted(true);
      });
    } else if (!user && !searchAttempted) {
      // Not logged in, show guest lookup after a delay
      setTimeout(() => {
        setShowGuestLookup(true);
        setSearchAttempted(true);
      }, 1000);
    }
  }, [params.id, user, dispatch, searchAttempted, bookings]);

  // Update booking when bookings list changes
  useEffect(() => {
    if (params.id && bookings.length > 0 && !booking) {
      const foundBooking = findBooking(bookings, params.id);
      if (foundBooking) {
        setBooking(foundBooking);
        setShowGuestLookup(false);
      }
    }
  }, [bookings, params.id, booking]);

  // Handle guest lookup
  const handleGuestLookup = async (email, reference) => {
    setGuestLoading(true);
    try {
      // Simulate API call - replace with actual fetchGuestBooking dispatch
      const result = await dispatch(fetchGuestBooking({ 
        email, 
        booking_reference: reference 
      }));
      
      if (result.payload && result.payload.length > 0) {
        setBooking(result.payload[0]);
        setShowGuestLookup(false);
      } else {
        alert('Booking not found. Please check your email and reference number.');
      }
    } catch {
      alert('Error finding booking. Please try again.');
    } finally {
      setGuestLoading(false);
    }
  };

  // Loading state
  if (loading || (!booking && !showGuestLookup && !searchAttempted)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show guest lookup form
  if (showGuestLookup && !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <GuestLookupForm onSubmit={handleGuestLookup} loading={guestLoading} />
          
          <div className="text-center mt-8">
            <Link href="/rooms" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Back to Rooms
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Booking not found
  if (!booking && searchAttempted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-4">Booking Not Found</h2>
            <p className="text-yellow-600 dark:text-yellow-400 mb-6">
              We couldn`t find the booking you`re looking for. Please check your booking reference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <button
                  onClick={() => setShowGuestLookup(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Search Again
                </button>
              )}
              <Link
                href="/rooms"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse Rooms
              </Link>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total nights and price
  const checkIn = new Date(booking.check_in);
  const checkOut = new Date(booking.check_out);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const totalPrice = booking.total_price || (nights * (booking.room?.price_per_night || 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/80 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              booking.status === 'confirmed' 
                ? 'bg-green-500/30 text-green-100' 
                : booking.status === 'pending'
                ? 'bg-yellow-500/30 text-yellow-100'
                : 'bg-red-500/30 text-red-100'
            }`}>
              {booking.status?.toUpperCase() || 'PENDING'}
            </span>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-xl opacity-90">
              Your stay at <span className="font-semibold">BOPHILL SUITES</span> is confirmed
            </p>
            <p className="text-lg mt-2 opacity-80">
              Confirmation sent to <span className="font-medium">{booking.guest_email}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking Summary Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Booking Summary</h3>
              
              <div className="space-y-6">
                {/* Guest Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Guest Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="font-medium text-gray-900 dark:text-white">{booking.guest_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{booking.guest_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium text-gray-900 dark:text-white">{booking.guest_phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Guests</p>
                      <p className="font-medium text-gray-900 dark:text-white">{booking.number_of_guests} person(s)</p>
                    </div>
                  </div>
                </div>

                {/* Stay Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Stay Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {checkIn.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">After 3:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Check-out</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {checkOut.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Before 11:00 AM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                      <p className="font-medium text-gray-900 dark:text-white">{nights} night(s)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Booking Reference</p>
                      <p className="font-medium text-gray-900 dark:text-white font-mono text-lg">{booking.booking_reference}</p>
                    </div>
                  </div>
                </div>

                {/* Room Information */}
                {booking.room && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Room Information</h4>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-lg">
                            Room {booking.room.room_number} - {booking.room.theme}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">{booking.room.room_type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Price per night</p>
                          <p className="font-bold text-gray-900 dark:text-white text-lg">
                            ${booking.room.price_per_night || booking.room.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Special Requests */}
                {booking.special_requests && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Special Requests</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <p className="text-gray-700 dark:text-gray-300">{booking.special_requests}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hotel Policies */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hotel Policies</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free cancellation up to 48 hours before check-in</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Late check-out subject to availability and additional charges</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pets not allowed</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Smoking prohibited in all rooms</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Actions & Price */}
          <div className="space-y-8">
            {/* Price Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Price Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Room rate ({nights} nights)</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${(booking.room?.price_per_night || booking.room?.price || 0) * nights}
                  </span>
                </div>
                
                {booking.taxes && booking.taxes > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Taxes & Fees</span>
                    <span className="font-medium text-gray-900 dark:text-white">${booking.taxes}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <p className="text-sm text-green-700 dark:text-green-300">
                  <span className="font-semibold">Payment Status:</span> {booking.payment_status || 'Pending'}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Payment is due at check-in
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Manage Your Booking</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => window.print()}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Confirmation
                </button>
                
                <button
                  onClick={() => {
                    const subject = `Booking Confirmation - ${booking.booking_reference}`;
                    const body = `Dear ${booking.guest_name},

Your booking at BOPHILL SUITES has been confirmed!

Booking Details:
- Reference: ${booking.booking_reference}
- Room: ${booking.room?.room_number} - ${booking.room?.theme}
- Check-in: ${checkIn.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
- Check-out: ${checkOut.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
- Duration: ${nights} night(s)
- Total: $${totalPrice.toFixed(2)}

We look forward to welcoming you!

Best regards,
BOPHILL SUITES Team`;
                    window.location.href = `mailto:${booking.guest_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  }}
                  className="w-full py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Confirmation
                </button>
                
                {booking.status === 'pending' && (
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
                        alert('Booking cancellation requested. Our team will process your request shortly.');
                      }
                    }}
                    className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Need help? Contact us at{' '}
                  <a href="mailto:support@bophillsuites.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    support@bophillsuites.com
                  </a>
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Digital Check-in</h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 inline-block">
                <div className="w-32 h-32 bg-white dark:bg-gray-600 rounded flex items-center justify-center mx-auto">
                  <svg className="w-24 h-24 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="0" y="0" width="20" height="20"/>
                    <rect x="30" y="0" width="10" height="10"/>
                    <rect x="50" y="0" width="10" height="10"/>
                    <rect x="80" y="0" width="20" height="20"/>
                    <rect x="0" y="30" width="10" height="10"/>
                    <rect x="20" y="30" width="10" height="10"/>
                    <rect x="40" y="30" width="30" height="10"/>
                    <rect x="80" y="30" width="10" height="10"/>
                    <rect x="0" y="50" width="10" height="10"/>
                    <rect x="30" y="50" width="20" height="10"/>
                    <rect x="60" y="50" width="10" height="10"/>
                    <rect x="80" y="50" width="10" height="10"/>
                    <rect x="0" y="80" width="20" height="20"/>
                    <rect x="40" y="80" width="10" height="10"/>
                    <rect x="60" y="80" width="10" height="10"/>
                    <rect x="80" y="80" width="20" height="20"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Scan this code at check-in for a faster experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}   