(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ("TURBOPACK compile-time value", "http://localhost:8000/api") || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem("token");
        console.log("API Request:", {
            url: config.url,
            method: config.method,
            hasToken: !!token,
            tokenLength: token?.length,
            tokenPreview: token ? `${token.substring(0, 20)}...` : null
        });
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Authorization header set:", config.headers.Authorization);
        }
    }
    return config;
});
api.interceptors.response.use((response)=>{
    console.log("API Response Success:", {
        url: response.config.url,
        status: response.status
    });
    return response;
}, (error)=>{
    console.log("API Response Error:", {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        responseData: error.response?.data
    });
    if (error.response?.status === 401) {
        console.log("401 Unauthorized - Token might be invalid or expired");
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem("token");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("user");
            localStorage.removeItem("refresh");
            window.location.href = "/login";
        }
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/authSlice.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminLogin",
    ()=>adminLogin,
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getUserProfile",
    ()=>getUserProfile,
    "loginSuccess",
    ()=>loginSuccess,
    "loginUser",
    ()=>loginUser,
    "logout",
    ()=>logout,
    "logoutUser",
    ()=>logoutUser,
    "registerUser",
    ()=>registerUser,
    "resetLoading",
    ()=>resetLoading,
    "updateUserProfile",
    ()=>updateUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
;
;
const isClient = ("TURBOPACK compile-time value", "object") !== "undefined";
const loginUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/loginUser", async (credentials, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/auth/login/", credentials);
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
            data: error.response?.data
        });
    }
});
const registerUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/registerUser", async (userData, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/auth/register/", userData);
        return response.data;
    } catch (error) {
        let errorMessage = "Registration failed";
        if (error.response) {
            if (error.response.data.detail) {
                errorMessage = error.response.data.detail;
            } else if (typeof error.response.data === 'object') {
                const errors = Object.entries(error.response.data).map(([field, messages])=>{
                    const msgArray = Array.isArray(messages) ? messages : [
                        messages
                    ];
                    return `${field}: ${msgArray.join(', ')}`;
                });
                errorMessage = errors.join('; ');
            }
        }
        return rejectWithValue({
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data
        });
    }
});
const adminLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/adminLogin", async (credentials, { rejectWithValue })=>{
    try {
        console.log("Sending admin login request with:", credentials);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/auth/admin/login/", credentials);
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
                    is_superuser: true
                }
            };
        } else if (responseData.data) {
            return responseData.data;
        } else {
            if ("TURBOPACK compile-time truthy", 1) {
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
                        is_superuser: true
                    }
                };
            }
            //TURBOPACK unreachable
            ;
        }
    } catch (error) {
        console.error("Admin login error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
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
            data: error.response?.data
        });
    }
});
const getUserProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/getUserProfile", async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/auth/profile/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const updateUserProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/updateUserProfile", async (userData, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put("/auth/profile/update/", userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const logoutUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/logoutUser", async (_, { rejectWithValue })=>{
    try {
        const refresh = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("refresh") : "TURBOPACK unreachable";
        if (refresh) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/auth/logout/", {
                refresh
            });
        }
        return true;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const initialState = {
    token: ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") : "TURBOPACK unreachable",
    isAdmin: ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("isAdmin") === "true" : "TURBOPACK unreachable",
    isAuthenticated: ("TURBOPACK compile-time truthy", 1) ? !!localStorage.getItem("token") : "TURBOPACK unreachable",
    user: ("TURBOPACK compile-time truthy", 1) ? (()=>{
        const storedUser = localStorage.getItem("user");
        if (!storedUser || storedUser === "undefined") return null;
        try {
            return JSON.parse(storedUser);
        } catch  {
            return null;
        }
    })() : "TURBOPACK unreachable",
    loading: false,
    error: null
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action)=>{
            const { token, isAdmin, user } = action.payload;
            state.token = token;
            state.isAdmin = isAdmin;
            state.user = user;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("token", token);
                localStorage.setItem("isAdmin", isAdmin.toString());
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                }
            }
        },
        logout: (state)=>{
            state.token = null;
            state.isAdmin = false;
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.clear();
            }
        },
        clearError: (state)=>{
            state.error = null;
        },
        resetLoading: (state)=>{
            state.loading = false;
        }
    },
    extraReducers: (builder)=>{
        builder// Regular user login
        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(loginUser.fulfilled, (state, action)=>{
            const { access, refresh, user } = action.payload;
            state.loading = false;
            state.token = access;
            state.user = user;
            state.isAuthenticated = true;
            state.isAdmin = user.is_staff || user.is_superuser || false;
            state.error = null;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("token", access);
                localStorage.setItem("refresh", refresh);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("isAdmin", (user.is_staff || user.is_superuser || false).toString());
            }
        }).addCase(loginUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload?.message || "Login failed";
        })// User registration
        .addCase(registerUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(registerUser.fulfilled, (state, action)=>{
            const { access, refresh, user } = action.payload;
            state.loading = false;
            state.token = access;
            state.user = user;
            state.isAuthenticated = true;
            state.isAdmin = false;
            state.error = null;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("token", access);
                localStorage.setItem("refresh", refresh);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("isAdmin", "false");
            }
        }).addCase(registerUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload?.message || "Registration failed";
        })// Admin login
        .addCase(adminLogin.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(adminLogin.fulfilled, (state, action)=>{
            const { access, refresh, user } = action.payload;
            state.loading = false;
            state.token = access;
            state.user = user;
            state.isAuthenticated = true;
            state.isAdmin = true;
            state.error = null;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("token", access);
                localStorage.setItem("refresh", refresh);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("isAdmin", "true");
            }
        }).addCase(adminLogin.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload?.message || "Admin login failed";
        })// Get user profile
        .addCase(getUserProfile.pending, (state)=>{
            state.loading = true;
        }).addCase(getUserProfile.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        }).addCase(getUserProfile.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update user profile
        .addCase(updateUserProfile.pending, (state)=>{
            state.loading = true;
        }).addCase(updateUserProfile.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        }).addCase(updateUserProfile.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Logout
        .addCase(logoutUser.fulfilled, (state)=>{
            state.token = null;
            state.isAdmin = false;
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.clear();
            }
        });
    }
});
const { loginSuccess, logout, clearError, resetLoading } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/bookingSlice.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelBooking",
    ()=>cancelBooking,
    "checkRoomAvailability",
    ()=>checkRoomAvailability,
    "clearBookings",
    ()=>clearBookings,
    "clearCaptcha",
    ()=>clearCaptcha,
    "clearLoading",
    ()=>clearLoading,
    "clearRooms",
    ()=>clearRooms,
    "confirmBooking",
    ()=>confirmBooking,
    "createBooking",
    ()=>createBooking,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchAvailableRooms",
    ()=>fetchAvailableRooms,
    "fetchBookings",
    ()=>fetchBookings,
    "fetchGuestBooking",
    ()=>fetchGuestBooking,
    "fetchMyBookings",
    ()=>fetchMyBookings,
    "fetchRooms",
    ()=>fetchRooms,
    "forceRefreshRooms",
    ()=>forceRefreshRooms,
    "generateCaptcha",
    ()=>generateCaptcha,
    "resetAll",
    ()=>resetAll,
    "resetAvailability",
    ()=>resetAvailability,
    "resetBookingState",
    ()=>resetBookingState,
    "updateRoomStatus",
    ()=>updateRoomStatus,
    "verifyCaptcha",
    ()=>verifyCaptcha
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
;
;
const generateCaptcha = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/generateCaptcha", async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/bookings/captcha/");
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const verifyCaptcha = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/verifyCaptcha", async ({ key, solution }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/bookings/captcha/verify/", {
            key,
            solution
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const createBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/createBooking", async (bookingData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/bookings/", bookingData);
        return res.data;
    } catch (error) {
        if (error.response?.data) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({
            error: error.message
        });
    }
});
const fetchBookings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/fetchBookings", async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/bookings/");
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const fetchMyBookings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/fetchMyBookings", async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/bookings/my_bookings/");
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const fetchGuestBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/fetchGuestBooking", async ({ email, booking_reference }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/bookings/", {
            params: {
                email,
                booking_reference
            }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const cancelBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/cancelBooking", async (bookingId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/bookings/${bookingId}/cancel/`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const confirmBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/confirmBooking", async (bookingId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/bookings/${bookingId}/confirm/`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const fetchRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/fetchRooms", async (_, { rejectWithValue })=>{
    try {
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/bookings/rooms/?t=${timestamp}`);
        console.log(`Fetched rooms at ${timestamp}:`, res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return rejectWithValue(error.response?.data || error.message);
    }
});
const fetchAvailableRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/fetchAvailableRooms", async ({ check_in, check_out, guests, room_type }, { rejectWithValue })=>{
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
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/bookings/rooms/available/", {
            params
        });
        console.log(`Available rooms response:`, res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching available rooms:", error);
        return rejectWithValue(error.response?.data || error.message);
    }
});
const forceRefreshRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/forceRefreshRooms", async (_, { rejectWithValue, dispatch })=>{
    try {
        // Clear existing rooms in state first
        dispatch(clearRooms());
        // Fetch fresh data with a unique timestamp
        const timestamp = new Date().getTime();
        const randomSuffix = Math.random().toString(36).substring(7);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/bookings/rooms/?t=${timestamp}_${randomSuffix}&force=true`);
        console.log(`Force refreshed rooms:`, res.data);
        return res.data;
    } catch (error) {
        console.error("Error force refreshing rooms:", error);
        return rejectWithValue(error.response?.data || error.message);
    }
});
const checkRoomAvailability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("bookings/checkRoomAvailability", async ({ roomId, start_date, end_date }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/bookings/rooms/${roomId}/availability/`, {
            params: {
                start_date,
                end_date
            }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
const bookingSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
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
            verified: false
        },
        availability: {
            loading: false,
            error: null,
            bookings: []
        }
    },
    reducers: {
        updateRoomStatus: (state, action)=>{
            const { roomId, status, nextAvailableDate } = action.payload;
            state.rooms = state.rooms.map((room)=>room.id === roomId ? {
                    ...room,
                    current_status: status,
                    status: status,
                    ...nextAvailableDate && {
                        next_available_date: nextAvailableDate
                    }
                } : room);
        },
        clearRooms: (state)=>{
            state.rooms = [];
            state.availableRooms = [];
        },
        resetBookingState: (state)=>{
            state.success = false;
            state.error = null;
        },
        clearBookings: (state)=>{
            state.list = [];
        },
        clearCaptcha: (state)=>{
            state.captcha = {
                key: null,
                image: null,
                expires_at: null,
                loading: false,
                error: null,
                verified: false
            };
        },
        resetAvailability: (state)=>{
            state.availability = {
                loading: false,
                error: null,
                bookings: []
            };
        },
        // Add a new action to reset everything
        resetAll: (state)=>{
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
                verified: false
            };
            state.availability = {
                loading: false,
                error: null,
                bookings: []
            };
        },
        // Add action to clear loading state
        clearLoading: (state)=>{
            state.loading = false;
        }
    },
    extraReducers: (builder)=>{
        builder// Generate CAPTCHA
        .addCase(generateCaptcha.pending, (state)=>{
            state.captcha.loading = true;
            state.captcha.error = null;
        }).addCase(generateCaptcha.fulfilled, (state, action)=>{
            state.captcha.loading = false;
            state.captcha.key = action.payload.key;
            state.captcha.image = action.payload.image_base64;
            state.captcha.expires_at = action.payload.expires_at;
            state.captcha.verified = false;
        }).addCase(generateCaptcha.rejected, (state, action)=>{
            state.captcha.loading = false;
            state.captcha.error = action.payload;
        })// Verify CAPTCHA
        .addCase(verifyCaptcha.pending, (state)=>{
            state.captcha.loading = true;
        }).addCase(verifyCaptcha.fulfilled, (state, action)=>{
            state.captcha.loading = false;
            state.captcha.verified = action.payload.valid;
            if (!action.payload.valid) {
                state.captcha.error = action.payload.error;
            }
        }).addCase(verifyCaptcha.rejected, (state, action)=>{
            state.captcha.loading = false;
            state.captcha.verified = false;
            state.captcha.error = action.payload;
        })// Create booking
        .addCase(createBooking.pending, (state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        }).addCase(createBooking.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            // 1. Add booking to list
            state.list.push(action.payload);
            // 2. Update the specific room's status to "booked"
            const bookedRoomId = action.payload.room;
            state.rooms = state.rooms.map((room)=>room.id === bookedRoomId ? {
                    ...room,
                    current_status: 'booked',
                    status: 'booked',
                    next_available_date: action.payload.check_out
                } : room);
            // 3. Also update in availableRooms if present
            state.availableRooms = state.availableRooms.filter((room)=>room.id !== bookedRoomId);
            // 4. Clear CAPTCHA
            state.captcha = {
                key: null,
                image: null,
                expires_at: null,
                loading: false,
                error: null,
                verified: false
            };
            console.log(`✅ Booking created for room ${bookedRoomId}. Room status updated to 'booked'.`);
        }).addCase(createBooking.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Fetch bookings
        .addCase(fetchBookings.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchBookings.fulfilled, (state, action)=>{
            state.loading = false;
            state.list = action.payload;
        }).addCase(fetchBookings.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Fetch my bookings
        .addCase(fetchMyBookings.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchMyBookings.fulfilled, (state, action)=>{
            state.loading = false;
            state.list = action.payload;
        }).addCase(fetchMyBookings.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Fetch guest booking
        .addCase(fetchGuestBooking.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchGuestBooking.fulfilled, (state, action)=>{
            state.loading = false;
            state.list = action.payload;
        }).addCase(fetchGuestBooking.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Cancel booking
        .addCase(cancelBooking.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })// Cancel booking
        .addCase(cancelBooking.fulfilled, (state, action)=>{
            state.loading = false;
            const index = state.list.findIndex((b)=>b.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
                // Update room status back to "available"
                const cancelledRoomId = action.payload.room;
                state.rooms = state.rooms.map((room)=>room.id === cancelledRoomId ? {
                        ...room,
                        current_status: 'available',
                        status: 'available',
                        next_available_date: null
                    } : room);
            }
        }).addCase(cancelBooking.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Confirm booking
        .addCase(confirmBooking.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(confirmBooking.fulfilled, (state, action)=>{
            state.loading = false;
            const index = state.list.findIndex((b)=>b.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        }).addCase(confirmBooking.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Fetch rooms
        .addCase(fetchRooms.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchRooms.fulfilled, (state, action)=>{
            state.loading = false;
            state.rooms = action.payload;
        }).addCase(fetchRooms.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Fetch available rooms
        .addCase(fetchAvailableRooms.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchAvailableRooms.fulfilled, (state, action)=>{
            state.loading = false;
            state.availableRooms = action.payload;
        }).addCase(fetchAvailableRooms.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Force refresh rooms
        .addCase(forceRefreshRooms.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(forceRefreshRooms.fulfilled, (state, action)=>{
            state.loading = false;
            state.rooms = action.payload;
        }).addCase(forceRefreshRooms.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Check room availability
        .addCase(checkRoomAvailability.pending, (state)=>{
            state.availability.loading = true;
            state.availability.error = null;
        }).addCase(checkRoomAvailability.fulfilled, (state, action)=>{
            state.availability.loading = false;
            state.availability.bookings = action.payload.bookings;
        }).addCase(checkRoomAvailability.rejected, (state, action)=>{
            state.availability.loading = false;
            state.availability.error = action.payload;
        });
    }
});
const { clearRooms, resetBookingState, clearBookings, clearCaptcha, resetAvailability, resetAll, clearLoading, updateRoomStatus } = bookingSlice.actions;
const __TURBOPACK__default__export__ = bookingSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/authSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$bookingSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/bookingSlice.js [app-client] (ecmascript)");
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        bookings: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$bookingSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    }
});
const __TURBOPACK__default__export__ = store;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/providers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/store.js [app-client] (ecmascript)");
"use client";
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/app/providers.js",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Navbar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Navbar() {
    _s();
    const [authState, setAuthState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isLoggedIn: false,
        isAdmin: false,
        hasMounted: false
    });
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const token = localStorage.getItem("token");
            const admin = localStorage.getItem("isAdmin");
            const timeoutId = setTimeout({
                "Navbar.useEffect.timeoutId": ()=>{
                    setAuthState({
                        isLoggedIn: !!token,
                        isAdmin: admin === "true",
                        hasMounted: true
                    });
                }
            }["Navbar.useEffect.timeoutId"], 0);
            // Handle scroll effect
            const handleScroll = {
                "Navbar.useEffect.handleScroll": ()=>{
                    setScrolled(window.scrollY > 20);
                }
            }["Navbar.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll);
            return ({
                "Navbar.useEffect": ()=>{
                    clearTimeout(timeoutId);
                    window.removeEventListener("scroll", handleScroll);
                }
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("user");
        localStorage.removeItem("refresh");
        setAuthState({
            isLoggedIn: false,
            isAdmin: false,
            hasMounted: true
        });
        setIsMenuOpen(false);
        router.push("/");
    };
    const toggleMenu = ()=>setIsMenuOpen(!isMenuOpen);
    // Guard for SSR
    if (!authState.hasMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between h-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl",
                                    children: "🏨"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 63,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.js",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-xl text-white",
                                        children: "BOPHILL SUITES"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-blue-300",
                                        children: "Premium Hospitality"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.js",
                                lineNumber: 65,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.js",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Navbar.js",
                    lineNumber: 60,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Navbar.js",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Navbar.js",
            lineNumber: 58,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-white/10" : "bg-slate-900/80 backdrop-blur-sm border-b border-white/5"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center h-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center space-x-3 group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all group-hover:scale-110",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl",
                                        children: "🏨"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-xl text-white group-hover:text-blue-300 transition-colors",
                                            children: "BOPHILL SUITES"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.js",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-blue-300",
                                            children: "Premium Hospitality"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.js",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex items-center space-x-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium",
                                    children: "Home"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/rooms",
                                    className: "px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium",
                                    children: "Rooms"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/about",
                                    className: "px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium",
                                    children: "About Us"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium",
                                    children: "Contact"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex items-center space-x-3",
                            children: authState.isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    authState.isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/admin/dashboard",
                                        className: "px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/50 flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.js",
                                                        lineNumber: 137,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.js",
                                                        lineNumber: 138,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Navbar.js",
                                                lineNumber: 136,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Admin Panel"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.js",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 132,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        className: "px-5 py-2 bg-red-600/20 text-red-300 border border-red-500/30 rounded-lg font-semibold hover:bg-red-600/30 hover:border-red-500/50 transition-all flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.js",
                                                    lineNumber: 148,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.js",
                                                lineNumber: 147,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Logout"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.js",
                                                lineNumber: 150,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 143,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin/login",
                                    className: "px-4 py-2 text-purple-300 hover:text-purple-200 transition-colors font-medium flex items-center space-x-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.js",
                                                lineNumber: 160,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.js",
                                            lineNumber: 159,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Admin"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.js",
                                            lineNumber: 162,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 155,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false)
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleMenu,
                                className: "p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-6 h-6 text-white",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 176,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 6h16M4 12h16M4 18h16"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 178,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.js",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Navbar.js",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lg:hidden pb-6 space-y-2 border-t border-white/10 pt-4 animate-fadeIn",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            onClick: ()=>setIsMenuOpen(false),
                            className: "block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium",
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 188,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/rooms",
                            onClick: ()=>setIsMenuOpen(false),
                            className: "block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium",
                            children: "Rooms"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/about",
                            onClick: ()=>setIsMenuOpen(false),
                            className: "block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium",
                            children: "About Us"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            onClick: ()=>setIsMenuOpen(false),
                            className: "block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium",
                            children: "Contact"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 209,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 border-t border-white/10 space-y-2",
                            children: authState.isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    authState.isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/admin/dashboard",
                                        onClick: ()=>setIsMenuOpen(false),
                                        className: "block px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold text-center",
                                        children: "Admin Panel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 221,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        className: "block w-full px-4 py-3 bg-red-600/20 text-red-300 border border-red-500/30 rounded-lg font-semibold text-center",
                                        children: "Logout"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 229,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        onClick: ()=>setIsMenuOpen(false),
                                        className: "block px-4 py-3 text-center text-white hover:bg-white/10 rounded-lg transition-all font-medium",
                                        children: "Sign In"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 238,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/register",
                                        onClick: ()=>setIsMenuOpen(false),
                                        className: "block px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-center",
                                        children: "Get Started"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 245,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/admin/login",
                                        onClick: ()=>setIsMenuOpen(false),
                                        className: "block px-4 py-3 text-center text-purple-300 hover:bg-white/10 rounded-lg transition-all font-medium",
                                        children: "Admin Login"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 252,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Navbar.js",
                    lineNumber: 187,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Navbar.js",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Navbar.js",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(Navbar, "ow8Ffl+ZRHGK4LXVa0q/lhh0IcM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_174f43b2._.js.map