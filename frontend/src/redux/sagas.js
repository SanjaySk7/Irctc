import { all } from "redux-saga/effects";
import homeSagas from "../pages/home/saga";

export default function* saga() {
  yield all([...homeSagas]);
}