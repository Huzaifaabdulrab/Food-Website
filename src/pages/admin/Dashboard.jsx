import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const data = [
  { name: "Jan", sold: 30, returned: 70 },
  { name: "Feb", sold: 40, returned: 80 },
  { name: "Mar", sold: 30, returned: 70 },
  { name: "Apr", sold: 35, returned: 75 },
  { name: "May", sold: 40, returned: 80 },
  { name: "Jun", sold: 38, returned: 78 },
  { name: "Jul", sold: 40, returned: 80 },
  { name: "Aug", sold: 39, returned: 79 },
];

const Dashboard = () => {
  const [active, setActive] = useState("Overview");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonserver.reactbd.com/phone")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        console.log(res.data)
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

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
      <div className="flex-1 p-5 ms-64">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Overview</h1>
          <div className="relative">
            <BsSearch className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {["Total Revenue", "Total Customers", "Total Orders"].map((title, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-gray-500">{title}</h2>
              <p className="text-3xl font-bold mt-2">{[26210, 1210, 15210][idx]}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-5 bg-white p-5 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h2 className="text-gray-500 font-medium text-xl pb-8">Product Selling</h2>
          <BarChart width={600} height={250} data={data} className="mt-3">
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sold" fill="#ff7518"/>
            <Bar dataKey="returned" fill="#ffa75f"/>
          </BarChart>
        </div>

        {/* Product Listing */}
        <div className="mt-5 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-gray-500 font-medium text-xl pb-5">Product Listing</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border-b">ID</th>
                    <th className="p-3 text-left border-b">Image</th>
                    <th className="p-3 text-left border-b">Name</th>
                    <th className="p-3 text-left border-b">Stock</th>
                    <th className="p-3 text-left border-b">Price</th>
                    <th className="p-3 text-left border-b">Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 border-b">{product._id}</td>
                      <td className="p-3 border-b">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                      </td>
                      <td className="p-3 border-b">{product.title}</td>
                      <td className="p-3 border-b">{product.quantity}</td>
                      <td className="p-3 border-b">${product.price}</td>
                      <td className="p-3 border-b">{product.sold ? product.sold : "0"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
