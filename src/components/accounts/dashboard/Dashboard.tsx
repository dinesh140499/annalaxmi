import { useQuery } from "@tanstack/react-query";
import { get } from "../../../baseUrl";
import ErrorMsg from "../../reusable/ErrorMsg";
import EditProfile from "./EditProfile";
import React, { useState } from "react";

const Dashboard = () => {
  const token = localStorage.getItem('token')
  const [editModal, setEditModal] = useState<boolean>(false)

  const { data: profileData, error, isLoading, isError, refetch, } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => get("default", "user/profile", {
      headers: {
        Authorization: token ? `Bearer ${token}` : ``
      }
    },),
    retry: false, 
  });

  const handleViewDetails = (orderId: number) => {
    alert(`Viewing details for order #${orderId}`);
  };

  return (
    <>
      <div className="lg:flex gap-5 mb-6">
        {isLoading && <h1 className="text-center block mx-auto">Loading...</h1>}
        {isError && <ErrorMsg message={error.message} />}
        {!isLoading && !isError && profileData && (
          <>
            <ProfileCard
              name={profileData?.data?.customerProfile?.fullname}
              profileImg={profileData?.data?.customerProfile?.profilePic}
              role={profileData?.data?.customerProfile?.role}
              setEditModal={setEditModal}

            />
            <BillingAddress
              name={profileData?.data?.customerProfile?.fullname}
              address={
                profileData?.data?.customerProfile?.address?.length
                  ? profileData.data.customerProfile.address.join(", ")
                  : "N/A"
              }

              email={profileData?.data?.customerProfile?.email}
              phone={profileData?.data?.customerProfile?.phone || "N/A"}
              setEditModal={setEditModal}
            />
          </>
        )}
      </div>


      {/* Recent Order History */}
      <div className="rounded-md border border-[#E6E6E6] px-4 py-5">
        <h2 className="text-md font-semibold mb-4">Recent Order History</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100">
                <tr >
                  <th className="py-2 px-4 uppercase text-sm">Order ID</th>
                  <th className="py-2 px-4 uppercase text-sm">Date</th>
                  <th className="py-2 px-4 uppercase text-sm">Status</th>
                  <th className="py-2 px-4 uppercase text-sm">Total</th>
                  <th className="py-2 px-4 uppercase text-sm text-center">Action</th>
                </tr>
              </thead>
            </table>
            {/* Scrollable body in a separate container */}
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

      {editModal && <EditProfile setEditModal={setEditModal} refetchProfile={refetch} profileData={profileData} />}
    </>
  );
};

// Props Types
type ProfileType = {
  profileImg: string;
  name: string;
  role: string;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type BillingType = {
  name: string;
  address: string;
  email: string;
  phone: string;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type RecentOrderType = {
  orderId: number;
  date: string;
  total: number;
  status: "Processing" | "On The Way" | "Completed";
  totalProduct: number;
  viewDetail: () => void;
};

// Components
const ProfileCard = ({ name, profileImg, role, setEditModal, }: ProfileType) => (
  <div className="lg:flex-1 rounded-md border border-[#E6E6E6] h-[250px] flex justify-center items-center">
    <div className="px-3 py-5 text-center">
      <img
        src={profileImg}
        className="h-24 w-24 bg-gray-400 mx-auto rounded-full object-cover"
        alt="profile"
        title="profile"
      />
      <h1 className="text-lg capitalize font-semibold mt-3">{name}</h1>
      <p className="text-[#808080] text-[13px] capitalize">{role}</p>
      <button className="text-green text-sm mt-3 cursor-pointer" onClick={() => setEditModal(true)}>
        Edit Profile
      </button>
    </div>
  </div>
);

const BillingAddress = ({ address, email, name, phone, setEditModal }: BillingType) => (
  <div className="lg:flex-1 h-[250px] rounded-md border border-[#E6E6E6] flex items-center mt-5 lg:mt-0">
    <div className="px-3 py-5">
      <h3 className="text-sm text-[#999999] uppercase">Billing Address</h3>
      <h1 className="font-semibold text-md mt-3 capitalize">{name}</h1>
      <p className="text-[#666666] text-sm mt-1 capitalize">{address}</p>
      <a
        href={`mailto:${email}`}
        className="text-[#1A1A1A] hover:underline text-sm mt-2 inline-block"
      >
        {email}
      </a>
      <a
        href={`tel:${phone}`}
        className="text-[#1A1A1A] hover:underline text-md block font-bold"
      >
        {phone}
      </a>
      <button className="text-green text-sm mt-3 cursor-pointer" onClick={()=>setEditModal(true)}>
        Edit Billing Info
      </button>
    </div>
  </div>
);

const RecentOrder = ({ date, orderId, status, total, viewDetail, totalProduct }: RecentOrderType) => (
  <tr className="border-b hover:bg-gray-50 ">
    <td className="py-2 px-4 w-1/5">#{orderId}</td>
    <td className="py-2 px-4 w-1/5">{date}</td>
    <td className="py-2 px-4 w-1/5">
      <span
        className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${status === "Completed"
          ? "bg-green-100 text-green-800"
          : status === "On The Way"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-blue-100 text-green"
          }`}
      >
        {status}
      </span>
    </td>
    <td className="py-2 px-4 w-1/5 font-medium text-[#1A1A1A]">₹{total} ({Math.floor(Math.random() * totalProduct)} Products)</td>
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
