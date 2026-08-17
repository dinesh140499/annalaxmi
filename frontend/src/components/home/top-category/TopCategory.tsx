import pulse from '../../../assets/images/products/pulse.png';
import { Link } from 'react-router-dom';
import { FaLeaf, FaArrowRight } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../../baseUrl';

const TopCategory = () => {
    // Query backend categories API
    const { data: apiData, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => get('default', 'categories'),
        retry: 1,
    });

    const backendCategories = apiData?.categories || [];

    if (!isLoading && backendCategories.length === 0) {
        return null;
    }

    return (
        <section className="py-8 sm:py-12">
            <div className="max-w-[95%] mx-auto w-full">
                
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-slate-100 gap-2">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                            <FaLeaf className="text-amber-500" />
                            <span>Farm Direct Pillars</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Explore Top Categories
                        </h2>
                    </div>
                    <Link to="/categories" className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group">
                        <span>View All Categories</span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-5">
                    {backendCategories.map((item: any) => (
                        <Link
                            key={item._id}
                            to={`/categories`}
                            className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 card-hover-effect flex flex-col items-center text-center group"
                        >
                            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-gradient-to-b from-emerald-50/80 to-slate-50 p-2 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                                <img 
                                    src={item.image?.url || pulse} 
                                    alt={item.name} 
                                    className="h-full w-full object-contain" 
                                />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                                Certified
                            </span>
                            <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-800 transition line-clamp-1">
                                {item.name}
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-0.5">Fresh Harvest</p>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TopCategory;
