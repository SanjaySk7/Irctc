import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trainList: [], // Array to store train data
  loading: false,
  error: null,
};

const trainSlice = createSlice({
  name: "trains",
  initialState,
  reducers: {
    setTrains: (state, action) => {
      state.trainList = action.payload;
    },
    // Other reducers to handle loading, errors, etc.
  },
});

export const { setTrains } = trainSlice.actions;
export default trainSlice.reducer;
