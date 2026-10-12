import React from "react";
import logo from "../../assets/logo.png"

function Footer() {
    return (
        <footer className="w-full bg-white border-t border-[#e2e8f0]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

                {/* Top Section: Brand Info & Link Columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2 pr-4">
                        <div className="w-[220px] flex items-center gap-3">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-7 w-auto object-contain"
                            />
                        </div>
                        <p className="text-xs leading-relaxed text-[#687080] max-w-sm mb-6 mt-3">
                            The marketplace connecting regional brands with verified nano and micro creators for hyper-local impact.
                        </p>
                        <div className="flex items-center gap-3 text-[#687080]">
                            <span className="material-symbols-outlined text-[18px] hover:text-[#315cff] cursor-pointer transition-colors">alternate_email</span>
                            <span className="material-symbols-outlined text-[18px] hover:text-[#315cff] cursor-pointer transition-colors">public</span>
                            <span className="material-symbols-outlined text-[18px] hover:text-[#315cff] cursor-pointer transition-colors">chat</span>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#202938] mb-4">Product</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Discovery Engine</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Campaign Manager</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Escrow & Payouts</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Analytics Suite</li>
                        </ul>
                    </div>

                    {/* For Brands Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#202938] mb-4">For Brands</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Regional Campaigns</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Brand Safety</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">ROI Reporting</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Enterprise Custom</li>
                        </ul>
                    </div>

                    {/* For Creators Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#202938] mb-4">For Creators</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Creator Portal</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Local Opportunities</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Payment Protection</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Media Kits</li>
                        </ul>
                    </div>

                    {/* Company & Legal Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#202938] mb-4">Company & Legal</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">About Us</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Support Center</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Privacy Policy</li>
                            <li className="text-[#687080] hover:text-[#202938] transition-colors cursor-pointer">Terms of Service</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Secondary Links */}
                <div className="pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#687080]">
                    <p>© 2026 CAPGN Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6 font-medium">
                        <span className="hover:text-[#202938] transition-colors cursor-pointer">Status</span>
                        <span className="hover:text-[#202938] transition-colors cursor-pointer">Trust & Safety</span>
                        <span className="hover:text-[#202938] transition-colors cursor-pointer">Cookies</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;