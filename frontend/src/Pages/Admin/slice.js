import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  Trains: [], // Initialize Trains as an array to store train objects
  error: "",
};

const homeSlice = createSlice({
  name: "fetchFile",
  initialState,
  reducers: {
    fetchTrains(state) {
      console.log("FETCHING");
      state.loading = true;
      state.Trains = null;
    },
    fetchTrainsSuccess(state, action) {
      console.log("SUCCESS");
      state.loading = false;
      state.Trains = action.payload;
    },
    fetchTrainsError(state, action) {
      state.loading = false;
      console.log("ERROR");
      state.error = action.payload;
    },
    postTrains(state) {
      console.log("POSTING");
      state.loading = true;
    },
    postTrainsSuccess(state, action) {
      console.log("SUCCESS");
      state.loading = false;
      state.Trains = [...state.Trains, action.payload]; 
      console.log("payload",action.payload);
      console.log("state",state.Trains);
      
      
    },
    postTrainsError(state, action) {
      state.loading = false;
      console.log("ERROR");
      state.error = action.payload;
    },
  },
});

export const {
  fetchTrains,
  fetchTrainsSuccess,
  fetchTrainsError,
  postTrains,
  postTrainsSuccess,
  postTrainsError,
} = homeSlice.actions;
export default homeSlice.reducer;
