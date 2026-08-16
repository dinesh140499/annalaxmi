import '../../assets/styles/shop.css';
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaLeaf, FaSeedling, FaSlidersH } from "react-icons/fa";
import PriceRangeSlider from "../../components/reusable/PriceRangeSlider";
import Rating from "../../components/shop/Rating";
import PopularTag from "../../components/shop/PopularTag";
import Discount from "../../components/shop/Discount";
import SaleProduct from "../../components/shop/SaleProduct";
import Product from '../../components/shop/Product';
import Divider from '../../components/reusable/Divider';
import { useDispatch } from 'react-redux';
import { setSearchConfig } from '../../features/commonSlice';
import { searchManager } from '../../utils/searchManager';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../baseUrl';

const fallbackShopCategories = [
  { name: 'Organic Pulses & Dals', count: 24 },
  { name: 'Ancient Grains & Millets', count: 32 },
  { name: 'Cold-Pressed Virgin Oils', count: 18 },
  { name: 'Authentic Indian Spices', count: 45 },
  { name: 'Dry Fruits & Super Seeds', count: 28 },
  { name: 'Stone-Ground Flours & Atta', count: 14 },
];

const products = [
  { id: 1, name: 'Organic Toor Dal (Unpolished)' },
  { id: 2, name: 'Himalayan Red Rice' },
  { id: 3, name: 'Cold-Pressed Mustard Oil' },
  { id: 4, name: 'Salem Turmeric Powder' },
  { id: 5, name: 'Kashmiri Mamra Almonds' },
];

const Shop = () => {
  const [filterBtnToggle, setFilterBtnToggle] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 50, max: 2500 });
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    "All Categories": true,
    "Price": true,
    "Rating": true,
    "Popular Tag": true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Query backend categories API
  const { data: apiData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => get('default', 'categories'),
    retry: 1,
  });

  const backendCategories = apiData?.categories || [];
  const rawCategories = [
    { name: 'All', count: 'All Items' },
    ...(backendCategories.length > 0
      ? backendCategories.map((c: any) => ({ name: c.name, count: "Fresh" }))
      : fallbackShopCategories)
  ];

  // Deduplicate categories by lowercase name
  const seenCategories = new Set<string>();
  const categoryItems = rawCategories.filter((cat: any) => {
    const normalized = (cat.name || '').trim().toLowerCase();
    if (!normalized || seenCategories.has(normalized)) return false;
    seenCategories.add(normalized);
    return true;
  });

  const handleToggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    dispatch(setSearchConfig({ items: products, getLabelKey: 'name' }));
    searchManager.setOnSelect((item) => navigate(`/product/${item.id}`));
  }, [dispatch, navigate]);

  return (
    <div className="bg-slate-50/50 min-h-screen py-6 sm:py-8">
      <div className="max-w-[95%] mx-auto w-full">
        
        {/* Category Hero / Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-semibold mb-1">
                <FaLeaf className="text-xs" />
                <span>Certified Farm Sourced</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Organic Staples & Farm Fresh Catalog
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
                100% unpolished pulses, native millets, and cold-pressed oils. Chemical-free direct from verified farmer clusters.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-emerald-800/80 border border-emerald-700/60 px-3.5 py-1.5 rounded-full font-medium text-emerald-200">
                🌱 100% Pesticide Free
              </span>
              <span className="text-xs bg-amber-500 text-emerald-950 px-3.5 py-1.5 rounded-full font-extrabold">
                ⚡ Express 2-Hour Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="flex gap-8 relative items-start">
          
          {/* Mobile Filter Backdrop */}
          {filterBtnToggle && (
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 lg:hidden"
              onClick={() => setFilterBtnToggle(false)}
            />
          )}

          {/* Left: Filter Sidebar Drawer */}
          <aside
            className={`
              w-[280px] sm:w-[320px] lg:w-[270px] shrink-0 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs
              fixed lg:static top-0 left-0 h-full lg:h-auto z-50 lg:z-auto overflow-y-auto custom-scrollbar transition-transform duration-300
              ${filterBtnToggle ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between lg:hidden pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <FaSlidersH />
                <span>Filter Products</span>
              </div>
              <button
                className="text-2xl text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                onClick={() => setFilterBtnToggle(false)}
              >
                <IoClose />
              </button>
            </div>

            {/* Filter Section: Categories */}
            <div className="mb-5">
              <button
                type="button"
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 cursor-pointer"
                onClick={() => handleToggle("All Categories")}
              >
                <span>Categories</span>
                <RiArrowDropDownLine className={`text-2xl transition-transform ${openSections["All Categories"] ? "rotate-180 text-emerald-800" : "text-slate-400"}`} />
              </button>

              {openSections["All Categories"] && (
                <div className="space-y-1">
                  {categoryItems.map((cat: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setFilterBtnToggle(false);
                      }}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                        selectedCategory === cat.name
                          ? "bg-emerald-50 text-emerald-900 font-bold border-l-2 border-emerald-800"
                          : "text-slate-600 hover:bg-slate-50 hover:text-emerald-900"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <FaSeedling className="text-emerald-600 text-xs opacity-70" />
                        <span className="truncate">{cat.name}</span>
                      </span>
                      <span className="text-[11px] text-slate-400 shrink-0 ml-1">({cat.count})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Divider marginY="my-4" />

            {/* Filter Section: Price Slider */}
            <div className="mb-5">
              <PriceRangeSlider
                min={50}
                max={2500}
                isOpen={openSections["Price"]}
                onToggle={() => handleToggle("Price")}
                onChange={(range) => setPriceRange(range)}
              />
            </div>

            <Divider marginY="my-4" />

            {/* Filter Section: Rating */}
            <div className="mb-5">
              <Rating
                isOpen={openSections["Rating"]}
                onToggle={() => handleToggle("Rating")}
              />
            </div>

            <Divider marginY="my-4" />

            {/* Filter Section: Popular Tags */}
            <div className="mb-5">
              <PopularTag
                isOpen={openSections["Popular Tag"]}
                onToggle={() => handleToggle("Popular Tag")}
              />
            </div>

            <Discount discount="30%" />
            <SaleProduct />
          </aside>

          {/* Right: Product Catalog Grid */}
          <main className="flex-1 min-w-0">
            <Product
              filterBtnToggle={filterBtnToggle}
              setFilterBtnToggle={setFilterBtnToggle}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
            />
          </main>

        </div>

      </div>
    </div>
  );
};

export default Shop;
