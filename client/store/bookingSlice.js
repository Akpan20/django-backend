import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

// Generate CAPTCHA
export const generateCaptcha = createAsyncThunk(
  "bookings/generateCaptcha",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/bookings/captcha/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Verify CAPTCHA
export const verifyCaptcha = createAsyncThunk(
  "bookings/verifyCaptcha",
  async ({ key, solution }, { rejectWithValue }) => {
    try {
      const res = await api.post("/bookings/captcha/verify/", { key, solution });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create booking
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const res = await api.post("/bookings/", bookingData);
      return res.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ error: error.message });
    }
  }
);

// Fetch user bookings
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/bookings/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch my bookings
export const fetchMyBookings = createAsyncThunk(
  "bookings/fetchMyBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/bookings/my_bookings/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch guest booking by email and reference
export const fetchGuestBooking = createAsyncThunk(
  "bookings/fetchGuestBooking",
  async ({ email, booking_reference }, { rejectWithValue }) => {
    try {
      const res = await api.get("/bookings/", {
        params: { email, booking_reference }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Cancel booking
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/bookings/${bookingId}/cancel/`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Confirm booking (admin)
export const confirmBooking = createAsyncThunk(
  "bookings/confirmBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/bookings/${bookingId}/confirm/`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch all rooms
export const fetchRooms = createAsyncThunk(
  "bookings/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const res = await api.get(`/bookings/rooms/?t=${timestamp}`);
      console.log(`Fetched rooms at ${timestamp}:`, res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch available rooms
export const fetchAvailableRooms = createAsyncThunk(
  "bookings/fetchAvailableRooms",
  async ({ check_in, check_out, guests, room_type }, { rejectWithValue }) => {
    try {
      const params = {};
      if (check_in) params.check_in = check_in;
      if (check_out) params.check_out = check_out;
      if (guests) params.guests = guests;
      if (room_type) params.room_type = room_type;
      
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      params.t = timestamp;
      
      console.log(`Fetching available rooms with params:`, params);
      const res = await api.get("/bookings/rooms/available/", { params });
      console.log(`Available rooms response:`, res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching available rooms:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Force refresh rooms (explicitly clear any caches)
export const forceRefreshRooms = createAsyncThunk(
  "bookings/forceRefreshRooms",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Clear existing rooms in state first
      dispatch(clearRooms());
      
      // Fetch fresh data with a unique timestamp
      const timestamp = new Date().getTime();
      const randomSuffix = Math.random().toString(36).substring(7);
      const res = await api.get(`/bookings/rooms/?t=${timestamp}_${randomSuffix}&force=true`);
      
      console.log(`Force refreshed rooms:`, res.data);
      return res.data;
    } catch (error) {
      console.error("Error force refreshing rooms:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Check room availability
export const checkRoomAvailability = createAsyncThunk(
  "bookings/checkRoomAvailability",
  async ({ roomId, start_date, end_date }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/bookings/rooms/${roomId}/availability/`, {
        params: { start_date, end_date }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    rooms: [],
    availableRooms: [],
    loading: false,
    error: null,
    success: false,
    captcha: {
      key: null,
      image: null,
      expires_at: null,
      loading: false,
      error: null,
      verified: false,
    },
    availability: {
      loading: false,
      error: null,
      bookings: [],
    },
  },
  reducers: {
    updateRoomStatus: (state, action) => {
      const { roomId, status, nextAvailableDate } = action.payload;
      state.rooms = state.rooms.map(room => 
        room.id === roomId 
          ? { 
              ...room, 
              current_status: status,
              status: status,
              ...(nextAvailableDate && { next_available_date: nextAvailableDate })
            } 
          : room
      );
    },
    clearRooms: (state) => {
      state.rooms = [];
      state.availableRooms = [];
    },
    resetBookingState: (state) => {
      state.success = false;
      state.error = null;
    },
    clearBookings: (state) => {
      state.list = [];
    },
    clearCaptcha: (state) => {
      state.captcha = {
        key: null,
        image: null,
        expires_at: null,
        loading: false,
        error: null,
        verified: false,
      };
    },
    resetAvailability: (state) => {
      state.availability = {
        loading: false,
        error: null,
        bookings: [],
      };
    },
    // Add a new action to reset everything
    resetAll: (state) => {
      state.list = [];
      state.rooms = [];
      state.availableRooms = [];
      state.loading = false;
      state.error = null;
      state.success = false;
      state.captcha = {
        key: null,
        image: null,
        expires_at: null,
        loading: false,
        error: null,
        verified: false,
      };
      state.availability = {
        loading: false,
        error: null,
        bookings: [],
      };
    },
    // Add action to clear loading state
    clearLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate CAPTCHA
      .addCase(generateCaptcha.pending, (state) => {
        state.captcha.loading = true;
        state.captcha.error = null;
      })
      .addCase(generateCaptcha.fulfilled, (state, action) => {
        state.captcha.loading = false;
        state.captcha.key = action.payload.key;
        state.captcha.image = action.payload.image_base64;
        state.captcha.expires_at = action.payload.expires_at;
        state.captcha.verified = false;
      })
      .addCase(generateCaptcha.rejected, (state, action) => {
        state.captcha.loading = false;
        state.captcha.error = action.payload;
      })
      // Verify CAPTCHA
      .addCase(verifyCaptcha.pending, (state) => {
        state.captcha.loading = true;
      })
      .addCase(verifyCaptcha.fulfilled, (state, action) => {
        state.captcha.loading = false;
        state.captcha.verified = action.payload.valid;
        if (!action.payload.valid) {
          state.captcha.error = action.payload.error;
        }
      })
      .addCase(verifyCaptcha.rejected, (state, action) => {
        state.captcha.loading = false;
        state.captcha.verified = false;
        state.captcha.error = action.payload;
      })
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        // 1. Add booking to list
        state.list.push(action.payload);
        
        // 2. Update the specific room's status to "booked"
        const bookedRoomId = action.payload.room;
        state.rooms = state.rooms.map(room => 
          room.id === bookedRoomId 
            ? { 
                ...room, 
                current_status: 'booked',
                status: 'booked',
                next_available_date: action.payload.check_out
              } 
            : room
        );
        
        // 3. Also update in availableRooms if present
        state.availableRooms = state.availableRooms.filter(
          room => room.id !== bookedRoomId
        );
        
        // 4. Clear CAPTCHA
        state.captcha = {
          key: null,
          image: null,
          expires_at: null,
          loading: false,
          error: null,
          verified: false,
        };
        
        console.log(`✅ Booking created for room ${bookedRoomId}. Room status updated to 'booked'.`);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch my bookings
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch guest booking
      .addCase(fetchGuestBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuestBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchGuestBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Cancel booking
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
          
          // Update room status back to "available"
          const cancelledRoomId = action.payload.room;
          state.rooms = state.rooms.map(room => 
            room.id === cancelledRoomId 
              ? { 
                  ...room, 
                  current_status: 'available',
                  status: 'available',
                  next_available_date: null
                } 
              : room
          );
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Confirm booking
      .addCase(confirmBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch available rooms
      .addCase(fetchAvailableRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.availableRooms = action.payload;
      })
      .addCase(fetchAvailableRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Force refresh rooms
      .addCase(forceRefreshRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forceRefreshRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(forceRefreshRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check room availability
      .addCase(checkRoomAvailability.pending, (state) => {
        state.availability.loading = true;
        state.availability.error = null;
      })
      .addCase(checkRoomAvailability.fulfilled, (state, action) => {
        state.availability.loading = false;
        state.availability.bookings = action.payload.bookings;
      })
      .addCase(checkRoomAvailability.rejected, (state, action) => {
        state.availability.loading = false;
        state.availability.error = action.payload;
      });
  },
});

export const { 
  clearRooms,
  resetBookingState, 
  clearBookings, 
  clearCaptcha,
  resetAvailability,
  resetAll,
  clearLoading,
  updateRoomStatus 
} = bookingSlice.actions;
export default bookingSlice.reducer;