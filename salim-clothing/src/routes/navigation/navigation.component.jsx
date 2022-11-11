import React from "react";
import { Fragment } from "react";

import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";

const Navigation = () => {
  {
    /* Navigation is a top level component --> always shown up */
  }
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
          <Link className="nav-link" to="/auth">
            SIGN-IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
