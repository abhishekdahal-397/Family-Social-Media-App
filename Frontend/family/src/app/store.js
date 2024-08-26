// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import friendsReducer from "../features/Friend/friendsSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		friends: friendsReducer,
	},
});

export default store;
