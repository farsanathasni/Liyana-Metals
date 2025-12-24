// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// function ProductDetails() {
//   const { id } = useParams(); 
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const API_URL = "http://localhost:3001"; // JSON server base URL

//   // Fetch product details
//   useEffect(() => {
//     axios.get(`${API_URL}/products/${id}`)
//       .then(res => {
//         setProduct(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching product:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   // Add to Cart (localStorage only)
//  const addToCart = async (product) => {
//   // Update localStorage
//   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//   const existing = cart.find(item => item.id === product.id);

//   if (existing) {
//     existing.quantity += 1;
//   } else {
//     cart.push({ ...product, quantity: 1 });
//   }
//   localStorage.setItem("cart", JSON.stringify(cart));

//   // Update JSON server
//   try {
//     const res = await axios.get(`http://localhost:3001/cart?productId=${product.id}`);
//     if (res.data.length > 0) {
//       // If already in DB, update quantity
//       const item = res.data[0];
//       await axios.patch(`http://localhost:3001/cart/${item.id}`, { quantity: item.quantity + 1 });
//     } else {
//       // Add new to DB
//       await axios.post(`http://localhost:3001/cart`, { 
//         productId: product.id,
//         name: product.name,
//         price: product.price,
//         description: product.description,
//         image: product.image,
//         category: product.category,
//         quantity: 1
//       });
//     }
//     alert(`${product.name} added to cart!`);
//   } catch (err) {
//     console.error("Error adding to DB cart:", err);
//     alert("Added to local cart only (DB failed)");
//   }
// };

//   // Add to Wishlist (localStorage only)
//   const addToWishlist = (product) => {
//     const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//     const existing = wishlist.find(item => item.id === product.id);

//     if (existing) {
//       alert("Already in wishlist");
//       return;
//     }

//     wishlist.push(product);
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//     alert("Added to wishlist ❤️");
//   };

//   if (loading) {
//     return <div className="h-screen flex items-center justify-center text-gray-500">Loading product details...</div>;
//   }

//   if (!product) {
//     return <div className="h-screen flex items-center justify-center text-red-500">Product not found</div>;
//   }

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
//         <img
//           src={product.image || "/assets/fallback.png"}
//           alt={product.name}
//           className="w-full h-[400px] object-contain"
//           onError={(e) => e.target.src = "/assets/fallback.png"} 
//         />

//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
//           <p className="text-gray-600 mt-3">{product.description}</p>
//           <p className="text-amber-600 text-2xl font-bold mt-4">₹{product.price}</p>
//           <p className="text-sm text-gray-500 mt-1">stock - {product.stock}</p>

//           <div className="flex gap-4 mt-6">
//             <button
//               className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
//               onClick={() => addToCart(product)}
//             >
//               Add to Cart 🛒
//             </button>
//             <button
//               className="px-6 py-3 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition"
//               onClick={() => addToWishlist(product)}
//             >
//               Add to Wishlist ❤️
//             </button>
//           </div>

//           <div className="mt-8 border-t pt-6">
//             <h3 className="font-semibold text-lg text-gray-800">Product Details</h3>
//             <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
//               <li>High quality & durable material</li>
//               <li>Easy to clean & maintain</li>
//               <li>Perfect for daily kitchen use</li>
//               <li>1 Year Manufacturer Warranty</li>
//             </ul>
//           </div>

//           <button
//             className="mt-3 inline-block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
//             onClick={()=>navigate("/products")}
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductDetails;









import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../Contexts/CartContext"; // import cart context
import { useAuth } from "../../Contexts/AuthContext"; // auth check
import { FaHeart, FaShoppingCart } from "react-icons/fa";


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // use addToCart from context
  const { isAuthenticated } = useAuth(); // check auth

  const API_URL = "http://localhost:3001";

  useEffect(() => {
    axios.get(`${API_URL}/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);


    const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please login or register to add items to cart");
      navigate("/loginpage");
      return;
    }
    try {
      await addToCart(product);
      alert(`${product.name} added to cart!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };


  if (loading) return <div className="h-screen flex items-center justify-center text-gray-500">Loading product details...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center text-red-500">Product not found</div>;



const handleAddToWishlist = () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const exists = wishlist.find(item => item.id === product.id);

  if (exists) {
    alert("Already in wishlist");
    return;
  }

  wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Added to wishlist ❤️");
};




  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.image || "/assets/fallback.png"}
          alt={product.name}
          className="w-full h-[400px] object-contain"
          onError={(e) => e.target.src = "/assets/fallback.png"}
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-3">{product.description}</p>
          <p className="text-amber-600 text-2xl font-bold mt-4">₹{product.price}</p>
          <p className="text-sm text-gray-500 mt-1">stock - {product.stock}</p>

          <div className="flex gap-4 mt-6">
            <button
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
              onClick={handleAddToCart}
            >
               <FaShoppingCart/>
            </button>
             <button
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
    onClick={handleAddToWishlist}
  >
    <FaHeart/>
  </button>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold text-lg text-gray-800">Product Details</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>High quality & durable material</li>
              <li>Easy to clean & maintain</li>
              <li>Perfect for daily kitchen use</li>
              <li>1 Year Manufacturer Warranty</li>
            </ul>
          </div>

          <button
            className="mt-3 inline-block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
            onClick={() => navigate("/products")}
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
