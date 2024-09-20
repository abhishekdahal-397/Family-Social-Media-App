import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchFriends } from "../Friend/friendsSlice"; // Import fetchFriends actionimport jwt_decode from "jwt-decode"; // Import jwt-decode library
import { jwtDecode } from "jwt-decode";

export const automaticLogin = createAsyncThunk(
	"user/automaticLogin",
	async (_, thunkAPI) => {
		const { dispatch } = thunkAPI;
		console.log("This came with destructured dispatch in thunkAPI", dispatch);

		try {
			const token = localStorage.getItem("token");
			console.log(
				"Token from localStorage from automatic login function:",
				token
			);

			if (token) {
				// Decode the token to extract the userId
				const decodedToken = jwtDecode(token);
				const userId = decodedToken.userId;
				console.log("user id from decoded is ", userId);

				if (!userId) {
					return thunkAPI.rejectWithValue("Invalid token, no userId found");
				}

				console.log("Extracted userId from token:", userId);

				const response = await axios.get(
					`http://localhost:3002/api/users/getUser/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				console.log("API response:", response.data);

				// Dispatch the action to fetch friends using the userId
				dispatch(fetchFriends(response.data.user._id));

				return { ...response.data, token };
			} else {
				return thunkAPI.rejectWithValue("No token found");
			}
		} catch (error) {
			console.error("Login error:", error.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async ({ email, password }, thunkAPI) => {
		const { dispatch } = thunkAPI; // Add thunkAPI here
		console.log("loginUserr dispatched");

		const response = await axios.post("http://localhost:3002/api/users/login", {
			email,
			password,
		});
		try {
			console.log("token to set ", response.data.token);
			localStorage.setItem("token", response.data.token);
			console.log("response from userSlice loginUser", response);

			// Dispatch fetchFriends after successful login
			// dispatch(fetchFriends(response.data.user._id));
			console.log("successfully fetched friends");
			console.log("response.data.user._id ", response.data.user._id);
			console.log("thing that is returned", response.data);
			return response.data;
		} catch (error) {
			console.log("error from userSlice", error);

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
				state.token = action.payload.user.token;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || action.error.message; // Handle error message
				state.token = localStorage.getItem("token");
			})
			.addCase(automaticLogin.pending, (state) => {
				state.status = "loading";
			})
			.addCase(automaticLogin.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.userId = action.payload.user?._id || null;
				state.profilePicture =
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
