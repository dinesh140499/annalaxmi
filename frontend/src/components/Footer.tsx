import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { SocialLink } from "./home/Subscribe";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import AppStore from '../assets/images/apple-support.png'
import Playstore from '../assets/images/playstore-support.png'


const socialLinks: SocialLink[] = [
    { name: "Facebook", icon: FaFacebookF, link: "https://facebook.com" },
    { name: "Pinterest", icon: FaPinterestP, link: "https://pinterest.com" },
    { name: "Instagram", icon: FaInstagram, link: "https://instagram.com" },
];

interface PageRoutes {
    heading: string;
    page: {
        name?: string,
        link: string,
        image?: string
    }[]
}

const pages: [PageRoutes, PageRoutes, PageRoutes] = [
    {
        heading: "Popular Categories",
        page: [
            {
                name: "Fruits & Vegetables",
                link: ""
            },
            {
                name: "Dairy & Breakfasts",
                link: ""
            },
            {
                name: "Egg, Meat & Fish",
                link: ""
            },
            {
                name: "Bath & Body",
                link: ""
            },
            {
                name: "Cold Drinks & Juices",
                link: ""
            },
            {
                name: "Snacks & Munchies",
                link: ""
            },
        ]
    },
    {
        heading: "Customer Services",
        page: [
            {
                name: "Terms & Conditions",
                link: ""
            },
            {
                name: "FAQ",
                link: ""
            },
            {
                name: "Privacy Policy",
                link: ""
            },
            {
                name: "Cancellation & Return Policy",
                link: ""
            },
        ]
    },
    {
        heading: "Download App",
        page: [
            {
                link: "",
                image: AppStore
            },
            {
                link: "",
                image: Playstore
            },
        ]
    },
]

const Footer = () => {
    return (
        <div className='py-8 bg-[#000000] relative'>
            <div className="max-w-[95%] w-full mx-auto text-white">
                <div className="lg:flex justify-between w-full">
                    <div className="lg:flex-1 mt-5">
                        <h1 className="text-lg mb-3">Contact Us</h1>
                        <div className="flex gap-2">
                            <Link to={'/'} className="text-white text-2xl lg:text-lg inline-block">
                                <FaWhatsapp />
                            </Link>
                            <div>
                                <h1 className="text-lg lg:text-[13px]">WhatsApp</h1>
                                <Link to={'/'} className="text-white text-md lg:text-sm inline-block">
                                    +1 202-918-2132
                                </Link>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <Link to={'/'} className="text-white text-2xl lg:text-lg inline-block">
                                <FiPhoneCall />
                            </Link>
                            <div>
                                <h1 className="text-lg lg:text-[13px]">Call Us</h1>
                                <Link to={'/'} className="text-white text-md lg:text-sm inline-block">
                                    +1 202-918-2132
                                </Link>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            {socialLinks.map(({ name, icon: Icon, link }) => (
                                <Link
                                    key={name}
                                    to={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green p-[7px] transition  rounded-full duration-75 hover:bg-white hover:text-[#00603a] text-2xl lg:text-[20px]"
                                    aria-label={name}
                                >
                                    <Icon />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="lg:flex-2/5 grid grid-cols-1 md:grid-cols-2 mt-3 lg:grid-cols-3 lg:justify-items-end">
                        {pages?.map((items, i) => <div key={i} className="mb-3 lg:mb-0">
                            {/* Heading */}
                            <div className="pb-2 mb-3 lg:mb-0 ">
                                <h1 className="text-lg font-bold ">{items.heading}</h1>
                                <div className="h-[2px] w-[100px] bg-white"></div>
                            </div>
                            <ul>
                                {items.page?.map((link, i) => <li className="pb-2 " key={i}>
                                    <Link key={i} to={link.link} className="text-md lg:text-[13px] inline-block font-light">{link.name ? link.name : <img className="w-[150px] h-full object-cover" src={link.image}/>}</Link>
                                </li>)}
                            </ul>
                        </div>)}
                    </div>
                </div>
                <div className="h-[1px] my-5 bg-white w-full">
                </div>
                    <h1 className="text-center lg:text-md">© 2025 All rights reserved.Annalaxmi</h1>
            </div>
        </div>
    )
}

export default Footer