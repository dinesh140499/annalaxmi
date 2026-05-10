import React from "react";
import { NavLink, Outlet } from "react-router-dom";

interface ClassName {
  grand?: string;
  parent?: string;
  child?: string;
  element?: string;
  icon?: string;
  headingCls?: string;
}

interface TabsBtn {
  name: string;
  icon?: React.ReactNode;
  elemCss?: string;
  link: string;
}

interface TabsItem {
  heading?: string;
  tabsNameArr: TabsBtn[];
  className?: ClassName;
  children?: React.ReactNode;
}

const Tabs: React.FC<TabsItem> = ({
  tabsNameArr,
  className,
  heading,
  children,
}) => {
  return (
    <div className={className?.parent}>
      <div className={className?.grand}>
        {heading && (
          <h1
            className={`text-[#1A1A1A] text-lg font-bold px-3 pb-3 ${className?.headingCls}`}
          >
            {heading}
          </h1>
        )}

        {tabsNameArr.map((tab, index) => (
          <NavLink
            to={tab.link}
            key={index}
            end={tab.link === "/"}
            className={({ isActive }) =>
              `${className?.child} ${tab?.elemCss} ${
                isActive ? "bg-[#EDF2EE] text-[black]" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                {tab.icon && (
                  <span
                    className={`mr-2 ${className?.icon} ${
                      isActive ? "text-black" : "text-[#999]"
                    }`}
                  >
                    {tab.icon}
                  </span>
                )}
                <span>{tab.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className={`${className?.element} w-full`}>
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default Tabs;
