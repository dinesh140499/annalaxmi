import { Link } from 'react-router-dom';
import pagenotfound from '../assets/images/404.png';
import Breadcrumbs from './reusable/Breadcrumps';
import { FaHome, FaShoppingBag, FaLeaf } from 'react-icons/fa';

const PageNotFound = () => {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />
      <div className="max-w-[95%] mx-auto py-12 sm:py-20 flex flex-col items-center text-center">
        
        <div className="h-64 sm:h-72 w-64 sm:w-72 mb-6 flex items-center justify-center">
          <img
            src={pagenotfound}
            className="h-full w-full object-contain drop-shadow-md"
            alt="Page not found"
            title="Page Not Found"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
          <FaLeaf className="text-amber-500" />
          <span>404 Error</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Harvest Field Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-2 leading-relaxed">
          The page you are looking for might have been harvested, moved, or is temporarily out of season.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition"
          >
            <FaHome className="text-amber-300" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm border border-slate-200 shadow-xs transition"
          >
            <FaShoppingBag className="text-emerald-700" />
            <span>Browse Products</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PageNotFound;