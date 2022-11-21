import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";

import { persistStore, persistReducer } from "redux-persist"; //persist data
import storage from "redux-persist/lib/storage"; //persist data

//import logger from 'redux-logger'
import logger from "redux-logger";

import { rootReducer } from "./root-reducer.js";

// root-reducer
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"], //we donot want persist (coming from authstate lestinner so it is confidential)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware]; // Middlewears our kind of like little library helpers that run before an action hits the reducer. (between UI & reducers)

const composedEnhancers = compose(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers); // if we  do not use persistance reducer

// if we use persistance reducer
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
