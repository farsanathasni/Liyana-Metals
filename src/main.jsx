import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { AuthProvider } from "./Contexts/AuthContext";
import { CartProvider } from "./Contexts/CartContext";
import { OrderProvider } from "./Contexts/OrderContext";
import { SearchProvider } from "./Contexts/SerchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <SearchProvider>
        <App />
        </SearchProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
