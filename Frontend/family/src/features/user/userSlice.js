// userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const loginUser = createAsyncThunk(
	"user/loginUser",
	async ({ email, password }) => {
		try {
			const response = await axios.post(
				"http://localhost:3002/api/users/login",
				{
					email,
					password,
				}
			);
			console.log("response from backend", response.data);
			console.log("id is  ", response.data.user._id);
			// console.log("logged in user id in state ", response.data.user.user._id);
			// Example of storing a token in localStorage

			localStorage.setItem("token", response.data.token);

			console.log(
				"this is token from localstorage",
				localStorage.getItem("token")
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		userId: null,
		userInfo: null,
		status: "idle",
		error: null,
		userProfileUrl: "",
		token: "",
	},
	reducers: {
		// Add other reducer functions if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.userId = action.payload.user._id;
				state.userProfileUrl = action.payload.user.profileUrl;
				state.username = action.payload.user.username;
				state.token = action.payload.token;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
export const {} = userSlice.actions; // If you have other actions, define them here
