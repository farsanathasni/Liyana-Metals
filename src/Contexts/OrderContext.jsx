import { createContext, useContext } from "react";
import api from "../Api/Axios";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {

  // SAVE ORDER TO DB
  const placeOrder = async (orderData) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("Order failed:", error);
      throw error;
    }
  };

  // GET USER ORDERS
  const getMyOrders = async (userId) => {
    const response = await api.get(`/orders?userId=${userId}`);
    return response.data;
  };

  return (
    <OrderContext.Provider value={{ placeOrder, getMyOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
