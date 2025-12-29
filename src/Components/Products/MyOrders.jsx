import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useOrder } from "../../Contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

function MyOrders() {
  const { user, isAuthenticated, loadingAuth } = useAuth();
  const { getMyOrders } = useOrder();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingAuth) return;

    if (!isAuthenticated) {
      navigate("/loginpage");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(user.id);
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated, loadingAuth, getMyOrders, navigate]);

  if (loading || loadingAuth) {
    return <div className="text-center mt-20">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        No orders placed yet
      </div>
    );
  }

  const getPriceNumber = (price) => {
  if (!price) return 0;
  return Number(
    price.toString().replace("₹", "").replace(/,/g, "")
  );
};

  return (
<>
<Navbar/>
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 mb-6 shadow-sm"
        >
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <p className="text-sm mb-2">
            Status: <span className="font-medium">{order.status}</span>
          </p>

          <div className="border-t pt-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between "
              >
                   <span>{item.name}  {item.quantity}</span>
                   <span> ₹{getPriceNumber(item.price) * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold mt-3">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      ))}
      <div className="text-center mt-0">
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-amber-600 text-white rounded-full"
          >
            View All Products
          </button>
        </div>
    </div>


    <Footer/>
  </>
  );

}

export default MyOrders;
