import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/reusable/Breadcrumps";
import { FaLeaf, FaShieldAlt, FaLock, FaEnvelope, FaUser, FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "../../components/common/Alert";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../baseUrl";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "" as "success" | "error",
    show: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const registerMutation = useMutation({
    mutationFn: (payload: { phoneNo: string; dialCode: string; country: string }) =>
      post("default", "auth/send-otp", payload),
    onSuccess: (data: any) => {
      setAlertData({
        message: data?.message || "Verification code dispatched! Redirecting to login to complete verification...",
        variant: "success",
        show: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    },
    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || "Registration failed. Please verify your mobile number.",
        variant: "error",
        show: true,
      });
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setAlertData({
        message: "Please agree to the Terms and Conditions to continue.",
        variant: "error",
        show: true,
      });
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    registerMutation.mutate({
      phoneNo: cleanPhone.startsWith("91") ? cleanPhone.slice(2) : cleanPhone,
      dialCode: "91",
      country: "in",
    });
  };

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />

      {alertData.show && (
        <Alert
          message={alertData.message}
          variant={alertData.variant}
          onDismiss={() => setAlertData(prev => ({ ...prev, show: false }))}
        />
      )}

      <div className="max-w-[95%] lg:max-w-4xl mx-auto py-10 sm:py-16">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left: Brand Welcome Banner (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-8 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="h-10 w-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-400 shadow-md">
                  <FaLeaf className="text-xl transform -rotate-12" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Grain<span className="text-amber-400">Pulse</span>
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight">
                Join the Pure Organic Movement
              </h2>
              <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
                Create an account to track express harvests, unlock subscriber discounts, and manage delivery addresses.
              </p>
            </div>

            <div className="space-y-3 pt-8 border-t border-emerald-800/60 text-xs text-emerald-200">
              <div className="flex items-center gap-2.5">
                <FaShieldAlt className="text-amber-400 shrink-0" />
                <span>100% Certified Chemical-Free Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaLock className="text-amber-400 shrink-0" />
                <span>Encrypted 256-bit Secure Authentication</span>
              </div>
            </div>
          </div>

          {/* Right: Registration Form (7 cols) */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                New Customer
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
                Create Your Account
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details below to begin farm-direct deliveries.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Legal Name *</label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ananya Roy"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ananya@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Mobile Phone Number (10 Digits) *</label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Account Password *</label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    name="password"
                    minLength={6}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-10 py-2.5 text-slate-900 outline-none focus:border-emerald-600 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="text-[11px] text-slate-600 cursor-pointer">
                  I agree to the{" "}
                  <Link to="/terms" className="text-emerald-700 font-semibold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-emerald-800 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-950/10 transition cursor-pointer"
              >
                {registerMutation.isPending ? "Connecting to backend..." : "Create Account & Send Verification"}
              </button>
            </form>

            <div className="pt-6 mt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-700 font-bold hover:underline">
                  Sign in here &rarr;
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
