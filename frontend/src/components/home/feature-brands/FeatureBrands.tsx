import { FaLeaf, FaArrowRight } from "react-icons/fa";
import veg from '../../../assets/images/veg.jpg';
import { Link } from "react-router-dom";

const brands = [
    {
        title: "Madhya Pradesh Heritage Farms",
        subtitle: "Specialists in Unpolished Toor, Chana, & Moong Dal",
        tag: "Certified Organic Cluster",
        image: veg,
    },
    {
        title: "Himalayan Native Grain Growers",
        subtitle: "Single-origin Red Rice, Foxtail & Heritage Millets",
        tag: "High-Altitude Harvest",
        image: veg,
    },
];

const FeatureBrands = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="max-w-[95%] mx-auto w-full">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                            <FaLeaf className="text-amber-500" />
                            <span>Farmer Partner Collective</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Direct Farmer Producer Collectives
                        </h2>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {brands.map((brand, i) => (
                        <div key={i} className="relative rounded-3xl overflow-hidden shadow-md h-56 sm:h-64 group">
                            <img src={brand.image} alt={brand.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/70 to-transparent p-6 sm:p-8 flex flex-col justify-center text-white">
                                <span className="bg-emerald-800/80 border border-emerald-600/50 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2">
                                    {brand.tag}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold">{brand.title}</h3>
                                <p className="text-xs text-emerald-100/90 mt-1 mb-4 max-w-sm">{brand.subtitle}</p>
                                <Link to="/categories" className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs w-fit flex items-center gap-1.5 transition">
                                    <span>Explore Collection</span>
                                    <FaArrowRight className="text-[10px]" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeatureBrands;
