import sliceReducer from "../Pages/Admin/slice";
import trainReducer from "../Pages/Users/trainSlice";

const reducers = {
  home: sliceReducer,
  trains: trainReducer,
};

export default reducers;
