import React, { useEffect, useState } from 'react'
import api from '../Api/Axios'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaHome, FaProductHunt, FaSignOutAlt, FaUsers, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../Contexts/AuthContext';

function OrderManagement() {


  const [order, setOrder] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);




  useEffect(() => {
    fetchOrder()
  }, [])

  const fetchOrder = async () => {
    try {
      const res = await api.get("/admin/order")
      setOrder(res.data)
    }
    catch (error) {
      console.error("Failed to fetch orders:", error)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/admin/order/${orderId}`, {
        status: newStatus,
      });

      setSelectedOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));

      fetchOrder();
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };


  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/order/${orderId}`);

      setOrder((prev) => prev.filter((o) => o._id !== orderId));
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-6 py-3 bg-amber-500 rounded-md font-medium text-white"
      : "flex items-center gap-3 px-6 py-3 hover:bg-amber-500 rounded-md text-white font-medium";


  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });

  };

  

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-amber-600 text-white px-4 py-3 fixed top-0 left-0 right-0 z-40">
        <button onClick={() => setMobileMenuOpen(true)} className="text-2xl font-bold">
          ☰
        </button>
        <h1 className="font-bold">Admin Panel</h1>
      </div>


      <div className="flex min-h-screen bg-gray-100">


        {/* Sidebar */}
        <div
          className={`
    fixed md:static top-0 left-0 z-50
    ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    w-64 md:w-20 md:hover:w-64
     min-h-screen
    transition-all duration-300
    bg-amber-600 text-white
    flex flex-col
    group
  `}
        >


          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden absolute top-4 right-4 text-2xl font-bold"
          >
            ✕
          </button>

          <div className="p-6 text-2xl font-bold border-b border-amber-500  flex items-center gap-3 justify-start group-hover:justify-start transition-all duration-300">
            <FaUserShield className="text-2xl min-w-[24px]" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Admin Panel
            </span>
          </div>





          <nav className="flex-1 mt-6">
            <ul className="space-y-2">
              <li>
                <NavLink to="/dashboard" className={linkStyle}>
                  <FaHome className="text-xl min-w-[24px]" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Dashboard
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/usermanagement" className={linkStyle}>
                  <FaUsers className="text-xl min-w-[24px]" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Users
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/ordermanagement" className={linkStyle}>
                  <FaBoxOpen className="text-xl min-w-[24px]" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Orders
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/productsmanagement" className={linkStyle}>
                  <FaProductHunt className="text-xl min-w-[24px]" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Products
                  </span>
                </NavLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-6 py-3 hover:bg-red-500 rounded-md text-white font-medium w-full"
                >
                  <FaSignOutAlt className="text-xl min-w-[24px]" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Logout
                  </span>
                </button>
              </li>

            </ul>
          </nav>
        </div>




        <div className="flex-1 p-8 bg-gray-100 mt-14 md:mt-0 md:ml-2">
          <h1 className="text-4xl font-bold mb-4">Order Management</h1>

          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left ">Order ID</th>
                  <th className="px-4 py-2 text-left">name</th>
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {order.map(order => (
                  <tr key={order._id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2"> {order.customer?.name || "N/A"}</td>
                    <td className="px-4 py-2">{order.items.map((item) => item.productId?.name).join(", ")}</td>
                    <td className="px-4 py-2">₹{order.total}</td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2 flex gap-4">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => deleteOrder(order._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-[500px] max-h-[80vh] overflow-y-auto p-10 ">

              <h2 className="text-xl font-bold mb-4">Order Details</h2>

<p className="mb-2">
  <strong>Order ID:</strong> {selectedOrder._id}
</p>

<p className="mb-2">
  <strong>User Name:</strong> {selectedOrder.userId?.name}
</p>

<p className="mb-2">
  <strong>Email:</strong> {selectedOrder.userId?.email}
</p>

<p className="mb-2">
  <strong>User ID:</strong> {selectedOrder.userId?._id}
</p>

              <div className="mb-3">
  <strong>Items:</strong>
  <ul className="list-disc ml-5 mt-1">
    {selectedOrder.items.map((item, index) => (
      <li key={index} className="mb-3">
        <div>{item.productId?.name} × {item.quantity}</div>

        {item.productId?.image && (
          <img
            src={item.productId?.image}
            alt={item.productId?.name}
            className="w-24 h-24 object-cover rounded border mt-2"
          />
        )}
      </li>
    ))}
  </ul>
</div>

              <p className="mb-2">
                <strong>Total:</strong> ₹{selectedOrder.total}
              </p>

              <div className="mb-4">
                <label className="block font-semibold mb-1">
                  Order Status </label>

                <select value={selectedOrder.status} onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                  className="w-full border rounded px-3 py-2">
                  <option value="pending">placed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>

              <div className="text-right">
                <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                  Close
                </button>
              </div>

            </div>
          </div>

        )}

      </div>




    </>
  )
}

export default OrderManagement
