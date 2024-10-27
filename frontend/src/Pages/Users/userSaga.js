import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  postUserSignupSuccess,
  postUserSignupError,
  postUserLoginSuccess,
  postUserLoginError,
} from "./userSlice";

// Define API functions
const signupAPI = (userData) =>
  axios.post("http://localhost:8081/irctc/signup", userData);
const loginAPI = (userData) =>
  axios.post("http://localhost:8081/irctc/login", userData);

// Worker saga: handles signup
function* handleUserSignup(action) {
  try {
    const response = yield call(signupAPI, action.payload);
    yield put(postUserSignupSuccess(response.data)); // Dispatch success action with response data
  } catch (error) {
    yield put(postUserSignupError(error.message)); // Dispatch error action with error message
  }
}

// Worker saga: handles login
function* handleUserLogin(action) {
  try {
    const response = yield call(loginAPI, action.payload);
    yield put(postUserLoginSuccess(response.data)); // Dispatch success action with response data
  } catch (error) {
    yield put(postUserLoginError(error.message)); // Dispatch error action with error message
  }
}

// Watcher saga: watches for actions dispatched to the store, starts the worker saga
function* userSaga() {
  yield takeLatest("user/postUserSignup", handleUserSignup);
  yield takeLatest("user/postUserLogin", handleUserLogin);
}

export default userSaga;
