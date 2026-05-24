import InputField from "../../reusable/InputField";
import profileDummy from "../../../assets/images/profile.jpg";
import { useEffect, useState, type ChangeEvent } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../../baseUrl";
import Alert from "../../common/Alert";

type AccountType = {
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
};

type UserProps = {
  user: RootState["auth"]["user"];
};

const Setting = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Profile user={user} />
      <ChangePassword user={user} />
    </>
  );
};

const Profile = ({ user }: UserProps) => {
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "", // success | error
    show: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [accInput, setAccInput] = useState<AccountType>({
    firstname: "",
    lastname: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setAccInput({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (accInput.avatar.startsWith("blob:")) {
        URL.revokeObjectURL(accInput.avatar);
      }
    };
  }, [accInput.avatar]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) =>
      post("default", "user/edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (data: any) => {
      setAlertData({
        message: data?.message || "Profile Updated Successfully",
        variant: "success" as const,
        show: true,
      });
    },
    onError: (err: any) => {
      console.error(err);
      setAlertData({
        message: err?.response?.data?.message || "Something went wrong",
        variant: "error" as const,
        show: true,
      });
    },
  });

  const handleBillInputAccount = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAccInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setAccInput((prev) => {
      return {
        ...prev,
        avatar: URL.createObjectURL(file),
      };
    });
  };

  const handleSave = () => {
    const formData = new FormData();

    formData.append("firstname", accInput.firstname);
    formData.append("lastname", accInput.lastname);
    formData.append("email", accInput.email);

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    mutation.mutate(formData);
  };

  return (
    <>
      {alertData.show && (
        <Alert message={alertData.message} variant={"success"} />
      )}
      <div className="lg:flex items-center mb-5">
        <div className="rounded-md border border-[#E6E6E6]  py-5 flex-1/2">
          <h1 className="font-bold text-md px-4 pb-3 border-b border-[#E5E5E5] mb-5">
            Account Settings
          </h1>
          <div className="px-4 mb-4">
            <label htmlFor="firstname" className="block text-sm mb-2">
              First Name
            </label>
            <InputField
              inputType="text"
              id="firstname"
              name="firstname"
              onChange={handleBillInputAccount}
              className="py-2 w-full text-sm"
              placeholder="Dianne"
              value={accInput.firstname}
            />
          </div>
          <div className="px-4 mb-4">
            <label htmlFor="lastname" className="block text-sm mb-2">
              Last Name
            </label>
            <InputField
              inputType="text"
              id="lastname"
              name="lastname"
              onChange={handleBillInputAccount}
              className="py-2 w-full text-sm"
              placeholder="Russell"
              value={accInput.lastname}
            />
          </div>
          <div className="px-4 mb-4">
            <label htmlFor="email" className="block text-sm mb-2">
              Email
            </label>
            <InputField
              inputType="text"
              id="email"
              name="email"
              onChange={handleBillInputAccount}
              className="py-2 w-full text-sm"
              placeholder="dianne.russell@gmail.com"
              value={accInput.email}
            />
          </div>
          {/* <div className="px-4 mb-5">
          <label htmlFor="phone" className="block text-sm mb-2">
            Phone
          </label>
          <InputField
            inputType="tel"
            id="phone"
            name="phone"
            onChange={handleBillInputAccount}
            className="py-2 w-full text-sm"
            placeholder="(603) 555-0123"
          />
        </div> */}
          <div className="px-4">
            <button
              className="py-2 px-5 bg-green text-white text-[14px] rounded-full cursor-pointer disabled:opacity-50"
              onClick={handleSave}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
        <div className="flex-1/3">
          <img
            src={
              accInput.avatar
                ? accInput.avatar.startsWith("blob:")
                  ? accInput.avatar
                  : `${import.meta.env.VITE_API_URL}${accInput.avatar}`
                : profileDummy
            }
            alt="profile"
            className="h-[200px] w-[200px] rounded-full object-cover mx-auto"
          />
          <label
            htmlFor="fileupload"
            className="cursor-pointer w-[150px] text-center mx-auto block border-[2px] border-[#00603A] rounded-full text-sm text-[#00603A] duration-300 py-3 px-5 mt-5 hover:bg-[#00603A] hover:text-white"
          >
            Choose Image
          </label>
          <input
            type="file"
            className="hidden"
            id="fileupload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </>
  );
};



const ChangePassword = ({ user }: UserProps) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="mt-5">
      <div className="rounded-md border border-[#E6E6E6] py-5">
        <h1 className="font-bold text-md px-4 pb-3 border-b border-[#E5E5E5] mb-5">
          Change Password
        </h1>
        {/* Old Password */}
        <div className="px-4 mb-4 relative">
          <label htmlFor="current-password" className="block text-sm mb-2">
            Current Password
          </label>
          <InputField
            inputType={showOldPassword ? "text" : "password"}
            id="old-password"
            name="old-password"
            onChange={() => ""}
            className="py-2 w-full text-sm pr-10"
            placeholder="Enter your old password"
          />
          <button
            type="button"
            onClick={() => setShowOldPassword((prev) => !prev)}
            className="absolute right-6 top-9 text-gray-500"
          >
            {showOldPassword ? (
              <FaEyeSlash className="cursor-pointer" size={18} />
            ) : (
              <FaEye className="cursor-pointer" size={18} />
            )}
          </button>
        </div>

        <div className="flex gap-3 w-full">
          {/* New Password */}
          <div className="lg:ps-4 mb-4 relative w-full">
            <label htmlFor="new-password" className="block text-sm mb-2">
              New Password
            </label>
            <InputField
              inputType={showNewPassword ? "text" : "password"}
              id="new-password"
              name="new-password"
              onChange={() => ""}
              className="py-2 w-full text-sm pr-10"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-6 top-9 text-gray-500"
            >
              {showNewPassword ? (
                <FaEyeSlash className="cursor-pointer" size={18} />
              ) : (
                <FaEye className="cursor-pointer" size={18} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="lg:pr-4 mb-4 relative w-full">
            <label htmlFor="confirm-password" className="block text-sm mb-2">
              Confirm Password
            </label>
            <InputField
              inputType={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              onChange={() => ""}
              className="py-2 w-full text-sm pr-10"
              placeholder="Re-enter new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-6 top-9 text-gray-500"
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={18} className="cursor-pointer" />
              ) : (
                <FaEye className="cursor-pointer" size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="px-4">
          <button className="py-2 px-5 bg-green text-white text-[14px] rounded-full cursor-pointer">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
