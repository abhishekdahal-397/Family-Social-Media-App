// userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const automaticLogin = createAsyncThunk(
	"user/automaticLogin",
	async (thunkAPI) => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				const response = await axios.get(
					"http://localhost:3002/api/users/getUser",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				return response.data;
			} else {
				return thunkAPI.rejectWithValue("No token found");
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
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
			localStorage.setItem("token", response.data.token);
			console.log("loginUser response:", response.data);
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
		logout: (state) => {
			state.userId = null;
			state.userInfo = null;

			state.userProfileUrl = "";
			state.token = "null";
		},
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
			})
			.addCase(automaticLogin.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.userId = action.payload.user?._id || null;
				state.userProfileUrl = action.payload.user?.profileUrl || "";
				state.username = action.payload.user?.username || "";
				state.token = action.payload.token || "";
				state.error = null;
			})
			.addCase(automaticLogin.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
export const { logout } = userSlice.actions; // If you have other actions, define them here
