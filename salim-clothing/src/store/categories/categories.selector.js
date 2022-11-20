import { createSelector } from "reselect"; //  create selector memorizes  selectors, assuming that as long as the inputs have not changed, then your output should always be the same.

const selectCategoryReducer = (state) => state.categories; //we take a slice

//This method creates a selector and it takes two arguments.The first is an array of input selectors and the second is going to be the output selector.The input selector is going to be what do I want as part of the parameters that I'm going to use to produce what the selector should return back? So what are the slices that I want from Redux so that I can use them to produce something new ?
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories //The only time where this will run is if this categoriesSlice object that we get back from this selector (selectCategoryReducer) is different.  and we know that   selectCategoryReducer changes when only state.categories changes
);

// we memomoised here
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

//as long as the categories array does not change,do not rerun this method. Of course you want to reduce once, but after that, as long as it has not changed, don't even bother rerunning it.Just give me back the previously calculated value.And because the previous recalculated value was the previous return of reduce, which is an object in memory.
