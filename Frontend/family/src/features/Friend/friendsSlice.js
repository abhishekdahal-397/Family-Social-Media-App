// src/store/friendsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFriends = createAsyncThunk(
	"friends/fetchFriends",
	async (userId) => {
		const response = await axios.get(
			`http://localhost:3002/api/users/getUserFriends/${userId}`
		);
		return response.data;
	}
);

const friendsSlice = createSlice({
	name: "friends",
	initialState: {
		friends: [],
		status: "idle",
		error: null,
	},
	reducers: {
		clearFriends: (state) => {
			state.friends = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFriends.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchFriends.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.friends = action.payload;
			})
			.addCase(fetchFriends.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { clearFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
