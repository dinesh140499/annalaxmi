import { IoMdCloseCircleOutline } from "react-icons/io";
import InputField from "../../reusable/InputField";
import { useState, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { put } from "../../../baseUrl";
// import ErrorMsg from "../../reusable/ErrorMsg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type EditType = {
  setEditModal: (value: boolean) => void;
};

type UpdateProfileResponse = {
  message: string;
  profileImg?: string;
};

type PhoneInputState = {
  phone: string;
  country: string;
  dialCode: string;
};

type InputFieldType = {
  fullname: string;
  phone: string;
  email: string;
  dob: string;
  address: string[]; // ✅ actual data for API
  formattedAddress: string;
};

const EditProfile = ({ setEditModal }: EditType) => {
  const token = localStorage.getItem("token");

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [addressInput, setAddressInput] = useState<string>(""); // ✅ for user input

  const [phoneInput, setPhoneInput] = useState<PhoneInputState>({
    phone: "",
    country: "in",
    dialCode: "91",
  });

  const [inputField, setInputField] = useState<InputFieldType>({
    fullname: "",
    phone: "",
    email: "",
    dob: "",
    address: [],
    formattedAddress: "",
  });



  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "address") {
      setAddressInput(value); // string input for UI
    } else {
      setInputField((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePhoneChange = (value: string, data: any) => {
    setPhoneInput({
      phone: value,
      country: data.countryCode || "in",
      dialCode: data.dialCode || "91",
    });
    setInputField((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (file) {
      formData.append("profilePic", file);
    }

    formData.append("fullname", inputField.fullname);
    formData.append("email", inputField.email);
    formData.append("dob", inputField.dob);
    formData.append("phone", inputField.phone);

    inputField.address.forEach((addr) => {
      formData.append("address", addr);
    });

  };


  const formFields = [
    { label: "Full Name", id: "fullname", type: "text" },
    { label: "Email", id: "email", type: "email" },
    { label: "Date of Birth", id: "dob", type: "date" },
    { label: "Address", id: "address", type: "text" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-[90%] max-w-[450px] lg:max-h-[500px] h-full bg-white rounded-lg p-3 pt-0 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white flex items-center justify-between border-b border-gray-300 pt-3 pb-3">
          <h1 className="text-lg font-semibold">Edit Profile</h1>
          <button
            className="text-xl text-black hover:text-red-600 duration-300"
            onClick={() => setEditModal(false)}
          >
            <IoMdCloseCircleOutline />
          </button>
        </div>

        {/* File Upload */}
        <div className="mt-5">
          <label className="text-sm block mb-1">Image</label>
          <label
            htmlFor="image"
            className="bg-green text-white px-3 py-1 rounded-md text-sm cursor-pointer w-fit block mt-2"
          >
            Choose File
          </label>
          <InputField
            inputType="file"
            id="image"
            name="image"
            className="hidden"
            onChange={handleFileUpload}
          />
          
            {/* <p className="mt-3 text-sm italic text-gray-400">Loading..</p> */}
           (
            <>
              {fileName && <p className="text-xs mt-2 text-gray-700">Selected: {fileName}</p>}
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  className="h-10 w-20 object-contain mt-2"
                  alt="Preview"
                />
              )}
            </>
          )
        </div>

        {/* Form Fields */}
        {formFields.map(({ label, id, type }) => (
          <div className="mt-5" key={id}>
            <label htmlFor={id} className="text-sm block mb-1">
              {label}
            </label>
            <InputField
              inputType={type}
              id={id}
              name={id}
              className="w-full py-2"
              onChange={handleInputChange}
              value={id === "address" ? addressInput : (inputField as any)[id] || ""}
            />
          </div>
        ))}

        {/* Phone Input */}
        <div className="mt-5">
          <label className="text-sm block mb-1">Phone</label>
          <PhoneInput
            country={phoneInput.country}
            enableSearch
            value={phoneInput.phone}
            onChange={handlePhoneChange}
            placeholder="91-99999-99999"
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
        </div>

        {/* Submit */}
        <div className="mt-5">
          <button
            className="bg-black text-white text-sm rounded-md py-2 px-5 block ml-auto"
            // disabled={isPending}
            onClick={handleSubmit}
          >
            {/* {isPending ? "Uploading..." : "Update"} */}
          </button>
        </div>

        {/* Error */}
       
          {/* <div className="mt-2">
            <ErrorMsg message={error instanceof Error ? error.message : "Something went wrong"} />
          </div> */}
        
      </div>
    </div>
  );
};

export default EditProfile;
