import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import React from "react";

import ProductCard from "../../components/product-card/product-card.component";

//import { CategoriesContext } from "../../contexts/categories.context"; //old
import { useSelector } from "react-redux"; //New

import { selectCategoriesMap } from "../../store/categories/categories.selector"; //New

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  //const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap); //New
  //the  useselector, runs every time that the state object has updated in the route reducer.

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {/* Remember, if you have components that rely on asynchronously fetched code, you will need to put in some kind of safeguard so that you only render your component if the actual data is present. */}
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
