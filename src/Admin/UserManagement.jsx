import React, { useEffect, useState } from 'react'
import { useAuth } from '../Contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaHome, FaProductHunt, FaSignOutAlt, FaTrash, FaUsers, FaUserShield } from 'react-icons/fa';
import api from '../Api/Axios';

function UserManagement() {
  const { logout ,isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const[users,setUsers]=useState([])
    const[edit,setEdit]=useState(null)
        const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const[editForm,setEditForm]=useState({
      name:"",
      email:"",
      role: "user"
    })


useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);


    useEffect(()=>{
      fetchUser()
    },[])

    const fetchUser =async()=>{
      try{
        const res=await api.get("/users")
        setUsers(res.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
    }

    const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete=async(id)=>{
    if(window.confirm("Are you sure you want to delete this user?")){
      try{
        await api.delete(`/users/${id}`);
        setUsers(users.filter(user=> user.id !==id))
      }
      catch(error){
        console.error('Failed to delete user:', error);
      }
    }
  }

  const handleEdit=(user)=>{
    setEdit(user);
    setEditForm({
      name:user.name,
      email:user.email,
      role: user.role ||"user"
    })
  }

  const handleEditChange=(e)=>{
    setEditForm({...editForm,[e.target.name]:e.target.value})
  }

  const handleUpdateUser = async () => {
  try {
    await api.put(`/users/${edit.id}`, {
      ...edit,
      ...editForm
    });

    setUsers(users.map(u =>
      u.id === edit.id ? { ...u, ...editForm } : u
    ));

    setEdit(null);
    alert("User updated successfully ✅");

  } catch (error) {
    console.error("Update failed:", error);
    alert("Update failed ❌");
  }
};


const toggleStatus = async (user) => {
  const newStatus = user.status === "active" ? "blocked" : "active";

  try {
    await api.patch(`/users/${user.id}`, {
      status: newStatus
    });

    setUsers(users.map(u =>
      u.id === user.id ? { ...u, status: newStatus } : u
    ));
  } catch (error) {
    console.error("Failed to update status:", error);
  }
};




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
  <h1 className="text-4xl font-bold mb-4">User Management</h1>

  <div className="overflow-x-auto bg-white shadow rounded-lg">
    <table className="min-w-full table-auto">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Role</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b hover:bg-gray-100">

            <td className="px-4 py-2">{user.name}</td>

            <td className="px-4 py-2">{user.email}</td>

            <td className="px-4 py-2">{user.role || "User"}</td>

            <td className="px-4 py-2">
             <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  user.status === "active"? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"    }`}>
                    {user.status || "active"}
                      </span>
            </td>

            <td className="px-4 py-2 flex gap-4">
                 <button onClick={() => handleEdit(user)}className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                     Edit
                 </button>

                 <button onClick={() => toggleStatus(user)}className={`px-3 py-1 rounded text-white ${
                           user.status === "active"? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`}>
                            {user.status === "active" ? "Block" : "Unblock"}
                 </button>

                 <button onClick={() => handleDelete(user.id)}
                    className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      <FaTrash /> Delete
                 </button>
           </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>



{edit && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      <input
        type="text"
        name="name"
        value={editForm.name}
        onChange={handleEditChange}
        className="w-full border p-2 mb-3"
      />

      <input
        type="email"
        name="email"
        value={editForm.email}
        onChange={handleEditChange}
        className="w-full border p-2 mb-3"
      />

      <select
        name="role"
        value={editForm.role}
        onChange={handleEditChange}
        className="w-full border p-2 mb-4"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setEdit(null)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateUser}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

   </>
  )
}

export default UserManagement
