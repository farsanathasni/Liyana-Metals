import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { Link } from "react-router-dom";
import { useSearch } from "../../Contexts/SerchContext";
import { FaSearch } from "react-icons/fa";
import api from "../../Api/Axios";

function Products() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  // const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
    const { searchTerm, setSearchTerm } = useSearch();
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);  
const [categories, setCategories] = useState(["All Items"]);




const fetchProducts = async () => {
  try {
    setLoading(true);

    const res = await api.get(
      `/products?page=${page}&search=${searchTerm}&category=${activeCategory}`
    );

    // setProducts(res.data.product);
    setFilteredProducts(res.data.product); // add this
    setTotalPages(res.data.totalPages);

  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    setLoading(false);
  }
};



useEffect(() => {
  fetchProducts();
}, [page, searchTerm, activeCategory]);


useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await api.get(
        "/products/categories"
      );

      setCategories(["All Items", ...res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCategories();
}, []);



  return (
    <>
      <Navbar />
      
      <section className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-x-auto scrollbar-hide">
            <ul className="flex space-x-4">
                <form className="relative w-full max-w-sm">
  <input
    type="text"
    placeholder="Search item..."
    value={searchTerm}
    onChange={(e) => {setSearchTerm(e.target.value);setPage(1);}}
    className="w-full pl-1 pr-10 py-2 rounded-full border-2 border-amber-600 bg-amber-80 text-gray-800 placeholder-gray-500 focus:outline-none  "
  />

  <span className="absolute right-5 top-1/2 -translate-y-1/2 ">
    <FaSearch/>
  </span>
</form>

              {categories.map((category, index) => (
                <li key={index}>
                  <button
                      onClick={() => {setActiveCategory(category);setPage(1);}}
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
      

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {loading && <p className="text-center">Loading...</p>}

          {!loading && filteredProducts.length === 0 && (
            <p className="text-center text-gray-500">No products found</p>
          )}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredProducts.map((item) => (
    <div
      key={item._id}
      className="bg-white rounded-xl shadow hover:shadow-lg flex flex-col h-full"
    >

      <div className="flex-1 flex flex-col">
        <Link to={`/products/${item._id}`} className="flex-1 flex flex-col">
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


      <div className="p-4">
        <Link
          to={`/products/${item._id}`}
          className="block w-full text-center bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
        >
          View Details
        </Link>
      </div>
    </div>
  ))}
</div>

<div className="flex justify-center gap-4 mt-8">
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span className="px-4 py-2">
    Page {page} of {totalPages}
  </span>

  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
    className="px-4 py-2 bg-amber-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>


        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Products;


