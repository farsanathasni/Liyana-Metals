import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import axios from "axios";
import Footer from "../Layout/Footer";
import { Link } from "react-router-dom";

function Products() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // https://i.pinimg.com/1200x/33/d1/e8/33d1e813d2382ab19adfe03c97ae1ae4.jpg

  // Fetch products
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Filter products
  useEffect(() => {
    if (activeCategory === "All Items") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (item) => item.category === activeCategory
      );
      setFilteredProducts(filtered);
    }
  }, [activeCategory, products]);

  // ✅ Correct categories
  const categories = [
    "All Items",
    "Cookware",
    "Appliances",
    "Cooktop & Chimney",
    "Kitchen Tools",
    "Home Appliances",
    "Homeware"
  ];

  return (
    <>
      <Navbar />

      {/* Category Navbar */}
      <section className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-x-auto scrollbar-hide">
            <ul className="flex space-x-4">
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                      activeCategory === category
                        ? "bg-amber-600 text-white font-semibold"
                        : "bg-white text-gray-700 hover:bg-amber-100"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 text-gray-700 text-lg font-medium">
            Showing: <span className="font-bold">{activeCategory}</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {loading && <p className="text-center">Loading...</p>}

          {!loading && filteredProducts.length === 0 && (
            <p className="text-center text-gray-500">No products found</p>
          )}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredProducts.map((item) => (
    <div
      key={item.id}
      className="bg-white rounded-xl shadow hover:shadow-lg flex flex-col h-full"
    >
      {/* Card Content */}
      <div className="flex-1 flex flex-col">
        <Link to={`/products/${item.id}`} className="flex-1 flex flex-col">
          <img
            src={item.image}
            alt={item.name}
            className="mx-auto max-h-44 object-contain cursor-pointer mt-4"
             onError={(e) => e.target.src = "/assets/fallback.png"} 
         />

          <div className="p-4 text-center flex-1 flex flex-col">
            <h3 className="font-semibold text-gray-800 hover:text-amber-600">
              {item.name}
            </h3>

            <p className="text-amber-600 font-bold mt-1">{item.price}</p>

            <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">
              {item.description}
            </p>
          </div>
        </Link>
      </div>

      {/* Button */}
      <div className="p-4">
        <Link
          to={`/products/${item.id}`}
          className="block w-full text-center bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
        >
          View Details
        </Link>
      </div>
    </div>
  ))}
</div>



        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Products;
