import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  FaBoxOpen,
  FaHome,
  FaProductHunt,
  FaSignOutAlt,
  FaUsers,
  FaUserShield,
  FaStore,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from 'react-icons/fa';
import api from '../Api/Axios';

function ProductsManagment() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [editproducts, setEditProducts] = useState(null);
  const [newproducts, setNewProducts] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products");
      setProduct(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/products/${id}`);
      setProduct(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-5 py-3 bg-[#2A4E3F] rounded-xl font-semibold text-white shadow-xs transition-all"
      : "flex items-center gap-3 px-5 py-3 hover:bg-[#234437] rounded-xl text-emerald-100/80 hover:text-white font-medium transition-all";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const filteredProductsList = product.filter(p =>
    p.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between bg-[#1E3A2F] text-white px-5 py-3.5 fixed top-0 left-0 right-0 z-40 border-b border-emerald-900 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-xl font-bold p-1 rounded hover:bg-white/10"
          >
            ☰
          </button>
          <span className="font-extrabold text-base tracking-tight">LIYANA METALS ADMIN</span>
        </div>
        <Link to="/" className="text-xs text-emerald-200 hover:text-white flex items-center gap-1 font-semibold">
          <FaStore /> Store
        </Link>
      </div>

      <div className="flex min-h-screen bg-[#FAF8F5]">
        
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static top-0 left-0 z-50
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            w-64 min-h-screen
            transition-transform duration-300
            bg-[#1E3A2F] text-white
            flex flex-col border-r border-[#274f3f]
          `}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden absolute top-4 right-4 text-white text-xl font-bold"
          >
            ✕
          </button>

          <div className="p-6 border-b border-[#2A4E3F] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <FaUserShield className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">HOME NEEDS</h2>
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                Admin Console
              </p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1.5 mt-2">
            <NavLink to="/dashboard" className={linkStyle}>
              <FaHome className="text-lg" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/usermanagement" className={linkStyle}>
              <FaUsers className="text-lg" />
              <span>User Accounts</span>
            </NavLink>

            <NavLink to="/ordermanagement" className={linkStyle}>
              <FaBoxOpen className="text-lg" />
              <span>Orders & Sales</span>
            </NavLink>

            <NavLink to="/productsmanagement" className={linkStyle}>
              <FaProductHunt className="text-lg" />
              <span>Product Inventory</span>
            </NavLink>

            <div className="pt-4 mt-4 border-t border-[#2A4E3F]">
              <Link
                to="/"
                className="flex items-center gap-3 px-5 py-3 hover:bg-[#234437] rounded-xl text-emerald-100/80 hover:text-white font-medium text-sm transition-all"
              >
                <FaStore className="text-lg" />
                <span>Visit Storefront</span>
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-[#2A4E3F]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3 w-full rounded-xl bg-red-900/30 text-red-200 hover:bg-red-800/40 text-sm font-semibold transition-colors"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-10 mt-14 md:mt-0 max-w-7xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Product Inventory
              </h1>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Maintain catalog products, update pricing, categories, and warehouse stocks.
              </p>
            </div>

            <button
              onClick={() => setNewProducts({
                name: "",
                price: "",
                category: "",
                image: "",
                imageFile: null,
                description: "",
                stock: 0
              })}
              className="px-5 py-3 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold rounded-2xl shadow-sm text-xs flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <FaPlus />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="mb-6 max-w-md relative">
            <input
              type="text"
              placeholder="Search products by title or category..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#1E3A2F] shadow-xs"
            />
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] border-b border-stone-200/80 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredProductsList.map((p) => (
                    <tr key={p._id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image || "/default-product.png"}
                            alt={p.name}
                            onError={(e) => (e.target.src = "/default-product.png")}
                            className="w-12 h-12 rounded-xl object-contain bg-[#FAF8F5] p-1 border border-stone-100 flex-shrink-0"
                          />
                          <div>
                            <p className="font-bold text-stone-900 line-clamp-1 max-w-xs">{p.name}</p>
                            <p className="text-[11px] text-stone-400 line-clamp-1 max-w-xs">{p.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-[#1E3A2F]">
                        ₹{p.price}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          p.stock > 0
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditProducts(p)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <FaEdit className="text-[10px]" /> Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(p._id)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Edit Product Modal */}
      {editproducts && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-8 border border-stone-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-stone-900 pb-3 border-b border-stone-100">
              Edit Product Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  value={editproducts.name}
                  onChange={(e) => setEditProducts({ ...editproducts, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                    value={editproducts.price}
                    onChange={(e) => setEditProducts({ ...editproducts, price: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                    value={editproducts.stock}
                    onChange={(e) => setEditProducts({ ...editproducts, stock: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  value={editproducts.category}
                  onChange={(e) => setEditProducts({ ...editproducts, category: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  value={editproducts.description}
                  onChange={(e) => setEditProducts({ ...editproducts, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
              <button
                className="px-5 py-2.5 bg-stone-100 text-stone-700 font-semibold rounded-xl text-xs hover:bg-stone-200 transition-colors"
                onClick={() => setEditProducts(null)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2.5 bg-[#1E3A2F] text-white font-semibold rounded-xl text-xs hover:bg-[#284f3f] shadow-xs transition-colors"
                onClick={async () => {
                  try {
                    await api.put(`/admin/products/${editproducts._id}`, editproducts);
                    fetchProducts();
                    setEditProducts(null);
                  } catch (error) {
                    console.error("Failed to update product:", error);
                  }
                }}
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {newproducts && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-8 border border-stone-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-stone-900 pb-3 border-b border-stone-100">
              Add New Product
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Triply Stainless Steel Kadai"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  value={newproducts.name}
                  onChange={(e) => setNewProducts({ ...newproducts, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1499"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                    value={newproducts.price}
                    onChange={(e) => setNewProducts({ ...newproducts, price: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Initial Stock *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 25"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                    value={newproducts.stock}
                    onChange={(e) => setNewProducts({ ...newproducts, stock: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cookware, Appliances, Homeware"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  value={newproducts.category}
                  onChange={(e) => setNewProducts({ ...newproducts, category: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  value={newproducts.image}
                  onChange={(e) => setNewProducts({ ...newproducts, image: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Or Upload Local File
                </label>
                <input
                  type="file"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  onChange={(e) => setNewProducts({ ...newproducts, imageFile: e.target.files[0] })}
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Enter detailed specifications and highlights..."
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  value={newproducts.description}
                  onChange={(e) => setNewProducts({ ...newproducts, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
              <button
                className="px-5 py-2.5 bg-stone-100 text-stone-700 font-semibold rounded-xl text-xs hover:bg-stone-200 transition-colors"
                onClick={() => setNewProducts(null)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2.5 bg-[#1E3A2F] text-white font-semibold rounded-xl text-xs hover:bg-[#284f3f] shadow-xs transition-colors"
                onClick={async () => {
                  try {
                    const formData = new FormData();
                    formData.append("name", newproducts.name);
                    formData.append("price", newproducts.price);
                    formData.append("category", newproducts.category);
                    formData.append("description", newproducts.description);
                    formData.append("stock", newproducts.stock);

                    if (newproducts.imageFile) {
                      formData.append("image", newproducts.imageFile);
                    } else {
                      formData.append("image", newproducts.image);
                    }

                    await api.post("/admin/products/add", formData);
                    fetchProducts();
                    setNewProducts(null);
                  } catch (error) {
                    console.error("Failed to add product:", error.response?.data);
                  }
                }}
              >
                Save & Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsManagment;
