import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
	name: "user",
	initialState: {
		isLoading: false,
		loggedInUser: null,
		otherUsers: null,
		profile: null,

	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},

		getLoggedUser: (state, action) => {
			state.loggedInUser = action.payload
		},

		getOtherUsers: (state, action) => {
			state.otherUsers = action.payload
		},
		getMyProfile: (state, action) => {
			state.profile = action.payload
		},
		followingUpdate: (state, action) => {
			// unfollow to user
			if (state.loggedInUser.following.includes(action.payload)) {
				state.loggedInUser.following = state.loggedInUser.following.filter((itemId) => {
					return itemId !== action.payload;
				})
			} else {
				// follow to user
				state.loggedInUser.following.push(action.payload);
			}
		}

	}
})

export const { getOtherUsers, getLoggedUser, getMyProfile, setLoading, followingUpdate } = userSlice.actions;
export default userSlice.reducer;