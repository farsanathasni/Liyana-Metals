import React, { useEffect, useState } from 'react'
import { useAuth } from '../Contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaHome, FaProductHunt, FaSignOutAlt, FaUsers, FaUserShield } from 'react-icons/fa';
import api from '../Api/Axios';

function ProductsManagment() {

      const { logout ,isAuthenticated} = useAuth();
      const navigate = useNavigate();
      const[product,setProduct]=useState([])
      const[editproducts,setEditProducts]=useState(null)
      const[newproducts,setNewProducts]=useState(null)
          const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      


          useEffect(() => {
              if (!isAuthenticated) {
                navigate("/loginpage", { replace: true });
              }
            }, [isAuthenticated, navigate]);


      useEffect(()=>{
        fetchProducts()
      },[])

      const fetchProducts=async()=>{
        try{
            const res=await api.get("/products")
        setProduct(res.data)
        }
        catch(error){
            console.error("Error fetching products:", error);
        }
      }


      const deleteProduct = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    await api.delete(`/products/${id}`);
    setProduct(prev => prev.filter(p => p.id !== id));
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
};



       const linkStyle = ({ isActive }) =>
  isActive
    ? "flex items-center gap-3 px-6 py-3 bg-amber-500 rounded-md font-medium text-white"
    : "flex items-center gap-3 px-6 py-3 hover:bg-amber-500 rounded-md text-white font-medium";


       const handleLogout = () => {
    logout();
    navigate("/",{ replace: true });
  };



    
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
         <h1 className="text-4xl font-sans font-bold mb-10">Products Management</h1>

        <div className="flex justify-between items-center mb-4">
            
  <button
    className="px-15 py-3 bg-amber-600 text-white rounded hover:bg-amber-500"
    onClick={() => setNewProducts({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
      stock: 0
    })}
  >
    Add Product
  </button>
</div>

                <div className="bg-white shadow rounded-lg overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left">Image</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Stock</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {product.map(product => (
                                <tr key={product.id} className="border-b hover:bg-gray-100">
                                    <td className="px-2 py-2 text-center"><img src={product.image}alt={product.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border mx-auto"/></td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.price}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2">{product.stock}</td>
                                    <td className="px-4 py-2">
                                       <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                                         <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                          onClick={() => setEditProducts(product)}> Edit </button>
                                           <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                              onClick={() => deleteProduct(product.id)} >Delete </button>
                                       </div>
                                       </td>
                          </tr>
                       ))}
                  </tbody>
              </table>
                </div>
            </div>
        </div>

  
   {editproducts && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-96 p-6">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <label className="block mb-2">Name</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-3"
        value={editproducts.name}
        onChange={(e) => setEditProducts({...editproducts, name: e.target.value})}
      />

      <label className="block mb-2">Price</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-3"
        value={editproducts.price}
onChange={(e) => setEditProducts({...editproducts, price: e.target.value})}      />

      <label className="block mb-2">Category</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-3"
        value={editproducts.category}
        onChange={(e) => setEditProducts({...editproducts, category: e.target.value})}
      />

       <label className="block mb-2">Stock</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-3"
        value={editproducts.stock}
        onChange={(e) => setEditProducts({...editproducts, stock: e.target.value})}
      />

      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={() => setEditProducts(null)}
        >
          Cancel
        </button>
        <button
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  onClick={async () => {
    try {
      await api.put(`/products/${editproducts.id}`, editproducts); // fix here
      fetchProducts(); // refresh table
      setEditProducts(null);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  }}
>
  Save
</button>

      </div>
    </div>
  </div>
)}

{newproducts && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-96 p-6">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <label className="block mb-2">Name</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-3"
        value={newproducts.name}
        onChange={(e) => setNewProducts({...newproducts, name: e.target.value})}
      />

      <label className="block mb-2">Price</label>
      <input
        type="number"
        className="w-full border px-3 py-2 rounded mb-3"
        value={newproducts.price}
        onChange={(e) => setNewProducts({...newproducts, price: e.target.value})}
      />

      <label className="block mb-2">Category</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-3"
        value={newproducts.category}
        onChange={(e) => setNewProducts({...newproducts, category: e.target.value})}
      />

      <label className="block mb-2">Image URL</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-3"
        value={newproducts.image}
        onChange={(e) => setNewProducts({...newproducts, image: e.target.value})}
      />

      <label className="block mb-2">Description</label>
      <textarea
        className="w-full border px-3 py-2 rounded mb-3"
        value={newproducts.description}
        onChange={(e) => setNewProducts({...newproducts, description: e.target.value})}
      />

      <label className="block mb-2">Stock</label>
      <input
        type="number"
        className="w-full border px-3 py-2 rounded mb-3"
        value={newproducts.stock}
        onChange={(e) => setNewProducts({...newproducts, stock: Number(e.target.value)})}
      />

      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={() => setNewProducts(null)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={async () => {
            try {
              await api.post("/products", newproducts);
              fetchProducts(); // refresh table
              setNewProducts(null);
            } catch (error) {
              console.error("Failed to add product:", error);
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}



    
    
    </>
  )
}

export default ProductsManagment
