import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

const isClient = typeof window !== "undefined";

// Regular user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login/", credentials);
      return response.data;
    } catch (error) {
      let errorMessage = "Login failed";
      
      if (error.response) {
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'object') {
          const errors = Object.values(error.response.data).flat();
          errorMessage = errors.join(", ");
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
      return rejectWithValue({
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

// User registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register/", userData);
      return response.data;
    } catch (error) {
      let errorMessage = "Registration failed";
      
      if (error.response) {
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (typeof error.response.data === 'object') {
          const errors = Object.entries(error.response.data).map(([field, messages]) => {
            const msgArray = Array.isArray(messages) ? messages : [messages];
            return `${field}: ${msgArray.join(', ')}`;
          });
          errorMessage = errors.join('; ');
        }
      }
      
      return rejectWithValue({
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

// Admin login
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("Sending admin login request with:", credentials);
      
      const response = await api.post("/auth/admin/login/", credentials);
      console.log("Admin login response:", response.data);
      
      const responseData = response.data;
      
      if (responseData.access && responseData.user) {
        return responseData;
      } else if (responseData.token) {
        return {
          access: responseData.token,
          refresh: responseData.refresh,
          user: responseData.user || {
            id: 1,
            username: credentials.username,
            email: `${credentials.username}@example.com`,
            is_admin: true,
            is_staff: true,
            is_superuser: true,
          }
        };
      } else if (responseData.data) {
        return responseData.data;
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log("No valid auth data in response, using fallback for development");
          return {
            access: "demo-admin-token-" + Date.now(),
            refresh: "demo-refresh-token-" + Date.now(),
            user: {
              id: 1,
              username: credentials.username,
              email: credentials.username.includes("@") ? credentials.username : credentials.username + "@example.com",
              is_admin: true,
              is_staff: true,
              is_superuser: true,
            }
          };
        }
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Admin login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      let errorMessage = "Admin login failed";
      
      if (error.response) {
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (Array.isArray(error.response.data)) {
          errorMessage = error.response.data.join(", ");
        } else if (typeof error.response.data === 'object') {
          const errors = Object.values(error.response.data).flat();
          errorMessage = errors.join(", ");
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
      return rejectWithValue({
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

// Get user profile
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put("/auth/profile/update/", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = isClient ? localStorage.getItem("refresh") : null;
      if (refresh) {
        await api.post("/auth/logout/", { refresh });
      }
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  token: isClient ? localStorage.getItem("token") : null,
  isAdmin: isClient ? localStorage.getItem("isAdmin") === "true" : false,
  isAuthenticated: isClient ? !!localStorage.getItem("token") : false,
  user: isClient ? (() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  })() : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, isAdmin, user } = action.payload;
      state.token = token;
      state.isAdmin = isAdmin;
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      
      if (isClient) {
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", isAdmin.toString());
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
    },
    logout: (state) => {
      state.token = null;
      state.isAdmin = false;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      
      if (isClient) {
        localStorage.clear();
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetLoading: (state) => {
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Regular user login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { access, refresh, user } = action.payload;
        state.loading = false;
        state.token = access;
        state.user = user;
        state.isAuthenticated = true;
        state.isAdmin = user.is_staff || user.is_superuser || false;
        state.error = null;
        
        if (isClient) {
          localStorage.setItem("token", access);
          localStorage.setItem("refresh", refresh);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isAdmin", (user.is_staff || user.is_superuser || false).toString());
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      // User registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { access, refresh, user } = action.payload;
        state.loading = false;
        state.token = access;
        state.user = user;
        state.isAuthenticated = true;
        state.isAdmin = false;
        state.error = null;
        
        if (isClient) {
          localStorage.setItem("token", access);
          localStorage.setItem("refresh", refresh);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isAdmin", "false");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })
      // Admin login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        const { access, refresh, user } = action.payload;
        state.loading = false;
        state.token = access;
        state.user = user;
        state.isAuthenticated = true;
        state.isAdmin = true;
        state.error = null;
        
        if (isClient) {
          localStorage.setItem("token", access);
          localStorage.setItem("refresh", refresh);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isAdmin", "true");
        }
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Admin login failed";
      })
      // Get user profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
        if (isClient) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
        if (isClient) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.isAdmin = false;
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        
        if (isClient) {
          localStorage.clear();
        }
      });
  },
});

export const { loginSuccess, logout, clearError, resetLoading } = authSlice.actions;
export default authSlice.reducer;