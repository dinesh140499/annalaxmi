import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post } from '../../baseUrl';
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
  FaUserTie 
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
  role: 'superadmin' | 'admin' | 'user';
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: string;
  lastLogin?: string;
  createdBy?: any;
}

const Users = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'superadmin' | 'admin'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    role: 'admin' as 'admin' | 'superadmin',
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

        <button
          onClick={() => setModalOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <FaUserPlus />
          <span>Provision New Admin</span>
        </button>
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
          {(['all', 'superadmin', 'admin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${
                roleFilter === r
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
                <th className="py-3.5 px-4 text-right pr-6">Registered</th>
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
                          <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSuper 
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
                        <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md ${
                          isSuper
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          <FaShieldAlt className="text-[9px]" />
                          <span>{item.role}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                          <span>Active Access</span>
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right pr-6 text-slate-500 text-[11px] font-mono">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400">
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
                    <option value="superadmin">SuperAdmin (Full Root Control)</option>
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
