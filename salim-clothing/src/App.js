import { Routes, Route } from "react-router-dom";
import React from "react";
import Navigation from "./routes/navigation/navigation.component";

import Home from "./routes/home/home.component";
import Athentication from "./routes/authentication/authentication.component";

const Shop = () => {
  return <h1> this is the Shop </h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* we replaced  "path ="home" ' with "index"  or in reality  index = "{true} "  so  the hom should be always shown i*/}
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Athentication />} />
      </Route>
    </Routes>
  );
};
export default App;
