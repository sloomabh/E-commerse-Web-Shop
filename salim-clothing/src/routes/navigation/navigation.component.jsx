import React from "react";
import { Fragment, useContext } from "react";

import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  {
    /* Navigation is a top level component --> always shown up */
  }

  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      {/*instead of using div as parent element we use fragment from react
      and it will not be shown in inspect */}
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet /> {/* all component are under navigation */}
    </Fragment>
  );
};

export default Navigation;
