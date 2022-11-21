import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";

import { persistStore, persistReducer } from "redux-persist"; //persist data
import storage from "redux-persist/lib/storage"; //persist data

//import logger from 'redux-logger'
import logger from "redux-logger";

import { rootReducer } from "./root-reducer.js";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"], //we donot want persist (coming from authstate lestinner so it is confidential)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean //how we keep middleware if we work in developpment // middleware wont work if we change delopmenttoproduction(can check console)
); // Middlewears our kind of like little library helpers that run before an action hits the reducer. (between UI & reducers)

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers); // if we  do not use persistance reducer

// if we use persistance reducer
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
