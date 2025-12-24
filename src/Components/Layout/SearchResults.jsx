import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || "";

  const [results, setResults] = useState([]);

  useEffect(() => {
    // Example: fetch products from localStorage
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search results for "{searchTerm}"</h1>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map(product => (
            <li key={product.id} className="border p-4 rounded-lg shadow-sm">
              <img src={product.image} alt={product.name} className="mb-2" />
              <h2 className="font-bold">{product.name}</h2>
              <p className="text-amber-700">{product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
