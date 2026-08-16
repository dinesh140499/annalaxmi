import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/reusable/Breadcrumps";
import { FaLeaf, FaLock, FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Alert from "../../components/common/Alert";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "" as "success" | "error",
    show: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setAlertData({
        message: "Please enter your registered email or phone number.",
        variant: "error",
        show: true,
      });
      return;
    }

    setSubmitted(true);
    setAlertData({
      message: "Reset code has been sent to your registered coordinates.",
      variant: "success",
      show: true,
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

      <div className="max-w-[95%] sm:max-w-md mx-auto py-12 sm:py-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm text-center space-y-6">
          
          {/* Top Brand Leaf */}
          <div className="h-12 w-12 rounded-2xl bg-emerald-800 flex items-center justify-center text-amber-400 mx-auto shadow-md">
            <FaLeaf className="text-xl transform -rotate-12" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reset Your Password</h1>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Enter your registered email address or phone number and we'll send you an instant recovery link & OTP.
            </p>
          </div>

          {submitted ? (
            <div className="space-y-4 pt-2">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl">
                <FaCheckCircle />
              </div>
              <p className="text-xs text-slate-600">
                We've sent password reset instructions to <strong className="text-slate-800">{emailOrPhone}</strong>. Please check your inbox and SMS messages.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="w-full inline-block bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Registered Email or Phone *</label>
                <div className="relative flex items-center">
                  <FaEnvelope className="absolute left-3.5 text-slate-400 text-xs" />
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="name@example.com or +91 98765..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <FaLock className="text-xs text-amber-300" />
                <span>Send Reset Instructions</span>
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-800 transition"
                >
                  <FaArrowLeft className="text-[10px]" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
