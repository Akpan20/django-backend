"use client";

export default function BookingReceipt({ booking, onClose }) {
  if (!booking) return null;

  // Calculate total nights and price
  const checkIn = new Date(booking.check_in);
  const checkOut = new Date(booking.check_out);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const totalPrice = booking.total_price || (nights * (booking.room?.price_per_night || 0));

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = `Booking Confirmation - ${booking.booking_reference}`;
    const body = `
Booking Confirmation - BOPHILL SUITES

Booking Reference: ${booking.booking_reference}
Guest Name: ${booking.guest_name}
Room: ${booking.room?.room_number} - ${booking.room?.theme}
Room Type: ${booking.room?.room_type}
Check-in: ${new Date(booking.check_in).toLocaleDateString()} (After 3:00 PM)
Check-out: ${new Date(booking.check_out).toLocaleDateString()} (Before 11:00 AM)
Duration: ${nights} night(s)
Guests: ${booking.number_of_guests}
Total Amount: $${totalPrice.toFixed(2)}

Special Requests: ${booking.special_requests || 'None'}

Status: ${booking.status?.toUpperCase()}

Hotel Policies:
• Free cancellation up to 48 hours before check-in
• Late check-out subject to availability
• Pets not allowed
• Smoking prohibited in all rooms

Contact: support@bophillsuites.com | +234 (802) 123-4567

Thank you for choosing BOPHILL SUITES!
    `;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Receipt Header */}
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Booking Receipt</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Booking Reference</p>
              <p className="font-mono font-bold text-lg text-gray-900">{booking.booking_reference}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              booking.status === 'confirmed' 
                ? 'bg-green-100 text-green-800' 
                : booking.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {booking.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6">
          {/* Hotel Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">BOPHILL SUITES</h1>
            <p className="text-gray-600">Premium Football-Themed Accommodations</p>
            <p className="text-gray-500 text-sm mt-1">Abuja, Nigeria | support@bophillsuites.com</p>
          </div>

          {/* Guest & Booking Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-bold text-gray-700 mb-2">Guest Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">{booking.guest_name}</p>
                <p className="text-gray-600 text-sm">{booking.guest_email}</p>
                <p className="text-gray-600 text-sm">{booking.guest_phone}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-700 mb-2">Booking Details</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm">Check-in</p>
                <p className="font-medium">{new Date(booking.check_in).toLocaleDateString()}</p>
                <p className="text-gray-600 text-sm mt-2">Check-out</p>
                <p className="font-medium">{new Date(booking.check_out).toLocaleDateString()}</p>
                <p className="text-gray-600 text-sm mt-2">Guests</p>
                <p className="font-medium">{booking.number_of_guests} person(s)</p>
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-3">Room Information</h3>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg text-gray-900">
                    Room {booking.room?.room_number} - {booking.room?.theme}
                  </p>
                  <p className="text-gray-600">{booking.room?.room_type}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Capacity: {booking.room?.max_capacity || 2} guests
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Price per night</p>
                  <p className="font-bold text-xl text-gray-900">
                    ${booking.room?.price_per_night || booking.room?.price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-4">Price Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Room ({nights} nights)</span>
                <span className="font-medium">
                  ${(booking.room?.price_per_night || booking.room?.price || 0) * nights}
                </span>
              </div>
              
              {booking.taxes && booking.taxes > 0 && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-medium">${booking.taxes}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-2 border-t-2 border-gray-300">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.special_requests && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-700 mb-2">Special Requests</h3>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                <p className="text-gray-700">{booking.special_requests}</p>
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          <div className="text-xs text-gray-500 mb-8">
            <p className="font-semibold mb-1">Terms & Conditions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Free cancellation up to 48 hours before check-in</li>
              <li>Check-in after 3:00 PM, check-out before 11:00 AM</li>
              <li>Valid ID required at check-in</li>
              <li>Pets not allowed in rooms</li>
              <li>Smoking prohibited throughout the property</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="text-center border-t pt-6">
            <p className="text-gray-600 mb-2">Thank you for choosing BOPHILL SUITES!</p>
            <p className="text-gray-500 text-sm">
              For inquiries: support@bophillsuites.com | +234 (802) 123-4567
            </p>
            <p className="text-gray-400 text-xs mt-4">
              Receipt generated on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Receipt
            </button>
            
            <button
              onClick={handleEmail}
              className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Receipt
            </button>
            
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}