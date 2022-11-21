import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart; // gives us a cart slice  we want it to memorize

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// NOTICE : we no longuer srore cartTotal and cartQuantity in our reducer
//Instead. Now everything is based off of card items which we know it will be and through using memory selectors, unless those card items change, we won't be running any extra renders.
