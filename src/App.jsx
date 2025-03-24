import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProfileScreen from "./pages/ProfileScreen";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Favorite from "./components/Favorite";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Dashboard from "./pages/admin/Dashboard";
import ProductOverview from "./pages/admin/Products";
import { FiltersProvider } from "../Context";

const App = () => {
  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);

  // Add To Cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isExisting = prevCart.some((item) => item._id === product._id);
      if (!isExisting) {
        return [...prevCart, product];
      }
      return prevCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Favorite
  const handleFavorite = (product) => {
    setFavorite((prevFav) => {
      const isExist = prevFav.some((item) => item._id === product._id);
      if (!isExist) {
        return [...prevFav, product];
      } else {
        return prevFav.filter((item) => item._id !== product._id);
      }
    });
  };

  const handleRemoveFromFav = (productId) => {
    setFavorite((prevFav) => prevFav.filter((item) => item._id !== productId));
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/Product" element={<Product />} />
        <Route
          path="/Product/:id"
          element={<ProductDetail handleAddToCart={handleAddToCart} />}
        />
        <Route path="/Cart" element={<Cart cartItems={cart} handleRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/Favorite" element={<Favorite />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
