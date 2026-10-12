import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

function NavbarPublic() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Universal scroll/navigate handler for home page sections
    const handleSectionClick = (sectionId) => {
        setMobileMenuOpen(false); // Close mobile menu if open

        if (location.pathname !== "/") {
            // If we are on another page (like /about), navigate home first
            navigate("/");
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 150);
        } else {
            // If already on home page, scroll directly
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav className="sticky top-0 w-full h-[64px] bg-white flex items-center justify-between px-4 sm:px-6 shadow-sm relative z-50">

            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                <img
                    src={logo}
                    alt="Logo"
                    className="h-7 sm:h-8 w-auto object-contain"
                />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center gap-8">
                <button
                    onClick={() => handleSectionClick("features")}
                    className="text-[13px] font-medium text-[#555] cursor-pointer hover:text-[#315cff] transition bg-transparent border-none"
                >
                    Features
                </button>
                <button
                    onClick={() => handleSectionClick("how-it-works")}
                    className="text-[13px] font-medium text-[#555] cursor-pointer hover:text-[#315cff] transition bg-transparent border-none"
                >
                    How It Works
                </button>
                <button
                    onClick={() => handleSectionClick("for-brands")}
                    className="text-[13px] font-medium text-[#555] cursor-pointer hover:text-[#315cff] transition bg-transparent border-none"
                >
                    For Brands
                </button>
                <button
                    onClick={() => handleSectionClick("for-creators")}
                    className="text-[13px] font-medium text-[#555] cursor-pointer hover:text-[#315cff] transition bg-transparent border-none"
                >
                    For Creators
                </button>
                <button
                    onClick={() => {
                        navigate("/about");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-[13px] font-medium text-[#555] cursor-pointer hover:text-[#315cff] transition bg-transparent border-none"
                >
                    About
                </button>
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center justify-end gap-5">
                {/* Theme */}
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#555] text-lg hover:bg-gray-100 transition">
                    ☼
                </button>

                {/* Login */}
                <button className="text-[13px] font-medium text-[#555] hover:text-[#315cff] transition cursor-pointer"
                    onClick={() => navigate("/login")}>
                    Log in
                </button>

                {/* Get Started */}
                <button className="h-[38px] px-5 bg-[#315cff] text-white rounded-[6px] text-[13px] font-semibold shadow-sm hover:bg-[#244be0] transition cursor-pointer"
                    onClick={() => navigate("/register")}>
                    Get Started
                </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-3 lg:hidden">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[#555] hover:bg-gray-100 transition"
                    aria-label="Toggle Menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-[64px] left-0 w-full bg-white border-b border-gray-100 shadow-xl px-6 py-6 flex flex-col gap-4 lg:hidden animate-fadeIn">
                    <button
                        onClick={() => handleSectionClick("features")}
                        className="text-left text-sm font-semibold text-[#315cff] cursor-pointer bg-transparent border-none py-1"
                    >
                        Features
                    </button>
                    <button
                        onClick={() => handleSectionClick("how-it-works")}
                        className="text-left text-sm font-medium text-[#555] cursor-pointer bg-transparent border-none py-1"
                    >
                        How It Works
                    </button>
                    <button
                        onClick={() => handleSectionClick("for-brands")}
                        className="text-left text-sm font-medium text-[#555] cursor-pointer bg-transparent border-none py-1"
                    >
                        For Brands
                    </button>
                    <button
                        onClick={() => handleSectionClick("for-creators")}
                        className="text-left text-sm font-medium text-[#555] cursor-pointer bg-transparent border-none py-1"
                    >
                        For Creators
                    </button>
                    <button
                        onClick={() => {
                            navigate("/about");
                            setMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-left text-sm font-medium text-[#555] cursor-pointer bg-transparent border-none py-1"
                    >
                        About
                    </button>

                    <hr className="border-gray-100 my-1" />

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#555]">Theme Mode</span>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#555] text-lg bg-gray-50">
                            ☼
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                        <button className="w-full py-2.5 text-center text-sm font-medium text-[#555] border border-gray-200 rounded-lg"
                            onClick={() => navigate("/login")}>
                            Log in
                        </button>
                        <button className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#315cff] rounded-lg shadow-sm"
                            onClick={() => navigate("/register")}>
                            Get Started
                        </button>
                    </div>
                </div>
            )}

        </nav>
    );
}

export default NavbarPublic;