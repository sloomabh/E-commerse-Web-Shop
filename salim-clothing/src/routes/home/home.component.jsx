import { Outlet } from "react-router-dom"; // we use it to show where we nest the matching element
import Directory from "../../components/directory/directory.component";
import React from "react";

const Home = () => {
  return (
    <div>
      <Outlet />
      <Directory />
    </div>
  );
};
export default Home;
