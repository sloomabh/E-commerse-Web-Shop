import { Fragment } from "react";

import { useSelector } from "react-redux"; //New

import React from "react";

//import { CategoriesContext } from "../../contexts/categories.context"; (old-APIContxt)
import { selectCategoriesMap } from "../../store/categories/categories.selector"; //New
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  //const { categoriesMap } = useContext(CategoriesContext);  (old-APIContxt)
  const categoriesMap = useSelector(selectCategoriesMap); //New

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
{
  /*products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))*/
}
{
  /*object.keys dun object  return an array of the keys */
}
