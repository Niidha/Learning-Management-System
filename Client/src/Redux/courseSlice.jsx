// src/Redux/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
  },
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
  },
});

export const { addCourse } = courseSlice.actions;

export const{reducer: courseReducer}=courseSlice
