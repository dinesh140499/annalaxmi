import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import ScrollToTop from "../components/reusable/ScrollToTop";
import { useState } from "react";

const MainLayout = () => {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

    return (
        <div className="custom-scrollbar pb-16 lg:pb-0">
            <Navbar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
            <SubMenu toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
            <ScrollToTop />

            <Outlet />
            <Footer />

            {/* Sticky Mobile Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

export default MainLayout;