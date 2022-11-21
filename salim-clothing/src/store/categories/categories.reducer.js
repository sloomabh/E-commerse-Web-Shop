import CATEGORIES_ACTION_TYPES from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false, //redux-thunks
  error: null, //redux-thunks /errors comes with asynchronous  fetching process
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true, // we are in loading state
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: payload };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

// When we start, we're loading.

// If we succeed, we stop loading.

// We have a correct payload.

// If we fail, we also stop loading.

// But we have an error.

// This is going to be the fundamental basis now of the majority of our asynchronous actions when it comes

// to fetching inside of any redux based side effect library, whether it be redux, thunk, redux, observable

// or redux saga, it's all going to follow this new pattern.

// And we're going to also talk about why in this pattern and how this is useful.
