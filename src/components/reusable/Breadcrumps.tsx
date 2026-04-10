import { IoHomeOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import breadcrump from '../../assets/images/breadcrump.jpg';

const Breadcrumbs = () => {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);
    
    return (
        <>
        <div className="h-16 w-full relative overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${breadcrump})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    transform: 'scaleX(-1)',
                    zIndex: 0,
                }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Breadcrumb content */}
            <div className="relative z-20 h-full grid place-items-center">
                <div className="max-w-[90%] w-full lg:max-w-[95%] mx-auto">
                    <div className="flex items-center text-white text-sm gap-2">
                        <Link to="/" className="flex items-center gap-1 hover:underline">
                            <IoHomeOutline className="text-lg" />
                        </Link>

                        {segments.map((segment, index) => {
                            const path = "/" + segments.slice(0, index + 1).join("/");
                            const isLast = index === segments.length - 1;

                            return (
                                <div key={index} className="flex items-center gap-1 capitalize">
                                    <MdKeyboardArrowRight />
                                    {isLast ? (
                                        <span className="font-semibold text-[#1bd38b]">{segment.replace(/-/g, " ")}</span>
                                    ) : (
                                        <Link to={path} className="hover:underline">
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

       </>
    );
};

export default Breadcrumbs;
