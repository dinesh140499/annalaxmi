import { IoMdCloseCircleOutline } from "react-icons/io";
import InputField from "../../reusable/InputField";
import { useState, type ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../../../baseUrl";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { setUser } from "../../../features/authSlice";
import Alert from "../../common/Alert";

type EditType = {
  setEditModal: (value: boolean) => void;
};

const EditProfile = ({ setEditModal }: EditType) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formInput, setFormInput] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
  });

  const [alertData, setAlertData] = useState({
    message: "",
    variant: "" as "success" | "error",
    show: false,
  });

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
      setTimeout(() => {
        setEditModal(false);
      }, 700);
    },

    onError: (err: any) => {
      setAlertData({
        message: err?.response?.data?.message || "Failed to update profile.",
        variant: "error",
        show: true,
      });
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInput.firstname.trim()) {
      setAlertData({
        message: "First name is required.",
        variant: "error",
        show: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("firstname", formInput.firstname.trim());
    formData.append("lastname", formInput.lastname.trim());
    formData.append("email", formInput.email.trim());

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    editProfileMutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {alertData.show && (
          <Alert
            message={alertData.message}
            variant={alertData.variant}
            onDismiss={() => setAlertData((p) => ({ ...p, show: false }))}
          />
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            Edit Personal Profile
          </h2>
          <button
            className="text-2xl text-slate-400 hover:text-slate-700 cursor-pointer transition"
            onClick={() => setEditModal(false)}
          >
            <IoMdCloseCircleOutline />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Avatar Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Profile Avatar
            </label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="avatar-upload"
                className="bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition"
              >
                Choose Photo
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              {selectedFile && (
                <span className="text-xs text-slate-600 truncate max-w-[180px]">
                  {selectedFile.name}
                </span>
              )}
            </div>
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              First Name *
            </label>
            <InputField
              inputType="text"
              id="firstname"
              name="firstname"
              value={formInput.firstname}
              onChange={handleInputChange}
              className="py-2.5 w-full text-sm border border-slate-200 rounded-xl px-3.5 focus:border-emerald-700 outline-none"
              placeholder="e.g. Priya"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Last Name
            </label>
            <InputField
              inputType="text"
              id="lastname"
              name="lastname"
              value={formInput.lastname}
              onChange={handleInputChange}
              className="py-2.5 w-full text-sm border border-slate-200 rounded-xl px-3.5 focus:border-emerald-700 outline-none"
              placeholder="e.g. Verma"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Email Address
            </label>
            <InputField
              inputType="email"
              id="email"
              name="email"
              value={formInput.email}
              onChange={handleInputChange}
              className="py-2.5 w-full text-sm border border-slate-200 rounded-xl px-3.5 focus:border-emerald-700 outline-none"
              placeholder="priya.verma@example.com"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={editProfileMutation.isPending}
              className="flex-1 py-3 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
            >
              {editProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditModal(false)}
              className="py-3 px-4 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default EditProfile;
