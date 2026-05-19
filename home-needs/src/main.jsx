import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'   // ← is this line present?

import { AuthProvider } from "./Contexts/AuthContext";
import { CartProvider } from "./Contexts/CartContext";
import { WishlistProvider } from "./Contexts/WishList";
import { OrderProvider } from "./Contexts/OrderContext";
import { SearchProvider } from "./Contexts/SerchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
