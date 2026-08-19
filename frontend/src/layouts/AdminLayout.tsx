import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
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
  FaBars, 
  FaTimes, 
  FaChartPie, 
  FaBell, 
  FaSearch, 
  FaPlus,
  FaChevronRight
} from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { get } from '../baseUrl';
import { logoutUser } from '../features/authSlice';
import { getRoleConfig } from '../utils/rbac';

interface NavGroup {
  groupName: string;
  items: {
    name: string;
    path: string;
    icon: React.ReactNode;
    badge?: string;
    requiredPermission?: 'canManageUsers' | 'canCreateProduct' | 'canManageOrders';
  }[];
}

const mockNotifications = [
  { id: 1, text: 'New order #GP-90182 placed for ₹505', time: '10m ago', unread: true },
  { id: 2, text: 'System catalog inventory sync complete', time: '1h ago', unread: true },
  { id: 3, text: 'Inventory alert: Kashmiri Mamra Almonds (18 left)', time: '3h ago', unread: false },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);

  const roleConfig = getRoleConfig(user?.role);
  const isSuperAdmin = user?.role === 'superadmin';

  const navGroups: NavGroup[] = [
    {
      groupName: 'Command & Analytics',
      items: [
        {
          name: 'Dashboard Overview',
          path: '/admin/dashboard',
          icon: <FaChartPie className="text-base" />,
          badge: roleConfig.isReadOnly ? 'Read-Only' : 'Live',
        },
      ],
    },
    ...(isSuperAdmin ? [{
      groupName: 'Staff & Authorization',
      items: [
        {
          name: 'Manage Staff & Roles',
          path: '/admin/admins',
          icon: <FaUsersCog className="text-base" />,
          badge: 'SuperAdmin',
        },
      ],
    }] : []),
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

  const logoutMutation = useMutation({
    mutationFn: () => get('default', 'auth/logout'),
    onSuccess: () => {
      dispatch(logoutUser());
      queryClient.clear();
      navigate('/admin/login');
    },
    onError: () => {
      dispatch(logoutUser());
      queryClient.clear();
      navigate('/admin/login');
    },
  });

  const isActive = (path: string) => {
    if (path === '/admin/dashboard' && (location.pathname === '/admin' || location.pathname === '/admin/dashboard')) {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  const quickLinks = [
    ...(roleConfig.canManageUsers ? [{ title: 'Provision Administrator', path: '/admin/admins', desc: 'Create new SuperAdmin or Staff account' }] : []),
    ...(roleConfig.canCreateProduct ? [
      { title: 'Add Catalog Product', path: '/admin/products', desc: 'Register harvest item into inventory' },
      { title: 'Create Category Cluster', path: '/admin/categories', desc: 'Add organic crop category' },
    ] : []),
    { title: 'View Customer Orders', path: '/admin/orders', desc: 'Review fulfillment pipeline' },
    { title: 'View Dashboard Metrics', path: '/admin/dashboard', desc: 'Real-time sales & harvest indicators' },
  ];

  const filteredQuickLinks = quickLinks.filter((l) =>
    l.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.desc.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased font-sans">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar Navigation */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between
          transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-amber-300 shadow-md shadow-emerald-950">
                <FaLeaf className="text-xl transform -rotate-12" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  Grain<span className="text-amber-400">Pulse</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block -mt-1">
                  Enterprise Gateway
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
              aria-label="Close sidebar"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* User Status Card - Dynamically Adapts to Login Role */}
          <div className="p-4 mx-3 my-3 bg-slate-950/80 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-xl text-white flex items-center justify-center font-black text-sm shadow-inner ${
                isSuperAdmin 
                  ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950' 
                  : user?.role === 'manager'
                  ? 'bg-gradient-to-br from-blue-600 to-blue-800'
                  : user?.role === 'editor'
                  ? 'bg-gradient-to-br from-purple-600 to-purple-800'
                  : 'bg-gradient-to-br from-emerald-600 to-emerald-900'
              }`}>
                {user?.name ? user.name.charAt(0).toUpperCase() : (user?.firstname ? user.firstname.charAt(0).toUpperCase() : 'A')}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">
                  {user?.name || `${user?.firstname || 'Staff'} ${user?.lastname || ''}`.trim()}
                </h4>
                <p className="text-[10px] text-slate-400 truncate -mt-0.5">{user?.email || 'authenticated'}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${roleConfig.pillClass}`}>
                    <FaShieldAlt className="text-[8px]" />
                    <span>{roleConfig.badgeLabel}</span>
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Grouped Navigation */}
          <nav className="px-3 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  {group.groupName}
                </div>
                {group.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition group
                        ${active 
                          ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-xs' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className={active ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-400'}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          item.badge === 'SuperAdmin' 
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' 
                            : 'bg-emerald-500/15 text-emerald-300'
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

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <div className="flex items-center gap-2.5">
              <FaStore className="text-emerald-400" />
              <span>Storefront View</span>
            </div>
            <FaChevronRight className="text-[10px] text-slate-500" />
          </Link>

          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition cursor-pointer"
          >
            <FaSignOutAlt />
            <span>{logoutMutation.isPending ? 'Terminating...' : 'Sign Out Session'}</span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Global Top Command Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 text-lg"
              aria-label="Open navigation"
            >
              <FaBars />
            </button>

            {/* Command Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white px-3.5 py-1.5 rounded-xl text-xs transition w-64 cursor-pointer"
            >
              <FaSearch className="text-slate-500" />
              <span className="flex-1 text-left">Quick command jump...</span>
              <kbd className="bg-slate-800 text-slate-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-3 relative">
            
            {/* Quick Create Dropdown - Dynamically Hidden for Read-Only Viewers */}
            {!roleConfig.isReadOnly && (
              <div className="relative">
                <button
                  onClick={() => setQuickCreateOpen(!quickCreateOpen)}
                  className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold py-1.5 px-3 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950 transition cursor-pointer"
                >
                  <FaPlus className="text-[10px]" />
                  <span className="hidden sm:inline">Create</span>
                </button>

                {quickCreateOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-scale-in"
                    onClick={() => setQuickCreateOpen(false)}
                  >
                    {roleConfig.canManageUsers && (
                      <Link
                        to="/admin/admins"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                      >
                        <FaUsersCog className="text-amber-400" />
                        <span>Provision Staff</span>
                      </Link>
                    )}
                    {roleConfig.canCreateProduct && (
                      <>
                        <Link
                          to="/admin/products"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                        >
                          <FaBoxes className="text-emerald-400" />
                          <span>Add Product</span>
                        </Link>
                        <Link
                          to="/admin/categories"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                        >
                          <FaTags className="text-blue-400" />
                          <span>Create Category</span>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white transition cursor-pointer"
                aria-label="Notifications"
              >
                <FaBell className="text-sm" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">System Notifications</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">2 New</span>
                  </div>
                  <div className="space-y-2">
                    {mockNotifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                        <p className="text-slate-300 leading-snug">{n.text}</p>
                        <span className="text-[10px] text-slate-500 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Role Badge Chip in Header */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
              <FaShieldAlt className={isSuperAdmin ? 'text-amber-400' : 'text-emerald-400'} />
              <span>Role: <strong className="text-white uppercase">{roleConfig.badgeLabel}</strong></span>
            </div>

          </div>
        </header>

        {/* Global Search Modal */}
        {searchOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <FaSearch className="text-emerald-400" />
                  <span>Administrative Command Palette</span>
                </div>
                <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white">
                  <FaTimes />
                </button>
              </div>

              <input
                type="text"
                autoFocus
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Type module name or jump target..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition text-xs sm:text-sm"
              />

              <div className="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar">
                {filteredQuickLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800/80 transition group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                    </div>
                    <FaChevronRight className="text-slate-600 group-hover:text-emerald-400 text-xs" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
