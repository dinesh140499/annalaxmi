import Breadcrumbs from "../../components/reusable/Breadcrumps";
import Tabs from "../../components/reusable/Tabs";
import { MdDashboard } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { GoHeart } from "react-icons/go";
// import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";
import { useState } from "react";

const tabs = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
    link: "dashboard"
  },
  {
    name: "Order History",
    icon: <TfiReload />,
    link: "order-history"
  },
  {
    name: "Wishlist",
    icon: <GoHeart />,
    link: "wishlist"
  },
  // {
  //   name: "Shopping Cart",
  //   icon: <HiOutlineShoppingBag />,
  //   link: "shopping-cart"
  // },
  {
    name: "Settings",
    icon: <IoSettingsOutline />,
    link: "settings"
  },
  {
    name: "Logout",
    icon: <MdDashboard />,
    link: "logout"
  },
];

const Account = () => {
  const [mobileMenuToggle, setMobileMenuToggle] = useState<boolean>(false)

  return (
    <>
      <Breadcrumbs />
      <div className={`max-w-[90%] w-full  mx-auto lg:relative   lg:h-[70vh]  lg:max-w-[95%] my-5 ${mobileMenuToggle ? 'h-[50vh]':'h-[40vh]'}`}>
        <div className="h-full relative">
          {mobileMenuToggle ?
            <button className="absolute z-[60] top-2 right-2  text-2xl block lg:hidden" onClick={() => setMobileMenuToggle(false)}>
              <FaToggleOn className="text-green" />
            </button> :
            <div className="relative w-full flex justify-end mb-3">
              <div className="relative z-[10] top-0 right-0 text-2xl lg:hidden">
                <div className="flex items-center gap-2">
                  <h1 className="text-[18px] border-b border-[#00603A]">Menu</h1>
                  <button onClick={() => setMobileMenuToggle(true)}>
                    <FaToggleOff className="text-green  text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          }
          <Tabs
            tabsNameArr={tabs}
            className={{
              parent: "flex gap-5 h-full lg:max-h-[60vh] relative overflow-x-hidden lg:overflow-x-auto",
              grand: `  flex flex-col  h-full overflow-y-auto border border-[#E6E6E6] rounded-md pt-2 w-full lg:w-[25%] absolute z-50 top-0 left-0 bg-white justify-center duration-300 ease-in-out ${mobileMenuToggle ? 'translate-x-0' : ' -translate-x-full'} lg:translate-x-0 lg:justify-start lg:relative `,
              child: "flex items-center  active:bg-[#EDF2EE] active:text-[#1A1A1A] py-3 px-3 lg:text-[15px] rounded-sm text-[#666666]",
              icon: "text-[#CCCCCC] text-lg",
              element: "lg:h-[80vh] overflow-y-auto "
            }}
            heading="Navigation"
          />

        </div>
      </div>
    </>
  );
};

export default Account;
