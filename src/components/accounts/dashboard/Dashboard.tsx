import EditProfile from "./EditProfile";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import { VscVerified } from "react-icons/vsc";
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

const Dashboard = () => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleViewDetails = (orderId: number) => {
    alert(`Viewing details for order #${orderId}`);
  };

  return (
    <>
      <div className="mb-6">{<ProfileCard user={user} />}</div>

      {/* Recent Order History */}
      <div className="rounded-md border border-[#E6E6E6] px-4 py-5">
        <h2 className="text-md font-semibold mb-4">Recent Order History</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 uppercase text-sm">Order ID</th>
                  <th className="py-2 px-4 uppercase text-sm">Date</th>
                  <th className="py-2 px-4 uppercase text-sm">Status</th>
                  <th className="py-2 px-4 uppercase text-sm">Total</th>
                  <th className="py-2 px-4 uppercase text-sm text-center">
                    Action
                  </th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[400px] overflow-y-auto your-scroll-area">
              <table className="w-full text-sm text-left border-collapse">
                <tbody>
                  {Array.from({ length: 100 })?.map((_, i) => (
                    <RecentOrder
                      key={i}
                      orderId={1000 + i}
                      date="2025-05-25"
                      status={
                        i % 3 === 0
                          ? "Completed"
                          : i % 2 === 0
                            ? "Processing"
                            : "On The Way"
                      }
                      total={Math.floor(Math.random() * 2000) + 500}
                      viewDetail={() => handleViewDetails(1000 + i)}
                      totalProduct={5}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {editModal && <EditProfile setEditModal={setEditModal} />}
    </>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileType = {
  user: RootState["auth"]["user"];
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

const ProfileCard = ({ user }: ProfileType) => {
  if (!user) return null;

  const fullname = `${user.firstname || null} ${user.lastname || ""}`.trim();
  const orderCount = 0;
  const addressCount = user?.addresses?.length ?? 0;
  const totalSpent = 0;

  return (
    <div className="rounded-md border border-[#E6E6E6] px-5 py-4 flex items-center gap-4">
      {/* Avatar */}
      <img
        src={
          user?.avatar
            ? `${import.meta.env.VITE_API_URL}${user.avatar}`
            : "/profile.png"
        }
        className="h-14 w-14 rounded-full object-cover flex-shrink-0"
        alt="profile"
        title="profile"
      />

      {/* Name + email + phone */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h1 className="text-sm font-semibold capitalize truncate">
            {fullname}
          </h1>
          <VscVerified className="text-base text-green-800 flex-shrink-0" />
        </div>
        <p className="text-[#808080] text-xs flex items-center gap-1 mb-0.5">
          <MdOutlineMail size={13} />
          {user.email ? user.email : null}
        </p>
        <p className="text-[#808080] text-xs flex items-center gap-1">
          <IoCallOutline size={13} />+{user.dialCode}-{user.phoneNo?.slice(2)}
        </p>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-6 text-center flex-shrink-0">
        <div>
          <p className="text-base font-semibold text-[#1A1A1A]">{orderCount}</p>
          <p className="text-xs text-[#808080]">Orders</p>
        </div>
        <div>
          <p className="text-base font-semibold text-[#1A1A1A]">
            {addressCount}
          </p>
          <p className="text-xs text-[#808080]">Addresses</p>
        </div>
        <div>
          <p className="text-base font-semibold text-[#1A1A1A]">
            ₹{totalSpent.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-[#808080]">Spent</p>
        </div>
      </div>

      {/* Edit button */}
      <Link
        to="/account/settings"
        className="hidden sm:inline-flex items-center gap-1.5 text-sm border border-[#E6E6E6] rounded-md px-3 py-2 text-[#1A1A1A] hover:border-[#00603A] hover:text-[#00603A] transition-colors flex-shrink-0 ml-2"
      >
        <MdOutlineEdit size={15} />
        Edit profile
      </Link>
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
  <tr className="border-b hover:bg-gray-50">
    <td className="py-2 px-4 w-1/5">#{orderId}</td>
    <td className="py-2 px-4 w-1/5">{date}</td>
    <td className="py-2 px-4 w-1/5">
      <span
        className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
          status === "Completed"
            ? "bg-green-100 text-green-800"
            : status === "On The Way"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-green"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="py-2 px-4 w-1/5 font-medium text-[#1A1A1A]">
      ₹{total} ({Math.floor(Math.random() * totalProduct)} Products)
    </td>
    <td className="py-2 px-4 w-1/5 text-center">
      <button
        onClick={viewDetail}
        className="text-sm text-green cursor-pointer hover:underline"
      >
        View Details
      </button>
    </td>
  </tr>
);

export default Dashboard;
