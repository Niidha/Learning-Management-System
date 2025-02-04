import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    name: "",
    password: "",
    email: "",
    role:"",
    age: "",
    qualification: "",
    preferredLanguage: "",
    loading: false,
    error: null,
  },
  reducers: {
    createUser: (state, action) => {
      state.id = action.payload._id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.email = action.payload.email;
      state.role=action.payload.role;
    
    },
    updateUser: (state, action) => {

      if (action.payload.username) state.username = action.payload.username;
      if (action.payload.name) state.name = action.payload.name;
      if (action.payload.password) state.password = action.payload.password;
      if (action.payload.email) state.email = action.payload.email;
      if (action.payload.age) state.age = action.payload.age;
      if (action.payload.role) state.role= action.payload.role;
      if (action.payload.qualification) state.qualification = action.payload.qualification;
      if (action.payload.preferredLanguage) state.preferredLanguage = action.payload.preferredLanguage;
    },
    
    logoutUser: (state) => {
      state.id = "";
      state.username = "";
      state.name = "";
      state.password = "";
      state.email = "";
      state.loading = false;
      state.error = null;
    },
  },
});

export const { createUser, updateUser, logoutUser } = userSlice.actions;
export const { reducer: userReducer } = userSlice;