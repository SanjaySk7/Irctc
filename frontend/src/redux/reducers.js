import sliceReducer from "../Pages/Admin/slice";
import trainReducer from "../Pages/Users/trainSlice";
import signupSlice from "../Component/signUp-Slice"
const reducers = {
  admin: sliceReducer,
  trains: trainReducer,
  signup: signupSlice,
};

export default reducers;
