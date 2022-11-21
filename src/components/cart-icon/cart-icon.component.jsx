// import { useContext } from "react";

import React from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { useSelector, useDispatch } from "react-redux"; // New

// import { CartContext } from "../../contexts/cart.context";  //  (old with Context API)

import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector"; //New
import { setIsCartOpen } from "../../store/cart/cart.action"; // NEW

import "./cart-icon.styles.scss";

//         OLD
// const CartIcon = () => {
//   const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

//   const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

//         NEW
const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
