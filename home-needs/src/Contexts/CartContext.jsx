
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../Api/Axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated, loadingAuth } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (loadingAuth) return;

    if (!isAuthenticated || !user) {
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await api.get(`/cart/${user._id}`);
        setCart(res.data);
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    };

    fetchCart();
  }, [user, isAuthenticated, loadingAuth]);

  const addToCart = async (product) => {
    if (!user) return;

    const existing = cart.find(
      item => item.productId._id === product._id
    );

    if (existing) {
      const res = await api.put(`/cart/update/${existing._id}`, {
        quantity: existing.quantity + 1
      });

      setCart(cart.map(item =>
        item._id === existing._id ? res.data : item
      ));
      //  alert("Item already exists in cart");
    return;
    } else {
      const res = await api.post("/cart/add", {
        userId: user._id,
        productId: product._id,
        quantity: 1
      });

      setCart([...cart, res.data]);
            // alert("add to cart");

    }
  };

  const increaseQty = async (productId) => {

    const item = cart.find(c => c.productId._id === productId);
    if (!item) return;

    const res = await api.put(`/cart/update/${item._id}`, {
      quantity: item.quantity + 1
    });

    setCart(cart.map(c =>
      c._id === item._id ? res.data : c
    ));
  };

  const decreaseQty = async (productId) => {
    const item = cart.find(c => c.productId._id === productId);
    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(productId);
      return;
    }

    const res = await api.put(`/cart/update/${item._id}`, {
      quantity: item.quantity - 1
    });

    setCart(cart.map(c =>
      c._id === item._id ? res.data : c
    ));
  };

  const removeFromCart = async (productId) => {
    const item = cart.find(c => c.productId._id === productId);
    if (!item) return;

    await api.delete(`/cart/delete/${item._id}`);

    setCart(cart.filter(c => c._id !== item._id));
  };

  const clearCart = async () => {
    for (const item of cart) {
      await api.delete(`/cart/delete/${item._id}`);
    }

    setCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};