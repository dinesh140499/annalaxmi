import { useState } from "react";
import ProductView from "../../components/shop/details/ProductView";
import AdditionalInformation from "../../components/shop/details/tabs-content/AdditionalInformation";
import Description from "../../components/shop/details/tabs-content/Description";
import CustomerFeedback from "../../components/shop/details/tabs-content/CustomerFeedback";
import RelatedProduct from "../../components/shop/details/RelatedProduct";

type TabKey = "description" | "nutrition" | "feedback";

interface TabItem {
  key: TabKey;
  label: string;
  badge?: string;
  component: React.ReactNode;
}

const tabs: TabItem[] = [
  { key: "description", label: "Product Story & Harvesting", component: <Description /> },
  { key: "nutrition", label: "Nutritional Facts & Lab Report", component: <AdditionalInformation /> },
  { key: "feedback", label: "Customer Reviews", badge: "48", component: <CustomerFeedback /> },
];

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  return (
    <div className="bg-slate-50/50 min-h-screen py-4">
      {/* Product Hero & Details */}
      <div className="max-w-[95%] mx-auto bg-white rounded-3xl p-4 sm:p-8 border border-slate-100 shadow-xs mb-8">
        <ProductView />
      </div>

      {/* Tabs Section */}
      <div className="max-w-[95%] mx-auto bg-white rounded-3xl p-4 sm:p-8 border border-slate-100 shadow-xs mb-8">
        
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto custom-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 sm:px-6 py-3 font-heading text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition cursor-pointer border-b-2 -mb-[1px] flex items-center gap-2 ${
                activeTab === tab.key
                  ? "border-emerald-800 text-emerald-950 bg-emerald-50/50 rounded-t-xl"
                  : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-extrabold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {tabs.find((t) => t.key === activeTab)?.component}
        </div>

      </div>

      {/* Frequently Bought Together */}
      <RelatedProduct />
    </div>
  );
};

export default ProductDetails;
