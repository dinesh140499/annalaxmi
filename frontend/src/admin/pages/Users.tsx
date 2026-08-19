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
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { getRoleConfig } from '../../utils/rbac';

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

const Users = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const roleConfig = getRoleConfig(user?.role);
  const isSuperAdmin = user?.role === 'superadmin';
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'superadmin' | 'admin' | 'manager' | 'editor' | 'viewer'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

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

  // 4. Update Admin Status Mutation via PATCH /superadmin/update-status/:id
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      patch('default', `superadmin/update-status/${id}`, { isActive }),
    onMutate: ({ id }) => {
      setUpdatingStatusId(id);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin-admins'] });
      setAlertData({
        message: data?.message || 'Admin status updated successfully!',
        variant: 'success',
        show: true,
      });
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Failed to update admin status.',
        variant: 'error',
        show: true,
      });
    },
    onSettled: () => {
      setUpdatingStatusId(null);
    },
  });

  const handleToggleStatus = (userId: string, currentStatus: boolean | undefined) => {
    const nextStatus = currentStatus === false ? true : false;
    updateStatusMutation.mutate({ id: userId, isActive: nextStatus });
  };

  // 5. Delete Admin Mutation via DELETE /superadmin/delete-admin/:id
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
    const cleanPhone = formData.phoneNo.replace(/[^0-9]/g, '');
    createAdminMutation.mutate({
      ...formData,
      phoneNo: cleanPhone,
    });
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

  if (!roleConfig.canManageUsers) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4 font-sans">
        <div className="h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-2xl text-amber-600">
          <FaShieldAlt />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Restricted Authorization</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Staff & Role Management is reserved for SuperAdministrators and Platform Administrators. Your active role is <strong className="text-slate-900 uppercase">{roleConfig.label}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">

      {/* Header with Title and Create CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
            <FaShieldAlt className="text-amber-500" />
            <span>SuperAdmin Access Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrator & Staff Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage system roles, staff permissions, and provision new administrator accounts.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setModalOpen(true)}
            className="bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            <FaUserPlus />
            <span>Provision New Admin</span>
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Total Administrators</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{adminsList.length}</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl">
            <FaUserTie />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">SuperAdmins (Full Root)</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-700">{superAdminCount}</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl">
            <FaShieldAlt />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Standard Staff Admins</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">{adminCount}</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl">
            <FaCheckCircle />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
          {(['all', 'admin', 'manager', 'editor', 'viewer', 'superadmin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${roleFilter === r
                  ? 'bg-white text-emerald-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              {r === 'all' ? 'All Roles' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Administrator</th>
                <th className="py-3.5 px-4">Contact Coordinates</th>
                <th className="py-3.5 px-4">Assigned Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Registered</th>
                <th className="py-3.5 px-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((item) => {
                  const firstName = item.firstName || item.firstname || 'Admin';
                  const lastName = item.lastName || item.lastname || '';
                  const fullName = `${firstName} ${lastName}`.trim();
                  const isSuper = item.role === 'superadmin';

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/80 transition duration-150">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${isSuper
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}>
                            {firstName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block truncate">{fullName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {item._id.slice(-6)}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-700">
                            <FaEnvelope className="text-slate-400 text-[10px] shrink-0" />
                            <span className="truncate">{item.email || 'N/A'}</span>
                            {item.email && (
                              <button
                                onClick={() => handleCopy(item.email!, `email-${item._id}`)}
                                className="text-slate-400 hover:text-emerald-700 p-0.5 cursor-pointer"
                                title="Copy Email"
                              >
                                {copiedId === `email-${item._id}` ? <FaCheck className="text-emerald-700" /> : <FaCopy />}
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                            <FaPhoneAlt className="text-slate-400 text-[10px] shrink-0" />
                            <span>{item.phoneNo || 'N/A'}</span>
                          </div>
                        </div>
                      </td>

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
                                  ? 'bg-amber-50 text-amber-900 border-amber-300 cursor-not-allowed opacity-90'
                                  : item.role === 'admin'
                                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:border-emerald-400 focus:ring-1 focus:ring-emerald-500 cursor-pointer'
                                  : item.role === 'manager'
                                  ? 'bg-blue-50 text-blue-900 border-blue-300 hover:border-blue-400 focus:ring-1 focus:ring-blue-500 cursor-pointer'
                                  : item.role === 'editor'
                                  ? 'bg-purple-50 text-purple-900 border-purple-300 hover:border-purple-400 focus:ring-1 focus:ring-purple-500 cursor-pointer'
                                  : item.role === 'viewer'
                                  ? 'bg-slate-100 text-slate-800 border-slate-300 hover:border-slate-400 focus:ring-1 focus:ring-slate-500 cursor-pointer'
                                  : 'bg-rose-50 text-rose-800 border-rose-300 hover:border-rose-400 focus:ring-1 focus:ring-rose-500 cursor-pointer'
                              } ${updatingUserId === item._id ? 'opacity-50 cursor-wait' : ''}`}
                            >
                              {isSuper && <option value="superadmin">SuperAdmin</option>}
                              <option value="admin">Admin</option>
                              <option value="manager">Manager</option>
                              <option value="editor">Editor</option>
                              <option value="viewer">Viewer</option>
                              <option value="user">User (Revoke)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500">
                              {updatingUserId === item._id ? (
                                <FaSpinner className="animate-spin text-[10px] text-emerald-700" />
                              ) : (
                                <FaShieldAlt className="text-[9px]" />
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        {isSuper ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                            <span>Active (Protected)</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(item._id, item.isActive)}
                            disabled={updatingStatusId === item._id}
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border transition cursor-pointer active:scale-95 ${
                              item.isActive !== false
                                ? 'text-emerald-800 bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
                                : 'text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100 hover:border-rose-300'
                            } ${updatingStatusId === item._id ? 'opacity-60 cursor-wait' : ''}`}
                            title={item.isActive !== false ? 'Click to deactivate/suspend staff access' : 'Click to activate staff access'}
                          >
                            {updatingStatusId === item._id ? (
                              <FaSpinner className="animate-spin text-[10px]" />
                            ) : (
                              <span className={`h-1.5 w-1.5 rounded-full ${item.isActive !== false ? 'bg-emerald-600' : 'bg-rose-500'}`}></span>
                            )}
                            <span>{item.isActive !== false ? 'Active' : 'Suspended'}</span>
                          </button>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center text-slate-500 text-[11px] font-mono">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                      </td>

                      <td className="py-4 px-4 text-right pr-6">
                        {isSuperAdmin && !isSuper ? (
                          <button
                            onClick={() => handleDeleteAdmin(item._id, fullName)}
                            disabled={deleteAdminMutation.isPending}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Administrator"
                          >
                            <FaTrashAlt className="text-xs" />
                          </button>
                        ) : isSuper ? (
                          <span className="text-[10px] text-amber-700/60 font-semibold italic">Protected</span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold">Active</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <FaUserPlus />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Provision Administrator</h3>
                  <p className="text-xs text-slate-500">Create new credentials via backend SuperAdmin API</p>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ramesh"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Patel"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="staff@grainpulse.demo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Mobile Phone (with code) *</label>
                  <input
                    type="text"
                    required
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Administrative Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition cursor-pointer"
                  >
                    <option value="admin">Admin (Catalog & Operations)</option>
                    <option value="manager">Manager (Management & Operations)</option>
                    <option value="editor">Editor (Content & Catalog)</option>
                    <option value="viewer">Viewer (Read-Only Access)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Initial Password *</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Min 6 characters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createAdminMutation.isPending}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  {createAdminMutation.isPending ? 'Provisioning...' : 'Confirm & Create Account'}
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

export default Users;
