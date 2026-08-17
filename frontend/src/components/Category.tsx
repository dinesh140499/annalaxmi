import { Link } from 'react-router-dom';
import { FaLeaf, FaArrowRight } from 'react-icons/fa';
import pulse from '../assets/images/products/pulse.png';
import { useQuery } from '@tanstack/react-query';
import { get } from '../baseUrl';

const Category = () => {
  const { data: apiData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => get('default', 'categories'),
    retry: 1,
  });

  const categories = apiData?.categories || [];

  return (
    <section className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-[95%] mx-auto w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider bg-emerald-100/60 px-3 py-1 rounded-full mb-2">
            <FaLeaf className="text-amber-500" />
            <span>Farm Direct Categories</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Explore All Organic Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every category represents our commitment to unpolished, chemical-free nutrition sourced from certified Indian farmers.
          </p>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="py-12 text-center text-xs text-emerald-800 font-semibold animate-pulse">
            Loading farm categories from database...
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat: any) => (
            <div
              key={cat._id}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="h-20 w-20 rounded-2xl bg-emerald-50 p-2 flex items-center justify-center shrink-0">
                    <img src={cat.image?.url || pulse} alt={cat.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-emerald-800 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      100% Organic
                    </span>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">Fresh Harvest</p>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 hover:text-emerald-800 transition">
                  {cat.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {cat.description || "Farm-fresh certified organic harvest."}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/shop"
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 group"
                >
                  <span>Browse Products</span>
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[11px] text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                  Express Delivery
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Category;