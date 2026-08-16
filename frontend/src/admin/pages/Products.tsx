import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put, del } from '../../baseUrl';
import { 
  FaBoxes, 
  FaPlus, 
  FaSearch, 
  FaStar, 
  FaTimes, 
  FaLeaf, 
  FaEdit, 
  FaTrashAlt, 
  FaExclamationTriangle,
  FaCloudUploadAlt
} from 'react-icons/fa';
import Alert from '../../components/common/Alert';
import pulse from '../../assets/images/products/pulse.png';
import grains from '../../assets/images/products/grains.png';
import oils from '../../assets/images/products/oils.png';
import spices from '../../assets/images/products/spices.png';
import dryfruit from '../../assets/images/products/dry-fruit.png';

interface ProductImage {
  url: string;
  public_id?: string;
  isPrimary?: boolean;
}

interface ProductItem {
  id: string;
  _id?: string;
  name: string;
  category: string;
  categoryId?: string;
  brand?: string;
  price: number;
  mrp: number;
  discountPrice?: number;
  weight: string;
  stock: number;
  stockStatus: 'Available' | 'Out Of Stock';
  spec_type: string;
  countryOfOrigin?: string;
  tags?: string[];
  rating: number;
  image: string;
  images?: ProductImage[];
  description?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  badge?: string;
}

const fallbackAdminProducts: ProductItem[] = [
  { id: '1', name: 'Organic Toor / Arhar Dal (Unpolished)', category: 'Pulses', price: 165, mrp: 195, weight: '1 Kg', stock: 48, stockStatus: 'Available', spec_type: 'Agricultural Produce', rating: 5.0, image: pulse, badge: 'Best Seller' },
  { id: '2', name: 'Himalayan Red Rice (Single Origin)', category: 'Grains', price: 210, mrp: 260, weight: '1 Kg', stock: 32, stockStatus: 'Available', spec_type: 'Agricultural Produce', rating: 5.0, image: grains, badge: 'Organic' },
  { id: '3', name: 'Cold-Pressed Kachi Ghani Mustard Oil', category: 'Oils', price: 175, mrp: 220, weight: '1 Litre', stock: 24, stockStatus: 'Available', spec_type: 'Agricultural Produce', rating: 4.8, image: oils, badge: 'Cold-Pressed' },
  { id: '4', name: 'Salem Pure Turmeric Powder (Curcumin 5%)', category: 'Spices', price: 120, mrp: 150, weight: '250 g', stock: 65, stockStatus: 'Available', spec_type: 'Agricultural Produce', rating: 4.9, image: spices, badge: 'Sun-Dried' },
  { id: '5', name: 'Kashmiri Mamra Almonds', category: 'Dry Fruits', price: 650, mrp: 799, weight: '500 g', stock: 18, stockStatus: 'Available', spec_type: 'Agricultural Produce', rating: 5.0, image: dryfruit, badge: 'Premium' },
];

