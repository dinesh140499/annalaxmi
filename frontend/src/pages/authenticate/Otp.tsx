import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { post } from "../../baseUrl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";
import Alert from "../../components/common/Alert";
import { FaLock, FaArrowLeft } from "react-icons/fa";

const STAFF_ROLES = ["superadmin", "admin", "manager", "editor", "viewer"];

type OtpProps = {
  phone: string;
  dialCode: string;
  onBack?: () => void;
};

const Otp = ({ phone, dialCode, onBack }: OtpProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [resendTimer, setResendTimer] = useState(45);
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "" as "success" | "error",
    show: false,
  });

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Format phoneNo matching backend validator /^[0-9]{10,15}$/ (digits only, no '+')
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const cleanDial = (dialCode || '91').replace(/[^0-9]/g, '');
  const formattedFullPhone = cleanPhone.startsWith(cleanDial) ? cleanPhone : `${cleanDial}${cleanPhone}`;

  const mutation = useMutation({
    mutationFn: (payload: { phoneNo: string; otp: string }) =>
      post("default", "auth/verify-otp", {
        phoneNo: payload.phoneNo.replace(/[^0-9]/g, ''),
        otp: payload.otp,
      }),

    onSuccess: (data) => {
      if (data?.token) {
        try {
          localStorage.setItem("token", data.token);
        } catch (e) {
          console.error("Error storing token:", e);
        }
      }
      
      // Wipe stale session cache and establish current session
      queryClient.clear();
      if (data?.user) {
        queryClient.setQueryData(["profile"], { user: data.user });
        dispatch(setUser(data.user));
      }

      setAlertData({
        message: data?.message || "Login Successful! Welcome to GrainPulse.",
        variant: "success",
        show: true,
      });
      setTimeout(() => {
        if (STAFF_ROLES.includes(data?.user?.role)) {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/account/dashboard", { replace: true });
        }
      }, 400);
    },

    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || "Invalid OTP code. Please check and try again.",
        variant: "error",
        show: true,
      });
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length === 4) {
      mutation.mutate({
        phoneNo: formattedFullPhone,
        otp: fullOtp,
      });
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      setResendTimer(45);
      
      // Resend OTP using backend auth/send-otp
      post("default", "auth/send-otp", {
        phoneNo: phone.replace(/[^0-9]/g, ''),
        dialCode: (dialCode || '91').replace(/[^0-9]/g, ''),
        country: "in",
      }).then(() => {
        setAlertData({
          message: "A fresh OTP code has been sent to +" + dialCode + " " + phone,
          variant: "success",
          show: true,
        });
      }).catch((err: any) => {
        setAlertData({
          message: err?.response?.data?.message || "Please wait before requesting another OTP.",
          variant: "error",
          show: true,
        });
      });
    }
  };

  return (
    <>
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl text-slate-800">
        
        {/* Back navigation */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-800 mb-4 transition cursor-pointer"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Change Mobile Number</span>
          </button>
        )}

        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-2xl bg-emerald-800 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-900/20">
            <FaLock className="text-lg" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            Enter Verification Code
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            We sent a 4-digit OTP to <strong className="text-slate-800">+{dialCode} {phone}</strong>
          </p>
        </div>

        {/* 4-Box OTP input */}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 justify-center my-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name={`otp${index + 1}`}
                id={`otp${index + 1}`}
                value={digit}
                autoFocus={index === 0}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-14 w-14 text-center text-xl font-extrabold border-2 border-slate-200 focus:border-emerald-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-50 transition"
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                maxLength={1}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otp.some((d) => d === "") || mutation.isPending}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/20 transition cursor-pointer disabled:opacity-50"
          >
            {mutation.isPending ? "Verifying Code..." : "Verify & Sign In"}
          </button>
        </form>

        {/* Resend Countdown */}
        <div className="text-xs text-center text-slate-500 mt-5">
          {resendTimer > 0 ? (
            <span>
              Resend OTP in <strong className="text-emerald-900 font-bold">{resendTimer}s</strong>
            </span>
          ) : (
            <button
              type="button"
              className="text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
              onClick={handleResend}
            >
              Resend OTP Now
            </button>
          )}
        </div>
      </div>

      {alertData.show && (
        <Alert
          message={alertData.message}
          variant={alertData.variant}
          onDismiss={() => setAlertData((p) => ({ ...p, show: false }))}
        />
      )}
    </>
  );
};

export default Otp;