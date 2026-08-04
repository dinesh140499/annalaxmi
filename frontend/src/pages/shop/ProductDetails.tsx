import { useState } from "react";
import Divider from "../../components/reusable/Divider";
import ProductView from "../../components/shop/details/ProductView";
import AdditionalInformation from "../../components/shop/details/tabs-content/AdditionalInformation";
import Description from "../../components/shop/details/tabs-content/Description";
import CustomerFeedback from "../../components/shop/details/tabs-content/CustomerFeedback";
import RelatedProduct from "../../components/shop/details/RelatedProduct";
import ReusableSwiper from "../../components/ReusableSwiper";


type TabsType = {
  name: string;
  element: React.ReactNode;
};

const tabs: TabsType[] = [
  { name: "additional information", element: <AdditionalInformation /> },
  { name: "descriptions", element: <Description /> },
  { name: "customer feedback", element: <CustomerFeedback /> },
];

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState<string>("additional information");
 

  // Turn each tab button into a Swiper slide
  const tabSlides = tabs.map((tab, i) => (
    <div key={i} className="flex justify-center">
      <button
        className={`capitalize text-[17px] transition-colors  py-3 cursor-pointer duration-200 lg:text-sm border-b-2 border-white whitespace-nowrap  ${activeTab === tab.name
          ? "font-semibold text-[#1A1A1A] border-b-[#20B526]"
          : "text-gray-500"
          }`}
        onClick={() => setActiveTab(tab.name)}
      >
        {tab.name}
      </button>
    </div>
  ));

  return (
    <>
      {/* Product View */}
      <div className="max-w-[90%] w-full lg:max-w-[95%] mx-auto lg:relative">
        <ProductView />
      </div>

      {/* Swipeable Tabs */}
      <div className="max-w-[90%] w-full lg:max-w-[95%] mx-auto mt-10">
        <div className="lg:w-[40%] mx-auto">
          <ReusableSwiper
            slides={tabSlides}
            loop={false}
            navigation={false}
            pagination={false}
            breakpoints={{
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }}
            options={{
              spaceBetween: 10,
              grabCursor: true,
              speed: 600,
              autoplay: false
            }}
          />
        </div>
      </div>

      <Divider marginY="my-0" />

      {/* Active Tab Content */}
      <div className="max-w-[90%] w-full lg:max-w-[95%] mx-auto">
        {tabs.find((tab) => tab.name === activeTab)?.element}
      </div>

      {/* Related Products */}
      <div className="mt-5 lg:mt-0">
        <RelatedProduct />
      </div>
    </>
  );
};

export default ProductDetails;
