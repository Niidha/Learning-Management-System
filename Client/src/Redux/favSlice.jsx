import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.course_Id === item.course_Id);
      if (!existingItem) {
        state.items.push(item);
      }
    },
    removeFromFavorites: (state, action) => {
      const courseId = action.payload;
      state.items = state.items.filter((item) => item.course_Id !== courseId);
    },
    setFavorites: (state, action) => {
      state.items = action.payload; 
    },
  },
});

// Correctly export the reducer
export const { addToFavorites, removeFromFavorites, setFavorites } = favoritesSlice.actions;;
export const { reducer: favoritesReducer } = favoritesSlice;
