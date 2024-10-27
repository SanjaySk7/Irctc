import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    postsOnSignup: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    postsOnSignupSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    postsOnSignupError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { postsOnSignup, postsOnSignupSuccess, postsOnSignupError } =
  signupSlice.actions;
export default signupSlice.reducer;
