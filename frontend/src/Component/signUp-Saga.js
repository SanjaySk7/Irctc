import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  postsOnSignup,
  postsOnSignupSuccess,
  postsOnSignupError,
} from "./signUp-Slice";

// Define the API call
const signupApi = async (data) => {
  const response = await axios.post("http://localhost:8081/irctc", data);
  return response.data;
};

// Worker saga
function* handleSignup(action) {
  try {
    const data = yield call(signupApi, action.payload);
    yield put(postsOnSignupSuccess());
    console.log("Signup successful:", data); // Optional: log data or handle as needed
  } catch (error) {
    console.error("Signup error:", error);
    yield put(postsOnSignupError("Failed to register. Please try again."));
  }
}

// Watcher saga
export function* signupSaga() {
  yield takeLatest(postsOnSignup.type, handleSignup);
}
