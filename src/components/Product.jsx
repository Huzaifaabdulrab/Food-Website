import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://jsonserver.reactbd.com/phone");
      console.log("Fetched Products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  if (products.length === 0) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-20">
      {products.map((product) =>
          <div
            key={product._id}
            className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            <img className="w-full h-56 object-cover" src={product.image} alt={product.title} />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900">{product.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <p className="text-sm text-gray-700">{product.description.slice(0, 100)}...</p>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <span className="text-lg font-semibold text-orange-600">${product.price}</span>
                  {product.previousPrice && (
                    <span className="text-sm line-through text-gray-400 ml-2">
                      ${product.previousPrice}
                    </span>
                  )}
                </div>
                {product.isNew && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              <Link
                to={`/product/${product._id}`} // Ensure product.id is passed correctly
                className="mt-4 block text-center bg-[var(--primary)] text-white py-2 rounded-lg hover:bg-var(--secondary) transition"
              >
                View Details
              </Link>
            </div>
          </div>
      )}
    </div>
  );
};

export default Product;
