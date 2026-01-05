import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated, loadingAuth } = useAuth();
  const [cart, setCart] = useState([]);

  // 🔹 Fetch cart USER-WISE
  useEffect(() => {
    if (loadingAuth) return;

    if (!isAuthenticated || !user) {
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/cart?userId=${user.id}`
        );
        setCart(res.data);
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    };

    fetchCart();
  }, [user, isAuthenticated, loadingAuth]);

  // 🔹 Add to cart
  const addToCart = async (product) => {
    if (!user) return;

    const existing = cart.find(
      item => item.productId === product.id && item.userId === user.id
    );

    if (existing) {
      try {
        await axios.patch(
          `http://localhost:3001/cart/${existing.id}`,
          { quantity: existing.quantity + 1 }
        );

        setCart(
          cart.map(item =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } catch (err) {
        console.error("Failed to update cart", err);
      }
    } else {
      const newItem = {
        userId: user.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1
      };

      try {
        const res = await axios.post(
          "http://localhost:3001/cart",
          newItem
        );
        setCart([...cart, res.data]);
      } catch (err) {
        console.error("Failed to add cart", err);
      }
    }
  };


// ➕ Increase quantity
const increaseQty = async (productId) => {
  const item = cart.find(
    c => c.productId === productId && c.userId === user.id
  );
  if (!item) return;

  try {
    await axios.patch(
      `http://localhost:3001/cart/${item.id}`,
      { quantity: item.quantity + 1 }
    );

    setCart(cart.map(c =>
      c.id === item.id
        ? { ...c, quantity: c.quantity + 1 }
        : c
    ));
  } catch (err) {
    console.error("Failed to increase quantity", err);
  }
};


// ➖ Decrease quantity
const decreaseQty = async (productId) => {
  const item = cart.find(
    c => c.productId === productId && c.userId === user.id
  );
  if (!item) return;

  if (item.quantity === 1) {
    // If quantity is 1 → remove item
    removeFromCart(productId);
    return;
  }

  try {
    await axios.patch(
      `http://localhost:3001/cart/${item.id}`,
      { quantity: item.quantity - 1 }
    );

    setCart(cart.map(c =>
      c.id === item.id
        ? { ...c, quantity: c.quantity - 1 }
        : c
    ));
  } catch (err) {
    console.error("Failed to decrease quantity", err);
  }
};




  // 🔹 Remove from cart
 const removeFromCart = async (productId) => {
  if (!user) return;

  const item = cart.find(
    c => c.productId === productId && c.userId === user.id
  );
  if (!item) return;

  try {
    await axios.delete(`http://localhost:3001/cart/${item.id}`);
    setCart(cart.filter(c => c.id !== item.id));
  } catch (err) {
    console.error("Failed to remove cart item", err);
  }
};

  // 🔹 Total price
  const totalPrice = cart.reduce((total, item) => {
    const priceNumber =
      typeof item.price === "string"
        ? Number(item.price.replace("₹", "").replace(/,/g, ""))
        : item.price;

    return total + priceNumber * item.quantity;
  }, 0);

  // 🔹 Clear cart (after order)
useEffect(() => {
  if (!user) setCart([]);
}, [user]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty,
    decreaseQty, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
