import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import ScrollToTop from "../components/reusable/ScrollToTop";
import GlobalLoadingBar from "../components/common/GlobalLoadingBar";
import { useState } from "react";

const MainLayout = () => {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
    const location = useLocation();

    return (
        <div className="custom-scrollbar pb-16 lg:pb-0 relative">
            <GlobalLoadingBar />
            <Navbar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
            <SubMenu toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
            <ScrollToTop />

            <Outlet key={location.pathname} />
            <Footer />

            {/* Sticky Mobile Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

export default MainLayout;