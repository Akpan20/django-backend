"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmBooking, cancelBooking } from '@/store/bookingSlice';

export default function AdminBookingTable({ bookings, loading }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        booking.guest_name?.toLowerCase().includes(searchLower) ||
        booking.guest_email?.toLowerCase().includes(searchLower) ||
        booking.booking_reference?.toLowerCase().includes(searchLower) ||
        booking.room?.room_number?.toString().includes(searchLower);
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'guest_name':
          aValue = a.guest_name?.toLowerCase() || '';
          bValue = b.guest_name?.toLowerCase() || '';
          break;
        case 'check_in':
          aValue = new Date(a.check_in);
          bValue = new Date(b.check_in);
          break;
        case 'total_price':
          aValue = a.total_price || 0;
          bValue = b.total_price || 0;
          break;
        default:
          aValue = new Date(a.created_at || a.created_at);
          bValue = new Date(b.created_at || b.created_at);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleConfirmBooking = (bookingId) => {
    if (confirm('Are you sure you want to confirm this booking? This will mark it as confirmed and charge the guest.')) {
      dispatch(confirmBooking(bookingId));
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      dispatch(cancelBooking(bookingId));
    }
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusText = (status) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Bookings
            </label>
            <input
              type="text"
              placeholder="Search by name, email, reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="created_at">Date Created</option>
                <option value="check_in">Check-in Date</option>
                <option value="guest_name">Guest Name</option>
                <option value="total_price">Total Price</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-300"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{bookings.length}</div>
            <div className="text-sm text-blue-600">Total Bookings</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-700">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
            <div className="text-sm text-yellow-600">Pending</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-sm text-green-600">Confirmed</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-700">
              {bookings.filter(b => b.status === 'cancelled').length}
            </div>
            <div className="text-sm text-red-600">Cancelled</div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  onClick={() => handleSort('booking_reference')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Reference
                    {sortBy === 'booking_reference' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('guest_name')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Guest
                    {sortBy === 'guest_name' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th
                  onClick={() => handleSort('check_in')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Dates
                    {sortBy === 'check_in' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('total_price')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Total
                    {sortBy === 'total_price' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No bookings found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.booking_reference}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.guest_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.guest_email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.guest_phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Room {booking.room?.room_number}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.room?.room_type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.check_in).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        to {new Date(booking.check_out).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.number_of_guests} guest(s)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(booking.total_price)}
                      </div>
                      {booking.special_requests && (
                        <div className="text-xs text-gray-500 truncate max-w-xs" title={booking.special_requests}>
                          {booking.special_requests}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(booking.status)}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewBookingDetails(booking)}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded hover:bg-blue-50"
                        >
                          View
                        </button>
                        
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleConfirmBooking(booking.id)}
                              className="text-green-600 hover:text-green-900 px-3 py-1 rounded hover:bg-green-50"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-900 px-3 py-1 rounded hover:bg-red-50"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-900 px-3 py-1 rounded hover:bg-red-50"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Booking Details - {selectedBooking.booking_reference}
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Guest Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium">{selectedBooking.guest_name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{selectedBooking.guest_email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">{selectedBooking.guest_phone}</p>
                    </div>
                    {selectedBooking.user && (
                      <div>
                        <label className="text-sm text-gray-500">User Account</label>
                        <p className="font-medium">ID: {selectedBooking.user}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Reference</label>
                      <p className="font-medium font-mono">{selectedBooking.booking_reference}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <span className={getStatusBadge(selectedBooking.status)}>
                        {getStatusText(selectedBooking.status)}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Created</label>
                      <p className="font-medium">
                        {new Date(selectedBooking.created_at).toLocaleString()}
                      </p>
                    </div>
                    {selectedBooking.updated_at && (
                      <div>
                        <label className="text-sm text-gray-500">Last Updated</label>
                        <p className="font-medium">
                          {new Date(selectedBooking.updated_at).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Room Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Room Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Room Number</label>
                      <p className="font-medium">Room {selectedBooking.room?.room_number}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Room Type</label>
                      <p className="font-medium">{selectedBooking.room?.room_type}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Theme</label>
                      <p className="font-medium">{selectedBooking.room?.theme}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Price per Night</label>
                      <p className="font-medium">
                        {formatCurrency(selectedBooking.room?.price_per_night)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stay Details */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Stay Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Check-in</label>
                      <p className="font-medium">
                        {new Date(selectedBooking.check_in).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Check-out</label>
                      <p className="font-medium">
                        {new Date(selectedBooking.check_out).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Number of Nights</label>
                      <p className="font-medium">
                        {Math.ceil(
                          (new Date(selectedBooking.check_out) - new Date(selectedBooking.check_in)) /
                          (1000 * 60 * 60 * 24)
                        )} nights
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Number of Guests</label>
                      <p className="font-medium">{selectedBooking.number_of_guests} guest(s)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.special_requests && (
                <div className="mt-6 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h4 className="text-lg font-semibold text-yellow-900 mb-3">Special Requests</h4>
                  <p className="text-gray-700">{selectedBooking.special_requests}</p>
                </div>
              )}

              {/* Financial Summary */}
              <div className="mt-6 bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Financial Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      {formatCurrency(selectedBooking.total_price)}
                    </div>
                    <div className="text-sm text-blue-600">Total Amount</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-green-700">
                      {selectedBooking.payment_status === 'paid' ? 'Paid' : 'Pending'}
                    </div>
                    <div className="text-sm text-green-600">Payment Status</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">
                      {selectedBooking.payment_method || 'Not specified'}
                    </div>
                    <div className="text-sm text-purple-600">Payment Method</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300"
                >
                  Close
                </button>
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleConfirmBooking(selectedBooking.id);
                        setShowDetailsModal(false);
                      }}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                    >
                      Confirm Booking
                    </button>
                    <button
                      onClick={() => {
                        handleCancelBooking(selectedBooking.id);
                        setShowDetailsModal(false);
                      }}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    onClick={() => {
                      handleCancelBooking(selectedBooking.id);
                      setShowDetailsModal(false);
                    }}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}