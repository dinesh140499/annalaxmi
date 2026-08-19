import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, patch, del } from '../../baseUrl';
import { 
  FaUserPlus, 
  FaShieldAlt, 
  FaSearch, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaCheckCircle, 
  FaTimes, 
  FaCopy, 
  FaCheck, 
  FaUserTie,
  FaSpinner,
  FaTrashAlt
} from 'react-icons/fa';
import Alert from '../../components/common/Alert';

interface AdminUser {
  _id: string;
  firstName?: string;
  firstname?: string;
  lastName?: string;
  lastname?: string;
  email?: string;
  phoneNo?: string;
  role: 'superadmin' | 'admin' | 'manager' | 'editor' | 'viewer' | 'user';
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: string;
  lastLogin?: string;
  createdBy?: any;
}

const AdminManagement = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'superadmin' | 'admin' | 'manager' | 'editor' | 'viewer'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const [alertData, setAlertData] = useState<{
    message: string;
    variant: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    variant: 'success',
    show: false,
  });

  // Create Admin Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    role: 'admin',
    password: '',
  });

  // 1. Fetch All Admins via GET /superadmin
  const { data: apiData } = useQuery({
    queryKey: ['superadmin-admins'],
    queryFn: () => get('default', 'superadmin'),
    retry: 1,
  });

  const adminsList: AdminUser[] = apiData?.admins || [];

  // 2. Create Admin Mutation via POST /superadmin/create-admin
  const createAdminMutation = useMutation({
    mutationFn: (payload: typeof formData) => post('default', 'superadmin/create-admin', payload),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin-admins'] });
      setAlertData({
        message: data?.message || 'New Administrator created successfully!',
        variant: 'success',
        show: true,
      });
      setModalOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        role: 'admin',
        password: '',
      });
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to create administrator.',
        variant: 'error',
        show: true,
      });
    },
  });

  // 3. Update Role Mutation via PATCH /superadmin/update-role/:id
  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: 'admin' | 'manager' | 'editor' | 'viewer' | 'user' }) =>
      patch('default', `superadmin/update-role/${id}`, { role }),
    onMutate: ({ id }) => {
      setUpdatingUserId(id);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin-admins'] });
      setAlertData({
        message: data?.message || 'User role updated successfully!',
        variant: 'success',
        show: true,
      });
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to update role.',
        variant: 'error',
        show: true,
      });
    },
    onSettled: () => {
      setUpdatingUserId(null);
    },
  });

  const handleRoleChange = (userId: string, newRole: 'admin' | 'manager' | 'editor' | 'viewer' | 'user') => {
    updateRoleMutation.mutate({ id: userId, role: newRole });
  };

  // 4. Delete Admin Mutation via DELETE /superadmin/delete-admin/:id
  const deleteAdminMutation = useMutation({
    mutationFn: (id: string) => del('default', `superadmin/delete-admin/${id}`),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin-admins'] });
      setAlertData({
        message: data?.message || 'Admin deleted successfully!',
        variant: 'success',
        show: true,
      });
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to delete admin.',
        variant: 'error',
        show: true,
      });
    },
  });

  const handleDeleteAdmin = (userId: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      deleteAdminMutation.mutate(userId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phoneNo || !formData.password) {
      setAlertData({
        message: 'Please complete all required fields.',
        variant: 'error',
        show: true,
      });
      return;
    }
    createAdminMutation.mutate(formData);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered List
  const filteredAdmins = adminsList.filter((item) => {
    const name = `${item.firstName || item.firstname || ''} ${item.lastName || item.lastname || ''}`.toLowerCase();
    const email = (item.email || '').toLowerCase();
    const phone = (item.phoneNo || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = name.includes(q) || email.includes(q) || phone.includes(q);
    const matchesRole = roleFilter === 'all' || item.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const superAdminCount = adminsList.filter((a) => a.role === 'superadmin').length;
  const adminCount = adminsList.filter((a) => a.role === 'admin').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header with Title and Create CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FaShieldAlt />
            <span>SuperAdmin Access Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Administrator & Staff Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage system roles, staff permissions, and provision new administrator accounts.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition cursor-pointer self-start sm:self-auto"
        >
          <FaUserPlus />
          <span>Provision New Admin</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Total Administrators</span>
            <span className="text-2xl sm:text-3xl font-black text-white">{adminsList.length}</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400 text-xl">
            <FaUserTie />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">SuperAdmins (Full Root)</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{superAdminCount}</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
            <FaShieldAlt />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Standard Staff Admins</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">{adminCount}</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">
            <FaCheckCircle />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Role Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          {(['all', 'admin', 'manager', 'editor', 'viewer', 'superadmin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${
                roleFilter === r
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r === 'all' ? 'All Roles' : r}
            </button>
          ))}
        </div>

      </div>

      {/* Admins Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Administrator</th>
                <th className="py-3.5 px-4">Contact Coordinates</th>
                <th className="py-3.5 px-4">Assigned Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Registered</th>
                <th className="py-3.5 px-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((item) => {
                  const firstName = item.firstName || item.firstname || 'Admin';
                  const lastName = item.lastName || item.lastname || '';
                  const fullName = `${firstName} ${lastName}`.trim();
                  const isSuper = item.role === 'superadmin';

                  return (
                    <tr key={item._id} className="hover:bg-slate-850/60 transition duration-150">
                      
                      {/* Name & Avatar */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSuper 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                              : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {firstName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-white block truncate">{fullName}</span>
                            <span className="text-[10px] text-slate-500 font-mono">ID: {item._id.slice(-6)}</span>
                          </div>
                        </div>
                      </td>

                      {/* Email & Phone */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-300">
                            <FaEnvelope className="text-slate-500 text-[10px] shrink-0" />
                            <span className="truncate">{item.email || 'N/A'}</span>
                            {item.email && (
                              <button
                                onClick={() => handleCopy(item.email!, `email-${item._id}`)}
                                className="text-slate-500 hover:text-emerald-400 p-0.5"
                                title="Copy Email"
                              >
                                {copiedId === `email-${item._id}` ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                            <FaPhoneAlt className="text-slate-500 text-[10px] shrink-0" />
                            <span>{item.phoneNo || 'N/A'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge / Interactive Dropdown */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="relative inline-block">
                            <select
                              value={item.role}
                              disabled={updatingUserId === item._id || isSuper}
                              onChange={(e) =>
                                handleRoleChange(
                                  item._id,
                                  e.target.value as 'admin' | 'manager' | 'editor' | 'viewer' | 'user'
                                )
                              }
                              className={`text-[10px] font-extrabold uppercase pl-2.5 pr-6 py-1 rounded-lg border appearance-none outline-none transition ${
                                isSuper
                                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 cursor-not-allowed opacity-90'
                                  : item.role === 'admin'
                                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40 hover:border-emerald-400 focus:ring-1 focus:ring-emerald-500 cursor-pointer'
                                  : item.role === 'manager'
                                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/40 hover:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer'
                                  : item.role === 'editor'
                                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/40 hover:border-purple-400 focus:ring-1 focus:ring-purple-500 cursor-pointer'
                                  : item.role === 'viewer'
                                  ? 'bg-slate-700/40 text-slate-300 border-slate-600 hover:border-slate-500 focus:ring-1 focus:ring-slate-400 cursor-pointer'
                                  : 'bg-rose-500/10 text-rose-300 border-rose-500/40 hover:border-rose-400 focus:ring-1 focus:ring-rose-500 cursor-pointer'
                              } ${updatingUserId === item._id ? 'opacity-50 cursor-wait' : ''}`}
                            >
                              {isSuper && <option value="superadmin" className="bg-slate-900 text-white">SuperAdmin</option>}
                              <option value="admin" className="bg-slate-900 text-white">Admin</option>
                              <option value="manager" className="bg-slate-900 text-white">Manager</option>
                              <option value="editor" className="bg-slate-900 text-white">Editor</option>
                              <option value="viewer" className="bg-slate-900 text-white">Viewer</option>
                              <option value="user" className="bg-slate-900 text-white">User (Revoke)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                              {updatingUserId === item._id ? (
                                <FaSpinner className="animate-spin text-[10px] text-emerald-400" />
                              ) : (
                                <FaShieldAlt className="text-[9px]" />
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                          <span>Active Access</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-center text-slate-400 text-[11px] font-mono">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right pr-6">
                        {!isSuper ? (
                          <button
                            onClick={() => handleDeleteAdmin(item._id, fullName)}
                            disabled={deleteAdminMutation.isPending}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
                            title="Delete Administrator"
                          >
                            <FaTrashAlt className="text-xs" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-amber-400/60 font-semibold italic">Protected</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    No administrators match the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision New Admin Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-scale-in">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FaUserPlus />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Provision Administrator</h3>
                  <p className="text-xs text-slate-400">Create new credentials via backend SuperAdmin API</p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ramesh"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Patel"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="staff@grainpulse.demo"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mobile Phone (with code) *</label>
                  <input
                    type="text"
                    required
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Administrative Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition cursor-pointer"
                  >
                    <option value="admin">Admin (Catalog & Operations)</option>
                    <option value="manager">Manager (Management & Operations)</option>
                    <option value="editor">Editor (Content & Catalog)</option>
                    <option value="viewer">Viewer (Read-Only Access)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Initial Password *</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Min 6 characters"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Action Buttons */}
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
                  disabled={createAdminMutation.isPending}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  {createAdminMutation.isPending ? 'Provisioning...' : 'Confirm & Create Account'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Notification Alert */}
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

export default AdminManagement;
