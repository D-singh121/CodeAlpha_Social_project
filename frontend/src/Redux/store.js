import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
}
const rootReducer = combineReducers({
	user: userSlice,
	tweet: tweetSlice,
	whitelist: ["user", "tweet"]  // add which you want to allows
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),   // Disable serializability check 
})
const persistor = persistStore(store)

export { store, persistor };