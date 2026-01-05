import React, { useEffect, useState } from "react";
import {FaHome,FaUsers,FaBoxOpen, FaSignOutAlt,FaProductHunt, FaUserShield} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";
import api from "../Api/Axios";
import {PieChart,Pie,Cell,Tooltip,BarChart,Bar,XAxis,YAxis,CartesianGrid,ResponsiveContainer} from "recharts";


function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


 

  const handleLogout = () => {
    logout();
    navigate("/",{ replace: true });
  };

  useEffect(()=>{
    fetchDashboardData();
  },[])

  const fetchDashboardData =async()=>{
    try{
      const usersRes=await api.get("/users");
      const ordersRes=await api.get("/orders");
      const productsRes=await api.get("/products");

      
      setUsersCount(usersRes.data.length)
      setOrdersCount(ordersRes.data.length)
      setProductsCount(productsRes.data.length)

      setChartData([
      { name: "Users", count: usersRes.data.length },
      { name: "Orders", count: ordersRes.data.length },
      { name: "Products", count: productsRes.data.length }
    ])

     const revenue = ordersRes.data.reduce(
        (sum, order) => sum + (order.total || 0),
        0
      );
      setTotalRevenue(revenue);
    } catch (error) {
      console.error("Dashboard API error:", error);
    }
  }

  // Donut Chart Data (dynamic from DB)
const donutData = [
  { name: "Users", value: usersCount },
  { name: "Orders", value: ordersCount },
  { name: "Products", value: productsCount }
];

const COLORS = ["#f59e0b", "#10b981", "#3b82f6"]; // Orange, Green, Blue


const linkStyle = ({ isActive }) =>
  isActive
    ? "flex items-center gap-3 px-6 py-3 bg-amber-500 rounded-md font-medium text-white"
    : "flex items-center gap-3 px-6 py-3 hover:bg-amber-500 rounded-md text-white font-medium";



  return (
    <>

{/* Mobile Header ONLY */}
<div className="md:hidden flex items-center justify-between bg-amber-600 text-white px-4 py-3 fixed top-0 left-0 right-0 z-40">
  <button onClick={() => setMobileMenuOpen(true)} className="text-2xl font-bold">
    ☰
  </button>
  <h1 className="font-bold">Admin Panel</h1>
</div>

{/* Main Layout */}

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
className="flex items-center gap-3 px-6 py-3 hover:bg-amber-500 rounded-md text-white font-medium w-full"
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

    {/* Dashboard Overview */}
<div className="flex-1 p-8 bg-gray-100 mt-14 md:mt-0 md:ml-2">
  <h1 className="text-2xl font-bold mb-6 text-gray-800">
    Dashboard Overview
  </h1>

  {/* Summary Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* Revenue */}
    <div className="rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-700">
      <p className="text-emerald-100 font-medium">Total Revenue</p>
      <h2 className="text-3xl font-bold mt-2">₹ {totalRevenue}</h2>
    </div>

    {/* Orders */}
    <div className="rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-sky-500 to-sky-700">
      <p className="text-sky-100 font-medium">Total Orders</p>
      <h2 className="text-3xl font-bold mt-2">{ordersCount}</h2>
    </div>

    {/* Customers */}
    <div className="rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-violet-500 to-violet-700">
      <p className="text-violet-100 font-medium">Total Customers</p>
      <h2 className="text-3xl font-bold mt-2">{usersCount}</h2>
    </div>

{/* products */}
  <div className="rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-rose-500 to-pink-600">
  <p className="text-rose-100 font-medium">Total Products</p>
  <h2 className="text-3xl font-bold mt-2">{productsCount}</h2>
</div>




  </div>

  {/* Bar Chart Below Summary Cards */}
 <div className="flex flex-col lg:flex-row gap-6 mt-8">
  {/* Bar Chart */}
  <div className="bg-white p-6 rounded-xl shadow flex-1">
    <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
      Bar Chart (Overview)
    </h2>

    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#30adccff" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Donut Chart */}
  <div className="bg-white p-6 rounded-xl shadow flex-1">
    <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
      Overview Donut Chart
    </h2>

    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={donutData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={150}
          label
        >
          {donutData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

</div>
     
    </div>
    </>
  );
}

export default AdminDashboard;
