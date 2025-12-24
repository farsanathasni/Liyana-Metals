import React from "react";
import airtightjarImg from "../../assets/airtightjar.jpeg";
import farypanImg from "../../assets/farypan.jpeg";
import knife1Img from "../../assets/knife1.jpeg";
import nonsticcasaroleImg from "../../assets/nonsticcasarole.jpeg";
import { useNavigate } from "react-router-dom";

const Productsdata = [
  {
    id: 1,
    img: airtightjarImg,
    title: "Airtight Storage Jar",
    price: "₹299",
    rating: 5.0,
  },
  {
    id: 2,
    img: farypanImg,
    title: "Non-Stick Fry Pan",
    price: "₹399",
    rating: 5.0,
  },
  {
    id: 3,
    img: knife1Img,
    title: "Premium Kitchen Knife",
    price: "₹275",
    rating: 4.5,
  },
  {
    id: 4,
    img: nonsticcasaroleImg,
    title: "Non-Stick Casserole",
    price: "₹1,599",
    rating: 4.0,
  },
];

function BestSeller() {

  const navigate=useNavigate()

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-amber-600 font-medium">
            Top Selling Products for You
          </p>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Our Products
          </h1>
          <p className="text-gray-500 mt-3">
            Premium quality kitchen essentials for everyday cooking
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Productsdata.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Image */}
             {/* Image wrapper */}
          <div className="relative h-52 w-full bg-white flex items-center justify-center rounded-t-xl">
  
  {/* Offer badge */}
  {/* <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
    20% OFF
  </span> */}

  {/* Image */}
         <img
             src={item.img}
             alt={item.title}
             className="max-h-44 w-auto object-contain"
         />
         </div>


              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.title}
                </h3>

                <p className="text-amber-600 font-bold mt-2">
                  {item.price}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  ⭐ {item.rating} Rating
                </p>

                <button className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

<div className="text-center mt-10">
  <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 
                     text-white font-semibold rounded-full shadow-lg
                     hover:shadow-xl hover:scale-105 transition duration-300"
                     onClick={()=>navigate("/products")}
                     >
    View All Products
  </button>
</div>

      </div>
    </section>
  );
}

export default BestSeller;




// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../Contexts/AuthContext";
// import airtightjarImg from "../../assets/airtightjar.jpeg";
// import farypanImg from "../../assets/farypan.jpeg";
// import knife1Img from "../../assets/knife1.jpeg";
// import nonsticcasaroleImg from "../../assets/nonsticcasarole.jpeg";

// const Productsdata = [
//   {
//     id: 1,
//     img: airtightjarImg,
//     title: "Airtight Storage Jar",
//     price: "₹299",
//     rating: 5.0,
//   },
//   {
//     id: 2,
//     img: farypanImg,
//     title: "Non-Stick Fry Pan",
//     price: "₹399",
//     rating: 5.0,
//   },
//   {
//     id: 3,
//     img: knife1Img,
//     title: "Premium Kitchen Knife",
//     price: "₹275",
//     rating: 4.5,
//   },
//   {
//     id: 4,
//     img: nonsticcasaroleImg,
//     title: "Non-Stick Casserole",
//     price: "₹1,599",
//     rating: 4.0,
//   },
// ];

// function BestSeller() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   const handleAddToCart = (item) => {
//     if (!isAuthenticated) {
//       alert("Please login to add items to cart");
//       navigate("/loginpage");
//       return;
//     }

//     try {
//       const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//       const existingItem = cart.find(cartItem => cartItem.id === item.id);
      
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         cart.push({ ...item, quantity: 1 });
//       }
      
//       localStorage.setItem('cart', JSON.stringify(cart));
//       alert(`${item.title} added to cart!`);
//     } catch (err) {
//       alert('Failed to add to cart');
//     }
//   };

//   const handleViewProduct = (id) => {
//     navigate(`/products/${id}`);
//   };

//   const handleViewAllProducts = () => {
//     navigate("/products");
//   };

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-10">
//           <p className="text-amber-600 font-medium">
//             Top Selling Products for You
//           </p>
//           <h1 className="text-3xl font-bold text-gray-800 mt-2">
//             Best Sellers
//           </h1>
//           <p className="text-gray-500 mt-3">
//             Premium quality kitchen essentials for everyday cooking
//           </p>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {Productsdata.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
//             >
//               {/* Image */}
//               <div 
//                 className="relative h-52 w-full bg-white flex items-center justify-center rounded-t-xl cursor-pointer"
//                 onClick={() => handleViewProduct(item.id)}
//               >
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   className="max-h-44 w-auto object-contain hover:scale-110 transition-transform duration-300"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-4 text-center">
//                 <h3 
//                   className="font-semibold text-lg text-gray-800 cursor-pointer hover:text-amber-600"
//                   onClick={() => handleViewProduct(item.id)}
//                 >
//                   {item.title}
//                 </h3>

//                 <p className="text-amber-600 font-bold mt-2">
//                   {item.price}
//                 </p>

//                 <p className="text-sm text-gray-500 mt-1">
//                   ⭐ {item.rating} Rating
//                 </p>

//                 <button 
//                   onClick={() => handleAddToCart(item)}
//                   className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-10">
//           <button 
//             onClick={handleViewAllProducts}
//             className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 
//                      text-white font-semibold rounded-full shadow-lg
//                      hover:shadow-xl hover:scale-105 transition duration-300"
//           >
//             View All Products
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default BestSeller;