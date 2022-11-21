import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "./App";
//import { UserProvider } from "./contexts/user.context";   (old with Context API)
//import { CategoriesProvider } from "./contexts/categories.context"; (old with Context API)
//import { CartProvider } from "./contexts/cart.context"; (old with Context API)

import { Provider } from "react-redux"; // NEW with redux

import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/*  NEW with redux  and only one */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          {/* <UserProvider>*/}
          {/*<CategoriesProvider>*/}
          {/* <CartProvider>*/}
          <App />
          {/*</CartProvider>*/}
          {/*</CategoriesProvider>*/}
          {/* </UserProvider>*/}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
