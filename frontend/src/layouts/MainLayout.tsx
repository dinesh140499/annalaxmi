import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import SubMenu from "../components/SubMenu";
import Footer from "../components/Footer";
import ScrollToTop from "../components/reusable/ScrollToTop";
import { useState } from "react";

const MainLayout = () => {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)

    return (
        <div className="custom-scrollbar ">
            <Navbar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}/>
            <SubMenu toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}/>
            <ScrollToTop />

            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout