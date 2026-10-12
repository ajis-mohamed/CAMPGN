import { Outlet } from "react-router-dom";
import NavbarPublic from "../components/public/NavbarPublic";
import Footer from "../components/public/Footer";

function PublicLayout() {
    return (
        <>
            <NavbarPublic />
            <Outlet />
            <Footer />
        </>
    );
}

export default PublicLayout;