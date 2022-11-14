import { Routes, Route } from "react-router-dom";
import React from "react";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Athentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/chekout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* we replaced  "path ="home" ' with "index"  or in reality  index = "{true} "  so  the hom should be always shown i*/}
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Athentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};
export default App;
