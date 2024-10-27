import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../Pages/Admin/saga";
import reducers from "./reducers";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific action types if they might contain non-serializable values
        ignoredActions: [
          "signup/postsOnSignup",
          "signup/postsOnSignupSuccess",
          "signup/postsOnSignupError",
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
