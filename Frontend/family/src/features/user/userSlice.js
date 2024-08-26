// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchFriends } from "../Friend/friendsSlice"; // Import fetchFriends action

export const automaticLogin = createAsyncThunk(
	"user/automaticLogin",
	async (_, thunkAPI) => {
		const { dispatch } = thunkAPI;
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
				// Dispatch fetchFriends after successful login
				dispatch(fetchFriends(response.data.user._id));
				return response.data;
			} else {
				return thunkAPI.rejectWithValue("No token found");
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async ({ email, password }, thunkAPI) => {
		const { dispatch } = thunkAPI; // Add thunkAPI here
		try {
			const response = await axios.post(
				"http://localhost:3002/api/users/login",
				{ email, password }
			);
			localStorage.setItem("token", response.data.token);

			// Dispatch fetchFriends after successful login
			dispatch(fetchFriends(response.data.user._id));
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message); // Use rejectWithValue to return error message
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
		userProfileUrl:
			"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
		token: "",
	},
	reducers: {
		logout: (state) => {
			state.userId = null;
			state.userInfo = null;
			state.userProfileUrl = "";
			state.token = "";
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
				state.error = action.payload || action.error.message; // Handle error message
			})
			.addCase(automaticLogin.pending, (state) => {
				state.status = "loading";
			})
			.addCase(automaticLogin.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.userId = action.payload.user?._id || null;
				state.userProfileUrl =
					action.payload.user?.profileUrl ||
					"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";
				state.username = action.payload.user?.username || "";
				state.token = action.payload.token || "";
				state.error = null;
			})
			.addCase(automaticLogin.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || action.error.message; // Handle error message
			});
	},
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
