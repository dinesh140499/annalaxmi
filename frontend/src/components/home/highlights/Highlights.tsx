import { FaTruck, FaLeaf, FaShieldAlt, FaSeedling } from 'react-icons/fa';

const highlights = [
    {
        icon: <FaSeedling className="text-2xl text-emerald-700" />,
        title: "100% Farm-Direct Sourcing",
        desc: "Handpicked from certified regenerative farmers across Indian heritage soils.",
        badge: "Zero Middlemen",
    },
    {
        icon: <FaLeaf className="text-2xl text-emerald-700" />,
        title: "Unpolished & Chemical Free",
        desc: "Zero mineral oils, chemical polishers, or synthetic preservatives.",
        badge: "Pure Bioavailable",
    },
    {
        icon: <FaTruck className="text-2xl text-emerald-700" />,
        title: "Express Fresh Delivery",
        desc: "Free express same-day doorstep shipping on orders above ₹499.",
        badge: "2-Hour Express",
    },
    {
        icon: <FaShieldAlt className="text-2xl text-emerald-700" />,
        title: "Lab Tested Purity",
        desc: "Certified organic testing with verified chemical-free nutrient density.",
        badge: "100% Guaranteed",
    },
];

const Highlights = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="max-w-[95%] mx-auto w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 card-hover-effect flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                                        {item.badge}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlights;