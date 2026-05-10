import { useState } from "react";
import Breadcrumbs from "../../components/reusable/Breadcrumps";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Otp from "./Otp";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../baseUrl";
import ErrorMsg from "../../components/reusable/ErrorMsg";

type PhoneInputState = {
  phone: string;
  country: string;
  dialCode: string;
};

type PhoneData = {
  dialCode: string;
  countryCode: string;
};

const Login = () => {
  const [toggleOtp, setToggleOtp] = useState(false);
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>({
    phone: "",
    country: "in",
    dialCode: "91",
  });

  const mutation = useMutation({
    mutationFn: (payload: {
      phoneNo: string;
      dialCode: string;
      country: string;
    }) => post("default", "auth/login", payload),

    onSuccess: () => {
      setToggleOtp(true);
    },

    onError: (err) => {
      console.error("Login Error", err);
      setToggleOtp(false);
    },
  });

  const handleSendCode = () => {
    // ✅ Basic validation
    if (!phoneInput.phone || phoneInput.phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    // ✅ Send clean payload
    mutation.mutate({
      phoneNo: phoneInput.phone.replace(phoneInput.dialCode, ""), // remove dial code if needed
      dialCode: phoneInput.dialCode,
      country: phoneInput.country,
    });
  };

  return (
    <>
      <Breadcrumbs />

      {toggleOtp ? (
        <Otp phoneNo={phoneInput.phone} />
      ) : (
        <div className="max-w-[90%] w-full lg:max-w-[95%] mx-auto min-h-[40vh] lg:min-h-[50vh] flex justify-center items-center">
          <div>
            <h1 className="text-md text-center text-green font-bold">
              Mobile Number
            </h1>

            <div className="mt-3">
              <PhoneInput
                country={phoneInput.country}
                enableSearch
                value={phoneInput.phone}
                placeholder="Enter phone number"
                onChange={(value: string, data: PhoneData) => {
                  setPhoneInput({
                    phone: value,
                    country: data.countryCode || "",
                    dialCode: data.dialCode || "",
                  });
                }}
                inputStyle={{
                  width: "100%",
                  padding: "8px 48px",
                  fontSize: "16px",
                  borderRadius: "0.375rem",
                  backgroundColor: "#F0F5FA",
                  border: "1px solid white",
                  outline: "none",
                  marginLeft: "10px",
                }}
                buttonStyle={{ border: "none", backgroundColor: "#F0F5FA" }}
                containerStyle={{ width: "100%" }}
              />

              {/* ✅ Status messages */}
              <div className="text-center my-3 mb-5">
                {mutation.isPending && (
                  <p className="text-gray-400">Sending OTP...</p>
                )}

                {mutation.isError && (
                  <ErrorMsg
                    message={
                      mutation.error instanceof Error
                        ? mutation.error.message
                        : "Something went wrong"
                    }
                  />
                )}
              </div>
            </div>

            <button
              className="w-full py-[10px] px-2 rounded-md bg-green text-white disabled:opacity-50"
              onClick={handleSendCode}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sending..." : "Send Code"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;