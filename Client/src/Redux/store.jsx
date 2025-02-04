import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from 'redux-persist'

import {  favoritesReducer } from "./favSlice";
import { courseReducer } from "./courseSlice";

const userPersistConfig = {
    key: "root",
    storage
}

const persistedUserReducer = persistReducer(userPersistConfig, userReducer)

export const store=configureStore({
    reducer:{
        user:persistedUserReducer,
        favorites:favoritesReducer,
        courses:courseReducer
      
      
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ["persist/PERSIST"]
            }
        })
    }
})

export const persistor = persistStore(store)