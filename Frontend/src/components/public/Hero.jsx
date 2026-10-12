import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="p-10 min-h-[calc(100vh-64px)] bg-[#faf9ff] px-6 sm:px-10 lg:px-16 flex items-center" id="features">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* LEFT CONTENT */}
                <div className="flex flex-col items-start">

                    {/* Small Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e7efff] text-[#315cff] text-xs font-semibold mb-5">
                        <span className="w-2 h-2 rounded-full bg-[#315cff]" />
                        CREATOR COLLABORATION PLATFORM
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-6xl lg:text-[56px] leading-[1.08] font-bold tracking-tight text-[#111827]">
                        Collaborate with
                        <br />
                        <span className="text-[#1557d6]">
                            confidence.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-[#525b6c]">
                        Find the right creators, manage collaborations, organize
                        content, and measure campaign results — all in one
                        centralized enterprise workspace.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mt-8">

                        <button className="px-6 py-3 rounded-lg bg-[#1557d6] text-white text-sm font-semibold shadow-sm hover:bg-[#1049b7] transition cursor-pointer"
                            onClick={() => navigate("/login")}>
                            Find Creators →
                        </button>

                        <button className="px-6 py-3 rounded-lg bg-white border border-[#e1e5ee] text-[#315cff] text-sm font-semibold hover:bg-[#f4f6ff] transition cursor-pointer"
                            onClick={() => navigate("/login")}>
                            ♙ &nbsp; I'm a Creator
                        </button>

                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center gap-4 mt-9">

                        {/* Avatars */}
                        <div className="flex -space-x-2.5">
                            <div className="w-9 h-9 rounded-full bg-[#d7a76e] border-2 border-[#faf9ff] flex items-center justify-center text-xs">
                                👨🏻
                            </div>

                            <div className="w-9 h-9 rounded-full bg-[#e9b6a5] border-2 border-[#faf9ff] flex items-center justify-center text-xs">
                                👩🏻
                            </div>

                            <div className="w-9 h-9 rounded-full bg-[#c7d5e8] border-2 border-[#faf9ff] flex items-center justify-center text-xs">
                                👨🏽
                            </div>

                            <div className="w-9 h-9 rounded-full bg-[#dfc19a] border-2 border-[#faf9ff] flex items-center justify-center text-xs">
                                👩🏽
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[#f59e0b] text-xs">
                                    ★★★★★
                                </span>

                                <span className="text-xs font-bold text-[#333]">
                                    4.9/5
                                </span>
                            </div>

                            <p className="text-xs text-[#666] mt-0.5">
                                Trusted by 1,200+ local brands and 5,000+ regional creators
                            </p>
                        </div>

                    </div>

                </div>


                {/* RIGHT DASHBOARD (ANIMATED) */}
                <div className="relative flex justify-center lg:justify-end">

                    {/* Ambient Pulsing Glow */}
                    <div className="absolute inset-0 bg-[#dfe8ff] blur-3xl opacity-50 rounded-full animate-pulse transition-all duration-1000" />

                    {/* Main Card with entrance float & shadow hover */}
                    <div className="relative w-full max-w-[540px] bg-white rounded-2xl border border-[#e5e8f0] shadow-[0_20px_50px_rgba(31,45,80,0.12)] p-4 sm:p-5 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(31,45,80,0.18)] hover:-translate-y-1">

                        {/* Browser Header */}
                        <div className="flex items-center justify-between px-1 pb-4">

                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ff6159] hover:opacity-80 transition-opacity" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd44] hover:opacity-80 transition-opacity" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#00ca4e] hover:opacity-80 transition-opacity" />

                                <span className="ml-2 text-xs font-medium text-[#666]">
                                    campgn.workspace / campaign-view
                                </span>
                            </div>

                            {/* Animated Pulse Status Indicator */}
                            <div className="flex items-center gap-2 text-xs font-medium text-[#20a96b]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20a96b] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#20a96b]"></span>
                                </span>
                                Active Collaboration
                            </div>

                        </div>


                        {/* Campaign Container */}
                        <div className="rounded-xl bg-[#f5f7ff] border border-[#e5e9f5] p-4">

                            <div className="flex justify-between gap-3">

                                <div>
                                    <p className="text-xs text-[#315cff] font-bold tracking-wide">
                                        ACTIVE CAMPAIGN
                                    </p>

                                    <h3 className="text-sm sm:text-base font-bold text-[#202938] mt-1">
                                        Summer Nitro Cold Brew Launch
                                    </h3>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-[#8a91a0]">
                                        Brand Partner
                                    </p>

                                    <p className="text-xs font-bold text-[#202938] mt-0.5">
                                        🟠 Roast & Co.
                                    </p>
                                </div>

                            </div>


                            {/* Creator Card */}
                            <div className="mt-4 bg-white rounded-xl border border-[#e4e8f2] p-3.5 transition-all duration-200 hover:scale-[1.01] hover:shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-full bg-[#c99c65] flex items-center justify-center text-base shadow-inner">
                                            👩🏻
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-[#202938]">
                                                Maya Lin ✓
                                            </p>

                                            <p className="text-xs text-[#818896]">
                                                @mayaxlin • Austin, TX
                                            </p>
                                        </div>

                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#202938]">
                                            18.4k
                                        </p>

                                        <p className="text-xs font-semibold text-[#24a16d]">
                                            6.2% avg. Rate
                                        </p>
                                    </div>

                                </div>


                                {/* Requirements Checklist */}
                                <div className="mt-4 space-y-2.5">

                                    <div className="flex items-center justify-between text-xs group">
                                        <span className="text-[#444] font-medium group-hover:text-[#202938] transition-colors">
                                            ◉ 3 Instagram Reels
                                        </span>

                                        <span className="text-[#315cff] font-bold bg-[#edf2ff] px-2 py-0.5 rounded-full">
                                            Approved
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-[#444] font-medium">
                                            ◉ 2x Story Sequences
                                        </span>

                                        <span className="text-[#666]">
                                            June 14
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-[#444] font-medium">
                                            ◉ Commercial Usage Rights
                                        </span>

                                        <span className="text-[#666]">
                                            60 Days
                                        </span>
                                    </div>

                                </div>

                                {/* Animated Progress Bar */}
                                <div className="mt-4">

                                    <div className="flex justify-between text-xs font-medium text-[#666] mb-1.5">
                                        <span>Campaign Progress</span>
                                        <span className="font-bold text-[#333]">72%</span>
                                    </div>

                                    <div className="h-2 bg-[#e9edf5] rounded-full overflow-hidden">
                                        <div className="h-full w-[72%] bg-[#315cff] rounded-full transition-all duration-1000 ease-out" />
                                    </div>

                                </div>

                            </div>


                            {/* Escrow Funded Badge */}
                            <div className="mt-3.5 bg-[#f2fff8] border border-[#d8f3e5] rounded-xl p-3.5 flex items-center justify-between transition-all duration-200 hover:scale-[1.01]">

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#d9f7e7] flex items-center justify-center text-sm font-bold text-[#15915e] transition-transform duration-300 hover:rotate-12">
                                        $
                                    </div>

                                    <div>
                                        <p className="text-xs sm:text-sm font-bold text-[#15915e]">
                                            Escrow Funded ($450.00)
                                        </p>

                                        <p className="text-xs text-[#527d67]">
                                            Funds released upon final content verification
                                        </p>
                                    </div>
                                </div>

                                <span className="text-sm text-[#20a96b] font-bold">
                                    ✓
                                </span>

                            </div>


                            {/* Animated Stat Cards */}
                            <div className="grid grid-cols-3 gap-3 mt-3.5">

                                <div className="bg-white rounded-xl p-3 text-center border border-[#e4e8f2] hover:-translate-y-1 hover:border-[#315cff]/30 hover:shadow-sm transition-all duration-200">
                                    <p className="text-xs text-[#666]">
                                        Clicks
                                    </p>

                                    <p className="text-base sm:text-lg font-bold text-[#263247] mt-0.5">
                                        2,840
                                    </p>

                                    <p className="text-xs font-semibold text-[#21a66b]">
                                        +14.2%
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-3 text-center border border-[#e4e8f2] hover:-translate-y-1 hover:border-[#315cff]/30 hover:shadow-sm transition-all duration-200">
                                    <p className="text-xs text-[#666]">
                                        Conversions
                                    </p>

                                    <p className="text-base sm:text-lg font-bold text-[#263247] mt-0.5">
                                        182
                                    </p>

                                    <p className="text-xs font-semibold text-[#21a66b]">
                                        +8.7%
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-3 text-center border border-[#e4e8f2] hover:-translate-y-1 hover:border-[#315cff]/30 hover:shadow-sm transition-all duration-200">
                                    <p className="text-xs text-[#666]">
                                        Attributed GMV
                                    </p>

                                    <p className="text-base sm:text-lg font-bold text-[#263247] mt-0.5">
                                        $2,390
                                    </p>

                                    <p className="text-xs font-semibold text-[#21a66b]">
                                        +21.4%
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;