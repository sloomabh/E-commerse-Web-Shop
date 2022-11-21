import { createContext, useEffect, useState } from "react";

import React from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.jsx"; //we do not need it any more --> we use the data bese of fire base
/*import SHOP_DATA from "../shop-data.js";*/ export const CategoriesContext = createContext(
  {
    categoriesMap: {},
    //  setProducts: () => {},
  }
);

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  //we fetched our data from data base
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      setCategoriesMap(categoryMap);
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);

  /*
  useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
  }, []);
*/
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
