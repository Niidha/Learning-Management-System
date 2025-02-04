import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (!existingItem) {
        state.items.push(item);
      }
    },
    removeFromFavorites: (state, action) => {
      const courseId = action.payload;
      state.items = state.items.filter((item) => item.id !== courseId);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const { reducer: favoritesReducer } = favoritesSlice;
