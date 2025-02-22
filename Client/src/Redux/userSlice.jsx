import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user")) || {
  id: "",
  username: "",
  name: "",
  email: "",
  role: "",
  age: "",
  qualification: "",
  preferredLanguage: "",
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: storedUser,
  reducers: {
    createUser: (state, action) => {
      const newUser = {
        ...state,
        id: action.payload.id || action.payload._id || "", // Support both 'id' and '_id'
        username: action.payload.username || "",
        name: action.payload.name || "",
        email: action.payload.email || "",
        role: action.payload.role || "",
        isAuthenticated: true, // User is now logged in
      };

      localStorage.setItem("user", JSON.stringify(newUser)); // Persist user data
      return newUser;
    },
    updateUser: (state, action) => {
      const updatedUser = {
        ...state,
        ...action.payload, // Update only provided fields
      };

      localStorage.setItem("user", JSON.stringify(updatedUser)); // Update stored data
      return updatedUser;
    },
    logoutUser: () => {
      localStorage.removeItem("user"); // Clear stored user data
      return {
        id: "",
        username: "",
        name: "",
        email: "",
        role: "",
        age: "",
        qualification: "",
        preferredLanguage: "",
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    },
  },
});

export const { createUser, updateUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
