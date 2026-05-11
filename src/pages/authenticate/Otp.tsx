import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { post } from "../../baseUrl";
import ErrorMsg from "../../components/reusable/ErrorMsg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";

type PhoneProps = {
  phoneNo?: string;
};

type PhoneType = {
  phoneNo?: string;
  otp?: string;
};

const Otp = ({ phoneNo }: PhoneProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const [resendTimer, setResendTimer] = useState(50);
  const navigate = useNavigate();

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const mutation = useMutation({
    mutationFn: (payload: PhoneType) =>
      post("default", "auth/verify-otp", payload),
    onSuccess: (data) => {
      console.log("Success data:", data);
      dispatch(setUser(data.user));
      navigate("/account/dashboard");
    },
    onError: (error) => {
      console.error("OTP verification failed", error);
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

  const handleSubmit = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length === 4) {
      console.log("Entered OTP:", fullOtp);
      mutation.mutate({
        phoneNo: phoneNo,
        otp: fullOtp,
      });
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      console.log("Resending OTP...");
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      setResendTimer(50);
    }
  };

  return (
    <div className="max-w-[90%] w-full lg:max-w-[95%] mx-auto min-h-[40vh] lg:min-h-[50vh] flex justify-center items-center">
      <div>
        <h1 className="text-md text-center text-green font-bold">Enter OTP</h1>
        <div className="mt-3 flex gap-3 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name={`otp${index + 1}`}
              id={`otp${index + 1}`}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="py-3 w-12 text-center text-lg border border-gray-300 rounded"
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              maxLength={1}
            />
          ))}
        </div>

        <div className="text-center my-3 mb-5">
          {mutation.isPending && (
            <p className="text-gray-400 capitalize">Loading...</p>
          )}

          {mutation.isError && (
            <h1 className="text-red-500 text-sm ">
              {mutation.error instanceof Error ? (
                <ErrorMsg message={mutation.error.message} />
              ) : (
                <p>Something went wrong</p>
              )}
            </h1>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={otp.some((d) => d === "") || mutation.isPending}
          className="w-full py-[10px] px-2 rounded-md bg-green text-white cursor-pointer disabled:opacity-50"
        >
          Submit
        </button>

        <h1 className="text-[13px] mt-2 text-center">
          {resendTimer > 0 ? (
            <span>
              <b>Resend</b> in {resendTimer} sec
            </span>
          ) : (
            <span className="text-green cursor-pointer" onClick={handleResend}>
              <b>Resend OTP</b>
            </span>
          )}
        </h1>
      </div>
    </div>
  );
};

export default Otp;
