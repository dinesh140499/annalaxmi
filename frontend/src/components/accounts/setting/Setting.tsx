import InputField from "../../reusable/InputField";
import profileDummy from "/profile.png";
import { useEffect, useState, type ChangeEvent } from "react";
import { FaEye, FaEyeSlash, FaShieldAlt, FaUserCheck } from "react-icons/fa";
import type { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../../../baseUrl";
import Alert from "../../common/Alert";
import { setUser } from "../../../features/authSlice";

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
    <div className="space-y-8">
      <Profile user={user} />
      <ChangePassword user={user} />
    </div>
  );
};

/* =========================================================
   1. USER PROFILE SETTINGS (Bruno: POST /user/edit-profile)
   Payload: Multipart FormData (firstname, lastname, email, avatar)
========================================================= */
const Profile = ({ user }: UserProps) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [alertData, setAlertData] = useState({
    message: "",
    variant: "" as "success" | "error",
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
        avatar: (typeof user.avatar === "object" ? (user.avatar as any)?.url : user.avatar) || "",
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

  const editProfileMutation = useMutation({
    mutationFn: async (formData: FormData) =>
      post("default", "user/edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

    onSuccess: (data: any) => {
      if (data?.user) {
        dispatch(setUser(data.user));
      }
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setAlertData({
        message: data?.message || "Profile updated successfully!",
        variant: "success",
        show: true,
      });
    },

    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || "Failed to update profile.",
        variant: "error",
        show: true,
      });
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setAccInput((prev) => ({
      ...prev,
      avatar: URL.createObjectURL(file),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accInput.firstname.trim()) {
      setAlertData({
        message: "First name is required.",
        variant: "error",
        show: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("firstname", accInput.firstname.trim());
    formData.append("lastname", accInput.lastname.trim());
    formData.append("email", accInput.email.trim());

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    editProfileMutation.mutate(formData);
  };

  const avatarSrc = accInput.avatar
    ? accInput.avatar.startsWith("blob:") || accInput.avatar.startsWith("http")
      ? accInput.avatar
      : `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${accInput.avatar}`
    : profileDummy;

  return (
    <>
      {alertData.show && (
        <Alert
          message={alertData.message}
          variant={alertData.variant}
          onDismiss={() => setAlertData((p) => ({ ...p, show: false }))}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-6 flex items-center gap-2 font-heading">
          <FaUserCheck className="text-emerald-700" />
          <span>Personal Account Profile</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Fields (8 cols) */}
          <form onSubmit={handleSave} className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  First Name *
                </label>
                <InputField
                  inputType="text"
                  id="firstname"
                  name="firstname"
                  onChange={handleInputChange}
                  className="py-2.5 w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 focus:border-emerald-700 outline-none"
                  placeholder="e.g. Priya"
                  value={accInput.firstname}
                />
              </div>

              <div>
                <label htmlFor="lastname" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Last Name
                </label>
                <InputField
                  inputType="text"
                  id="lastname"
                  name="lastname"
                  onChange={handleInputChange}
                  className="py-2.5 w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 focus:border-emerald-700 outline-none"
                  placeholder="e.g. Verma"
                  value={accInput.lastname}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <InputField
                inputType="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                className="py-2.5 w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 focus:border-emerald-700 outline-none"
                placeholder="e.g. priya.verma@example.com"
                value={accInput.email}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="py-3 px-6 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
                disabled={editProfileMutation.isPending}
              >
                {editProfileMutation.isPending ? "Saving Changes..." : "Save Profile Details"}
              </button>
            </div>
          </form>

          {/* Profile Photo (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50/70 rounded-2xl border border-slate-100 text-center">
            <img
              src={avatarSrc}
              alt="Profile Avatar"
              className="h-28 w-28 rounded-full object-cover shadow-sm border-2 border-emerald-700 mb-4"
            />
            <label
              htmlFor="fileupload"
              className="cursor-pointer text-xs font-bold text-emerald-800 border-2 border-emerald-800 rounded-xl py-2 px-4 hover:bg-emerald-800 hover:text-white transition duration-150"
            >
              Choose New Photo
            </label>
            <input
              type="file"
              className="hidden"
              id="fileupload"
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="text-[11px] text-slate-400 mt-2">JPG, PNG or WEBP (Max 2MB)</p>
          </div>

        </div>
      </div>
    </>
  );
};

/* =========================================================
   2. CHANGE PASSWORD (Bruno: POST /auth/change-password)
   Payload: JSON (currentPassword, newPassword, confirmPassword)
========================================================= */
const ChangePassword = ({ user: _user }: UserProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [alertData, setAlertData] = useState({
    message: "",
    variant: "" as "success" | "error",
    show: false,
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (payload: typeof passwordData) =>
      post("default", "auth/change-password", payload),

    onSuccess: (data: any) => {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setAlertData({
        message: data?.message || "Password updated successfully!",
        variant: "success",
        show: true,
      });
    },

    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || err?.message || "Failed to update password.",
        variant: "error",
        show: true,
      });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordData.currentPassword) {
      setAlertData({
        message: "Current password is required.",
        variant: "error",
        show: true,
      });
      return;
    }
    if (!passwordData.newPassword || passwordData.newPassword.length < 6) {
      setAlertData({
        message: "New password must be at least 6 characters.",
        variant: "error",
        show: true,
      });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlertData({
        message: "New password and confirmation do not match.",
        variant: "error",
        show: true,
      });
      return;
    }

    changePasswordMutation.mutate(passwordData);
  };

  return (
    <>
      {alertData.show && (
        <Alert
          message={alertData.message}
          variant={alertData.variant}
          onDismiss={() => setAlertData((p) => ({ ...p, show: false }))}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-6 flex items-center gap-2 font-heading">
          <FaShieldAlt className="text-emerald-700" />
          <span>Security & Password Management</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Current Password *
            </label>
            <div className="relative flex items-center">
              <InputField
                inputType={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                className="py-2.5 w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 pr-10 focus:border-emerald-700 outline-none"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showCurrentPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                New Password *
              </label>
              <div className="relative flex items-center">
                <InputField
                  inputType={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  className="py-2.5 w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 pr-10 focus:border-emerald-700 outline-none"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Confirm New Password *
              </label>
              <div className="relative flex items-center">
                <InputField
                  inputType={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  className="py-2.5 w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 pr-10 focus:border-emerald-700 outline-none"
                  placeholder="Repeat new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="py-3 px-6 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
            >
              {changePasswordMutation.isPending ? "Updating Password..." : "Update Password"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default Setting;
