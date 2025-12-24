import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { 
  createBooking, 
  generateCaptcha, 
  clearCaptcha,
  fetchRooms,
  checkRoomAvailability,
  resetBookingState,
  clearRooms,
  forceRefreshRooms
} from '@/store/bookingSlice';

export default function BookingForm({ preselectedRoomId, onSuccess }) {
  const dispatch = useDispatch();
  const { 
    loading, 
    error, 
    success, 
    captcha, 
    rooms,
    availability
  } = useSelector((state) => state.bookings);
  
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    room: preselectedRoomId || '',
    check_in: '',
    check_out: '',
    number_of_guests: 1,
    special_requests: '',
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    captcha_solution: '',
  });

  const [refreshing, setRefreshing] = useState(false);
  const [roomsLoaded, setRoomsLoaded] = useState(false);
const [bookingConfirmation, setBookingConfirmation] = useState(null);
  // Filter rooms based on guest capacity
  const availableRooms = useMemo(() => {
    if (!rooms || rooms.length === 0) return [];
    
    return rooms.filter(room => {
      const capacity = room.max_capacity || 2;
      if (capacity < parseInt(formData.number_of_guests)) return false;
      return room.status === 'available';
    });
  }, [rooms, formData.number_of_guests]);

  const selectedRoomDetails = useMemo(() => {
    if (!formData.room || !rooms?.length) return null;
    return rooms.find(r => r.id === parseInt(formData.room)) || null;
  }, [formData.room, rooms]);

  // Fetch rooms on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await dispatch(fetchRooms()).unwrap();
        setRoomsLoaded(true);
        console.log("Rooms loaded successfully:", rooms?.length);
      } catch (error) {
        console.error("Failed to load rooms:", error);
        setRoomsLoaded(false);
      }
    };
    
    loadInitialData();
    
    if (!user) {
      dispatch(generateCaptcha());
    }
    return () => {
      dispatch(clearCaptcha());
      dispatch(resetBookingState());
    };
  }, [user, dispatch, rooms?.length]);

  // Check availability when room/dates change
  useEffect(() => {
    if (formData.room && formData.check_in && formData.check_out) {
      dispatch(checkRoomAvailability({
        roomId: formData.room,
        start_date: formData.check_in,
        end_date: formData.check_out
      }));
    }
  }, [formData.room, formData.check_in, formData.check_out, dispatch]);

  // Handle successful booking
  useEffect(() => {
    if (success && onSuccess) {
      // Store the latest booking from the list as confirmation
      const latestBooking = bookings.list[bookings.list.length - 1];
      if (latestBooking) {
        setBookingConfirmation({
          reference: latestBooking.booking_reference,
          roomNumber: latestBooking.room?.room_number || selectedRoomDetails?.room_number,
          checkIn: latestBooking.check_in,
          checkOut: latestBooking.check_out,
          totalPrice: latestBooking.total_price || totalPrice,
          guestName: latestBooking.guest_name,
          guestEmail: latestBooking.guest_email
        });
      }
      onSuccess();
    }
  }, [success, onSuccess, selectedRoomDetails, totalPrice]);

  // Handle refresh rooms
  const handleRefreshRooms = async () => {
    setRefreshing(true);
    try {
      // Clear current rooms from state
      dispatch(clearRooms());
      setFormData(prev => ({ ...prev, room: '' }));
      
      // Add small delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Fetch fresh data
      const result = await dispatch(forceRefreshRooms()).unwrap();
      
      console.log("Rooms refreshed:", result?.length || 0, "rooms loaded");
      
      if (result?.length > 0) {
        // If there was a preselected room, try to restore it
        if (preselectedRoomId && result.some(r => r.id === parseInt(preselectedRoomId))) {
          setFormData(prev => ({ ...prev, room: preselectedRoomId }));
        }
      }
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleRegenerateCaptcha = () => {
    dispatch(generateCaptcha());
    setFormData(prev => ({ ...prev, captcha_solution: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoomChange = (e) => {
    const roomId = e.target.value;
    setFormData(prev => ({ ...prev, room: roomId }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validation
  if (!formData.room || !formData.check_in || !formData.check_out) {
    alert('Please fill in all required fields');
    return;
  }
  
  const checkInDate = new Date(formData.check_in);
  const checkOutDate = new Date(formData.check_out);
  if (checkOutDate <= checkInDate) {
    alert('Check-out date must be after check-in date');
    return;
  }
  
  const selectedRoom = rooms.find(r => r.id === parseInt(formData.room));
  if (selectedRoom) {
    const maxCapacity = selectedRoom.max_capacity || 2;
    if (parseInt(formData.number_of_guests) > maxCapacity) {
      alert(`This room can only accommodate ${maxCapacity} guests maximum`);
      return;
    }
  }

  if (availability.bookings && availability.bookings.length > 0) {
    alert('Room is not available for selected dates. Please choose different dates.');
    return;
  }
  
  const bookingData = {
    room: parseInt(formData.room),
    check_in: formData.check_in,
    check_out: formData.check_out,
    number_of_guests: parseInt(formData.number_of_guests),
    special_requests: formData.special_requests,
    guest_name: formData.guest_name,
    guest_email: formData.guest_email,
    guest_phone: formData.guest_phone,
  };

  if (!user) {
    bookingData.captcha_solution = formData.captcha_solution;
    bookingData.captcha_key = captcha.key;
  } else {
    bookingData.user = user.id;
  }

  const result = await dispatch(createBooking(bookingData));
  
  if (createBooking.fulfilled.match(result)) {
    // Store booking confirmation details
    const bookingConfirmation = {
      reference: result.payload.booking_reference,
      roomNumber: selectedRoomDetails?.room_number,
      checkIn: formData.check_in,
      checkOut: formData.check_out,
      totalPrice: totalPrice,
      guestName: formData.guest_name,
      guestEmail: formData.guest_email
    };
    
    // Show detailed confirmation
    alert(`✅ Booking Successful!\n\n📋 Booking Reference: ${bookingConfirmation.reference}\n🏨 Room: ${bookingConfirmation.roomNumber}\n📅 Dates: ${bookingConfirmation.checkIn} to ${bookingConfirmation.checkOut}\n💰 Total: $${bookingConfirmation.totalPrice.toFixed(2)}\n\nA confirmation email has been sent to ${bookingConfirmation.guestEmail}`);
    
    // Refresh rooms to update status
    dispatch(fetchRooms());
    
    // Reset form
    setFormData({
      room: preselectedRoomId || '',
      check_in: '',
      check_out: '',
      number_of_guests: 1,
      special_requests: '',
      guest_name: '',
      guest_email: '',
      guest_phone: '',
      captcha_solution: '',
    });
    
    // Call onSuccess callback
    if (onSuccess) {
      onSuccess();
    }
  } else if (createBooking.rejected.match(result) && !user) {
    handleRegenerateCaptcha();
  }
};

  const getToday = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMinCheckoutDate = () => {
    if (!formData.check_in) return getToday();
    const nextDay = new Date(formData.check_in);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const calculateTotalPrice = () => {
    if (!formData.check_in || !formData.check_out || !selectedRoomDetails) return 0;
    
    const checkIn = new Date(formData.check_in);
    const checkOut = new Date(formData.check_out);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    const price = selectedRoomDetails.price_per_night || 100;
    return nights * parseFloat(price);
  };

  const isRoomAvailable = () => {
    if (!availability.bookings) return true;
    return availability.bookings.length === 0;
  };

  const inputStyle = "w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all shadow-sm";
  const labelStyle = "block text-sm font-bold text-slate-800 mb-1.5 ml-1";
  const sectionStyle = "border-b border-slate-200 pb-6 mb-6";

  const totalPrice = calculateTotalPrice();
  const roomAvailable = isRoomAvailable();

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-50 rounded-2xl shadow-xl border border-slate-200">
      <div className="border-b border-slate-200 pb-4 mb-8">
        <h2 className="text-3xl font-black text-slate-900">Book a Room</h2>
        <p className="text-slate-500 mt-1">Complete the details below to secure your stay.</p>
      </div>
      
      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-blue-800 font-medium">
                Debug: {rooms?.length || 0} rooms loaded | 
                Available: {availableRooms.length} | 
                Selected: {formData.room || 'None'}
              </p>
            </div>
            <button
              onClick={handleRefreshRooms}
              disabled={refreshing}
              className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded font-medium disabled:opacity-50"
            >
              {refreshing ? 'Refreshing...' : 'Force Refresh'}
            </button>
          </div>
        </div>
      )}
      
      {success && (
      <div className="mb-6 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 rounded-lg shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg text-emerald-800 mb-1">Booking Confirmed!</h4>
            <p className="text-emerald-700 mb-2">
              Your booking has been successfully created. Check your email for the confirmation details.
            </p>
            <div className="mt-3 p-3 bg-white rounded border border-emerald-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Note:</span> The room status will update automatically. 
                You may need to refresh the page to see the updated status.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
      {bookingConfirmation && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600">Your booking details have been sent to {bookingConfirmation.guestEmail}</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Booking Reference</p>
                <p className="font-bold text-gray-900">{bookingConfirmation.reference}</p>
              </div>
              <div>
                <p className="text-gray-500">Room Number</p>
                <p className="font-bold text-gray-900">{bookingConfirmation.roomNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Check-in</p>
                <p className="font-bold text-gray-900">{bookingConfirmation.checkIn}</p>
              </div>
              <div>
                <p className="text-gray-500">Check-out</p>
                <p className="font-bold text-gray-900">{bookingConfirmation.checkOut}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-emerald-600">${bookingConfirmation.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setBookingConfirmation(null)}
              className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Option to print or save confirmation
                window.print();
              }}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Print Confirmation
            </button>
          </div>
        </div>
      </div>
    )}
      {error && (
        <div className="mb-6 p-4 bg-rose-100 border-l-4 border-rose-500 text-rose-800 font-medium rounded-r shadow-sm">
          <div className="font-bold mb-1">Booking Error:</div>
          {typeof error === 'object' ? (
            <ul className="list-disc pl-5 space-y-1">
              {Object.entries(error).map(([field, messages]) => (
                <li key={field}>
                  <span className="font-semibold">{field}:</span> {Array.isArray(messages) ? messages.join(', ') : messages}
                </li>
              ))}
            </ul>
          ) : (
            <div>{error}</div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Guest Information Section */}
        <div className={sectionStyle}>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Guest Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Full Name *</label>
              <input
                type="text"
                name="guest_name"
                value={formData.guest_name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className={inputStyle}
              />
            </div>
            
            <div>
              <label className={labelStyle}>Email Address *</label>
              <input
                type="email"
                name="guest_email"
                value={formData.guest_email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className={inputStyle}
              />
            </div>
            
            <div>
              <label className={labelStyle}>Phone Number *</label>
              <input
                type="tel"
                name="guest_phone"
                value={formData.guest_phone}
                onChange={handleChange}
                required
                placeholder="+1 (555) 123-4567"
                className={inputStyle}
              />
            </div>
            
            <div>
              <label className={labelStyle}>Number of Guests *</label>
              <input
                type="number"
                name="number_of_guests"
                value={formData.number_of_guests}
                onChange={handleChange}
                min="1"
                max="10"
                required
                className={inputStyle}
              />
              <p className="text-xs text-slate-500 mt-1 ml-1">
                Rooms will be filtered based on capacity
              </p>
            </div>
          </div>
        </div>

        {/* Dates Section */}
        <div className={sectionStyle}>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Dates of Stay</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Check-in Date *</label>
              <input
                type="date"
                name="check_in"
                value={formData.check_in}
                onChange={handleChange}
                required
                min={getToday()}
                className={inputStyle}
              />
              <p className="text-xs text-slate-500 mt-1 ml-1">Earliest check-in is today</p>
            </div>

            <div>
              <label className={labelStyle}>Check-out Date *</label>
              <input
                type="date"
                name="check_out"
                value={formData.check_out}
                onChange={handleChange}
                required
                min={getMinCheckoutDate()}
                className={inputStyle}
                disabled={!formData.check_in}
              />
              <p className="text-xs text-slate-500 mt-1 ml-1">
                {formData.check_in ? 'Minimum 1 night stay' : 'Select check-in date first'}
              </p>
            </div>
          </div>
          
          {formData.check_in && formData.check_out && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                Selected stay: {formData.check_in} to {formData.check_out} 
                ({Math.ceil((new Date(formData.check_out) - new Date(formData.check_in)) / (1000 * 60 * 60 * 24))} nights)
              </p>
            </div>
          )}
        </div>

        {/* Room Selection Section with Refresh Button */}
        <div className={sectionStyle}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-900">Room Selection</h3>
            
            <button
              type="button"
              onClick={handleRefreshRooms}
              disabled={refreshing || loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh room availability"
            >
              {refreshing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
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
          
          <div>
            {loading && !roomsLoaded ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-slate-600">Loading rooms...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {availableRooms.length === 0 ? (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 font-medium">
                      {rooms.length === 0 
                        ? 'No rooms found. Click "Refresh Rooms" to try again.'
                        : `No rooms available for ${formData.number_of_guests} guest${formData.number_of_guests > 1 ? 's' : ''}.`
                      }
                    </p>
                    <p className="text-amber-600 text-sm mt-1">
                      {rooms.length > 0 && 'Try reducing the number of guests or check back later.'}
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className={labelStyle}>Select Room *</label>
                    <select
                      name="room"
                      value={formData.room}
                      onChange={handleRoomChange}
                      required
                      className={inputStyle}
                    >
                      <option value="">Select a room...</option>
                      {availableRooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          Room {room.room_number} - {room.room_type} 
                          (${room.price_per_night}/night) - Up to {room.max_capacity} guests
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {availability.loading && formData.room && formData.check_in && formData.check_out && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-blue-800 font-medium flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span>Checking availability...</span>
                    </div>
                  </div>
                )}

                {!availability.loading && formData.room && formData.check_in && formData.check_out && (
                  <div className={`p-3 rounded-lg border ${roomAvailable ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                    <p className={`font-medium ${roomAvailable ? 'text-emerald-800' : 'text-rose-800'}`}>
                      {roomAvailable ? '✓ Room is available for selected dates' : '✗ Room is not available for selected dates'}
                    </p>
                    {!roomAvailable && (
                      <p className="text-sm text-rose-600 mt-1">
                        Please select different dates or a different room.
                      </p>
                    )}
                  </div>
                )}
                
                {selectedRoomDetails && (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-300 mt-4">
                    <h4 className="font-bold text-slate-800 mb-3">Selected Room Details:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-slate-600">Room:</span> Room {selectedRoomDetails.room_number}
                      </div>
                      <div>
                        <span className="font-medium text-slate-600">Type:</span> {selectedRoomDetails.room_type}
                      </div>
                      {selectedRoomDetails.theme && (
                        <div>
                          <span className="font-medium text-slate-600">Theme:</span> {selectedRoomDetails.theme}
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-slate-600">Price:</span> ${selectedRoomDetails.price_per_night}/night
                      </div>
                      <div>
                        <span className="font-medium text-slate-600">Capacity:</span> {selectedRoomDetails.max_capacity} guests
                      </div>
                      <div>
                        <span className="font-medium text-slate-600">Status:</span> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${selectedRoomDetails.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {selectedRoomDetails.status}
                        </span>
                      </div>
                    </div>
                    
                    {formData.check_in && formData.check_out && (
                      <div className="mt-4 pt-4 border-t border-slate-300">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-slate-700">Total Price:</span>
                          <span className="text-lg font-bold text-slate-900">${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          ${selectedRoomDetails.price_per_night} × 
                          {Math.ceil((new Date(formData.check_out) - new Date(formData.check_in)) / (1000 * 60 * 60 * 24))} nights
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Special Requests */}
        <div className={sectionStyle}>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Additional Information</h3>
          <div>
            <label className={labelStyle}>Special Requests</label>
            <textarea
              name="special_requests"
              value={formData.special_requests}
              onChange={handleChange}
              rows="3"
              placeholder="E.g. Dietary requirements, late arrival, special occasions..."
              className={inputStyle}
            />
          </div>
        </div>

        {/* CAPTCHA Section */}
        {!user && (
          <div className="mb-6 p-5 bg-slate-200/50 rounded-xl border border-slate-300">
            <label className="block text-sm font-bold text-slate-800 mb-3">
              Security Verification
            </label>
            
            {captcha.loading ? (
              <div className="flex items-center gap-2 text-slate-600 animate-pulse">
                <div className="w-4 h-4 bg-slate-400 rounded-full animate-spin"></div>
                Loading secure image...
              </div>
            ) : captcha.image ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-40 h-14 bg-white border-2 border-slate-400 rounded-lg overflow-hidden shadow-inner">
                    <Image
                      src={`data:image/png;base64,${captcha.image}`}
                      alt="CAPTCHA"
                      fill
                      style={{ objectFit: 'contain', padding: '4px' }}
                      unoptimized={true}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRegenerateCaptcha}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors font-semibold text-sm"
                    title="Refresh Code"
                  >
                    Refresh Image
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                    Enter the code above *
                  </label>
                  <input
                    type="text"
                    name="captcha_solution"
                    value={formData.captcha_solution}
                    onChange={handleChange}
                    placeholder="Type the code exactly as shown"
                    required
                    className={inputStyle}
                  />
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || (!user && !captcha.image) || !formData.room || !roomAvailable || refreshing}
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:bg-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : totalPrice > 0 ? `Confirm Booking - $${totalPrice.toFixed(2)}` : 'Confirm Booking'}
          </button>
          
          <p className="text-slate-500 text-sm mt-3 text-center">
            * Required fields must be filled
          </p>
        </div>
      </form>
    </div>
  );
}