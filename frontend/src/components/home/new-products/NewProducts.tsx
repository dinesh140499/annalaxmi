import ReusableSwiper from '../../ReusableSwiper';
import pulse from '../../../assets/images/products/pulse.png';
import spices from '../../../assets/images/products/spices.png';
import grains from '../../../assets/images/products/grains.png';
import oils from '../../../assets/images/products/oils.png';
import dryfruit from '../../../assets/images/products/dry-fruit.png';
import { FaStar, FaShoppingBag, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/cartSlice';
import { setButton } from '../../../features/commonSlice';

const newArrivals = [
    { id: 1, name: "Organic Toor Dal (Unpolished)", weight: "1 Kg", category: "Pulses", image: pulse, price: 165, originalPrice: 195, rating: 5, reviews: 42, badge: "New Harvest" },
    { id: 2, name: "Himalayan Red Rice", weight: "1 Kg", category: "Grains", image: grains, price: 210, originalPrice: 260, rating: 5, reviews: 28, badge: "Single Origin" },
    { id: 3, name: "Cold-Pressed Mustard Oil", weight: "1 Litre", category: "Oils", image: oils, price: 175, originalPrice: 220, rating: 4.8, reviews: 56, badge: "Stone-Pressed" },
    { id: 4, name: "Salem Turmeric Powder", weight: "250 g", category: "Spices", image: spices, price: 120, originalPrice: 150, rating: 4.9, reviews: 39, badge: "5% Curcumin" },
    { id: 5, name: "Kashmiri Mamra Almonds", weight: "500 g", category: "Dry Fruits", image: dryfruit, price: 650, originalPrice: 799, rating: 5, reviews: 67, badge: "Premium" },
];

const NewProducts = () => {
    const dispatch = useDispatch();

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

    const slides = newArrivals.map((item) => (
        <div key={item.id} className="p-1">
            <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 card-hover-effect flex flex-col justify-between h-full">
                <div>
                    <Link to={`/product/${item.id}`} className="block relative h-40 w-full bg-slate-50 rounded-2xl overflow-hidden mb-3 p-2">
                        <span className="absolute top-2 left-2 bg-emerald-800 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs z-10">
                            {item.badge}
                        </span>
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain hover:scale-105 transition duration-200" />
                    </Link>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>{item.category}</span>
                        <span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{item.weight}</span>
                    </div>

                    <Link to={`/product/${item.id}`}>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 min-h-[36px] hover:text-emerald-800 transition">
                            {item.name}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-1.5 mt-2 text-amber-400 text-xs">
                        <FaStar />
                        <span className="text-xs font-bold text-slate-700">{item.rating}</span>
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-extrabold text-emerald-950">₹{item.price}</div>
                        <div className="text-[11px] text-slate-400 line-through">₹{item.originalPrice}</div>
                    </div>
                    <button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white p-2 rounded-xl text-xs font-semibold shadow-xs transition flex items-center justify-center cursor-pointer"
                        aria-label={`Add ${item.name} to cart`}
                    >
                        <FaShoppingBag className="text-xs text-amber-300" />
                    </button>
                </div>
            </div>
        </div>
    ));

    return (
        <section className="py-8 sm:py-12 bg-slate-50/50">
            <div className="max-w-[95%] mx-auto w-full">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                            <FaLeaf className="text-amber-500" />
                            <span>Fresh From Farms</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Latest Seasonal Harvests
                        </h2>
                    </div>
                </div>

                <div className="relative">
                    <ReusableSwiper
                        slides={slides}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true, type: 'bullets' }}
                        paginationClass="feature-pagination"
                        navigation={false}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 12 },
                            640: { slidesPerView: 2, spaceBetween: 16 },
                            768: { slidesPerView: 3, spaceBetween: 18 },
                            1024: { slidesPerView: 4, spaceBetween: 20 },
                        }}
                        options={{
                            speed: 800,
                            grabCursor: true,
                        }}
                    />
                </div>

            </div>
        </section>
    );
};

export default NewProducts;
