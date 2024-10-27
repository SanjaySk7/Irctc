import { takeLatest, call, put } from "redux-saga/effects";


import {
  fetchTrains,
  fetchTrainsSuccess,
  fetchTrainsError,
  postTrains,
  postTrainsSuccess,
  postTrainsError,
} from "./slice";
// import { fetchTrainsAPI, postTrainAPI } from "../../services/api"; // Adjust path if necessary

// Fetch Trains Saga
function* fetchTrainsSaga() {
  try {
    const response = yield call('');
    yield put(fetchTrainsSuccess(response));
  } catch (error) {
    yield put(fetchTrainsError(error.message));
  }
}

// Post Train Saga
function* postTrainsSaga(action) {
  try {
    const response = yield call('', action.payload);
    yield put(postTrainsSuccess(response));
  } catch (error) {
    yield put(postTrainsError(error.message));
  }
}

// Watcher Saga
export default function* rootSaga() {
  yield takeLatest(fetchTrains.type, fetchTrainsSaga);
  yield takeLatest(postTrains.type, postTrainsSaga);
}