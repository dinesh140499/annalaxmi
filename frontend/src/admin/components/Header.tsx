import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { 
  FaShieldAlt, 
  FaBars, 
  FaBell, 
  FaSearch, 
  FaPlus, 
  FaUsersCog, 
  FaBoxes, 
  FaTags, 
  FaTimes, 
  FaChevronRight 
} from 'react-icons/fa';

interface HeaderProps {
  onOpenSidebar: () => void;
}

const mockNotifications = [
  { id: 1, text: 'New order #GP-90182 placed for ₹505', time: '10m ago', unread: true },
  { id: 2, text: 'New Admin "Pooja Sharma" assigned Catalog role', time: '1h ago', unread: true },
  { id: 3, text: 'Inventory low: Kashmiri Mamra Almonds (18 left)', time: '3h ago', unread: false },
];

const Header = ({ onOpenSidebar }: HeaderProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isSuperAdmin = user?.role === 'superadmin';

  const [notifOpen, setNotifOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const quickLinks = [
    { title: 'Provision Administrator', path: '/admin/users', desc: 'Create new SuperAdmin or Staff account' },
    { title: 'Add Catalog Product', path: '/admin/products', desc: 'Register harvest item into inventory' },
    { title: 'Create Category Cluster', path: '/admin/categories', desc: 'Add organic crop category' },
    { title: 'View Customer Orders', path: '/admin/orders', desc: 'Review fulfillment pipeline' },
  ].filter((l) => (isSuperAdmin ? true : l.path !== '/admin/users'));

  const filteredQuickLinks = quickLinks.filter((l) =>
    l.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.desc.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-xs">
      
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden text-slate-600 hover:text-slate-900 p-2 rounded-xl bg-slate-100 text-lg cursor-pointer"
          aria-label="Open navigation"
        >
          <FaBars />
        </button>

        {/* Command Search Trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden sm:flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 px-3.5 py-1.5 rounded-xl text-xs transition w-64 cursor-pointer"
        >
          <FaSearch className="text-slate-400" />
          <span className="flex-1 text-left">Quick command jump...</span>
          <kbd className="bg-white text-slate-500 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">⌘K</kbd>
        </button>
      </div>

      {/* Right: Quick Create, Notifications, Gateway Role Badge */}
      <div className="flex items-center gap-3 relative">
        
        {/* Quick Create Dropdown */}
        <div className="relative">
          <button
            onClick={() => setQuickCreateOpen(!quickCreateOpen)}
            className="bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold py-1.5 px-3 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <FaPlus className="text-[10px]" />
            <span className="hidden sm:inline">Create</span>
          </button>

          {quickCreateOpen && (
            <div 
              className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-scale-in"
              onClick={() => setQuickCreateOpen(false)}
            >
              {isSuperAdmin && (
                <Link
                  to="/admin/users"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-emerald-900 hover:bg-emerald-50 transition"
                >
                  <FaUsersCog className="text-amber-600" />
                  <span>Provision Admin</span>
                </Link>
              )}
              <Link
                to="/admin/products"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-emerald-900 hover:bg-emerald-50 transition"
              >
                <FaBoxes className="text-emerald-700" />
                <span>Add Product</span>
              </Link>
              <Link
                to="/admin/categories"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-emerald-900 hover:bg-emerald-50 transition"
              >
                <FaTags className="text-blue-600" />
                <span>Create Category</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
            aria-label="Notifications"
          >
            <FaBell className="text-sm" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">System Notifications</span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">2 New</span>
              </div>
              <div className="space-y-2">
                {mockNotifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <p className="text-slate-800 leading-snug font-medium">{n.text}</p>
                    <span className="text-[10px] text-slate-400 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Role Chip */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <FaShieldAlt className={isSuperAdmin ? 'text-amber-600' : 'text-emerald-700'} />
          <span>Gateway: <strong className="text-slate-900 uppercase font-bold">{user?.role || 'Admin'}</strong></span>
        </div>

      </div>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
                <FaSearch className="text-emerald-700" />
                <span>Administrative Command Palette</span>
              </div>
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <FaTimes />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Type module name or jump target..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition text-xs sm:text-sm"
            />

            <div className="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar">
              {filteredQuickLinks.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-100 transition group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                  <FaChevronRight className="text-slate-400 group-hover:text-emerald-700 text-xs" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