const Products = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // File Inputs Ref
  const createFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Image states for Create
  const [createFiles, setCreateFiles] = useState<File[]>([]);
  const [createPreviews, setCreatePreviews] = useState<string[]>([]);

  // Image states for Edit
  const [editFiles, setEditFiles] = useState<File[]>([]);
  const [editPreviews, setEditPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);

  // Create Form
  const [createForm, setCreateForm] = useState({
    name: '',
    categoryId: '',
    brand: 'GrainPulse Organic',
    description: '',
    sellingPrice: '',
    mrp: '',
    discountPrice: '',
    weight: '1 Kg',
    spec_type: 'Agricultural Produce',
    countryOfOrigin: 'India',
    tags: '',
    stock: '50',
    isBestSeller: false,
    isFeatured: false,
  });

  // Edit Form
  const [editForm, setEditForm] = useState({
    name: '',
    categoryId: '',
    brand: 'GrainPulse Organic',
    description: '',
    sellingPrice: '',
    mrp: '',
    discountPrice: '',
    weight: '1 Kg',
    spec_type: 'Agricultural Produce',
    countryOfOrigin: 'India',
    tags: '',
    stock: '50',
    isBestSeller: false,
    isFeatured: false,
  });

  const [alertData, setAlertData] = useState<{
    message: string;
    variant: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    variant: 'success',
    show: false,
  });

  // 1. READ Products: GET /products
  const { data: apiData } = useQuery({
    queryKey: ['admin-products-list'],
    queryFn: () => get('default', 'products?limit=50'),
    retry: 1,
  });

  // 2. READ Categories for dropdown: GET /categories
  const { data: catData } = useQuery({
    queryKey: ['admin-categories-dropdown'],
    queryFn: () => get('default', 'categories'),
    retry: 1,
  });

  const backendCategories = catData?.categories || [];

  const backendProducts = apiData?.products || [];
  const productList: ProductItem[] = backendProducts.length > 0
    ? backendProducts.map((p: any) => ({
        id: p._id,
        _id: p._id,
        name: p.name,
        category: p.category?.name || 'Organic',
        categoryId: p.category?._id || p.category,
        brand: p.brand || 'GrainPulse Organic',
        price: p.pricing?.sellingPrice || 165,
        mrp: p.pricing?.mrp || 195,
        discountPrice: p.pricing?.discountPrice,
        weight: p.specifications?.weight || '1 Kg',
        spec_type: p.specifications?.spec_type || 'Agricultural Produce',
        countryOfOrigin: p.specifications?.countryOfOrigin || 'India',
        stock: p.inventory?.stock ?? p.inventory?.stockQuantity ?? 35,
        stockStatus: p.inventory?.stockStatus || (p.inventory?.stock > 0 ? 'Available' : 'Out Of Stock'),
        tags: p.tags || [],
        rating: p.rating?.average || 5.0,
        image: p.images?.[0]?.url || pulse,
        images: p.images || [],
        description: p.description || '',
        isBestSeller: p.isBestSeller,
        isFeatured: p.isFeatured,
        badge: p.isBestSeller ? 'Best Seller' : undefined,
      }))
    : fallbackAdminProducts;

  const categories = ['All', 'Pulses', 'Grains', 'Oils', 'Spices', 'Dry Fruits'];

  const filtered = productList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Handle Multi-file selection for Create
  const handleCreateFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);
      setCreateFiles(filesArray);
      setCreatePreviews(filesArray.map((f) => URL.createObjectURL(f)));
    }
  };

  // Handle Multi-file selection for Edit
  const handleEditFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);
      setEditFiles((prev) => [...prev, ...filesArray].slice(0, 5));
      const previews = filesArray.map((f) => URL.createObjectURL(f));
      setEditPreviews((prev) => [...prev, ...previews].slice(0, 5));
    }
  };

  const handleRemoveExistingImage = (public_id?: string) => {
    if (!public_id) return;
    setRemovedImageIds((prev) => [...prev, public_id]);
    setExistingImages((prev) => prev.filter((img) => img.public_id !== public_id));
  };

  const handleRemoveNewEditFile = (index: number) => {
    setEditFiles((prev) => prev.filter((_, i) => i !== index));
    setEditPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // 3. CREATE Product: POST /admin/products
  const createProductMutation = useMutation({
    mutationFn: (payload: typeof createForm) => {
      const fd = new FormData();
      fd.append('name', payload.name);
      fd.append('category', payload.categoryId || (backendCategories[0]?._id || '66ba9a2636fa000000000001'));
      if (payload.brand) fd.append('brand', payload.brand);
      fd.append('description', payload.description || `${payload.name} - 100% Certified Native Harvest Organically Cultivated`);
      fd.append('mrp', payload.mrp);
      fd.append('sellingPrice', payload.sellingPrice);
      if (payload.discountPrice) fd.append('discountPrice', payload.discountPrice);
      fd.append('stock', payload.stock);
      fd.append('stockStatus', Number(payload.stock) > 0 ? 'Available' : 'Out Of Stock');
      fd.append('weight', payload.weight);
      fd.append('spec_type', payload.spec_type || 'Agricultural Produce');
      if (payload.countryOfOrigin) fd.append('countryOfOrigin', payload.countryOfOrigin);
      if (payload.tags) fd.append('tags', payload.tags);
      fd.append('isBestSeller', String(payload.isBestSeller));
      fd.append('isFeatured', String(payload.isFeatured));
      fd.append('isActive', 'true');

      // Append Image Files
      createFiles.forEach((file) => {
        fd.append('images', file);
      });

      return post('default', 'admin/products', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['admin-products-list'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setAlertData({
        message: data?.message || `Product "${createForm.name}" registered to catalog!`,
        variant: 'success',
        show: true,
      });
      setCreateModalOpen(false);
      setCreateFiles([]);
      setCreatePreviews([]);
      setCreateForm({
        name: '',
        categoryId: '',
        brand: 'GrainPulse Organic',
        description: '',
        sellingPrice: '',
        mrp: '',
        discountPrice: '',
        weight: '1 Kg',
        spec_type: 'Agricultural Produce',
        countryOfOrigin: 'India',
        tags: '',
        stock: '50',
        isBestSeller: false,
        isFeatured: false,
      });
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to create product on backend.',
        variant: 'error',
        show: true,
      });
    },
  });

  // 4. UPDATE Product: PUT /admin/products/:id
  const updateProductMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: typeof editForm }) => {
      const fd = new FormData();
      fd.append('name', payload.name);
      if (payload.categoryId) fd.append('category', payload.categoryId);
      if (payload.brand) fd.append('brand', payload.brand);
      fd.append('description', payload.description || `${payload.name} - 100% Certified Native Harvest`);
      fd.append('mrp', payload.mrp);
      fd.append('sellingPrice', payload.sellingPrice);
      if (payload.discountPrice) fd.append('discountPrice', payload.discountPrice);
      fd.append('stock', payload.stock);
      fd.append('stockStatus', Number(payload.stock) > 0 ? 'Available' : 'Out Of Stock');
      fd.append('weight', payload.weight);
      fd.append('spec_type', payload.spec_type || 'Agricultural Produce');
      if (payload.countryOfOrigin) fd.append('countryOfOrigin', payload.countryOfOrigin);
      if (payload.tags) fd.append('tags', payload.tags);
      fd.append('isBestSeller', String(payload.isBestSeller));
      fd.append('isFeatured', String(payload.isFeatured));

      // Append Removed Images
      if (removedImageIds.length > 0) {
        fd.append('removeImages', removedImageIds.join(','));
      }

      // Append New Images
      editFiles.forEach((file) => {
        fd.append('images', file);
      });

      return put('default', `admin/products/${id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['admin-products-list'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setAlertData({
        message: data?.message || 'Product catalog entry updated successfully!',
        variant: 'success',
        show: true,
      });
      setEditModalOpen(false);
      setSelectedProduct(null);
      setEditFiles([]);
      setEditPreviews([]);
      setRemovedImageIds([]);
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to update product on backend.',
        variant: 'error',
        show: true,
      });
    },
  });

  // 5. DELETE Product: DELETE /admin/products/:id
  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => del('default', `admin/products/${id}`),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['admin-products-list'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setAlertData({
        message: data?.message || 'Product entry deleted successfully!',
        variant: 'success',
        show: true,
      });
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to delete product.',
        variant: 'error',
        show: true,
      });
    },
  });

  const handleOpenEdit = (p: ProductItem) => {
    setSelectedProduct(p);
    setEditForm({
      name: p.name,
      categoryId: p.categoryId || '',
      brand: p.brand || 'GrainPulse Organic',
      description: p.description || `${p.name} - 100% Certified Native Harvest`,
      sellingPrice: String(p.price),
      mrp: String(p.mrp),
      discountPrice: p.discountPrice ? String(p.discountPrice) : '',
      weight: p.weight,
      spec_type: p.spec_type || 'Agricultural Produce',
      countryOfOrigin: p.countryOfOrigin || 'India',
      tags: p.tags?.join(', ') || '',
      stock: String(p.stock),
      isBestSeller: !!p.isBestSeller,
      isFeatured: !!p.isFeatured,
    });
    setExistingImages(p.images || []);
    setRemovedImageIds([]);
    setEditFiles([]);
    setEditPreviews([]);
    setEditModalOpen(true);
  };

  const handleOpenDelete = (p: ProductItem) => {
    setSelectedProduct(p);
    setDeleteModalOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(createForm.sellingPrice) > Number(createForm.mrp)) {
      setAlertData({
        message: 'Validation Error: Selling Price cannot be greater than MRP.',
        variant: 'error',
        show: true,
      });
      return;
    }
    createProductMutation.mutate(createForm);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    if (Number(editForm.sellingPrice) > Number(editForm.mrp)) {
      setAlertData({
        message: 'Validation Error: Selling Price cannot be greater than MRP.',
        variant: 'error',
        show: true,
      });
      return;
    }
    updateProductMutation.mutate({
      id: selectedProduct._id || selectedProduct.id,
      payload: editForm,
    });
  };

  const handleDeleteConfirm = () => {
    if (!selectedProduct) return;
    deleteProductMutation.mutate(selectedProduct._id || selectedProduct.id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <FaLeaf className="text-amber-500" />
            <span>Catalog Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Products & Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete CRUD: Create, View, Update, Delete with multi-image gallery upload and backend schema validation.
          </p>
        </div>

        <button
          onClick={() => {
            setCreateFiles([]);
            setCreatePreviews([]);
            setCreateModalOpen(true);
          }}
          className="bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <FaPlus />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === c
                  ? 'bg-white text-emerald-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Product Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Selling Price / MRP</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition group">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate">{item.name}</span>
                        <span className="text-[11px] text-slate-500">Pack: {item.weight} &bull; {item.brand || 'Organic'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block bg-slate-100 text-slate-700 font-semibold text-[11px] px-2.5 py-1 rounded-lg">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-900 font-extrabold">₹{item.price}</span>
                    <span className="text-slate-400 line-through text-[11px] ml-2">₹{item.mrp}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 font-bold px-2 py-0.5 rounded-full ${
                      item.stock > 10 
                        ? 'text-emerald-800 bg-emerald-50' 
                        : 'text-amber-800 bg-amber-50'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${item.stock > 10 ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                      <span>{item.stock} in stock</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="inline-flex items-center gap-1 text-amber-600 font-bold">
                      <FaStar className="text-xs" />
                      <span>{item.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right pr-6">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 transition cursor-pointer"
                        title="Edit Product"
                      >
                        <FaEdit className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(item)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition cursor-pointer"
                        title="Delete Product"
                      >
                        <FaTrashAlt className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. CREATE PRODUCT MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <FaBoxes />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Add Catalog Item</h3>
                  <p className="text-xs text-slate-500">POST /api/v1/admin/products (with multi-image upload)</p>
                </div>
              </div>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    placeholder="e.g. Organic Kabuli Chana"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={createForm.brand}
                    onChange={(e) => setCreateForm({ ...createForm, brand: e.target.value })}
                    placeholder="GrainPulse Organic"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category *</label>
                  <select
                    value={createForm.categoryId}
                    onChange={(e) => setCreateForm({ ...createForm, categoryId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {backendCategories.map((c: any) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Pack Size (Weight) *</label>
                  <input
                    type="text"
                    required
                    value={createForm.weight}
                    onChange={(e) => setCreateForm({ ...createForm, weight: e.target.value })}
                    placeholder="1 Kg"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Specification Type *</label>
                  <input
                    type="text"
                    required
                    value={createForm.spec_type}
                    onChange={(e) => setCreateForm({ ...createForm, spec_type: e.target.value })}
                    placeholder="Agricultural Produce"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={createForm.sellingPrice}
                    onChange={(e) => setCreateForm({ ...createForm, sellingPrice: e.target.value })}
                    placeholder="180"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={createForm.mrp}
                    onChange={(e) => setCreateForm({ ...createForm, mrp: e.target.value })}
                    placeholder="220"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={createForm.stock}
                    onChange={(e) => setCreateForm({ ...createForm, stock: e.target.value })}
                    placeholder="50"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Product Description *</label>
                <textarea
                  rows={3}
                  required
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  placeholder="Detailed description of the harvest item (min 10 chars)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 outline-none focus:border-emerald-600 transition resize-none"
                />
              </div>

              {/* Multi-Image Upload */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Product Gallery Images (Up to 5 images)</label>
                <div 
                  onClick={() => createFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer transition bg-slate-50/50 flex flex-col items-center justify-center gap-2"
                >
                  <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <FaCloudUploadAlt className="text-lg" />
                  </div>
                  <span className="text-xs text-slate-600 font-semibold">Click to upload product photographs</span>
                  <span className="text-[10px] text-slate-400">Select multiple files (PNG, JPG, WEBP)</span>
                  <input
                    ref={createFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleCreateFiles}
                    className="hidden"
                  />
                </div>

                {createPreviews.length > 0 && (
                  <div className="grid grid-cols-5 gap-2 mt-3">
                    {createPreviews.map((src, i) => (
                      <div key={i} className="relative h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                        <span className="absolute top-1 left-1 bg-emerald-700 text-white text-[8px] px-1 rounded">#{i + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.isBestSeller}
                    onChange={(e) => setCreateForm({ ...createForm, isBestSeller: e.target.checked })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Mark as Best Seller</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.isFeatured}
                    onChange={(e) => setCreateForm({ ...createForm, isFeatured: e.target.checked })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Featured on Home Page</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createProductMutation.isPending}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  {createProductMutation.isPending ? 'Registering...' : 'Save Product Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT PRODUCT MODAL */}
      {editModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <FaEdit />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Update Product</h3>
                  <p className="text-xs text-slate-500">PUT /api/v1/admin/products/:id</p>
                </div>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={editForm.brand}
                    onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={editForm.categoryId}
                    onChange={(e) => setEditForm({ ...editForm, categoryId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition cursor-pointer"
                  >
                    <option value="">Keep current category</option>
                    {backendCategories.map((c: any) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Pack Size (Weight) *</label>
                  <input
                    type="text"
                    required
                    value={editForm.weight}
                    onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Specification Type *</label>
                  <input
                    type="text"
                    required
                    value={editForm.spec_type}
                    onChange={(e) => setEditForm({ ...editForm, spec_type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editForm.sellingPrice}
                    onChange={(e) => setEditForm({ ...editForm, sellingPrice: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editForm.mrp}
                    onChange={(e) => setEditForm({ ...editForm, mrp: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 outline-none focus:border-emerald-600 transition resize-none"
                />
              </div>

              {/* Existing Images Gallery */}
              {existingImages.length > 0 && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Current Active Images</label>
                  <div className="grid grid-cols-4 gap-2">
                    {existingImages.map((img, i) => (
                      <div key={i} className="relative h-20 rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                        <img src={img.url} alt="Product" className="w-full h-full object-cover" />
                        {img.public_id && (
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(img.public_id)}
                            className="absolute top-1 right-1 bg-red-600 text-white h-5 w-5 rounded-full flex items-center justify-center text-[10px] opacity-90 hover:opacity-100 transition cursor-pointer"
                            title="Remove Image"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Additional Images */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Upload Additional / New Images</label>
                <div 
                  onClick={() => editFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer transition bg-slate-50/50 flex flex-col items-center justify-center gap-2"
                >
                  <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <FaCloudUploadAlt className="text-base" />
                  </div>
                  <span className="text-xs text-slate-600 font-semibold">Click to select extra images</span>
                  <input
                    ref={editFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleEditFiles}
                    className="hidden"
                  />
                </div>

                {editPreviews.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {editPreviews.map((src, idx) => (
                      <div key={idx} className="relative h-20 rounded-xl overflow-hidden border border-emerald-300 bg-slate-100">
                        <img src={src} alt="New upload" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewEditFile(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white h-5 w-5 rounded-full flex items-center justify-center text-[10px] cursor-pointer"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.isBestSeller}
                    onChange={(e) => setEditForm({ ...editForm, isBestSeller: e.target.checked })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Best Seller</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.isFeatured}
                    onChange={(e) => setEditForm({ ...editForm, isFeatured: e.target.checked })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Featured Product</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProductMutation.isPending}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  {updateProductMutation.isPending ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. DELETE PRODUCT MODAL */}
      {deleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center">
            <div className="h-14 w-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto text-2xl">
              <FaExclamationTriangle />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Delete Product Entry?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-900">"{selectedProduct.name}"</strong>? This will remove the harvest listing from active catalog search and storefront display.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleteProductMutation.isPending}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                {deleteProductMutation.isPending ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
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

export default Products;
