import { useState, type FC, type JSX } from "react";
import { Outlet } from "react-router-dom"; // Required for nested routes
import Breadcrumbs from "../../components/reusable/Breadcrumps";
import Tabs from "../../components/reusable/Tabs";
import { MdDashboard, MdLogout } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { GoHeart } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

// Define an interface for your tab items
interface TabItem {
  name: string;
  icon: JSX.Element;
  link: string;
}

const tabs: TabItem[] = [
  { name: "Dashboard", icon: <MdDashboard />, link: "dashboard" },
  { name: "Order History", icon: <TfiReload />, link: "order-history" },
  { name: "Settings", icon: <IoSettingsOutline />, link: "settings" },
  // { name: "Logout", icon: <MdLogout />, link: "logout" },
];

const Account: FC = () => {
  const [mobileMenuToggle, setMobileMenuToggle] = useState<boolean>(false);

  return (
    <>
      <Breadcrumbs />
      <div className="max-w-[95%] mx-auto my-5 overflow-hidden">
        <div className="relative">
          {/* Mobile Toggle */}
          <div className="flex justify-end lg:hidden mb-3">
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] border-b border-[#00603A]">
                {mobileMenuToggle ? "Close" : "Menu"}
              </h1>
              <button onClick={() => setMobileMenuToggle(!mobileMenuToggle)}>
                {mobileMenuToggle ? (
                  <FaToggleOn className="text-green text-2xl" />
                ) : (
                  <FaToggleOff className="text-green text-2xl" />
                )}
              </button>
            </div>
          </div>

          <Tabs
            tabsNameArr={tabs}
            className={{
              parent: "flex gap-5 lg:h-[70vh]",
              grand: `flex flex-col border border-[#E6E6E6] rounded-md pt-2 
                      w-full lg:w-[25%] lg:h-full
                      absolute z-50 top-0 left-0 bg-white 
                      duration-300 ease-in-out
                      ${mobileMenuToggle ? "translate-x-0" : "-translate-x-full"} 
                      lg:translate-x-0 lg:relative`,
              child:
                "flex items-center py-3 px-3 lg:text-[15px] rounded-sm text-[#666666] hover:bg-[#EDF2EE]",
              icon: "text-[#CCCCCC] text-lg",
              element: "flex-1 h-full overflow-y-auto your-scroll-area",
            }}
            heading="Navigation"
          >
            {/* 
               This is the crucial part: 
               The Dashboard, OrderHistory, etc., will render here 
            */}
            <Outlet />
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Account;
