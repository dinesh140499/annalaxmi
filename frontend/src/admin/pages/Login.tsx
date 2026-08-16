import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice';
import { 
  FaShieldAlt, 
  FaLeaf, 
  FaLock, 
  FaPhoneAlt, 
  FaArrowRight, 
  FaUserShield, 
  FaKey,
  FaCheckCircle
} from 'react-icons/fa';
import Alert from '../../components/common/Alert';
import { post } from '../../baseUrl';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [phoneNo, setPhoneNo] = useState('919876543210');
  const [password, setPassword] = useState('SuperAdmin@123');
  const [selectedRole, setSelectedRole] = useState<'superadmin' | 'admin'>('superadmin');
  const [loading, setLoading] = useState(false);

  const [alertData, setAlertData] = useState<{
    message: string;
    variant: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    variant: 'success',
    show: false,
  });

  const handleQuickDemo = (role: 'superadmin' | 'admin') => {
    setSelectedRole(role);
    if (role === 'superadmin') {
      setPhoneNo('919876543210');
      setPassword('SuperAdmin@123');
    } else {
      setPhoneNo('919811223344');
      setPassword('AdminStaff@123');
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Strip any non-digit characters (including '+', spaces, dashes)
    const cleanPhone = phoneNo.replace(/[^0-9]/g, '');

    try {
      // 1. Send direct authentication to backend
      const response = await post('default', 'auth/login-with-password', {
        phoneNo: cleanPhone,
        password,
      });

      if (response && response.user) {
        dispatch(setUser(response.user));
        setAlertData({
          message: response.message || `Welcome! Authenticated as ${response.user.role?.toUpperCase() || 'ADMIN'}.`,
          variant: 'success',
          show: true,
        });

        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 800);
      } else {
        throw new Error('Invalid response from authentication server');
      }
    } catch (err: any) {
      setAlertData({
        message: err?.response?.data?.message || err?.message || 'Authentication failed. Please verify credentials.',
        variant: 'error',
        show: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-200 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl relative z-10 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-2xl bg-emerald-800 flex items-center justify-center text-amber-300 shadow-lg shadow-emerald-950/10 mx-auto">
            <FaLeaf className="text-2xl transform -rotate-12" />
          </div>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <FaShieldAlt className="text-[9px]" />
              <span>Enterprise Admin Gateway</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              GrainPulse Central
            </h1>
            <p className="text-xs text-slate-500">
              Authorized administrative sign-in for SuperAdmin and Staff.
            </p>
          </div>
        </div>

        {/* Quick Demo Fillers */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block text-center">
            Quick 1-Click Environment Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('superadmin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'superadmin'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FaUserShield className="text-xs text-amber-600" />
              <span>SuperAdmin</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FaCheckCircle className="text-xs text-emerald-600" />
              <span>Staff Admin</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Mobile Phone (Digits Only, without +)
            </label>
            <div className="relative">
              <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="919876543210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Administrative Password
            </label>
            <div className="relative">
              <FaKey className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 transition cursor-pointer"
          >
            <FaLock className="text-xs" />
            <span>{loading ? 'Authenticating Credentials...' : `Enter ${selectedRole === 'superadmin' ? 'SuperAdmin' : 'Admin'} Command Center`}</span>
            <FaArrowRight className="text-xs" />
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 text-center border-t border-slate-100">
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-800 transition flex items-center justify-center gap-1.5"
          >
            <span>&larr; Return to Customer Storefront</span>
          </Link>
        </div>

      </div>

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

export default Login;
