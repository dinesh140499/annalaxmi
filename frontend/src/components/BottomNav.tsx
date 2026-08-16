import { Link, useLocation } from "react-router-dom";
import { FaHome, FaHeart, FaTruck, FaUser, FaThLarge } from "react-icons/fa";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";

const BottomNav = () => {
    const location = useLocation();
    const user = useSelector((state: RootState) => state.auth.user);

    const navItems = [
        {
            name: "Home",
            path: "/",
            icon: <FaHome className="text-lg" />,
        },
        {
            name: "Catalog",
            path: "/categories",
            icon: <FaThLarge className="text-base" />,
        },
        {
            name: "Wishlist",
            path: "/wishlist",
            icon: <FaHeart className="text-base" />,
        },
        {
            name: "Track",
            path: "/track-order",
            icon: <FaTruck className="text-base" />,
            badge: "Live",
        },
        {
            name: user ? "Account" : "Sign In",
            path: user ? "/account/dashboard" : "/login",
            icon: <FaUser className="text-base" />,
        },
    ];

    return (
        <nav 
            aria-label="Mobile Navigation Bar"
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-lg px-2 py-1.5"
        >
            <div className="flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition duration-200 ${
                                isActive
                                    ? "text-emerald-800 font-bold"
                                    : "text-slate-500 hover:text-emerald-700 font-medium"
                            }`}
                        >
                            {/* Icon & Badge */}
                            <div className="relative">
                                <div className={`p-1 rounded-lg transition ${
                                    isActive ? "bg-emerald-50 text-emerald-800" : ""
                                }`}>
                                    {item.icon}
                                </div>
                                {item.badge && (
                                    <span className="absolute -top-1.5 -right-3 bg-amber-500 text-emerald-950 text-[9px] font-extrabold px-1 rounded-full animate-pulse">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            {/* Label */}
                            <span className={`text-[10px] tracking-tight mt-0.5 ${
                                isActive ? "text-emerald-900 font-bold" : "text-slate-500"
                            }`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
