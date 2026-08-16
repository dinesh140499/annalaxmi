import pulse from '../../../assets/images/products/pulse.png';
import spices from '../../../assets/images/products/spices.png';
import oils from '../../../assets/images/products/oils.png';
import dryfruit from '../../../assets/images/products/dry-fruit.png';
import { FaFireAlt, FaStar, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const supersaverDeals = [
    { id: 1, name: "Organic Toor Dal 2kg Combo", discount: "25% OFF", price: 310, originalPrice: 410, image: pulse, rating: 5, stockLeft: "Only 14 packs left" },
    { id: 3, name: "Cold-Pressed Mustard Oil 2L Pack", discount: "30% OFF", price: 340, originalPrice: 480, image: oils, rating: 4.9, stockLeft: "Only 9 bottles left" },
    { id: 4, name: "Pure Salem Turmeric 500g", discount: "20% OFF", price: 230, originalPrice: 290, image: spices, rating: 4.9, stockLeft: "Only 18 packs left" },
    { id: 5, name: "Kashmiri Mamra Almonds 1kg", discount: "35% OFF", price: 1250, originalPrice: 1899, image: dryfruit, rating: 5, stockLeft: "Only 6 jars left" },
];

const Supersaver = () => {
    return (
        <section className="py-8 sm:py-12 bg-gradient-to-b from-amber-50/50 via-white to-slate-50/50">
            <div className="max-w-[95%] mx-auto w-full">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-amber-100 gap-2">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
                            <FaFireAlt className="text-amber-500 animate-pulse" />
                            <span>Daily Limited Harvest Deals</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Supersaver Flash Harvest Deals
                        </h2>
                    </div>
                    <Link to="/categories" className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 group">
                        <span>View All Deals</span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {supersaverDeals.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl border border-amber-200/70 p-4 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 card-hover-effect flex flex-col justify-between"
                        >
                            <div>
                                <div className="relative h-40 w-full bg-slate-50 rounded-2xl p-2 mb-3 flex items-center justify-center overflow-hidden">
                                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs z-10">
                                        {item.discount}
                                    </span>
                                    <img src={item.image} alt={item.name} className="h-full w-full object-contain hover:scale-105 transition duration-200" />
                                </div>

                                <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                                    <FaStar />
                                    <span className="text-slate-800 font-bold text-xs">{item.rating}</span>
                                </div>

                                <Link to={`/categories/${item.id}`}>
                                    <h3 className="text-sm font-bold text-slate-800 hover:text-emerald-800 transition line-clamp-1">
                                        {item.name}
                                    </h3>
                                </Link>

                                <p className="text-[11px] font-semibold text-amber-700 mt-1">
                                    🔥 {item.stockLeft}
                                </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <div className="text-base font-extrabold text-emerald-950">₹{item.price}</div>
                                    <div className="text-[11px] text-slate-400 line-through">₹{item.originalPrice}</div>
                                </div>
                                <button 
                                    className="bg-emerald-800 hover:bg-emerald-900 text-white p-2.5 rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition flex items-center gap-1 cursor-pointer"
                                    aria-label="Add to cart"
                                >
                                    <FaShoppingBag className="text-xs text-amber-300" />
                                    <span className="hidden sm:inline">Add</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Supersaver;
