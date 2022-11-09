import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";

import Home from "./routes/home/home.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* we replaced  "path ="home" ' with "index"  or in reality  index = "{true} "  so  the hom should be always shown i*/}
      </Route>
    </Routes>
  );
};
export default App;
