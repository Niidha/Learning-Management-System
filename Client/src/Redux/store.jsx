import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice"
import { courseReducer } from "./courseSlice";
import {  favoritesReducer } from "./favSlice";




export const store=configureStore({
    reducer:{
        user:userReducer,
        course:courseReducer,
        favorites:favoritesReducer
      
      
    }
})