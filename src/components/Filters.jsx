import { useState, useEffect, useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { FiltersContext } from "../../Context";

export default function FilterModal() {
    const { setFilters } = useContext(FiltersContext);
    const [price, setPrice] = useState([0, 2000]);
    const [priceSel, setPriceSel] = useState([500, 1200]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [rating, setRating] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://jsonserver.reactbd.com/phone");
            console.log("Fetched Products:", response.data);
            setProducts(response.data);

            // Extract unique categories
            const uniqueCategories = [...new Set(response.data.map(product => product.brand))];
            setCategories(uniqueCategories);

            // Determine price range
            const prices = response.data.map(product => product.price);
            setPrice([Math.min(...prices), Math.max(...prices)]);

            // Divide price range into 20 segments
            const maxPrice = Math.max(...prices);
            const rangeSize = maxPrice / 20;
            let priceRangeData = Array(20).fill(0);

            response.data.forEach(product => {
                let index = Math.floor(product.price / rangeSize);
                if (index >= 20) index = 19; 
                priceRangeData[index]++;
            });

            setPriceRange(priceRangeData);
        } catch (error) {
            console.error("Error Fetching Data", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    return (
        <div className="fixed bg-white 
            w-screen max-sm:min-h-[70vh] sm:h-[55vh] bottom-14 left-0 right-0 overflow-y-auto rounded-tl-3xl rounded-tr-3xl shadow-[0_-10px_10px_#00000055] p-4
            md:w-[250px] md:h-screen md:top-18 md:right-0 md:rounded-none md:shadow-xl md:border-l md:border-gray-200">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-medium text-lg">Filters</h1>
                <RxCross1 className="text-lg font-bold cursor-pointer" onClick={()=>setFilters(prev => !prev)} />
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h1 className="font-medium text-base mb-2">Price Range</h1>

                {/* Price Distribution Bars */}
                <div className="flex justify-center">
                    <div className="flex justify-evenly items-end max-w-70 gap-2">
                        {priceRange.map((price, index) =>
                            price !== 0 && (
                                <div key={index} className="w-2 sm:w-4 md:w-2 bg-gray-300" style={{ height: price * 18 + "px" }}></div>
                            )
                        )}
                    </div>
                </div>

                {/* Slider */}
                <Slider
                    value={priceSel}
                    onChange={(e, newValue) => setPriceSel(newValue)}
                    valueLabelDisplay="auto"
                    min={price[0]}
                    max={price[1]}
                    sx={{ color: "#ffa75f" }}
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${price[0]}</span>
                    <span>${price[1]}</span>
                </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h1 className="font-medium text-base mb-2">Categories</h1>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full border 
                                ${selectedCategories.includes(category) ? "bg-[var(--primary)] border-[var(--primary)] text-white" : "border-gray-300"} 
                                transition-all`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div>
                <h1 className="font-medium text-base mb-2">Rating</h1>
                <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            className={`text-2xl cursor-pointer ${rating >= star ? "text-[var(--primary)]" : "text-gray-300"}`}
                            onClick={() => setRating(() => (rating == 1 && star == 1) ? null : star)}
                        />
                    ))}
                </div>
            </div>

            {/* Clear Button */}
            <div className="flex justify-center pt-6">
                <button
                    className="bg-[var(--primary)] text-white rounded-lg px-4 py-1"
                    onClick={()=>{
                        setPriceSel([500, 1200]);
                        setSelectedCategories([]);
                        setRating(null);
                    }}
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}
