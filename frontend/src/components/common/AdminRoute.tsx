import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { FaShieldAlt, FaArrowRight, FaLock, FaUser } from 'react-icons/fa';
import Loader from './Loader';

interface AdminRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ADMIN_ROLES = ['superadmin', 'admin', 'manager', 'editor', 'viewer'];

const AdminRoute = ({ children, requiredRole }: AdminRouteProps) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  // While validating/hydrating auth state on initial refresh, show Loader instead of blocking
  if (loading && !user) {
    return <Loader />;
  }

  // Check if role is an authorized staff role
  const isStaffAuthorized = user && ADMIN_ROLES.includes(user.role);
  const hasSpecificRole = !requiredRole || (user && user.role === requiredRole);

  if (!user || !isStaffAuthorized || !hasSpecificRole) {
    const isNormalCustomer = user && user.role === 'user';

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="h-16 w-16 bg-amber-50 border border-amber-200 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
            <FaLock />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <FaShieldAlt className="text-amber-500" />
            <span>Restricted Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isNormalCustomer ? 'Customer Account Detected' : 'Admin Access Required'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {isNormalCustomer ? (
              <>
                You are currently logged in as a <strong>Customer</strong> ({user.email}). The Admin Console is restricted to authorized staff (SuperAdmin, Admin, Manager, Editor, Viewer).
              </>
            ) : (
              'This management zone is reserved for authorized administrative staff. Please authenticate with administrative credentials.'
            )}
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            {isNormalCustomer ? (
              <Link
                to="/account/dashboard"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition"
              >
                <FaUser className="text-xs" />
                <span>Go to Customer Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition"
              >
                <span>Sign In to Admin Gateway</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            )}
            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-slate-900 py-1.5 transition"
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
