import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../baseUrl';
import { 
  FaBoxes, 
  FaPlus, 
  FaSearch, 
  FaStar, 
  FaTimes, 
  FaLeaf 
} from 'react-icons/fa';
import Alert from '../../components/common/Alert';
import pulse from '../../assets/images/products/pulse.png';

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [alertData, setAlertData] = useState<{
    message: string;
    variant: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    variant: 'success',
    show: false,
  });

  const [form, setForm] = useState({
    name: '',
    category: 'Pulses',
    sellingPrice: '',
    mrp: '',
    weight: '1 Kg',
    stock: '50',
  });

  // Query Backend Products
  const { data: apiData } = useQuery({
    queryKey: ['admin-products-list'],
    queryFn: () => get('default', 'products?limit=50'),
    retry: 1,
  });

  const backendProducts = apiData?.products || [];
  const productList = backendProducts.map((p: any) => ({
    id: p._id,
    name: p.name,
    category: p.category?.name || 'Organic',
    price: p.pricing?.sellingPrice || 0,
    mrp: p.pricing?.mrp || p.pricing?.sellingPrice || 0,
    weight: p.specifications?.weight || 'Standard',
    stock: p.inventory?.stockQuantity ?? p.inventory?.stock ?? 0,
    rating: p.rating?.average || 5.0,
    image: p.images?.[0]?.url || pulse,
    badge: p.isBestSeller ? 'Best Seller' : undefined,
  }));

  const categories = ['All', 'Pulses', 'Grains', 'Oils', 'Spices', 'Dry Fruits'];

  const filtered = productList.filter((item: any) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertData({
      message: `Product "${form.name}" catalog entry registered successfully!`,
      variant: 'success',
      show: true,
    });
    setModalOpen(false);
    setForm({ name: '', category: 'Pulses', sellingPrice: '', mrp: '', weight: '1 Kg', stock: '50' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FaLeaf className="text-amber-400" />
            <span>Catalog Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Products & Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage harvest items, selling prices, MRPS, weight packs, and stock availability.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition cursor-pointer self-start sm:self-auto"
        >
          <FaPlus />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === c
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Product Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Selling Price / MRP</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4 text-right pr-6">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-850/60 transition">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 p-1 shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-white block truncate">{item.name}</span>
                        <span className="text-[11px] text-slate-400">Pack: {item.weight}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block bg-slate-800 text-slate-300 font-semibold text-[11px] px-2.5 py-1 rounded-lg">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-extrabold">₹{item.price}</span>
                    <span className="text-slate-500 line-through text-[11px] ml-2">₹{item.mrp}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      <span>{item.stock} in stock</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right pr-6">
                    <div className="inline-flex items-center gap-1 text-amber-400 font-bold">
                      <FaStar className="text-xs" />
                      <span>{item.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <FaBoxes />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Add Catalog Item</h3>
                  <p className="text-xs text-slate-400">Register new crop batch into catalog</p>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Organic Kabuli Chana"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition cursor-pointer"
                  >
                    <option value="Pulses">Pulses & Dals</option>
                    <option value="Grains">Ancient Grains</option>
                    <option value="Oils">Cold-Pressed Oils</option>
                    <option value="Spices">Sun-Dried Spices</option>
                    <option value="Dry Fruits">Dry Fruits & Seeds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Pack Size *</label>
                  <input
                    type="text"
                    required
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    placeholder="1 Kg"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={form.sellingPrice}
                    onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
                    placeholder="180"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={form.mrp}
                    onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                    placeholder="220"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                  />
                </div>
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
                  Save Product Entry
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

export default AdminProducts;
