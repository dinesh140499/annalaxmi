import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/authSlice';
import type { RootState } from '../../store/store';
import { 
  FaShieldAlt, 
  FaLeaf, 
  FaLock, 
  FaPhoneAlt, 
  FaEnvelope,
  FaArrowRight, 
  FaKey,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import Alert from '../../components/common/Alert';
import { post } from '../../baseUrl';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // Auto-redirect if admin is already authenticated
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'superadmin')) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setAlertData({
        message: authMethod === 'email' ? 'Please enter your registered email address.' : 'Please enter your registered phone number.',
        variant: 'error',
        show: true,
      });
      return;
    }

    if (!password) {
      setAlertData({
        message: 'Please enter your password.',
        variant: 'error',
        show: true,
      });
      return;
    }

    setLoading(true);

    const isEmail = identifier.includes('@') || authMethod === 'email';
    const cleanPhone = !isEmail ? identifier.replace(/[^0-9]/g, '') : undefined;
    const cleanEmail = isEmail ? identifier.trim().toLowerCase() : undefined;

    const payload: { email?: string; phoneNo?: string; password: string } = {
      password,
    };

    if (cleanEmail) {
      payload.email = cleanEmail;
    } else if (cleanPhone) {
      payload.phoneNo = cleanPhone;
    }

    try {
      // Send authentication to backend (supports both email and phoneNo)
      const response = await post('default', 'auth/login-with-password', payload);

      if (response && response.user) {
        if (response.token) {
          try {
            localStorage.setItem('token', response.token);
          } catch (e) {
            console.error('Error saving token to localStorage:', e);
          }
        }
        dispatch(setUser(response.user));
        setAlertData({
          message: response.message || `Welcome! Authenticated as ${response.user.role?.toUpperCase() || 'ADMIN'}.`,
          variant: 'success',
          show: true,
        });

        setTimeout(() => {
          if (response.user.role === 'admin' || response.user.role === 'superadmin') {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate('/account/dashboard', { replace: true });
          }
        }, 400);
      } else {
        throw new Error('Invalid response from authentication server');
      }
    } catch (err: any) {
      console.error('Admin login error:', err);
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

        {/* Auth Method Toggle Tabs (Email vs Phone) */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('email');
              setIdentifier('');
            }}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              authMethod === 'email'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FaEnvelope className="text-xs text-emerald-700" />
            <span>Email Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod('phone');
              setIdentifier('');
            }}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              authMethod === 'phone'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FaPhoneAlt className="text-xs text-emerald-700" />
            <span>Phone Number</span>
          </button>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleAdminSubmit} className="space-y-4">
          
          {/* Email or Phone Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              {authMethod === 'email' ? 'Registered Administrator Email' : 'Registered Mobile Number'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                {authMethod === 'email' ? <FaEnvelope /> : <FaPhoneAlt />}
              </div>
              <input
                type={authMethod === 'email' ? 'email' : 'tel'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={authMethod === 'email' ? 'e.g. admin@mail.com' : 'e.g. 919876543210'}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
                required
              />
            </div>
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FaLock />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your administrative password"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition duration-200 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span>Verifying Administrative Session...</span>
            ) : (
              <>
                <FaKey className="text-amber-300" />
                <span>Sign In to Admin Gateway</span>
                <FaArrowRight className="text-xs ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Back to Customer Storefront */}
        <div className="pt-2 text-center border-t border-slate-100">
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-900 transition font-medium"
          >
            &larr; Return to Customer Storefront
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
