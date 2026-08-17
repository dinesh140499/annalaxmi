import { FaStar } from 'react-icons/fa';
import pulse from '../../assets/images/products/pulse.png';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../baseUrl';

const SaleProduct = () => {
  const { data: apiData } = useQuery({
    queryKey: ['trendingSaleProduct'],
    queryFn: () => get('default', 'products?limit=1'),
    retry: 1,
  });

  const product = apiData?.products?.[0];

  if (!product) {
    return null;
  }

  const price = product.pricing?.sellingPrice || 0;
  const originalPrice = product.pricing?.mrp || price;
  const image = product.images?.[0]?.url || pulse;

  return (
    <div className="mt-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
        Trending Organic Pick
      </h4>
      <Link 
        to={`/product/${product._id}`} 
        className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 hover:border-emerald-300 hover:shadow-md transition duration-200 group"
      >
        <div className="h-16 w-16 bg-slate-50 rounded-xl p-1.5 shrink-0 flex items-center justify-center">
          <img src={image} alt={product.name} className="h-full w-full object-contain group-hover:scale-105 transition" />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-800 transition">
            {product.name}
          </h5>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex text-amber-400 text-[10px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">({product.rating?.average || 5.0})</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-extrabold text-emerald-900">₹{price}</span>
            {originalPrice > price && (
              <span className="text-[10px] text-slate-400 line-through">₹{originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SaleProduct;
