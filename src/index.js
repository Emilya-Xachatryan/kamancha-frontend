import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import './styles/globals.css';

import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
    <BrowserRouter>
      <FavoritesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FavoritesProvider>
    </BrowserRouter>
);