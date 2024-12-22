import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";


const MainLayout = () => {
    return (
        <div className="min-h-screen max-w-6xl mx-auto flex flex-col">
            <Navbar></Navbar>
            <div className="flex-grow">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;