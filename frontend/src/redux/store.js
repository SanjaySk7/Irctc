import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleWare from 'redux-saga'

import rootSaga from '../Pages/Admin/saga'
import reducers from './reducers'
const sagaMiddleWare=createSagaMiddleWare();

export const store=configureStore({
    reducer: reducers,
    middleware:(getDef)=> getDef().concat(sagaMiddleWare) 
})
sagaMiddleWare.run(rootSaga)
