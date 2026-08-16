import { useState, type FC, type JSX } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../../components/reusable/Breadcrumps";
import Tabs from "../../components/reusable/Tabs";
import { MdDashboard } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { IoSettingsOutline, IoHomeOutline, IoMenu, IoClose } from "react-icons/io5";

interface TabItem {
  name: string;
  icon: JSX.Element;
  link: string;
}

const tabs: TabItem[] = [
  { name: "Dashboard", icon: <MdDashboard />, link: "dashboard" },
  { name: "Manage Addresses", icon: <IoHomeOutline />, link: "addresses" },
  { name: "Order History", icon: <TfiReload />, link: "order-history" },
  { name: "Settings", icon: <IoSettingsOutline />, link: "settings" },
];

const Account: FC = () => {
  const [mobileMenuToggle, setMobileMenuToggle] = useState<boolean>(false);

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />
      <div className="max-w-[95%] mx-auto py-6 sm:py-10">
        <div className="relative">
          
          {/* Mobile Toggle Button */}
          <div className="flex justify-between items-center lg:hidden mb-4 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Account Menu</span>
            <button
              onClick={() => setMobileMenuToggle(!mobileMenuToggle)}
              className="flex items-center gap-1.5 bg-emerald-800 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-xl cursor-pointer"
            >
              {mobileMenuToggle ? <IoClose className="text-base" /> : <IoMenu className="text-base" />}
              <span>{mobileMenuToggle ? "Close" : "Menu"}</span>
            </button>
          </div>

          <Tabs
            tabsNameArr={tabs}
            className={{
              parent: "flex flex-col lg:flex-row gap-6 lg:min-h-[650px]",
              grand: `flex flex-col bg-white border border-slate-100 rounded-3xl p-3 shadow-xs 
                      w-full lg:w-[280px] lg:h-fit
                      ${mobileMenuToggle ? "block" : "hidden lg:block"}`,
              child:
                "flex items-center gap-3 py-3 px-4 text-xs sm:text-sm font-semibold rounded-2xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 transition",
              icon: "text-base text-emerald-800",
              element: "flex-1 min-w-0 bg-white border border-slate-100 rounded-3xl p-4 sm:p-8 shadow-xs",
            }}
            heading="Navigation"
          >
            <Outlet />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
