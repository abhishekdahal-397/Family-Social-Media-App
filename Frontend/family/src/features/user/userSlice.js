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
			console.log("hi this is response.data", response.data);
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
				state.userId = action.payload.userId;
				state.userProfileUrl = action.payload.userProfileUrl;
				state.username = action.payload.username;

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
