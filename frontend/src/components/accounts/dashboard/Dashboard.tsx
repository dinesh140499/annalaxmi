import EditProfile from "./EditProfile";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { VscVerified } from "react-icons/vsc";
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../baseUrl";

const Dashboard = () => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const { user: reduxUser } = useSelector((state: RootState) => state.auth);

  // Fetch real profile from backend
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => get("default", "user/profile"),
    retry: 1,
  });

  const activeUser = profileData?.user || reduxUser;

  const handleViewDetails = (orderId: number) => {
    alert(`Viewing details for order #${orderId}`);
  };

  return (
    <>
      <div className="mb-6">
        <ProfileCard user={activeUser} onEdit={() => setEditModal(true)} />
      </div>

      {/* Recent Order History */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            Recent Harvest Order History
          </h2>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            Live Status
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4 text-center rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <RecentOrder
                  orderId={10482}
                  date="Today, 02:45 PM"
                  status="On The Way"
                  total={845}
                  totalProduct={3}
                  viewDetail={() => handleViewDetails(10482)}
                />
                <RecentOrder
                  orderId={10419}
                  date="12 Aug 2026"
                  status="Completed"
                  total={1650}
                  totalProduct={5}
                  viewDetail={() => handleViewDetails(10419)}
                />
                <RecentOrder
                  orderId={10385}
                  date="04 Aug 2026"
                  status="Completed"
                  total={490}
                  totalProduct={2}
                  viewDetail={() => handleViewDetails(10385)}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editModal && <EditProfile setEditModal={setEditModal} />}
    </>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileType = {
  user: any;
  onEdit: () => void;
};

type RecentOrderType = {
  orderId: number;
  date: string;
  total: number;
  status: "Processing" | "On The Way" | "Completed";
  totalProduct: number;
  viewDetail: () => void;
};

// ─── ProfileCard ──────────────────────────────────────────────────────────────

const ProfileCard = ({ user, onEdit }: ProfileType) => {
  const fullname = user
    ? `${user.firstname || ""} ${user.lastname || ""}`.trim() || "Valued Customer"
    : "Guest User";

  const avatarSrc = user?.avatar?.url || user?.avatar || "/profile.png";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 flex flex-col sm:flex-row items-center sm:items-center gap-5 shadow-xs">
      {/* Avatar */}
      <img
        src={avatarSrc}
        className="h-16 w-16 rounded-full object-cover shrink-0 border-2 border-emerald-700 shadow-2xs"
        alt="Profile Avatar"
      />

      {/* Name + email + phone */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
          <h1 className="text-base font-extrabold text-slate-900 capitalize truncate font-heading">
            {fullname}
          </h1>
          <VscVerified className="text-base text-emerald-700 shrink-0" />
        </div>
        <p className="text-slate-500 text-xs flex items-center justify-center sm:justify-start gap-1 mb-0.5">
          <MdOutlineMail size={13} className="text-emerald-700" />
          {user?.email || "No email registered"}
        </p>
        <p className="text-slate-500 text-xs flex items-center justify-center sm:justify-start gap-1 font-mono">
          <IoCallOutline size={13} className="text-emerald-700" />
          {user?.phoneNo ? `+${user.phoneNo}` : "Phone verified"}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-center shrink-0 border-y sm:border-y-0 sm:border-x border-slate-100 py-3 sm:py-0 sm:px-6 w-full sm:w-auto justify-around sm:justify-center">
        <div>
          <p className="text-base font-extrabold text-slate-900">3</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Orders</p>
        </div>
        <div>
          <p className="text-base font-extrabold text-slate-900">
            {user?.addresses?.length || 1}
          </p>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Address</p>
        </div>
        <div>
          <p className="text-base font-extrabold text-emerald-900">
            ₹2,985
          </p>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Saved</p>
        </div>
      </div>

      {/* Edit button */}
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1.5 text-xs font-bold border border-emerald-800 text-emerald-900 rounded-xl px-4 py-2.5 hover:bg-emerald-800 hover:text-white transition-all shrink-0 cursor-pointer shadow-2xs"
      >
        <MdOutlineEdit size={15} />
        <span>Edit Profile</span>
      </button>
    </div>
  );
};

// ─── RecentOrder ──────────────────────────────────────────────────────────────

const RecentOrder = ({
  date,
  orderId,
  status,
  total,
  viewDetail,
  totalProduct,
}: RecentOrderType) => (
  <tr className="border-b border-slate-50 hover:bg-slate-50/70 transition">
    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">#{orderId}</td>
    <td className="py-3.5 px-4 text-slate-500">{date}</td>
    <td className="py-3.5 px-4">
      <span
        className={`inline-block px-2.5 py-1 text-xs rounded-full font-bold ${
          status === "Completed"
            ? "bg-emerald-100 text-emerald-900"
            : status === "On The Way"
              ? "bg-amber-100 text-amber-900"
              : "bg-blue-100 text-blue-900"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="py-3.5 px-4 font-bold text-slate-900">
      ₹{total} <span className="text-slate-400 font-normal text-xs">({totalProduct} items)</span>
    </td>
    <td className="py-3.5 px-4 text-center">
      <button
        onClick={viewDetail}
        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer hover:underline"
      >
        View Order
      </button>
    </td>
  </tr>
);

export default Dashboard;
