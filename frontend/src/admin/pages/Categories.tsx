import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put, del } from '../../baseUrl';
import { 
  FaTags, 
  FaPlus, 
  FaSearch, 
  FaTimes, 
  FaSeedling, 
  FaEdit, 
  FaTrashAlt, 
  FaExclamationTriangle,
  FaCloudUploadAlt,
  FaImage
} from 'react-icons/fa';
import Alert from '../../components/common/Alert';
import pulse from '../../assets/images/products/pulse.png';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { getRoleConfig } from '../../utils/rbac';

interface CategoryItem {
  id: string;
  _id?: string;
  name: string;
  slug?: string;
  count?: number | string;
  status: 'Active' | 'Inactive';
  description?: string;
  image?: { url: string; public_id?: string } | string;
  createdAt?: string;
}

const Categories = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const roleConfig = getRoleConfig(user?.role);

  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  // Active selection
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  // Forms
  const [createForm, setCreateForm] = useState({ name: '', description: '' });
  const [createImageFile, setCreateImageFile] = useState<File | null>(null);
  const [createImagePreview, setCreateImagePreview] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({ name: '', description: '', status: 'Active' as 'Active' | 'Inactive' });
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  const createFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [alertData, setAlertData] = useState<{
    message: string;
    variant: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    variant: 'success',
    show: false,
  });

  // 1. READ: Fetch Categories via GET /categories
  const { data: apiData } = useQuery({
    queryKey: ['admin-categories-list'],
    queryFn: () => get('default', 'categories'),
    retry: 1,
  });

  const backendCategories = apiData?.categories || [];
  const categoryList: CategoryItem[] = backendCategories.map((c: any) => ({
    id: c._id,
    _id: c._id,
    name: c.name,
    slug: c.slug,
    count: c.productCount || 'Active',
    status: c.isActive !== false ? 'Active' : 'Inactive',
    description: c.description || 'Certified organic cluster crop',
    image: c.image?.url || c.image || pulse,
  }));

  const filtered = categoryList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Image Selection for Create
  const handleCreateImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCreateImageFile(file);
      setCreateImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle Image Selection for Edit
  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  // 2. CREATE: POST /admin/categories
  const createCategoryMutation = useMutation({
    mutationFn: (payload: { name: string; description?: string; file: File | null }) => {
      const fd = new FormData();
      fd.append('name', payload.name);
      if (payload.description) {
        fd.append('description', payload.description);
      }
      fd.append('isActive', 'true');
      if (payload.file) {
        fd.append('image', payload.file);
      }
      return post('default', 'admin/categories', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories-list'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setAlertData({
        message: data?.message || `Category "${createForm.name}" created successfully!`,
        variant: 'success',
        show: true,
      });
      setCreateModalOpen(false);
      setCreateForm({ name: '', description: '' });
      setCreateImageFile(null);
      setCreateImagePreview(null);
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to create category on backend.',
        variant: 'error',
        show: true,
      });
    },
  });

  // 3. UPDATE: PUT /admin/categories/:id
  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name: string; description?: string; isActive: boolean; file: File | null } }) => {
      const fd = new FormData();
      fd.append('name', payload.name);
      if (payload.description !== undefined) {
        fd.append('description', payload.description);
      }
      fd.append('isActive', String(payload.isActive));
      if (payload.file) {
        fd.append('image', payload.file);
      }
      return put('default', `admin/categories/${id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories-list'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setAlertData({
        message: data?.message || 'Category updated successfully!',
        variant: 'success',
        show: true,
      });
      setEditModalOpen(false);
      setSelectedCategory(null);
      setEditImageFile(null);
      setEditImagePreview(null);
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to update category.',
        variant: 'error',
        show: true,
      });
    },
  });

  // 4. DELETE: DELETE /admin/categories/:id
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => del('default', `admin/categories/${id}`),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories-list'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setAlertData({
        message: data?.message || 'Category deleted successfully!',
        variant: 'success',
        show: true,
      });
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to delete category.',
        variant: 'error',
        show: true,
      });
    },
  });

  const handleOpenEdit = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setEditForm({
      name: cat.name,
      description: cat.description || '',
      status: cat.status,
    });
    setEditImagePreview(typeof cat.image === 'string' ? cat.image : cat.image?.url || null);
    setEditImageFile(null);
    setEditModalOpen(true);
  };

  const handleOpenDelete = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setDeleteModalOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name.trim()) return;
    createCategoryMutation.mutate({
      name: createForm.name.trim(),
      description: createForm.description.trim(),
      file: createImageFile,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !editForm.name.trim()) return;
    updateCategoryMutation.mutate({
      id: selectedCategory._id || selectedCategory.id,
      payload: {
        name: editForm.name.trim(),
        description: editForm.description.trim(),
        isActive: editForm.status === 'Active',
        file: editImageFile,
      },
    });
  };

  const handleDeleteConfirm = () => {
    if (!selectedCategory) return;
    deleteCategoryMutation.mutate(selectedCategory._id || selectedCategory.id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <FaSeedling className="text-amber-500" />
            <span>Taxonomy Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Organic Category Taxonomy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete CRUD: Create, View, Update, and Delete organic crop categories with image upload.
          </p>
        </div>

        {roleConfig.canCreateProduct && (
          <button
            onClick={() => {
              setCreateImageFile(null);
              setCreateImagePreview(null);
              setCreateModalOpen(true);
            }}
            className="bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            <FaPlus />
            <span>Add New Category</span>
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 transition"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filtered.map((item) => {
          const imgUrl = typeof item.image === 'string' ? item.image : item.image?.url || pulse;
          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 overflow-hidden flex items-center justify-center shrink-0">
                    <img src={imgUrl} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    item.status === 'Active'
                      ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                      : 'text-slate-600 bg-slate-100 border border-slate-200'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Coverage: <strong className="text-slate-800">{item.count} items</strong>
                </span>

                {/* Action Buttons: Edit & Delete */}
                {roleConfig.isReadOnly ? (
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    Read-Only
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5">
                    {roleConfig.canEditProduct && (
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 transition cursor-pointer"
                        title="Edit Category"
                      >
                        <FaEdit className="text-xs" />
                      </button>
                    )}
                    {roleConfig.canDeleteProduct && (
                      <button
                        onClick={() => handleOpenDelete(item)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition cursor-pointer"
                        title="Delete Category"
                      >
                        <FaTrashAlt className="text-xs" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 1. CREATE CATEGORY MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <FaTags />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Create Category</h3>
                  <p className="text-xs text-slate-500">POST /api/v1/admin/categories (with image upload)</p>
                </div>
              </div>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category Title *</label>
                <input
                  type="text"
                  required
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="e.g. Organic Cold-Pressed Oils"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category Description</label>
                <textarea
                  rows={2}
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  placeholder="Brief description of this organic product category..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 outline-none focus:border-emerald-600 transition resize-none"
                />
              </div>

              {/* Category Image Upload */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category Banner Image *</label>
                <div 
                  onClick={() => createFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer transition bg-slate-50/50 flex flex-col items-center justify-center gap-2"
                >
                  {createImagePreview ? (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100">
                      <img src={createImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-md">
                        Change Image
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <FaCloudUploadAlt className="text-lg" />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold">Click to upload category picture</span>
                      <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</span>
                    </>
                  )}
                  <input
                    ref={createFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCreateImageChange}
                    className="hidden"
                  />
                </div>
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
                  disabled={createCategoryMutation.isPending}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  {createCategoryMutation.isPending ? 'Creating Category...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT CATEGORY MODAL */}
      {editModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <FaEdit />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Update Category</h3>
                  <p className="text-xs text-slate-500">PUT /api/v1/admin/categories/:id</p>
                </div>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category Title *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category Description</label>
                <textarea
                  rows={2}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 outline-none focus:border-emerald-600 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Edit Category Image */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Update Image (Optional)</label>
                <div 
                  onClick={() => editFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer transition bg-slate-50/50 flex flex-col items-center justify-center gap-2"
                >
                  {editImagePreview ? (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100">
                      <img src={editImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-md">
                        Replace Picture
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <FaImage className="text-lg" />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold">Click to upload new category image</span>
                    </>
                  )}
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="hidden"
                  />
                </div>
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
                  disabled={updateCategoryMutation.isPending}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  {updateCategoryMutation.isPending ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center">
            <div className="h-14 w-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto text-2xl">
              <FaExclamationTriangle />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Delete Category?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-900">"{selectedCategory.name}"</strong>? This will remove the taxonomy categorization from the storefront.
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
                disabled={deleteCategoryMutation.isPending}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                {deleteCategoryMutation.isPending ? 'Deleting...' : 'Confirm Delete'}
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

export default Categories;
