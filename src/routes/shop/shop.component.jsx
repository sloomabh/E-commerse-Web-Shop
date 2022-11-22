import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";

import React from "react";

import { useDispatch } from "react-redux";

//import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesStartAsync } from "../../store/categories/categories.action";

import CategoriesPreview from "../categories-preview/categories-preview.component";

import Category from "../category/category.component";

import "./shop.styles.scss";

const Shop = () => {
  // we bring the useEffect from categogories.context 5converting to redux) but we can place it in App.js  too

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesStartAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
//  :categoryis a variable
