import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3001/cart");
        setCart(res.data);
      } catch (err) {
        console.error("Failed to load cart from DB, using localStorage", err);
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(localCart);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product) => {
    const existing = cart.find(item => item.productId === product.id);
    if (existing) {
      try {
        await axios.patch("http://localhost:3001/cart/${existing.id}", { quantity: existing.quantity + 1 });
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
        const res = await axios.post("http://localhost:3001/cart", newItem);
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
await axios.delete(`http://localhost:3001/cart/${item.id}`);
      setCart(cart.filter(c => c.productId !== productId));
    } catch (err) {
      console.error("Failed to remove from DB cart", err);
    }
  };

const totalPrice = cart.reduce((total, item) => {
  const priceNumber =
    typeof item.price === "string"
      ? Number(item.price.replace("₹", "").replace(",", ""))
      : item.price;

  return total + priceNumber * item.quantity;
}, 0);

const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
};


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
