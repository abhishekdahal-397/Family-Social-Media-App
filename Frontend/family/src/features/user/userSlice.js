import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchFriends } from "../Friend/friendsSlice"; // Import fetchFriends action
// import jwt_decode from "jwt-decode"; // Correct import
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

export const automaticLogin = createAsyncThunk(
	"user/automaticLogin",
	async (_, thunkAPI) => {
		const { dispatch } = thunkAPI;

		try {
			const token = localStorage.getItem("token");
			if (!token) {
				return thunkAPI.rejectWithValue("No token found");
			}

			const decodedToken = jwtDecode(token);
			const userId = decodedToken.userId;
			if (!userId) {
				return thunkAPI.rejectWithValue("Invalid token, no userId found");
			}

			const response = await axios.get(
				`http://localhost:3002/api/users/getUser/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Dispatch fetchFriends after successful login
			dispatch(fetchFriends(response.data.user._id));

			return { ...response.data, token };
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async ({ email, password }, thunkAPI) => {
		const { dispatch } = thunkAPI;

		const response = await axios.post("http://localhost:3002/api/users/login", {
			email,
			password,
		});
		try {
			// Store token in local storage
			localStorage.setItem("token", response.data.token);

			// Dispatch fetchFriends after successful login
			const friends = dispatch(fetchFriends(response.data.user._id));
			console.log("friends of user are ", friends);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const logoutUser = createAsyncThunk(
	"user/logoutUser",
	async (userId, thunkAPI) => {
		try {
			const response = await axios.post(
				`http://localhost:3002/api/users/logout/${userId}`
			);
			localStorage.removeItem("token");
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
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
		profilePicture:
			"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
		username: "",
		token: "",
	},
	reducers: {
		logout: (state) => {
			state.userId = null;
			state.userInfo = null;
			state.profilePicture = "";
			state.username = "";
			state.token = "";
			localStorage.removeItem("token");
			state.status = "idle";
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
				state.profilePicture = action.payload.user.profileUrl;
				state.username = action.payload.user.username;
				state.token = action.payload.token;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || action.error.message;
				state.token = localStorage.getItem("token");
			})
			.addCase(automaticLogin.pending, (state) => {
				state.status = "loading";
			})
			.addCase(automaticLogin.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.userId = action.payload?.user?._id || null;
				state.profilePicture =
					action.payload?.user?.profileUrl || state.profilePicture;
				state.username = action.payload?.user?.username || "";
				state.token = action.payload?.token || "";
				state.error = null;
			})
			.addCase(automaticLogin.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || action.error.message;
			});
	},
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
