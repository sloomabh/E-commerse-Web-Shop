// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux"; // New

import React from "react";

//import { CartContext } from "../../contexts/cart.context";  // old
import { addItemToCart } from "../../store/cart/cart.action"; // New
import { selectCartItems } from "../../store/cart/cart.selector"; //New

import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  //const { addItemToCart } = useContext(CartContext);  // old
  const dispatch = useDispatch(); //NEW

  const cartItems = useSelector(selectCartItems);

  // const addProductToCart = () => addItemToCart(product);   // old
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product)); //new  //DISPATCH OUT our actuin creator

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
