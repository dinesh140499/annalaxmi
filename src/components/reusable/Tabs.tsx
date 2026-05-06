import React from "react";
import { NavLink } from "react-router-dom";

interface ClassName {
  grand?: string;
  parent?: string;
  child?: string;
  icon?: string;
  headingCls?: string;
  element?:string
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
}

const Tabs: React.FC<TabsItem> = ({ tabsNameArr, className, heading }) => {
  return (
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
          className={({ isActive }) =>
            `${className?.child} ${isActive ? "bg-[#EDF2EE] text-black" : ""}`
          }
        >
          {tab.icon && (
            <span className={`mr-2 ${className?.icon}`}>{tab.icon}</span>
          )}
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Tabs;
