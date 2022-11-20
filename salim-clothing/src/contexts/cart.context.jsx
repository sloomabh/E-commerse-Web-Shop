import { createContext, useReducer } from "react";
import React from "react";
import { createAction } from "../utils/reducer/reducer.utils.jsx";

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

/*************************************************************************** */

export const CartContext = createContext({
  isCartOpen: true,
  setIisCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {}, // we add our own method here
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
};

//   1)  ------first thing   to do  initial state object is gooing to include all the readable values
//that we currently have inside in our context

const INITIAL_STATE = {
  isCartOpen: true,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

//   2)  -- ---- Create reducer -----------
//NOTICE : the reducer should not handel any business logic
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  /*     **************************************** old things with usestate ******************************  */
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartItemCount, setCartItemCount] = useState(0); //every time the cartItems changes we count the cartCount
  // const [cartTotal, setcartTotal] = useState(0);

  //const [isCartOpen, setIsCartOpen] = useState();
  const [{ cartCount, cartTotal, cartItems, isCartOpen }, dispatch] =
    useReducer(
      //  { cartCount, cartTotal, cartItems } =state
      cartReducer,
      INITIAL_STATE
    );

  // useEffect(() => {
  //   const count = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartItemCount(count);
  // }, [cartItems]); //every time the cartItems changes we need to calculate the cartCount

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setcartTotal(newCartTotal);
  // }, [cartItems]);

  const updateCartItemsReducer = (newCartItems) => {
    /*
- generate newCartTotal

- generate newCartCount

- dispatch new action with payload = {

  newCartItems,
  newCartTotal,
  newCartCount

}
    */
    //copy them from useEffect
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (productToAdd) => {
    // setCartItems(addCartItem(cartItems, product)); //addCartItem is a helper function
    const newCartItems = addCartItem(cartItems, productToAdd); // chnages with reducers
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (cartItemToRemove) => {
    //setCartItems(removeCartItem(cartItems, cartItemToRemove)); // removeCartItem is an other helper function
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    // setCartItems(clearCartItem(cartItems, cartItemToClear));
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN), bool);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
