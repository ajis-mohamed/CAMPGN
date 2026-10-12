import React from "react";
import { useNavigate } from "react-router-dom";

function CTASection() {
    const navigate = useNavigate();

    return (
        <section className="w-full bg-[#faf9ff] px-6 pb-20">
            <div className="w-full max-w-7xl mx-auto">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0753c9] to-[#3472ed] px-8 sm:px-10 lg:px-12 py-10 sm:py-12 shadow-[0_12px_30px_rgba(40,70,150,0.15)]">

                    {/* Glow effect */}
                    <div className="absolute -right-20 -top-32 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

                    <div className="relative">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5ee6ae]" />
                            Get started in 3 minutes
                        </div>

                        {/* Heading */}
                        <h2 className="mt-5 max-w-lg text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                            Ready to collaborate with confidence?
                        </h2>

                        {/* Description */}
                        <p className="mt-4 max-w-2xl text-xs sm:text-sm text-blue-100 leading-relaxed">
                            Join over 1,200 brands and 8,500 regional creators
                            scaling transparent, performance-driven partnerships
                            on CAPGN today.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-3 mt-7">
                            <button
                                onClick={() => navigate("/register")}
                                className="px-6 py-3.5 rounded-xl bg-white text-[#1557d6] text-xs sm:text-sm font-bold shadow-sm hover:bg-blue-50 transition cursor-pointer active:scale-[0.99]"
                            >
                                Get Started Free →
                            </button>

                            <button
                                onClick={() => navigate("/about")}
                                className="px-6 py-3.5 rounded-xl bg-[#2868da] border border-blue-400/30 text-white text-xs sm:text-sm font-semibold hover:bg-[#1d55bc] transition cursor-pointer active:scale-[0.99]"
                            >
                                Explore CAPGN
                            </button>
                        </div>

                        {/* Benefits */}
                        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-7 pt-5 border-t border-white/10">
                            <div className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                                <span className="text-emerald-300 font-bold">✓</span>
                                No credit card required
                            </div>
                            <div className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                                <span className="text-emerald-300 font-bold">✓</span>
                                Free 14-day brand trial
                            </div>
                            <div className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                                <span className="text-emerald-300 font-bold">✓</span>
                                Instant creator access
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTASection;