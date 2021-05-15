import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import bookReducer from "./bookSlice";


const rootReducer = combineReducers({
  user: userReducer,
  books: bookReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "books"],
};


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions:["persist/PERSIST"]
    }
  })
});

const persistor = persistStore(store)
export  { store, persistor };