import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const API_URL = "http://localhost:3001";

  // Load cart from DB (or fallback to localStorage)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/cart`);
        setCart(res.data);
      } catch (err) {
        console.error("Failed to load cart from DB, using localStorage", err);
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(localCart);
      }
    };
    fetchCart();
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product) => {
    const existing = cart.find(item => item.productId === product.id);
    if (existing) {
      // Update quantity in DB
      try {
        await axios.patch(`${API_URL}/cart/${existing.id}`, { quantity: existing.quantity + 1 });
        setCart(cart.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } catch (err) {
        console.error("Failed to update cart in DB", err);
      }
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1
      };
      try {
        const res = await axios.post(`${API_URL}/cart`, newItem);
        setCart([...cart, res.data]);
      } catch (err) {
        console.error("Failed to add cart in DB", err);
      }
    }
  };

  const removeFromCart = async (productId) => {
    const item = cart.find(c => c.productId === productId);
    if (!item) return;
    try {
      await axios.delete(`${API_URL}/cart/${item.id}`);
      setCart(cart.filter(c => c.productId !== productId));
    } catch (err) {
      console.error("Failed to remove from DB cart", err);
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
