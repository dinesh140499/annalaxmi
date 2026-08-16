import { IoHomeOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import breadcrump from '../../assets/images/breadcrump.jpg';

const Breadcrumbs = () => {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);
    
    return (
        <div className="h-14 sm:h-16 w-full relative overflow-hidden bg-emerald-950">
            <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                    backgroundImage: `url(${breadcrump})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    transform: 'scaleX(-1)',
                }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/90 to-emerald-950 z-10"></div>

            {/* Breadcrumb content */}
            <div className="relative z-20 h-full flex items-center">
                <div className="max-w-[95%] w-full mx-auto">
                    <div className="flex items-center text-slate-300 text-xs sm:text-sm gap-2">
                        <Link to="/" className="flex items-center gap-1 hover:text-amber-400 transition">
                            <IoHomeOutline className="text-sm sm:text-base text-amber-400" />
                            <span className="font-medium">Home</span>
                        </Link>

                        {segments.map((segment, index) => {
                            const path = "/" + segments.slice(0, index + 1).join("/");
                            const isLast = index === segments.length - 1;

                            return (
                                <div key={index} className="flex items-center gap-2 capitalize">
                                    <MdKeyboardArrowRight className="text-slate-500 text-base" />
                                    {isLast ? (
                                        <span className="font-semibold text-amber-300 bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-700/50">
                                            {segment.replace(/-/g, " ")}
                                        </span>
                                    ) : (
                                        <Link to={path} className="hover:text-amber-400 transition font-medium">
                                            {segment.replace(/-/g, " ")}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumbs;
