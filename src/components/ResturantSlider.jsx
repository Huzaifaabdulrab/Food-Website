import React, { useEffect, useState } from "react";
import axios from "axios";

const RestaurantSlider = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("https://jsonserver.reactbd.com/phone");
        setRestaurants(res.data)
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="relative w-full pt-22">
      <h1 className="px-4 py-2 text-2xl font-bold text-gray-900">
        Top Restaurants
      </h1>
      <div className="flex gap-x-4 overflow-x-auto no-scrollbar px-4 py-4">
        {restaurants.map((restaurant) => (
            <div>
                <div
                    key={restaurant._id}
                    className="resturant flex-none aspect-square rounded-2xl bg-white shadow-[0_0_10px_#00000055] overflow-hidden"
                >
                    <img
                    src={restaurant.image}
                    alt={restaurant.title}
                    className="w-full aspect-square object-cover"
                    />
                </div>
                <div className="p-3 text-lg font-semibold text-center">
                    {restaurant.title}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantSlider;
