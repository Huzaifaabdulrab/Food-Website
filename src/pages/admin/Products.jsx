import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiEdit, FiLogOut, FiSettings, FiTrash2 } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

const ProductOverview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [active, setActive] = useState("Products");
  const [preview, setPreview] = useState("");

  const { register, handleSubmit, reset } = useForm();

  // Fetch products
  useEffect(() => {
    axios.get("https://jsonserver.reactbd.com/phone")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

  // Add or Edit Product
  const onSubmit = (data) => {
    if (editingProduct) {
      // Update existing product
      axios.put(`https://jsonserver.reactbd.com/phone/${editingProduct._id}`, data)
        .then((res) => {
          setProducts(products.map((p) => (p._id === editingProduct._id ? res.data : p)));
          setEditingProduct(null);
        });
    } else {
      // Add new product
      axios.post("https://jsonserver.reactbd.com/phone", data)
        .then((res) => {
          setProducts([...products, res.data]);
        });
    }
    reset();
    setShowForm(false);
  };

  // Delete Product
  const handleDelete = (id) => {
    axios.delete(`https://jsonserver.reactbd.com/phone/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p._id !== id));
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed h-screen w-64 bg-[var(--primary)] text-white p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-lg">
            Food <span className="text-yellow-300">Hub</span>
          </h1>
          <ul className="mt-5 space-y-3">
            {["Overview", "Products", "Order", "Transaction", "Shipping", "Users"].map((item) => (
              <li
                key={item}
                onClick={() => setActive(item)}
                className={`p-2 flex items-center gap-3 cursor-pointer rounded-md ${
                  active === item ? "bg-white text-[var(--primary)]" : "hover:bg-white/20"
                }`}
              >
                <MdDashboard /><Link to={`/admin/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white/20 rounded-md">
            <FiSettings /> Settings
          </div>
          <div className="flex items-center gap-3 cursor-pointer p-2 font-medium hover:bg-white/20 rounded-md text-red-500">
            <FiLogOut /> Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 ms-64 mt-18">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex gap-4">
            <div className="relative">
              <BsSearch className="absolute top-3 left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingProduct(null);
                reset();
              }}
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-md"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-5 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-gray-500 font-medium text-xl pb-5">Product Listing</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border-b">Image</th>
                    <th className="p-3 text-left border-b">Name</th>
                    <th className="p-3 text-left border-b">Brand</th>
                    <th className="p-3 text-left border-b">Category</th>
                    <th className="p-3 text-left border-b">Price</th>
                    <th className="p-3 text-left border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 border-b">
                        <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded-md" />
                      </td>
                      <td className="p-3 border-b">{product.title}</td>
                      <td className="p-3 border-b">{product.brand}</td>
                      <td className="p-3 border-b">{product.category}</td>
                      <td className="p-3 border-b">${product.price}</td>
                      <td className="p-3 border-b text-xl">
                        <button onClick={() => { setEditingProduct(product); setShowForm(true); reset(product); }} className="text-blue-500"><FiEdit /></button>
                        <button onClick={() => handleDelete(product._id)} className="text-red-500"><FiTrash2 /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Form Modal */}

        {showForm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px]">
            <div className="bg-white p-5 rounded-lg w-96 shadow-[0_0_25px_#00000055]">
            <h2 className="text-xl font-medium pb-3">{editingProduct ? "Edit Product" : "Add Product"}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 relative">
                <input {...register("title")} placeholder="Product Name" className="w-full p-2 border border-gray-500 rounded-md" required />
                <input {...register("brand")} placeholder="Brand" className="w-full p-2 border border-gray-500 rounded-md" required />
                <input {...register("category")} placeholder="Category" className="w-full p-2 border rounded-md border-gray-500" required />
                <input type="number" {...register("price")} placeholder="Price" className="w-full p-2 border rounded-md border-gray-500" required />

                {/* File Input */}
                <div className="border border-dashed border-gray-700 rounded-md p-2 text-center cursor-pointer">
                <label className="cursor-pointer flex flex-col items-center gap-1">
                    <FaCloudUploadAlt className="text-3xl text-gray-600" />
                    <span className="text-sm text-gray-600">Click to upload image</span>
                    <input 
                    type="file" 
                    {...register("imageFile")} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                        setPreview(URL.createObjectURL(file));
                        }
                    }}
                    />
                </label>
                </div>

                {/* Image Preview */}
                {preview && (
                <div className="flex justify-center absolute left-1 bottom-11">
                    <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded-md shadow-md mt-2" />
                </div>
                )}

                <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[var(--primary)] text-white rounded-md">{editingProduct ? "Update" : "Add"}</button>
                </div>
            </form>
            </div>
        </div>
        )}
    </div>
  );
};

export default ProductOverview;