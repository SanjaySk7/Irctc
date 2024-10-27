import { takeLatest, call, put } from 'redux-saga/effects';
import { postTrains, postTrainsSuccess, postTrainsError } from './slice';
import axios from 'axios';

function* handlePostTrains(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:8081/irctc', action.payload);
    yield put(postTrainsSuccess(response.data));
  } catch (error) {
    yield put(postTrainsError("Failed to post train data."));
  }
}

export default function* watchPostTrains() {
  yield takeLatest(postTrains.type, handlePostTrains);
}
