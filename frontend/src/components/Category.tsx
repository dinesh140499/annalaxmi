import { Link } from 'react-router-dom';
import { FaLeaf, FaArrowRight } from 'react-icons/fa';
import pulse from '../assets/images/products/pulse.png';
import spices from '../assets/images/products/spices.png';
import oils from '../assets/images/products/oils.png';
import grains from '../assets/images/products/grains.png';
import dryfruit from '../assets/images/products/dry-fruit.png';

export interface CategoryCardData {
  id: number;
  name: string;
  subtitle: string;
  count: string;
  image: string;
  tag: string;
  subcategories: string[];
}

export const grainPulseCategories: CategoryCardData[] = [
  {
    id: 1,
    name: 'Organic Pulses & Dals',
    subtitle: 'Unpolished, pesticide-free, high-protein native lentils',
    count: '24+ Varieties',
    image: pulse,
    tag: '100% Unpolished',
    subcategories: ['Toor Dal', 'Moong Yellow', 'Chana Dal', 'Urad Whole', 'Rajma'],
  },
  {
    id: 2,
    name: 'Ancient Grains & Millets',
    subtitle: 'Nutrient-dense heritage rice, foxtail, and ragi millets',
    count: '32+ Varieties',
    image: grains,
    tag: 'Gluten-Free',
    subcategories: ['Himalayan Red Rice', 'Foxtail Millet', 'Finger Millet / Ragi', 'Sorghum / Jowar'],
  },
  {
    id: 3,
    name: 'Cold-Pressed Virgin Oils',
    subtitle: 'Stone-pressed oils extracted below 40°C for peak nutrients',
    count: '18+ Varieties',
    image: oils,
    tag: 'Stone-Pressed',
    subcategories: ['Kachi Ghani Mustard Oil', 'Virgin Coconut Oil', 'Cold-Pressed Sesame Oil', 'Groundnut Oil'],
  },
  {
    id: 4,
    name: 'Authentic Indian Spices',
    subtitle: 'Sun-dried, high-curcumin whole and freshly ground spices',
    count: '45+ Varieties',
    image: spices,
    tag: 'High Curcumin',
    subcategories: ['Salem Turmeric', 'Kashmiri Chilli', 'Single-Origin Pepper', 'Organic Cumin'],
  },
  {
    id: 5,
    name: 'Dry Fruits & Super Seeds',
    subtitle: 'Handpicked raw almonds, walnuts, and organic chia & flax seeds',
    count: '28+ Varieties',
    image: dryfruit,
    tag: 'Nutrient Rich',
    subcategories: ['Mamra Almonds', 'Walnut Kernels', 'Raw Chia Seeds', 'Flax Seeds', 'Golden Raisins'],
  },
];

const Category = () => {
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grainPulseCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="h-20 w-20 rounded-2xl bg-emerald-50 p-2 flex items-center justify-center shrink-0">
                    <img src={cat.image} alt={cat.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-emerald-800 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      {cat.tag}
                    </span>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">{cat.count}</p>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 hover:text-emerald-800 transition">
                  {cat.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {cat.subtitle}
                </p>

                {/* Subcategory Pills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {cat.subcategories.map((sub, i) => (
                    <span key={i} className="text-[11px] text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 px-2 py-1 rounded-lg transition">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/categories"
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