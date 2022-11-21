import { Routes, Route } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

//import { createAction } from "./utils/reducer/reducer.utils.jsx";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Athentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/chekout.component";

import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  //from usercontext because we dont use that file any more after using redux
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* we replaced  "path ="home" ' with "index"  or in reality  index = "{true} "  so  the hom should be always shown i*/}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Athentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};
export default App;
