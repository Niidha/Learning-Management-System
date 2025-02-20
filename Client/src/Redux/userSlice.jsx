import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  name: "",
  email: "",
  role: "",
  age: "",
  qualification: "",
  preferredLanguage: "",
  isAuthenticated: false, // Track if user is logged in
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      return {
        ...state,
        id: action.payload._id,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        isAuthenticated: true, // User is now logged in
      };
    },
    updateUser: (state, action) => {
      return {
        ...state,
        ...action.payload, // Update only provided fields
      };
    },
    logoutUser: () => initialState, // Reset user state on logout
  },
});




export const { createUser, updateUser, logoutUser } = userSlice.actions;
export const { reducer: userReducer } = userSlice;