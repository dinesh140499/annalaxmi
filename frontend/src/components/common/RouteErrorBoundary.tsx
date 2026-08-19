import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { FaExclamationTriangle, FaRedo, FaHome } from 'react-icons/fa';

const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();

  let errorMessage = 'An unexpected error occurred while loading this page.';
  let statusCode = 500;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-50/50 text-center">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-lg w-full shadow-lg space-y-5 animate-scale-in">
        <div className="h-16 w-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-2xl shadow-inner">
          <FaExclamationTriangle />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {statusCode === 404 ? 'Page Not Found' : 'Something went wrong'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            {errorMessage}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleReload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-xs transition cursor-pointer"
          >
            <FaRedo className="text-xs" />
            <span>Reload Page</span>
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-6 rounded-xl transition cursor-pointer"
          >
            <FaHome className="text-xs" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RouteErrorBoundary;
