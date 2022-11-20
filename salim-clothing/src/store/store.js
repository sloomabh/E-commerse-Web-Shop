import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";

//import logger from 'redux-logger'
import logger from "redux-logger";

import { rootReducer } from "./root-reducer.js";

// root-reducer
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  next(action);
};

const middleWares = [logger]; // Middle wears our kind of like little library helpers that run before an action hits the reducer. (between UI & reducers)

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
