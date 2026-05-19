import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../Api/Axios'; 


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);


useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem('user');
    }
  }
  setLoadingAuth(false);
}, []);

    // registration

// const register = async (userData) => {
//     try {
//       const response = await api.get(`/users?email=${userData.email}`);

//       if (response.data.length > 0) {
//         return { 
//           success: false, 
//           error: 'Email already registered' 
//         };
//       }

//       const generateId = () => {
//   return Date.now().toString();
// };

//       const newUser = {
//         ...userData,
//         // id: Date.now().toString()
//         id: generateId(),
//       };

//       await api.post('/users', newUser);
//       return { success: true };
//     } 

//     catch (error) {
//       if (error.code === 'ERR_NETWORK') {
//         return registerWithLocalStorage(userData);
//       }
//       return { 
//         success: false, 
//         error: 'Registration failed' 
//       };
//     }
//   };
const register = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);

    const data = response.data;

    
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    // if you have state
    setUser(data);

    return {
      success: true,
      user: data
    };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed"
    };
  }
};

 


      //  logination

  // const login = async (email, password) => {
  //   try {
  //     const response = await api.get(`/users?email=${email}&password=${password}`);
      
  //     if (response.data.length > 0) {
  //       const user = response.data[0];

  //       if (user.status === "blocked") {
  //   return {
  //     success: false,
  //     error: "Your account has been blocked by admin"
  //   };
  // }

  //       localStorage.setItem('user', JSON.stringify(user));
  //       setUser(user);
  //       return { success: true, user };
  //     }
  //     return loginWithLocalStorage(email, password);
  //   } 
    
  //   catch (error) {
  //     if (error.code === 'ERR_NETWORK') {
  //       return loginWithLocalStorage(email, password);
  //     }
  //     return { 
  //       success: false, 
  //       error: 'Login failed' 
  //     };
  //   }
  // };
  const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", {
      email,
      password
    });

    const userData = response.data;

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    setUser(userData);

    return {
      success: true,
      user: userData
    };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Invalid credentials"
    };
  }
};

 

 const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.log(error);
  }

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
};




  const checkServerStatus = async () => {
    try { 
      await api.get('/');
      return true;
    } 
    catch {
      return false;
    }
  };

  const value = {
    user,
    register,
    login,
    checkServerStatus,
    logout,
    isAuthenticated: !!user,
    loadingAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};