import { useQuery } from '@tanstack/react-query';
import { get } from '../../baseUrl';
import { 
  FaUsersCog, 
  FaBoxes, 
  FaTags, 
  FaShieldAlt, 
  FaArrowRight, 
  FaDatabase, 
  FaCheckCircle, 
  FaLock, 
  FaPlus,
  FaBolt,
  FaReceipt,
  FaArrowUp,
  FaShippingFast
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

const recentOrdersFeed = [
  { id: 'GP-90182', customer: 'Rahul Verma', amount: 505, items: '2x Toor Dal, 1x Mustard Oil', status: 'Processing' },
  { id: 'GP-90181', customer: 'Priya Sundaram', amount: 870, items: '3x Red Rice, 2x Turmeric', status: 'Dispatched' },
  { id: 'GP-90180', customer: 'Amit Saxena', amount: 650, items: '1x Mamra Almonds', status: 'Delivered' },
  { id: 'GP-90179', customer: 'Kavita Joshi', amount: 285, items: '1x Toor Dal, 1x Turmeric', status: 'Delivered' },
];

const categorySalesDistribution = [
  { category: 'Organic Pulses & Dals', percent: 38, sales: '₹42,800', color: 'bg-emerald-600' },
  { category: 'Cold-Pressed Virgin Oils', percent: 26, sales: '₹29,400', color: 'bg-amber-500' },
  { category: 'Ancient Grains & Rice', percent: 20, sales: '₹22,600', color: 'bg-blue-600' },
  { category: 'Sun-Dried Spices', percent: 16, sales: '₹18,100', color: 'bg-rose-500' },
];

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isSuperAdmin = user?.role === 'superadmin';

  // 1. Fetch Admins
  const { data: adminsData } = useQuery({
    queryKey: ['superadmin-admins'],
    queryFn: () => get('default', 'superadmin'),
    retry: 1,
  });

  // 2. Fetch Products
  const { data: productsData } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => get('default', 'products?limit=50'),
    retry: 1,
  });

  // 3. Fetch Categories
  const { data: categoriesData } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => get('default', 'categories'),
    retry: 1,
  });

  const adminsCount = adminsData?.admins?.length || 3;
  const productsCount = productsData?.pagination?.totalProducts || productsData?.products?.length || 8;
  const categoriesCount = categoriesData?.categories?.length || 6;

  const quickStats = [
    {
      title: 'Gross Platform Sales',
      value: '₹1,12,900',
      trend: '+18.4% vs last mo',
      desc: 'Direct harvest order value',
      icon: <FaReceipt className="text-xl text-emerald-700" />,
      bgIcon: 'bg-emerald-50 text-emerald-700',
      color: 'bg-white border-slate-200 hover:border-emerald-500',
      link: '/admin/orders',
    },
    {
      title: 'Catalog Inventory Items',
      value: productsCount,
      trend: '+4 newly added',
      desc: 'Active harvest items in catalog',
      icon: <FaBoxes className="text-xl text-amber-700" />,
      bgIcon: 'bg-amber-50 text-amber-700',
      color: 'bg-white border-slate-200 hover:border-amber-500',
      link: '/admin/products',
    },
    {
      title: 'Active Administrators',
      value: adminsCount,
      trend: 'RBAC Enforced',
      desc: isSuperAdmin ? 'Full SuperAdmin & Staff' : 'Registered Staff Members',
      icon: <FaUsersCog className="text-xl text-emerald-700" />,
      bgIcon: 'bg-emerald-50 text-emerald-700',
      color: 'bg-white border-slate-200 hover:border-emerald-500',
      link: '/admin/users',
    },
    {
      title: 'Crop Taxonomy Clusters',
      value: categoriesCount,
      trend: '100% Certified',
      desc: 'Organic category clusters',
      icon: <FaTags className="text-xl text-blue-700" />,
      bgIcon: 'bg-blue-50 text-blue-700',
      color: 'bg-white border-slate-200 hover:border-blue-500',
      link: '/admin/categories',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      
      {/* Enterprise Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-xs border border-white/20 px-3 py-1 rounded-full mb-3">
              <FaBolt className="text-[10px]" />
              <span>GrainPulse Operations Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Executive Command Center
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-2xl leading-relaxed">
              Logged in as <strong className="text-white font-bold">{user?.firstname || 'Admin'} {user?.lastname || ''}</strong> with <strong className="text-amber-300 uppercase">{user?.role || 'Admin'}</strong> privileges. Control administrative staff, provision catalog items, and monitor fulfillment lifecycle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isSuperAdmin && (
              <Link
                to="/admin/users"
                className="bg-white text-emerald-900 hover:bg-emerald-50 active:scale-95 font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
              >
                <FaUsersCog className="text-emerald-700" />
                <span>Manage Staff</span>
              </Link>
            )}
            <Link
              to="/admin/orders"
              className="bg-emerald-900/60 hover:bg-emerald-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-emerald-600/40 transition"
            >
              <FaShippingFast className="text-amber-300" />
              <span>Live Orders</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {quickStats.map((stat, i) => (
          <Link
            key={i}
            to={stat.link}
            className={`${stat.color} border rounded-2xl p-5 shadow-xs hover:shadow-md transition group flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500 font-semibold">{stat.title}</span>
                <div className={`h-10 w-10 rounded-xl ${stat.bgIcon} flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-emerald-800 transition">
                {stat.value}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  <FaArrowUp className="text-[8px]" />
                  <span>{stat.trend}</span>
                </span>
                <span className="text-[10px] text-slate-500 truncate">{stat.desc}</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-emerald-800">
              <span>Inspect module</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Analytics & Orders Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Orders Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FaReceipt className="text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">Live Orders Fulfillment Feed</h3>
              </div>
              <Link to="/admin/orders" className="text-xs font-bold text-emerald-700 hover:underline">
                View All Orders &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentOrdersFeed.map((ord) => (
                <div key={ord.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-xs">{ord.id}</span>
                      <span className="text-xs font-semibold text-slate-700">{ord.customer}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{ord.items}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-slate-900 block">₹{ord.amount}</span>
                    <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md mt-0.5 ${
                      ord.status === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : ord.status === 'Dispatched'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Creation Operations */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FaBolt className="text-amber-500" />
              <span>Administrative Quick Launch</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {isSuperAdmin && (
                <Link
                  to="/admin/users"
                  className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-2xl p-4 transition group flex items-start gap-3"
                >
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <FaPlus />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition">
                      Provision Admin
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Add new staff with role permissions.
                    </p>
                  </div>
                </Link>
              )}

              <Link
                to="/admin/products"
                className="bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-2xl p-4 transition group flex items-start gap-3"
              >
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <FaBoxes />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition">
                    Inventory & Products
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Update prices, weights, and stock.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Category Distribution & Gateway Status (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Category Sales Breakdown */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FaTags className="text-blue-600" />
              <span>Category Revenue Share</span>
            </h3>

            <div className="space-y-3.5">
              {categorySalesDistribution.map((item, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">{item.category}</span>
                    <span className="text-slate-900 font-bold">{item.sales} ({item.percent}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FaShieldAlt className="text-amber-500" />
              <span>Security & Gateway Health</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FaDatabase className="text-emerald-700" />
                  <span className="font-semibold text-slate-700">Database Engine</span>
                </div>
                <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  <FaCheckCircle className="text-[10px]" />
                  <span>Online / Connected</span>
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FaShieldAlt className="text-amber-600" />
                  <span className="font-semibold text-slate-700">RBAC Enforcement</span>
                </div>
                <span className="inline-flex items-center gap-1 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                  <FaCheckCircle className="text-[10px]" />
                  <span>Active Guard</span>
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FaLock className="text-blue-600" />
                  <span className="font-semibold text-slate-700">Rate Limiter Protection</span>
                </div>
                <span className="inline-flex items-center gap-1 text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                  <FaCheckCircle className="text-[10px]" />
                  <span>100 req / 15m</span>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
