import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { 
  FaShieldAlt, 
  FaUsersCog, 
  FaBoxes, 
  FaTags, 
  FaShippingFast, 
  FaCog, 
  FaStore, 
  FaSignOutAlt, 
  FaLeaf, 
  FaTimes, 
  FaChartPie, 
  FaChevronRight
} from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { get } from '../../baseUrl';
import { logoutUser } from '../../features/authSlice';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navGroups = [
  {
    groupName: 'Command & Analytics',
    items: [
      {
        name: 'Dashboard Overview',
        path: '/admin/dashboard',
        icon: <FaChartPie className="text-base" />,
        badge: 'Live',
      },
    ],
  },
  {
    groupName: 'Staff & Authorization',
    items: [
      {
        name: 'SuperAdmin & Staff',
        path: '/admin/users',
        icon: <FaUsersCog className="text-base" />,
        badge: 'SuperAdmin',
      },
    ],
  },
  {
    groupName: 'Catalog & Storefront',
    items: [
      {
        name: 'Products & Inventory',
        path: '/admin/products',
        icon: <FaBoxes className="text-base" />,
      },
      {
        name: 'Category Taxonomy',
        path: '/admin/categories',
        icon: <FaTags className="text-base" />,
      },
      {
        name: 'Orders & Dispatches',
        path: '/admin/orders',
        icon: <FaShippingFast className="text-base" />,
        badge: '4 New',
      },
    ],
  },
  {
    groupName: 'Platform Governance',
    items: [
      {
        name: 'System & RBAC Policy',
        path: '/admin/settings',
        icon: <FaCog className="text-base" />,
      },
    ],
  },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);

  const isSuperAdmin = user?.role === 'superadmin';

  const logoutMutation = useMutation({
    mutationFn: () => get('default', 'auth/logout'),
    onSuccess: () => {
      dispatch(logoutUser());
      queryClient.clear();
      navigate('/admin/login');
    },
    onError: () => {
      dispatch(logoutUser());
      navigate('/admin/login');
    },
  });

  const isActive = (path: string) => {
    if (path === '/admin/dashboard' && (location.pathname === '/admin' || location.pathname === '/admin/dashboard')) {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col justify-between
          transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shadow-sm
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-amber-300 shadow-md shadow-emerald-950/10">
                <FaLeaf className="text-xl transform -rotate-12" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-slate-900 tracking-tight block">
                  Grain<span className="text-emerald-700">Pulse</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 block -mt-1">
                  Admin Platform
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              aria-label="Close sidebar"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-4 mx-3 my-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {user?.firstname ? user.firstname.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {user?.firstname || 'Admin'} {user?.lastname || ''}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    isSuperAdmin 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    <FaShieldAlt className="text-[8px]" />
                    <span>{user?.role || 'admin'}</span>
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {group.groupName}
                </div>
                {group.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`
                        flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition group
                        ${active 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className={active ? 'text-emerald-700' : 'text-slate-400 group-hover:text-emerald-700'}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          item.badge === 'SuperAdmin' 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <FaStore className="text-emerald-700" />
              <span>Storefront View</span>
            </div>
            <FaChevronRight className="text-[10px] text-slate-400" />
          </Link>

          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition cursor-pointer"
          >
            <FaSignOutAlt />
            <span>{logoutMutation.isPending ? 'Terminating...' : 'Sign Out Session'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
