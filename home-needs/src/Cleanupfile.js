import axios from "axios";

const cleanupCart = async () => {
  try {
    // Get all cart items
    const res = await axios.get("http://localhost:3001/cart");
    const cartItems = res.data;

    // Delete each cart item
    await Promise.all(
      cartItems.map(item =>
        axios.delete(`http://localhost:3001/cart/${item.id}`)
      )
    );

    console.log("Old cart items deleted successfully");
  } catch (err) {
    console.error("Error deleting cart items:", err);
  }
};

cleanupCart();
