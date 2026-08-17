import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { FaLeaf, FaSeedling, FaFireAlt, FaPhoneAlt, FaHeart, FaTruck, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";

interface SubCategory {
    name: string;
    link: string;
    children?: { name: string; link: string }[];
}

interface Category {
    id: number;
    name: string;
    subCategory: SubCategory[];
}

const categoryList: Category[] = [
    {
        id: 1,
        name: "Pulses & Dal",
        subCategory: [
            {
                name: "Unpolished Dals",
                link: "/shop",
                children: [
                    { name: "Toor / Arhar Dal", link: "/shop" },
                    { name: "Moong Dal (Split & Whole)", link: "/shop" },
                    { name: "Chana Dal & Kabuli", link: "/shop" },
                    { name: "Urad Dal (Black & White)", link: "/shop" },
                ],
            },
            { name: "Organic Rajma & Chana", link: "/shop" },
            { name: "Native Lentils Mix", link: "/shop" },
        ],
    },
    {
        id: 2,
        name: "Whole Grains & Millets",
        subCategory: [
            { name: "Traditional Rice Varieties", link: "/shop" },
            { name: "Foxtail & Finger Millets", link: "/shop" },
            { name: "Stone-Ground Atta & Flour", link: "/shop" },
            { name: "Jowar & Bajra", link: "/shop" },
        ],
    },
    {
        id: 3,
        name: "Cold-Pressed Oils",
        subCategory: [
            { name: "Kachi Ghani Mustard Oil", link: "/shop" },
            { name: "Virgin Wood-Pressed Coconut Oil", link: "/shop" },
            { name: "Cold-Pressed Sesame & Groundnut", link: "/shop" },
        ],
    },
    {
        id: 4,
        name: "Pure Spices & Herbs",
        subCategory: [
            { name: "Salem Turmeric Powder", link: "/shop" },
            { name: "Kashmiri Chilli & Pepper", link: "/shop" },
            { name: "Aromatic Whole Spices", link: "/shop" },
        ],
    },
    {
        id: 5,
        name: "Dry Fruits & Seeds",
        subCategory: [
            { name: "Kashmiri Mamra Almonds", link: "/shop" },
            { name: "Walnut Kernels & Cashews", link: "/shop" },
            { name: "Raw Chia & Pumpkin Seeds", link: "/shop" },
        ],
    },
];

export interface SubMenuProps {
    toggleSidebar?: boolean;
    setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubMenu = ({ setToggleSidebar, toggleSidebar }: SubMenuProps) => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);
    const [isDesktop, setIsDesktop] = useState<boolean>(
        typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
    );
    const location = useLocation();

    // Responsive screen detection
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent background scrolling when mobile sidebar is open
    useEffect(() => {
        if (toggleSidebar && !isDesktop) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [toggleSidebar, isDesktop]);

    const toggleCategory = (id: number) => {
        setActiveCategory(prev => (prev === id ? null : id));
    };

    const toggleSubCategory = (index: number) => {
        setActiveSubCategory(prev => (prev === index ? null : index));
    };

    const closeSidebar = () => {
        setToggleSidebar(false);
    };

    const isPathActive = (path: string) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* ========================================================================= */}
            {/* 1. MOBILE SLIDE-IN DRAWER & BACKDROP (Screens < 1024px)                  */}
            {/* ========================================================================= */}
            <div className="lg:hidden">
                {/* Backdrop */}
                {toggleSidebar && (
                    <div 
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity duration-300"
                        onClick={closeSidebar}
                        aria-hidden="true"
                    />
                )}

                {/* Drawer Container */}
                <div
                    className={`fixed top-0 left-0 z-50 h-full w-[85%] max-w-[320px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
                        toggleSidebar ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {/* Drawer Header */}
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                        <Link to="/" onClick={closeSidebar} className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-400">
                                <FaLeaf className="text-sm" />
                            </div>
                            <span className="text-base font-bold text-emerald-950">
                                Grain<span className="text-amber-500">Pulse</span>
                            </span>
                        </Link>
                        <button
                            onClick={closeSidebar}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
                            aria-label="Close menu"
                        >
                            <IoClose className="text-xl" />
                        </button>
                    </div>

                    {/* Drawer Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                        
                        {/* Primary Catalog Action */}
                        <Link
                            to="/categories"
                            onClick={closeSidebar}
                            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-between shadow-xs transition"
                        >
                            <span className="flex items-center gap-2">
                                <RxDashboard className="text-amber-300 text-base" />
                                <span>Browse All Categories</span>
                            </span>
                            <span className="bg-emerald-700 text-emerald-100 text-[10px] px-2 py-0.5 rounded-md">Catalog</span>
                        </Link>

                        {/* Category Accordion */}
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                                Organic Categories
                            </span>
                            <div className="space-y-1.5">
                                {categoryList.map((cat) => (
                                    <div key={cat.id} className="rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-2xs">
                                        <button
                                            type="button"
                                            onClick={() => toggleCategory(cat.id)}
                                            className={`w-full flex items-center justify-between p-3 text-xs font-bold text-left transition cursor-pointer ${
                                                activeCategory === cat.id ? "bg-emerald-50 text-emerald-900" : "bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <FaSeedling className="text-emerald-700 text-xs" />
                                                <span>{cat.name}</span>
                                            </span>
                                            <RiArrowDropDownLine
                                                className={`text-xl transition-transform duration-200 ${
                                                    activeCategory === cat.id ? "rotate-180 text-emerald-800" : "text-slate-400"
                                                }`}
                                            />
                                        </button>

                                        {/* SubCategory Accordion Content */}
                                        {activeCategory === cat.id && (
                                            <div className="p-2.5 bg-slate-50 border-t border-slate-100 space-y-1">
                                                {cat.subCategory.map((sub, idx) => (
                                                    <div key={idx} className="space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <Link
                                                                to={sub.link}
                                                                onClick={closeSidebar}
                                                                className="text-xs text-slate-700 hover:text-emerald-900 font-semibold p-1.5 block flex-1"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                            {sub.children && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleSubCategory(idx)}
                                                                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                                                                >
                                                                    <RiArrowDropDownLine
                                                                        className={`text-lg transition-transform ${
                                                                            activeSubCategory === idx ? "rotate-180 text-emerald-800" : ""
                                                                        }`}
                                                                    />
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* Nested children items */}
                                                        {sub.children && activeSubCategory === idx && (
                                                            <div className="pl-4 py-1 border-l-2 border-emerald-300 ml-2 space-y-1">
                                                                {sub.children.map((child, cIdx) => (
                                                                    <Link
                                                                        key={cIdx}
                                                                        to={child.link}
                                                                        onClick={closeSidebar}
                                                                        className="text-[11px] text-slate-600 hover:text-emerald-900 py-1 block"
                                                                    >
                                                                        • {child.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Highlighted Useful Pages */}
                        <div className="border-t border-slate-100 pt-4">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                                Store Quick Links
                            </span>
                            <div className="grid grid-cols-1 gap-1 text-xs font-semibold text-slate-700">
                                <Link to="/wishlist" onClick={closeSidebar} className={`flex items-center justify-between p-2.5 rounded-xl transition ${isPathActive('/wishlist') ? 'bg-emerald-100 text-emerald-900 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-900'}`}>
                                    <div className="flex items-center gap-2">
                                        <FaHeart className="text-red-500 text-xs" />
                                        <span>Saved Wishlist</span>
                                    </div>
                                    <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">Saved</span>
                                </Link>

                                <Link to="/track-order" onClick={closeSidebar} className={`flex items-center justify-between p-2.5 rounded-xl transition ${isPathActive('/track-order') ? 'bg-emerald-100 text-emerald-900 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-900'}`}>
                                    <div className="flex items-center gap-2">
                                        <FaTruck className="text-emerald-700 text-xs" />
                                        <span>Live Track Order</span>
                                    </div>
                                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">2-Hr Delivery</span>
                                </Link>

                                <Link to="/about" onClick={closeSidebar} className={`flex items-center justify-between p-2.5 rounded-xl transition ${isPathActive('/about') ? 'bg-emerald-100 text-emerald-900 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-900'}`}>
                                    <div className="flex items-center gap-2">
                                        <FaInfoCircle className="text-emerald-700 text-xs" />
                                        <span>Our Organic Mission</span>
                                    </div>
                                    <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">About</span>
                                </Link>

                                <Link to="/contact" onClick={closeSidebar} className={`flex items-center justify-between p-2.5 rounded-xl transition ${isPathActive('/contact') ? 'bg-emerald-100 text-emerald-900 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-900'}`}>
                                    <div className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-emerald-700 text-xs" />
                                        <span>Contact & Helpline Desk</span>
                                    </div>
                                    <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">Support</span>
                                </Link>

                                <Link to="/faq" onClick={closeSidebar} className={`flex items-center justify-between p-2.5 rounded-xl transition ${isPathActive('/faq') ? 'bg-emerald-100 text-emerald-900 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-900'}`}>
                                    <div className="flex items-center gap-2">
                                        <FaQuestionCircle className="text-amber-500 text-xs" />
                                        <span>Frequently Asked Questions</span>
                                    </div>
                                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold">Help</span>
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Drawer Footer */}
                    <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Care Hotline: <strong>1800-202-9182</strong></span>
                        <span className="text-emerald-700 font-bold">Express 2-Hr</span>
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. DESKTOP SPACIOUS SUB-NAVBAR (Screens >= 1024px)                        */}
            {/* ========================================================================= */}
            <div className="hidden lg:block bg-white border-b border-slate-100 shadow-2xs mb-2">
                <div className="max-w-[95%] mx-auto py-2.5 flex items-center justify-between gap-6">
                    
                    {/* Left: Browse Categories Button */}
                    <div className="shrink-0">
                        <Link 
                            to="/categories" 
                            className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2.5 text-xs sm:text-sm shadow-xs transition duration-200 group"
                        >
                            <RxDashboard className="text-amber-300 text-base group-hover:rotate-90 transition-transform duration-200" />
                            <span>Browse All Categories</span>
                        </Link>
                    </div>

                    {/* Middle: Clean, Spacious Category Links with Dropdowns */}
                    <div className="flex items-center gap-3 xl:gap-5 flex-1">
                        {categoryList.map((cat) => (
                            <div
                                key={cat.id}
                                className="relative group"
                                onMouseEnter={() => setActiveCategory(cat.id)}
                                onMouseLeave={() => setActiveCategory(null)}
                            >
                                <div
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer text-xs font-semibold transition duration-150 ${
                                        activeCategory === cat.id 
                                        ? 'bg-emerald-50 text-emerald-900' 
                                        : 'text-slate-700 hover:bg-slate-100/80 hover:text-emerald-900'
                                    }`}
                                >
                                    <FaSeedling className="text-emerald-600 text-xs opacity-75" />
                                    <span>{cat.name}</span>
                                    <RiArrowDropDownLine className={`text-xl transition-transform duration-200 ${activeCategory === cat.id ? 'rotate-180 text-emerald-800' : 'text-slate-400'}`} />
                                </div>

                                {/* Category Dropdown Card */}
                                <ul className={`
                                    bg-white rounded-2xl py-2 px-2 shadow-xl border border-slate-100 z-50 w-[240px]
                                    absolute top-full left-0 mt-1
                                    ${activeCategory === cat.id ? 'block' : 'hidden'}
                                    transition-all duration-200
                                `}>
                                    {cat.subCategory.map((sub, index) => (
                                        <li
                                            key={index}
                                            className="relative group/sub py-2 px-3 rounded-xl hover:bg-emerald-50/80 cursor-pointer text-xs text-slate-700 hover:text-emerald-900 transition"
                                        >
                                            <div className="flex justify-between items-center">
                                                <Link to={sub.link} className="font-semibold flex-1">
                                                    {sub.name}
                                                </Link>
                                                {sub.children && (
                                                    <RiArrowDropDownLine className="text-lg rotate-[-90deg] text-slate-400" />
                                                )}
                                            </div>

                                            {/* SubCategory Children Flyout */}
                                            {sub.children && (
                                                <ul className="bg-white rounded-2xl py-2 px-2 z-50 shadow-xl border border-slate-100 absolute left-full top-0 ml-1 w-[220px] hidden group-hover/sub:block transition-all duration-200">
                                                    {sub.children.map((child, i) => (
                                                        <li key={i} className="py-1.5 px-3 rounded-lg hover:bg-emerald-50 cursor-pointer">
                                                            <Link 
                                                                to={child.link}
                                                                className="text-xs text-slate-600 hover:text-emerald-900 font-medium block"
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Right: Clean Utility Badges (Track Order & Deals) */}
                    <div className="flex items-center gap-3 shrink-0">
                        {/* Live Track Order Button */}
                        <Link
                            to="/track-order"
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-900 hover:bg-emerald-50 py-1.5 px-3 rounded-xl transition"
                        >
                            <FaTruck className="text-emerald-700 text-xs" />
                            <span>Track Order</span>
                            <span className="bg-amber-400 text-emerald-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">
                                Live
                            </span>
                        </Link>

                        {/* Harvest Deals Pill */}
                        <Link
                            to="/deals"
                            className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200/80 py-1.5 px-3 rounded-xl hover:shadow-xs transition"
                        >
                            <FaFireAlt className="text-amber-600 text-xs" />
                            <span>Deals 40% OFF</span>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SubMenu;
