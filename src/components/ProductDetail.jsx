import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

const ProductDetail = ({ handleAddToCart, handleFavorite }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("Product ID is undefined");
      setLoading(false);
      return;
    }
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://jsonserver.reactbd.com/phone/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error Fetching Product Data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const toggleFavorite = () => {
    handleFavorite(product);
    setIsFavorite((prev) => !prev);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!product)
    return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-6 mt-6">
      <img
        className="w-full h-64 object-cover"
        src={product.image}
        alt={product.title}
      />
      <h2 className="text-xl font-bold text-gray-900 mt-4">{product.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
      <p className="text-gray-700">{product.description}</p>
      <div className="flex justify-between items-center mt-3">
        <div>
          <span className="text-lg font-semibold text-orange-600">
            ${product.price}
          </span>
          {product.previousPrice && (
            <span className="text-sm line-through text-gray-400 ml-2">
              ${product.previousPrice}
            </span>
          )}
        </div>
      </div>
      <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition">
        Buy Now
      </button>
      <Link to="/" className="mt-4 block text-center text-orange-600 underline">
        Back to Products
      </Link>
      <div className="text-black text-2xl flex justify-between mt-4">
        <FaHeart
          onClick={toggleFavorite}
          className={`cursor-pointer transition-colors duration-300 ${
            isFavorite ? "text-yellow-400" : "text-gray-500"
          }`}
        />
        <FaShoppingCart
          onClick={() => handleAddToCart(product)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProductDetail;
