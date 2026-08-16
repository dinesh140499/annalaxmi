import { FaStar, FaShoppingBag } from 'react-icons/fa';
import pulse from '../../assets/images/products/pulse.png';
import spices from '../../assets/images/products/spices.png';
import oils from '../../assets/images/products/oils.png';
import grains from '../../assets/images/products/grains.png';
import dryfruit from '../../assets/images/products/dry-fruit.png';
import Pagination from '../reusable/Pagination';
import { useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../baseUrl';
import { useDispatch } from 'react-redux';
import { setButton } from '../../features/commonSlice';
import { addToCart } from '../../features/cartSlice';

type ProductProps = {
    filterBtnToggle: boolean;
    setFilterBtnToggle: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCategory?: string;
    priceRange?: { min: number; max: number };
};

interface BackendProduct {
    _id: string;
    name: string;
    slug?: string;
    pricing: {
        mrp?: number;
        sellingPrice: number;
        discountPrice?: number;
    };
    specifications?: {
        weight?: string;
    };
    category?: {
        name?: string;
    };
    images?: {
        url: string;
        isPrimary?: boolean;
    }[];
    rating?: {
        average?: number;
        totalReviews?: number;
    };
    isBestSeller?: boolean;
    isFeatured?: boolean;
}

const fallbackCatalog = [
    { id: "1", name: "Organic Toor / Arhar Dal (Unpolished)", weight: "1 Kg", category: "Pulses", image: pulse, price: 165, originalPrice: 195, rating: 5, reviews: 42, badge: "Best Seller" },
    { id: "2", name: "Himalayan Red Rice (Single Origin)", weight: "1 Kg", category: "Grains", image: grains, price: 210, originalPrice: 260, rating: 5, reviews: 28, badge: "Organic" },
    { id: "3", name: "Cold-Pressed Kachi Ghani Mustard Oil", weight: "1 Litre", category: "Oils", image: oils, price: 175, originalPrice: 220, rating: 4.8, reviews: 56, badge: "Cold-Pressed" },
    { id: "4", name: "Salem Pure Turmeric Powder (Curcumin 5%)", weight: "250 g", category: "Spices", image: spices, price: 120, originalPrice: 150, rating: 4.9, reviews: 39, badge: "Sun-Dried" },
    { id: "5", name: "Kashmiri Mamra Almonds", weight: "500 g", category: "Dry Fruits", image: dryfruit, price: 650, originalPrice: 799, rating: 5, reviews: 67, badge: "Premium" },
    { id: "6", name: "Organic Moong Dal (Yellow Split)", weight: "1 Kg", category: "Pulses", image: pulse, price: 145, originalPrice: 170, rating: 4.7, reviews: 18 },
    { id: "7", name: "Organic Foxtail Millet (Kangni)", weight: "1 Kg", category: "Grains", image: grains, price: 130, originalPrice: 160, rating: 4.8, reviews: 24, badge: "Gluten-Free" },
    { id: "8", name: "Single-Origin Whole Black Pepper", weight: "200 g", category: "Spices", image: spices, price: 180, originalPrice: 240, rating: 4.9, reviews: 31 },
];

const Product: React.FC<ProductProps> = ({ filterBtnToggle, setFilterBtnToggle, selectedCategory = "All", priceRange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('Featured');
    const dispatch = useDispatch();

    // Query backend products API
    const { data: apiData, isLoading } = useQuery({
        queryKey: ['products', currentPage, sortBy],
        queryFn: () => get('default', `products?page=${currentPage}&limit=12`),
        retry: 1,
    });

    const backendProducts: BackendProduct[] = apiData?.products || [];
    const pagination = apiData?.pagination || { totalPages: 1, totalProducts: fallbackCatalog.length };

    // Format products from API or use fallback catalog
    const rawProducts = backendProducts.length > 0 ? backendProducts.map((p) => ({
        id: p._id,
        name: p.name,
        weight: p.specifications?.weight || "1 Kg",
        category: p.category?.name || "Organic",
        image: p.images?.[0]?.url || pulse,
        price: p.pricing.sellingPrice,
        originalPrice: p.pricing.mrp || Math.round(p.pricing.sellingPrice * 1.2),
        rating: p.rating?.average || 5,
        reviews: p.rating?.totalReviews || 12,
        badge: p.isBestSeller ? "Best Seller" : (p.isFeatured ? "Featured" : undefined),
    })) : fallbackCatalog;

    // Filter by category and price
    const displayProducts = rawProducts
        .filter((item) => {
            if (!selectedCategory || selectedCategory === "All") return true;
            const catLower = selectedCategory.toLowerCase();
            return item.category.toLowerCase().includes(catLower) || item.name.toLowerCase().includes(catLower);
        })
        .filter((item) => {
            if (!priceRange) return true;
            return item.price >= priceRange.min && item.price <= priceRange.max;
        })
        .sort((a, b) => {
            if (sortBy === "PriceLowHigh") return a.price - b.price;
            if (sortBy === "PriceHighLow") return b.price - a.price;
            if (sortBy === "Rating") return b.rating - a.rating;
            if (sortBy === "Newest") return String(b.id).localeCompare(String(a.id));
            return 0;
        });

    const totalCount = displayProducts.length;
    const totalPages = pagination.totalPages || 1;

    const handleAddToCart = (item: any) => {
        dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice,
            weight: item.weight,
            image: item.image,
            quantity: 1,
        }));
        dispatch(setButton({ cart: true }));
    };

    return (
        <div>
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                
                {/* Left: Mobile Filter Button & Results Info */}
                <div className="flex items-center gap-3">
                    <button 
                        className="lg:hidden flex items-center gap-2 bg-emerald-800 text-white text-xs font-semibold py-2 px-3.5 rounded-xl shadow-xs cursor-pointer"
                        onClick={() => setFilterBtnToggle(!filterBtnToggle)}
                    >
                        <IoFilter className="text-sm" />
                        <span>Filters</span>
                    </button>
                    
                    <p className="text-xs sm:text-sm text-slate-600">
                        Showing <strong className="text-slate-900 font-bold">{displayProducts.length}</strong> of {totalCount} organic items
                    </p>
                </div>

                {/* Right: Sort By Dropdown */}
                <div className="flex items-center gap-2 self-end sm:self-auto text-xs sm:text-sm text-slate-600">
                    <span className="font-medium whitespace-nowrap">Sort by:</span>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-emerald-600 cursor-pointer transition"
                    >
                        <option value="Featured">Featured Harvest</option>
                        <option value="PriceLowHigh">Price: Low to High</option>
                        <option value="PriceHighLow">Price: High to Low</option>
                        <option value="Rating">Customer Rating</option>
                        <option value="Newest">Newest Harvest</option>
                    </select>
                </div>

            </div>

            {/* Loading Indicator */}
            {isLoading && (
                <div className="text-center py-6 text-xs text-emerald-800 font-semibold animate-pulse">
                    Refreshing fresh harvest catalog...
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
                {displayProducts.map((item) => {
                    const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

                    return (
                        <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 card-hover-effect flex flex-col justify-between">
                            
                            <div>
                                {/* Image Container with Badges */}
                                <Link to={`/categories/${item.id}`} className="block relative h-36 sm:h-44 w-full bg-slate-50 rounded-xl overflow-hidden mb-3 p-2">
                                    {item.badge && (
                                        <span className="absolute top-2 left-2 bg-emerald-800 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs z-10">
                                            {item.badge}
                                        </span>
                                    )}
                                    {discount > 0 && (
                                        <span className="absolute top-2 right-2 bg-amber-500 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md z-10">
                                            {discount}% OFF
                                        </span>
                                    )}
                                    <img
                                        src={item.image}
                                        className="h-full w-full object-contain hover:scale-108 transition-transform duration-300"
                                        alt={item.name}
                                    />
                                </Link>

                                {/* Weight & Category */}
                                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                                    <span>{item.category}</span>
                                    <span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                                        {item.weight}
                                    </span>
                                </div>

                                {/* Title */}
                                <Link to={`/categories/${item.id}`} className="block">
                                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 min-h-[36px] hover:text-emerald-800 transition">
                                        {item.name}
                                    </h3>
                                </Link>

                                {/* Star Ratings */}
                                <div className="flex items-center gap-1.5 mt-2">
                                    <div className="flex items-center text-amber-400 text-xs">
                                        <FaStar />
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">{item.rating}</span>
                                    <span className="text-[11px] text-slate-400">({item.reviews})</span>
                                </div>
                            </div>

                            {/* Price & Action */}
                            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <div className="text-sm sm:text-base font-extrabold text-emerald-900 leading-none">
                                        ₹{item.price}
                                    </div>
                                    <div className="text-[11px] text-slate-400 line-through mt-0.5">
                                        ₹{item.originalPrice}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleAddToCart(item)}
                                    className="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition duration-150 flex items-center gap-1.5 cursor-pointer"
                                    aria-label={`Add ${item.name} to cart`}
                                >
                                    <FaShoppingBag className="text-[10px] text-amber-300" />
                                    <span className="hidden sm:inline">Add</span>
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-10">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        visibleLimit={5}
                    />
                </div>
            )}
        </div>
    );
};

export default Product;