// reducers/index.js
import { combineReducers } from "redux";
import userReducer from "./userReducer"; // Import your reducers here

const rootReducer = combineReducers({
  user: userReducer, // Example: userReducer handles state under 'user' key
  // Add more reducers as needed
});

export default rootReducer;
