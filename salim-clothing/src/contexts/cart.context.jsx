import { createContext, useState, useEffect } from "react";

/**********************   addCartItem (helper function for  setCartItems) **************************** */
//find if cartitems contains

//if found , increment quantity

//return new array with modified cartItems /new cart item
/*
product
{
  id,
  name,
  price,
  imageUrl
}

Card Item
{
   id,
  name,
  price,
  imageUrl,
  quantity  <------------ + this one
}

*/
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

/**********************   removeCartItem ( second helper function for  setCartItems) **************************** */
const removeCartItem = (cartItems, cartItemToremove) => {
  //find the cart  item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToremove.id
  );

  //checkif quantity  = 1 , if it is remove that item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToremove.id);
  }

  //return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToremove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 } //If we get back the same object with the value mutated, react doesn't register that this item is different, so it's not going to render the component.Whereas because we are generating a new object when React receives that object, React is going to say,oh, this prop is different, then I can re render the UI and in turn reflect the new reduced quantity or the new increased quantity. This all has to do with react rendering.
      : cartItem
  );
};

/**********************   clearCartItem ( third helper function for  setCartItems) **************************** */
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {}, // we add our own method here
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0); //every time the cartItems changes we count the cartCount
  const [cartTotal, setcartTotal] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartItemCount(count);
  }, [cartItems]); //every time the cartItems changes we need to calculate the cartCount

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setcartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product)); //addCartItem is a helper function

  const removeItemToCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove)); // removeCartItem is an other helper function

  const clearItemFromCart = (cartItemToClear) =>
    setCartItems(clearCartItem(cartItems, cartItemToClear));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
    setcartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
