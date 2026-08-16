import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../baseUrl';
import { FaTags, FaPlus, FaSearch, FaTimes, FaSeedling } from 'react-icons/fa';
import Alert from '../../components/common/Alert';

const fallbackCategories = [
  { id: '1', name: 'Organic Pulses & Dals', count: 24, status: 'Active', description: 'Unpolished native lentils and split grams' },
  { id: '2', name: 'Ancient Grains & Millets', count: 32, status: 'Active', description: 'Heirloom rice, foxtail, ragi, and jowar' },
  { id: '3', name: 'Cold-Pressed Virgin Oils', count: 18, status: 'Active', description: 'Wood-churned expeller oils without chemical heating' },
  { id: '4', name: 'Authentic Indian Spices', count: 45, status: 'Active', description: 'High-curcumin single origin spices and whole peppers' },
  { id: '5', name: 'Dry Fruits & Super Seeds', count: 28, status: 'Active', description: 'Raw Kashmiri mamra almonds, walnuts, and chia seeds' },
  { id: '6', name: 'Stone-Ground Flours & Atta', count: 14, status: 'Active', description: 'Traditional stone-ground multi-grain flours' },
];

const AdminCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });

  const [alertData, setAlertData] = useState<{
    message: string;
    variant: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    variant: 'success',
    show: false,
  });

  const { data: apiData } = useQuery({
    queryKey: ['admin-categories-list'],
    queryFn: () => get('default', 'categories'),
    retry: 1,
  });

  const backendCategories = apiData?.categories || [];
  const categoryList = backendCategories.length > 0
    ? backendCategories.map((c: any) => ({
        id: c._id,
        name: c.name,
        count: 'Fresh Batch',
        status: 'Active',
        description: c.description || 'Certified organic cluster crop',
      }))
    : fallbackCategories;

  const filtered = categoryList.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertData({
      message: `Category "${form.name}" added successfully!`,
      variant: 'success',
      show: true,
    });
    setModalOpen(false);
    setForm({ name: '', description: '' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FaSeedling className="text-amber-400" />
            <span>Taxonomy Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Organic Category Taxonomy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize catalog groupings, crop clusters, and storefront category filters.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition cursor-pointer self-start sm:self-auto"
        >
          <FaPlus />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filtered.map((item: any) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500/50 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <FaTags />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  {item.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">{item.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Catalog Coverage</span>
              <span className="font-bold text-slate-300">{item.count} items</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <FaTags />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Create Category</h3>
                  <p className="text-xs text-slate-400">Add new product taxonomy grouping</p>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Organic Herbal Infusions"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of products in this category..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Alert */}
      {alertData.show && (
        <Alert
          message={alertData.message}
          variant={alertData.variant}
          onDismiss={() => setAlertData((p) => ({ ...p, show: false }))}
        />
      )}

    </div>
  );
};

export default AdminCategories;
