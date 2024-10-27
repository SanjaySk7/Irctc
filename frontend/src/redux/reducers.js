import sliceReducer from "../Pages/Admin/slice";
import trainReducer from "../Pages/Users/trainSlice";
import { signupSaga } from "../Component/signUp-Saga";
const reducers = {
  admin: sliceReducer,
  trains: trainReducer,
  signup: signupSaga,
};

export default reducers;
