import { all } from "redux-saga/effects";
import adminSaga from "../Pages/Admin/saga";
import userSaga from"../Pages/Users/userSaga"
import { signupSaga } from "../Component/signUp-";
export default function* saga() {
  yield all([...adminSaga,...signupSaga,...userSaga]);
}