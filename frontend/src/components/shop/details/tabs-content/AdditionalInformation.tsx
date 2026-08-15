import { Link } from "react-router-dom";
import { GrTag } from "react-icons/gr";
import { BiLeaf } from "react-icons/bi";
import IFrame from "../../../reusable/IFrame";

interface AdditionalInformationType {
  weight: string;
  color: string;
  type: string;
  category: string;
  stockstatus: string;
}

interface TagsType extends AdditionalInformationType {
  tags: {
    name: string;
    link: string;
  }[];
}

const info: TagsType = {
  weight: "03",
  category: "vegetables",
  color: "green",
  stockstatus: "4,849",
  type: "organic",
  tags: [
    { name: "Vegetables", link: "vegetables" },
    { name: "Healthy", link: "healthy" },
    { name: "Chinese", link: "chinese" },
    { name: "Cabbage", link: "cabbage" },
    { name: "Green", link: "green" },
    { name: "Cabbage", link: "cabbage" },
  ],
};

const AdditionalInformation = () => {
  return (
    <div className="space-y-3 text-sm text-gray-700 py-5">
      <div className="lg:flex">
        <div className="flex-1">
          <div className="lg:pr-15 lg:pt-10">
            <div className="flex justify-between mb-2 text-[17px] lg:text-sm">Weight: <span className="capitalize text-[#808080] text-[17px] lg:text-sm ">{info.weight} kg</span></div>
            <div className="flex justify-between mb-2 text-[17px] lg:text-sm">Color: <span className="capitalize text-[#808080] text-[17px] lg:text-sm ">{info.color}</span></div>
            <div className="flex justify-between mb-2 text-[17px] lg:text-sm">Type: <span className="capitalize text-[#808080] text-[17px] lg:text-sm ">{info.type}</span></div>
            <div className="flex justify-between mb-2 text-[17px] lg:text-sm">Category: <span className="capitalize text-[#808080] text-[17px] lg:text-sm ">{info.category}</span></div>
            <div className="flex justify-between mb-2 text-[17px] lg:text-sm">Stock Status: <span className="capitalize text-[#808080] text-[17px] lg:text-sm">Available (5,152)</span> </div>
            <div className="flex justify-between text-[17px] lg:text-sm"><span>Tags: </span><div className="text-right max-w-[60%]  w-full lg:max-w-none">
              {info.tags.map((tag, index) => <Link
                key={`${tag.name}-${index}`}
                to={`/tags/${tag.link}`}
                className="hover:underline rounded  mr-1 text-[#808080]  divide-black  hover:text-black inline-block text-[17px] lg:text-sm"
              >
                {tag.name}
              </Link>)}</div></div>
          </div>
        </div>
        <div className="flex-1 mt-5 lg:mt-0">
          <div className="aspect-video rounded overflow-hidden">
            <IFrame videoUrl={"https://www.youtube.com/embed/KhSUTgquWiA"} isEmbed={true}/>
          
          </div>
          <div className="lg:flex justify-between items-center gap-3 border border-[#E6E6E6] rounded-md py-3 px-3 lg:py-5 lg:px-5 mt-5">
            <div className="flex gap-3 items-center">
              <span className="text-3xl text-green"><GrTag /></span>
              <div>
                <h1 className="capitalize font-semibold text-[17px] lg:text-sm">64% Discount</h1>
                <p className="capitalize text-[#808080] text-[13px] mt-1">Save your 64% money with us</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-3xl text-green">
                <BiLeaf />
              </span>
              <div>
                <h1 className="capitalize font-semibold text-[17px] lg:text-sm">100% Organic</h1>
                <p className="capitalize text-[#808080] text-[13px] mt-1">100% Organic Vegetables</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
