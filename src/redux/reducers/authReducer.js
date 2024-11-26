import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        token: null,
        username: null,
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = "sample-token";
            state.username = action.payload.username;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.username = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;