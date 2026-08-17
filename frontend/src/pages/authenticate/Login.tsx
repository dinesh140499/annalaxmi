import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/reusable/Breadcrumps";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Otp from "./Otp";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../baseUrl";
import Alert from "../../components/common/Alert";
import { FaLeaf, FaShieldAlt, FaTruck, FaLock, FaEnvelope, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";

export type PhoneInputState = {
  phone: string;
  country: string;
  dialCode: string;
};

type PhoneData = {
  dialCode: string;
  countryCode: string;
};

type AuthMode = "otp" | "password" | "forgot";

const Login = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("otp");
  const [isOtpStep, setIsOtpStep] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // Auto-redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      if (user.role === "admin" || user.role === "superadmin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/account/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  // Alert Notification State
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "" as "success" | "error",
    show: false,
  });

  // Phone OTP Input State (aligned with Bruno: auth/login)
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>({
    phone: "",
    country: "in",
    dialCode: "91",
  });

  // Password Login State (aligned with Bruno: auth/login-with-password)
  const [passwordForm, setPasswordForm] = useState({
    emailOrPhone: "",
    password: "",
  });

  // Forgot Password State (aligned with Bruno: auth/forgot-password)
  const [forgotEmail, setForgotEmail] = useState("");

  /* =========================================================
     1. OTP SEND MUTATION (Bruno: POST /auth/login)
     Payload: { phoneNo: "9990645231", dialCode: "91", country: "in" }
  ========================================================= */
  const sendOtpMutation = useMutation({
    mutationFn: (payload: { phoneNo: string; dialCode: string; country: string }) =>
      post("default", "auth/send-otp", payload),

    onSuccess: (data) => {
      setAlertData({
        message: data?.message || "OTP Code sent successfully!",
        variant: "success",
        show: true,
      });
      setIsOtpStep(true);
    },

    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || "Unable to send OTP. Please check mobile number.",
        variant: "error",
        show: true,
      });
    },
  });

  /* =========================================================
     2. PASSWORD LOGIN MUTATION (Bruno: POST /auth/login-with-password)
     Payload: { email: "...", password: "..." } or { phoneNo: "...", password: "..." }
  ========================================================= */
  const passwordLoginMutation = useMutation({
    mutationFn: (payload: { email?: string; phoneNo?: string; password: string }) =>
      post("default", "auth/login-with-password", payload),

    onSuccess: (data) => {
      if (data?.token) {
        try {
          localStorage.setItem("token", data.token);
        } catch (e) {
          console.error("Error storing token:", e);
        }
      }
      if (data?.user) {
        dispatch(setUser(data.user));
      }
      setAlertData({
        message: data?.message || "Signed in successfully! Welcome back.",
        variant: "success",
        show: true,
      });
      setTimeout(() => {
        navigate("/account/dashboard");
      }, 700);
    },

    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || "Invalid credentials. Please verify and try again.",
        variant: "error",
        show: true,
      });
    },
  });

  /* =========================================================
     3. FORGOT PASSWORD MUTATION (Bruno: POST /auth/forgot-password)
     Payload: { email: "..." }
  ========================================================= */
  const forgotPasswordMutation = useMutation({
    mutationFn: (payload: { email: string }) =>
      post("default", "auth/forgot-password", payload),

    onSuccess: (data) => {
      setAlertData({
        message: data?.message || "Password reset instructions sent to your email!",
        variant: "success",
        show: true,
      });
      setAuthMode("password");
    },

    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || "Failed to request password reset.",
        variant: "error",
        show: true,
      });
    },
  });

  // Handle OTP Send
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const rawNumber = phoneInput.phone.startsWith(phoneInput.dialCode)
      ? phoneInput.phone.slice(phoneInput.dialCode.length)
      : phoneInput.phone;

    if (!rawNumber || rawNumber.length < 10) {
      setAlertData({
        message: "Please enter a valid 10-digit mobile number.",
        variant: "error",
        show: true,
      });
      return;
    }

    sendOtpMutation.mutate({
      phoneNo: rawNumber.replace(/[^0-9]/g, ''),
      dialCode: (phoneInput.dialCode || '91').replace(/[^0-9]/g, ''),
      country: phoneInput.country || 'in',
    });
  };

  // Handle Password Login Submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.emailOrPhone.trim()) {
      setAlertData({
        message: "Please enter your email or registered phone number.",
        variant: "error",
        show: true,
      });
      return;
    }
    if (!passwordForm.password) {
      setAlertData({
        message: "Please enter your password.",
        variant: "error",
        show: true,
      });
      return;
    }

    const isEmail = passwordForm.emailOrPhone.includes("@");
    const sanitizedPhone = !isEmail ? passwordForm.emailOrPhone.replace(/[^0-9]/g, '') : undefined;

    passwordLoginMutation.mutate({
      email: isEmail ? passwordForm.emailOrPhone.trim() : undefined,
      phoneNo: sanitizedPhone,
      password: passwordForm.password,
    });
  };

  // Handle Forgot Password Submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !forgotEmail.includes("@")) {
      setAlertData({
        message: "Please provide a valid email address.",
        variant: "error",
        show: true,
      });
      return;
    }

    forgotPasswordMutation.mutate({
      email: forgotEmail.trim(),
    });
  };

  const rawPhone = phoneInput.phone.startsWith(phoneInput.dialCode)
    ? phoneInput.phone.slice(phoneInput.dialCode.length)
    : phoneInput.phone;

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />

      <div className="max-w-[95%] mx-auto py-10 sm:py-16 flex justify-center items-center">
        {isOtpStep ? (
          <Otp 
            phone={rawPhone} 
            dialCode={phoneInput.dialCode} 
            onBack={() => setIsOtpStep(false)} 
          />
        ) : (
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl text-slate-800">
            
            {/* Brand Header */}
            <div className="text-center mb-6">
              <div className="h-12 w-12 rounded-2xl bg-emerald-800 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-900/20">
                <FaLeaf className="text-xl" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
                Welcome to Grain<span className="text-amber-500">Pulse</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Access pure, farm-fresh harvest essentials & manage your orders.
              </p>
            </div>

            {/* Auth Mode Toggle Tabs (OTP vs Password) */}
            {authMode !== "forgot" && (
              <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAuthMode("otp")}
                  className={`flex-1 py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === "otp"
                      ? "bg-white text-emerald-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FaLock className="text-xs text-amber-500" />
                  <span>Instant OTP Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("password")}
                  className={`flex-1 py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === "password"
                      ? "bg-white text-emerald-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FaKey className="text-xs text-emerald-600" />
                  <span>Password Login</span>
                </button>
              </div>
            )}

            {/* -------------------------------------------------------------
               MODE 1: OTP LOGIN (Bruno: POST /auth/login)
            -------------------------------------------------------------- */}
            {authMode === "otp" && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Mobile Number
                  </label>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition">
                    <PhoneInput
                      country={phoneInput.country}
                      enableSearch
                      value={phoneInput.phone}
                      placeholder="Enter 10-digit mobile number"
                      onChange={(value: string, data: PhoneData) => {
                        setPhoneInput({
                          phone: value,
                          country: data.countryCode || "in",
                          dialCode: data.dialCode || "91",
                        });
                      }}
                      inputStyle={{
                        width: "100%",
                        padding: "12px 14px 12px 52px",
                        fontSize: "14px",
                        border: "none",
                        outline: "none",
                        backgroundColor: "#fff",
                        height: "48px",
                      }}
                      buttonStyle={{
                        border: "none",
                        backgroundColor: "#f8fafc",
                        paddingLeft: "6px",
                      }}
                      containerStyle={{ width: "100%" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sendOtpMutation.isPending}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/20 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sendOtpMutation.isPending ? "Sending Verification Code..." : "Send Verification OTP"}
                </button>
              </form>
            )}

            {/* -------------------------------------------------------------
               MODE 2: PASSWORD LOGIN (Bruno: POST /auth/login-with-password)
            -------------------------------------------------------------- */}
            {authMode === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email or Phone
                  </label>
                  <div className="relative flex items-center">
                    <FaEnvelope className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                    <input
                      type="text"
                      value={passwordForm.emailOrPhone}
                      onChange={(e) => setPasswordForm({ ...passwordForm, emailOrPhone: e.target.value })}
                      placeholder="e.g. user@mail.com or 9990645231"
                      className="w-full py-3 pl-11 pr-4 rounded-2xl border border-slate-200 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthMode("forgot")}
                      className="text-[11px] font-bold text-emerald-800 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <FaLock className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordForm.password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                      placeholder="Enter your password"
                      className="w-full py-3 pl-11 pr-12 rounded-2xl border border-slate-200 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={passwordLoginMutation.isPending}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/20 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {passwordLoginMutation.isPending ? "Authenticating..." : "Sign In with Password"}
                </button>
              </form>
            )}

            {/* -------------------------------------------------------------
               MODE 3: FORGOT PASSWORD (Bruno: POST /auth/forgot-password)
            -------------------------------------------------------------- */}
            {authMode === "forgot" && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 mb-2">
                  Enter your registered email address to receive a secure password reset link.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Registered Email Address
                  </label>
                  <div className="relative flex items-center">
                    <FaEnvelope className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="w-full py-3 pl-11 pr-4 rounded-2xl border border-slate-200 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotPasswordMutation.isPending}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/20 transition cursor-pointer disabled:opacity-50"
                >
                  {forgotPasswordMutation.isPending ? "Sending Reset Link..." : "Send Reset Link"}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode("password")}
                    className="text-xs font-bold text-slate-600 hover:text-emerald-800 cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            )}

            {/* Trust Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <FaShieldAlt className="text-emerald-700 text-xs shrink-0" />
                <span>256-Bit Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaTruck className="text-emerald-700 text-xs shrink-0" />
                <span>Express Delivery</span>
              </div>
            </div>

          </div>
        )}
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
