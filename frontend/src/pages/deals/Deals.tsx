import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaTag, FaClock, FaShoppingCart, FaPercent } from 'react-icons/fa';
import Breadcrumbs from '../../components/reusable/Breadcrumps';
import pulse from '../../assets/images/products/pulse.png';
import grains from '../../assets/images/products/grains.png';
import oils from '../../assets/images/products/oils.png';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { setButton } from '../../features/commonSlice';

interface DealItem {
  id: number;
  name: string;
  category: string;
  originalPrice: number;
  dealPrice: number;
  discountPercentage: number;
  stockLeft: number;
  image: string;
  tag: string;
  endsInMinutes: number;
}

const flashDeals: DealItem[] = [
  {
    id: 1,
    name: "Organic Toor Dal (5kg Bulk Harvest Pack)",
    category: "Pulses & Dals",
    originalPrice: 975,
    dealPrice: 749,
    discountPercentage: 23,
    stockLeft: 14,
    image: pulse,
    tag: "Bulk Harvest Deal",
    endsInMinutes: 180,
  },
  {
    id: 2,
    name: "Cold-Pressed Mustard Oil + Sesame Oil Duo (1L Each)",
    category: "Virgin Oils",
    originalPrice: 440,
    dealPrice: 329,
    discountPercentage: 25,
    stockLeft: 8,
    image: oils,
    tag: "Wood-Churned Combo",
    endsInMinutes: 120,
  },
  {
    id: 3,
    name: "Ancient Millets Heritage Box (Foxtail, Kodo, Ragi)",
    category: "Grains & Millets",
    originalPrice: 520,
    dealPrice: 389,
    discountPercentage: 25,
    stockLeft: 19,
    image: grains,
    tag: "Bestseller Super Saver",
    endsInMinutes: 240,
  },
  {
    id: 4,
    name: "Sun-Dried Kashmiri Chili & Salem Turmeric Duo",
    category: "Spices",
    originalPrice: 280,
    dealPrice: 199,
    discountPercentage: 29,
    stockLeft: 22,
    image: pulse,
    tag: "Aroma Kitchen Pack",
    endsInMinutes: 300,
  },
];

const coupons = [
  { code: "GRAINPULSE", discount: "10% OFF", desc: "Flat 10% instant discount on orders above ₹499", expiry: "Valid Today" },
  { code: "FREESHIP", discount: "FREE EXPRESS", desc: "Complimentary 2-hour delivery on all staples", expiry: "Auto-applied at checkout" },
  { code: "FARMDIRECT20", discount: "₹100 OFF", desc: "First-time customer welcome bonus on ₹999+", expiry: "First Order" },
];

const Deals = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const handleClaimDeal = (item: DealItem) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.dealPrice,
      originalPrice: item.originalPrice,
      weight: item.tag,
      image: item.image,
      quantity: 1,
    }));
    dispatch(setButton({ cart: true }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />

      <div className="max-w-[95%] mx-auto py-8 sm:py-12">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-950 rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider bg-emerald-800/80 px-3.5 py-1 rounded-full mb-3 border border-emerald-700/50">
                <FaFire className="text-amber-400 animate-bounce" />
                <span>Today's Harvest Flash Deals</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Up to 30% Off Farm-Direct Organic Bundles
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 max-w-xl">
                Limited stock directly sourced from our weekly harvest cluster. Chemical-free, 100% unpolished, and fresh from the farm.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mr-2">
                <FaClock className="text-sm" />
                <span>Deals End In:</span>
              </div>
              <div className="flex items-center gap-2 text-center">
                <div className="bg-emerald-950/80 rounded-xl px-3 py-2 min-w-[42px]">
                  <span className="font-extrabold text-base text-amber-400 block">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300">Hrs</span>
                </div>
                <span className="font-bold text-amber-400">:</span>
                <div className="bg-emerald-950/80 rounded-xl px-3 py-2 min-w-[42px]">
                  <span className="font-extrabold text-base text-amber-400 block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300">Min</span>
                </div>
                <span className="font-bold text-amber-400">:</span>
                <div className="bg-emerald-950/80 rounded-xl px-3 py-2 min-w-[42px]">
                  <span className="font-extrabold text-base text-amber-400 block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300">Sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coupons Showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <FaTag className="text-emerald-800" />
              <span>Active Promo Codes & Vouchers</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">Click code to copy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                onClick={() => copyToClipboard(c.code)}
                className="bg-white rounded-2xl p-5 border-2 border-dashed border-emerald-200 hover:border-emerald-700 transition cursor-pointer shadow-xs relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs px-2.5 py-1 rounded-lg tracking-wider">
                      {c.code}
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <FaPercent className="text-[10px]" />
                      <span>{c.discount}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{c.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{c.expiry}</span>
                  <span className="font-bold text-emerald-800 group-hover:underline">
                    {copiedCoupon === c.code ? "✓ Copied!" : "Tap to Copy"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Deals Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Flash Harvest Bundle Discounts
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">High demand items with special wholesale-equivalent savings</p>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline"
            >
              View Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition flex flex-col justify-between relative group"
              >
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10 bg-amber-500 text-emerald-950 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                  {item.discountPercentage}% OFF
                </div>

                <div>
                  <div className="bg-slate-50 rounded-2xl p-4 mb-4 flex items-center justify-center h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-36 w-36 object-contain group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    {item.tag}
                  </span>
                  <Link
                    to={`/product/${item.id}`}
                    className="font-bold text-slate-900 text-sm hover:text-emerald-800 transition line-clamp-2 mt-1"
                  >
                    {item.name}
                  </Link>

                  {/* Stock progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
                      <span>Stock Status</span>
                      <span className="text-amber-600 font-extrabold">{item.stockLeft} packs left</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-emerald-600 h-1.5 rounded-full"
                        style={{ width: `${(item.stockLeft / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-extrabold text-emerald-950">₹{item.dealPrice}</div>
                    <div className="text-xs text-slate-400 line-through">₹{item.originalPrice}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClaimDeal(item)}
                    className="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <FaShoppingCart className="text-xs text-amber-300" />
                    <span>Claim Deal</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Deals;
