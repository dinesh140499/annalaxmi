import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import projectLogo from '../assets/project-logo.png';
import { RxDashboard } from "react-icons/rx";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface SubCategory {
    name: string;
    link: string;
    children?: SubCategory[];
}

interface Category {
    id: number;
    name: string;
    subCategory: SubCategory[];
}

const categoryList: Category[] = [
    {
        id: 1,
        name: "Fruits & Vegetables",
        subCategory: [
            {
                name: "Fruits1",
                link: "",
                children: [
                    { name: "Apples", link: "" },
                    { name: "Bananas", link: "" },
                ],
            },
            { name: "Fruits2", link: "" },
        ],
    },
    {
        id: 2,
        name: "Dairy & Breakfasts",
        subCategory: [{ name: "Breakfast", link: "" }],
    },
    {
        id: 3,
        name: "Egg, Meat & Fish",
        subCategory: [{ name: "Egg", link: "" }],
    },
    {
        id: 4,
        name: "Bath & Body",
        subCategory: [{ name: "Bath & Body", link: "" }],
    },
    {
        id: 5,
        name: "Cold drinks & Juices",
        subCategory: [{ name: "Cold drinks & Juices", link: "" }],
    },
    {
        id: 6,
        name: "Snacks & Munchies",
        subCategory: [
            { name: "Snacks", link: "" },
            { name: "Munchies", link: "" },
        ],
    },
];

export interface SubMenuProps {
    toggleSidebar: boolean;
    setToggleSidebar: (value: boolean) => void;
}

const SubMenu = ({ toggleSidebar, setToggleSidebar }: SubMenuProps) => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);

    const isLargeScreen = window.innerWidth >= 768;

    const toggleCategory = (id: number) => {
        setActiveCategory(prev => (prev === id ? null : id));
        setActiveSubCategory(null);
    };

    const toggleSubCategory = (index: number) => {
        setActiveSubCategory(prev => (prev === index ? null : index));
    };

    return (
        <div className="max-w-[95%] mx-auto my-3">
            <div className={`fixed duration-300 ease-in-out top-0 left-0 z-50 pointer-events-none w-full h-full bg-[rgba(0,0,0,0.8)] lg:relative lg:bg-transparent lg:pointer-events-auto  ${toggleSidebar ? 'translate-x-0 ' : 'translate-x-full lg:translate-x-0 '}`}>
                <div className="top-0 duration-700 ease-in right-0 z-100 h-full w-[60%] bg-white px-3 fixed lg:relative lg:w-auto pointer-events-auto overflow-y-auto lg:overflow-y-visible">
                    <button className="text-3xl mt-5 lg:hidden" onClick={() => setToggleSidebar(false)}>
                        <IoIosCloseCircleOutline />
                    </button>
                    <Link to={'/'} className='lg:bg-transparent p-3 rounded-b-2xl w-[110px] lg:hidden'>
                        <img src={projectLogo} className='h-35 w-35 mx-auto lg:h-auto lg:w-auto object-contain' alt="project logo" />
                    </Link>

                    <div className="flex flex-col lg:flex-row items-center gap-1">
                        <div className="w-full">
                            <Link to={'/categories'} onClick={() => setToggleSidebar(false)} className="capitalize cursor-pointer bg-[#F3F9FB] px-3 font-semibold hover:text-[#00603A] flex items-center py-3 justify-between lg:justify-evenly text-md lg:py-2 lg:text-sm w-full lg:w-[200px]">
                                <RxDashboard className="text-green" /> Browse All Categories
                            </Link>
                        </div>

                        {categoryList.map((cat) => (
                            <div
                                key={cat.id}
                                className="group bg-[#F3F9FB] w-full relative flex items-center justify-evenly px-2 py-2 lg:py-1 flex-col lg:flex-row"
                                onMouseEnter={() => isLargeScreen && toggleCategory(cat.id)}
                            >
                                <div
                                    className="flex items-center justify-between w-full cursor-pointer"
                                    onClick={() => toggleCategory(cat.id)}
                                >
                                    <p className="capitalize py-1 lg:py-1 text-md lg:text-[13px]">{cat.name}</p>
                                    <RiArrowDropDownLine />
                                </div>

                                <ul className={`
                                    bg-white rounded px-2 py-1 custom-scrollbar w-full lg:w-[180px] lg:absolute lg:top-10 lg:shadow-lg
                                    ${activeCategory === cat.id ? 'block' : 'hidden'} 
                                    lg:group-hover:block lg:opacity-0 lg:invisible lg:group-hover:visible lg:group-hover:opacity-100 transition-all duration-200
                                `}>
                                    {cat.subCategory.map((sub, index) => (
                                        <li
                                            key={index}
                                            className="relative group/sub py-1 px-2 hover:bg-gray-100 cursor-pointer text-md lg:text-sm"
                                        >
                                            <div
                                                className="flex justify-between items-center"
                                                onClick={() => sub.children ? toggleSubCategory(index) : null}
                                            >
                                                <Link to={sub.link} onClick={() => setToggleSidebar(false)}>{sub.name}</Link>
                                                {sub.children && <RiArrowDropDownLine className="rotate-[-90deg]" />}
                                            </div>

                                            {sub.children && (
                                                <ul className={`
                                                    bg-white rounded shadow-lg lg:absolute lg:left-full lg:mt-[-1px] lg:w-[160px]
                                                    ${activeSubCategory === index ? 'block' : 'hidden'} 
                                                    lg:group-hover/sub:block lg:opacity-0 lg:invisible lg:group-hover/sub:visible lg:group-hover/sub:opacity-100 transition-all duration-200
                                                `}>
                                                    {sub.children.map((child, i) => (
                                                        <li key={i} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                                                            <Link onClick={() => setToggleSidebar(false)} to={child.link}>{child.name}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubMenu;
