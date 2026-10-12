import React from "react";

function ForBrands() {
    const deliverables = [
        {
            name: "Liam Davis",
            type: "TikTok Video • 3x Reels",
            status: "Approved",
            statusColor: "text-green-600 bg-green-50",
            avatar: "👨🏻",
        },
        {
            name: "Sarah Chen",
            type: "2x Story • Review",
            status: "Needs Proof",
            statusColor: "text-orange-500 bg-orange-50",
            avatar: "👩🏻",
        },
        {
            name: "Mateo Rossi",
            type: "Podcast • Interview",
            status: "Shipped",
            statusColor: "text-blue-600 bg-blue-50",
            avatar: "👨🏻",
        },
    ];

    return (
        <section className="w-full bg-[#faf9ff] px-6 py-24 sm:py-28" id="for-brands">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* LEFT CONTENT */}
                <div>

                    {/* Badge */}
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#e5edff] text-[#315cff] text-xs font-semibold uppercase tracking-wide">
                        Built for growing businesses
                    </div>


                    {/* Heading */}
                    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] leading-[1.08] font-bold tracking-tight text-[#111827]">
                        Turn creator marketing into 
                        <br className="hidden sm:block" />
                        <span className="text-[#111827]">
                            predictable growth channel.
                        </span>
                    </h2>


                    {/* Description */}
                    <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-[#525b6c]">
                        Stop relying on generic agencies or chaotic spreadsheets.
                        CAPGN gives your regional marketing team enterprise
                        controls without bureaucratic overhead.
                    </p>


                    {/* Features */}
                    <div className="mt-8 space-y-5">

                        {/* Feature 1 */}
                        <div className="flex gap-3.5">
                            <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#d8f7e8] flex items-center justify-center text-[#20b477] text-xs font-bold">
                                ✓
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-[#263247]">
                                    Discover relevant creators
                                </h3>

                                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#687080]">
                                    Filter regional nano and micro creators whose audiences
                                    live directly within your target market footprint.
                                </p>
                            </div>
                        </div>


                        {/* Feature 2 */}
                        <div className="flex gap-3.5">
                            <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#d8f7e8] flex items-center justify-center text-[#20b477] text-xs font-bold">
                                ✓
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-[#263247]">
                                    Create campaigns
                                </h3>

                                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#687080]">
                                    Launch standardized briefs in minutes with set
                                    deliverables, content usage rights, and approvals.
                                </p>
                            </div>
                        </div>


                        {/* Feature 3 */}
                        <div className="flex gap-3.5">
                            <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#d8f7e8] flex items-center justify-center text-[#20b477] text-xs font-bold">
                                ✓
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-[#263247]">
                                    Review applications
                                </h3>

                                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#687080]">
                                    Compare creator pitch proposals, past deliverables,
                                    verified rates, and audience statistics side by side.
                                </p>
                            </div>
                        </div>


                        {/* Feature 4 */}
                        <div className="flex gap-3.5">
                            <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#d8f7e8] flex items-center justify-center text-[#20b477] text-xs font-bold">
                                ✓
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-[#263247]">
                                    Manage deliverables & approvals
                                </h3>

                                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#687080]">
                                    Review HD video submissions, pin timestamped revision
                                    notes, and approve live publishing with one click.
                                </p>
                            </div>
                        </div>


                        {/* Feature 5 */}
                        <div className="flex gap-3.5">
                            <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#d8f7e8] flex items-center justify-center text-[#20b477] text-xs font-bold">
                                ✓
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-[#263247]">
                                    Track revenue attribution
                                </h3>

                                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#687080]">
                                    Real-time revenue attribution, UTM parameter tracking,
                                    and precise return-on-ad-spend (ROAS) dashboards.
                                </p>
                            </div>
                        </div>

                    </div>


                    {/* CTA */}
                    <button className="mt-8 px-6 py-3 rounded-lg bg-[#1557d6] text-white text-sm font-semibold shadow-sm hover:bg-[#1049b7] transition">
                        Start a Campaign&nbsp; →
                    </button>

                </div>


                {/* RIGHT DASHBOARD */}
                <div className="flex justify-center lg:justify-end">

                    <div className="w-full max-w-[520px] bg-white rounded-2xl border border-[#e4e7ef] shadow-[0_20px_50px_rgba(40,50,90,0.12)] p-4 sm:p-5">

                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-[#edf0f5]">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-lg bg-[#e5edff] text-[#315cff] flex items-center justify-center text-sm font-bold">
                                    ⚑
                                </div>

                                <div>
                                    <h3 className="text-xs sm:text-sm font-bold text-[#202938]">
                                        Campaign Manager
                                    </h3>

                                    <p className="text-xs text-[#7b8290]">
                                        Full Annual Bakery Promo • 6 Creators Active
                                    </p>
                                </div>

                            </div>

                            <span className="px-2.5 py-1 rounded-md bg-[#e8f0ff] text-[#315cff] text-xs font-semibold">
                                02 Active
                            </span>

                        </div>


                        {/* Revenue */}
                        <div className="mt-4 bg-[#f3f6ff] rounded-xl p-4">

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <p className="text-xs text-[#666]">
                                        Total Spend (Escrow)
                                    </p>

                                    <p className="text-lg sm:text-xl font-bold text-[#202938] mt-0.5">
                                        $3,200.00
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-[#666]">
                                        Projected Revenue
                                    </p>

                                    <p className="text-lg sm:text-xl font-bold text-[#12a96b] mt-0.5">
                                        $14,800.00
                                    </p>

                                    <p className="text-xs font-semibold text-[#20a96b]">
                                        4.62x Expected ROAS
                                    </p>
                                </div>

                            </div>

                            <div className="mt-3 h-2 bg-[#dce3f3] rounded-full overflow-hidden">
                                <div className="w-[42%] h-full bg-[#315cff] rounded-full" />
                            </div>

                        </div>


                        {/* Active Deliverables */}
                        <div className="mt-5">

                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-xs font-bold text-[#202938] uppercase tracking-wide">
                                    Active Creator Deliverables
                                </h4>

                                <span className="text-xs font-medium text-[#7b8290]">
                                    3 Active
                                </span>
                            </div>


                            {/* Creator Rows */}
                            <div className="space-y-2.5">

                                {deliverables.map((creator, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-[#f5f7ff] border border-[#e7eaf3] rounded-xl p-3"
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-full bg-[#ead4bc] flex items-center justify-center text-base">
                                                {creator.avatar}
                                            </div>

                                            <div>
                                                <p className="text-xs sm:text-sm font-bold text-[#263247]">
                                                    {creator.name}
                                                </p>

                                                <p className="text-xs text-[#7b8290]">
                                                    {creator.type}
                                                </p>
                                            </div>

                                        </div>


                                        <div className="flex items-center gap-2.5">

                                            <span
                                                className={`px-2 py-1 rounded-md text-xs font-semibold ${creator.statusColor}`}
                                            >
                                                {creator.status}
                                            </span>

                                            <span className="text-sm text-[#315cff] font-bold">
                                                →
                                            </span>

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>


                        {/* Campaign Milestones */}
                        <div className="mt-5 pt-4 border-t border-[#edf0f5]">

                            <div className="flex justify-between items-center">

                                <div>
                                    <p className="text-xs text-[#666]">
                                        Campaign Milestones
                                    </p>

                                    <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#263247]">
                                        Content production & approvals
                                    </p>
                                </div>

                                <span className="text-xs sm:text-sm text-[#315cff] font-bold">
                                    75% Complete
                                </span>

                            </div>

                            <div className="mt-2.5 h-2 bg-[#e7ebf4] rounded-full overflow-hidden">
                                <div className="w-3/4 h-full bg-[#315cff] rounded-full" />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default ForBrands;