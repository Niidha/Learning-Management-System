import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {
  
    createCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    
   
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course._id === action.payload._id);
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...action.payload }
      }
    },
    
   
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course._id !== action.payload); 
    },
    

    setLoading: (state, action) => {
      state.loading = action.payload; 
    },
    
   
    setError: (state, action) => {
      state.error = action.payload; 
    },
  },
});

export const { createCourse, updateCourse, deleteCourse, setLoading, setError } = courseSlice.actions;
export const { reducer: courseReducer } = courseSlice;
