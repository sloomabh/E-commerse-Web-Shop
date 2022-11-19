import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer.js";

// root-reducer

const middleWares = [logger]; // Middle wears our kind of like little library helpers that run before an action hits the reducer.

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
