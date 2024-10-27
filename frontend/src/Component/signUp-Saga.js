import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  postsOnSignup,
  postsOnSignupSuccess,
  postsOnSignupError,
} from "./signUp-Slice";

// Worker saga
function* handleSignup(action) {
  console.log("saga");
  
  try {
    const response = yield call(
      axios.post,
      "http://localhost:8081/irctc",
      action.payload
    );
    yield put(postsOnSignupSuccess(response.data));
  } catch (error) {
    console.error("Signup error:", error);
    yield put(postsOnSignupError("Failed to register. Please try again."));
  }
}

// Watcher saga
export default function* signupSaga() {
  yield takeLatest(postsOnSignup.type, handleSignup);
}
