import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signup",
  initialState: {
    users: [], // Array to store multiple users
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    postsOnSignup: (state) => {
      state.loading = true;
      state.error = null;
    },
    postsOnSignupSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.users.push(action.payload); // Add the new user to users array
    },
    postsOnSignupError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { postsOnSignup, postsOnSignupSuccess, postsOnSignupError } =
  signUpSlice.actions;
export default signUpSlice.reducer;
