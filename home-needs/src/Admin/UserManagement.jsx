import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  FaBoxOpen,
  FaHome,
  FaProductHunt,
  FaSignOutAlt,
  FaTrash,
  FaUsers,
  FaUserShield,
  FaStore,
  FaEdit,
  FaBan,
  FaCheck,
} from 'react-icons/fa';
import api from '../Api/Axios';

function UserManagement() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "user"
  });

  const fetchUser = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (user) => {
    setEdit(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role || "user"
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      const res = await api.put(`/admin/users/${edit._id}`, editForm);
      setUsers(users.map(u => (u._id === edit._id ? res.data : u)));
      setEdit(null);
      alert("User updated successfully ✅");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const toggleStatus = async (user) => {
    try {
      const res = await api.patch(`/admin/users/${user._id}/toggle`);
      const updatedUser = res.data;
      setUsers(prev => prev.map(u => (u._id === updatedUser._id ? updatedUser : u)));
    } catch (error) {
      console.error("Toggle failed:", error.response?.data || error.message);
    }
  };

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-5 py-3 bg-[#2A4E3F] rounded-xl font-semibold text-white shadow-xs transition-all"
      : "flex items-center gap-3 px-5 py-3 hover:bg-[#234437] rounded-xl text-emerald-100/80 hover:text-white font-medium transition-all";

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
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Customer Accounts & Access
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Manage registered shoppers, privileges, and account security.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] border-b border-stone-200/80 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-6 py-4 font-bold text-stone-900">
                        {u.name}
                      </td>
                      <td className="px-6 py-4 text-stone-600">
                        {u.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          u.role === "admin"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-stone-100 text-stone-700"
                        }`}>
                          {u.role || "user"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          u.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}>
                          {u.status || "active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(u)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <FaEdit className="text-[10px]" /> Edit
                          </button>
                          <button
                            onClick={() => toggleStatus(u)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors ${
                              u.status === "active"
                                ? "bg-amber-600 hover:bg-amber-700"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            {u.status === "active" ? "Block" : "Unblock"}
                          </button>
                          <button
                            onClick={() => handleDelete(u._id)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete user"
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

      {/* Edit Modal */}
      {edit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 border border-stone-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-stone-900 pb-3 border-b border-stone-100">
              Edit User Account
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  System Role
                </label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleEditChange}
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                >
                  <option value="user">Shopper / User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                onClick={() => setEdit(null)}
                className="px-5 py-2.5 bg-stone-100 text-stone-700 font-semibold rounded-xl text-xs hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-5 py-2.5 bg-[#1E3A2F] text-white font-semibold rounded-xl text-xs hover:bg-[#284f3f] shadow-xs transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserManagement;
