import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../Api/Axios";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();


 

  // Sync to localStorage
  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      const res = await api.get(`/wishlist/${user._id}`);
      setWishlist(res.data);
    };

    fetchWishlist();
  }, [user]);


  const addToWishlist =async  (product) => {
   try{
    const res=await api.post("/wishlist/add",{userId:user._id,productId:product._id})
    setWishlist([...wishlist,res.data])
   }
   catch (error) {
    alert(error.response?.data?.message || error.message);
    throw error;
  }

  };

  const removeFromWishlist =async  (id) => {
    try{
      await api.delete(`/wishlist/delete/${id}`)
          setWishlist(wishlist.filter(item => item._id !== id));
    }
    catch(error){
       console.log(error.message);
    }
  };

 useEffect(() => {
  if (!user) setWishlist([]);
}, [user]);



  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
