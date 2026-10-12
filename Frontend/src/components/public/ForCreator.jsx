import React from "react";

function ForCreator() {
    const features = [
        {
            title: "Build a verified professional media kit",
            description:
                "Showcase verified demographic metrics, audience distribution, past case studies, and transparent pricing.",
        },
        {
            title: "Discover hyper-local campaigns",
            description:
                "Gain immediate access to premium local restaurants, lifestyle brands, and regional companies eager for your voice.",
        },
        {
            title: "Submit drafts without email compression",
            description:
                "Upload full 4K and ProRes videos directly. Receive pinned feedback and timestamped revisions directly on the footage.",
        },
        {
            title: "Guaranteed Escrow Payouts",
            description:
                "Funds are released automatically into your bank the moment your deliverable satisfies milestone terms.",
        },
    ];

    return (
        <section className="w-full bg-[#f5f6ff] px-6 py-24 sm:py-28" id="for-creators">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* LEFT - CREATOR PROFILE CARD */}
                <div className="flex justify-center lg:justify-start">

                    <div className="w-full max-w-[480px] bg-white rounded-2xl border border-[#e5e8f0] shadow-[0_20px_50px_rgba(40,50,90,0.12)] p-5">

                        {/* Profile */}
                        <div className="flex items-center gap-3.5 pb-4 border-b border-[#edf0f5]">

                            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#d8c3a8] flex items-center justify-center text-xl">
                                👩🏻
                            </div>

                            <div className="flex-1">

                                <div className="flex items-center gap-1.5">
                                    <h3 className="text-sm font-bold text-[#202938]">
                                        Elena Santos
                                    </h3>

                                    <span className="text-[#315cff] text-xs font-bold">
                                        ✓
                                    </span>
                                </div>

                                <p className="text-xs text-[#6f7684]">
                                    @elenadoodles • Seattle, WA
                                </p>

                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="px-2 py-0.5 rounded-md bg-[#e7efff] text-[#315cff] text-xs font-semibold">
                                        Food & Lifestyle
                                    </span>

                                    <span className="text-xs text-[#666]">
                                        Avg response: 2h
                                    </span>
                                </div>

                            </div>

                        </div>


                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2.5 mt-4">

                            <div className="bg-[#eef1ff] rounded-xl p-3 text-center">
                                <p className="text-xs text-[#666]">
                                    Standard Rate
                                </p>

                                <p className="mt-1 text-xs sm:text-sm font-bold text-[#202938]">
                                    $350 - $800
                                </p>
                            </div>

                            <div className="bg-[#eef1ff] rounded-xl p-3 text-center">
                                <p className="text-xs text-[#666]">
                                    Local Follower %
                                </p>

                                <p className="mt-1 text-xs sm:text-sm font-bold text-[#315cff]">
                                    74.2%
                                </p>
                            </div>

                            <div className="bg-[#eef1ff] rounded-xl p-3 text-center">
                                <p className="text-xs text-[#666]">
                                    Completion Rate
                                </p>

                                <p className="mt-1 text-xs sm:text-sm font-bold text-[#20a96b]">
                                    100%
                                </p>
                            </div>

                        </div>


                        {/* Matched Brand Deals */}
                        <div className="mt-4">

                            <div className="flex items-center justify-between mb-2">

                                <p className="text-xs font-bold uppercase tracking-wide text-[#202938]">
                                    Matched Brand Deals
                                </p>

                                <span className="text-xs text-[#315cff] font-bold">
                                    3 New Invitations
                                </span>

                            </div>


                            <div className="bg-[#f0f3ff] rounded-xl p-3.5">

                                <div className="flex items-center justify-between gap-3">

                                    <div>
                                        <p className="text-xs sm:text-sm font-bold text-[#202938]">
                                            Pacific Artisan Bakery • $550
                                        </p>

                                        <p className="mt-1 text-xs text-[#666]">
                                            Reel • 30-day Spark Ads • Seattle Metro
                                        </p>
                                    </div>

                                    <button className="shrink-0 px-3 py-2 rounded-lg bg-[#1557d6] text-white text-xs font-semibold hover:bg-[#1049b7] transition">
                                        Apply 1-Click
                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* Payment */}
                        <div className="mt-3.5 bg-[#e8fbf2] border border-[#d1f2e2] rounded-xl p-3.5">

                            <div className="flex items-center gap-3">

                                <div className="w-8 h-8 rounded-full bg-[#d2f5e4] flex items-center justify-center text-[#16a36a] text-sm font-bold">
                                    $
                                </div>

                                <div className="flex-1">

                                    <p className="text-xs sm:text-sm font-bold text-[#12885b]">
                                        $1,850.00 Cleared this month
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#477c68]">
                                        Next payout: Tomorrow via Instant Direct Deposit
                                    </p>

                                </div>

                                <span className="text-[#159b68] text-sm">
                                    ♢
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT CONTENT */}
                <div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e4edff] text-[#315cff] text-xs font-semibold uppercase tracking-wide">
                        <span>◉</span> Empowering regional creators
                    </div>


                    {/* Heading */}
                    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] leading-[1.08] font-bold tracking-tight text-[#172033]">
                        Get paid on time, protect
                        <br />
                        your work, and grow your
                        <br />
                        local influence.
                    </h2>


                    {/* Description */}
                    <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-[#525b6c]">
                        Never chase an overdue invoice again. With CAPGN,
                        campaign funds are secured in escrow before you hit
                        record, and agreements clearly protect your image
                        usage rights.
                    </p>


                    {/* Features */}
                    <div className="mt-8 space-y-5">

                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex gap-3.5"
                            >

                                <div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#d7f7e8] flex items-center justify-center text-[#20b477] text-xs font-bold">
                                    ✓
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-[#263247]">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#687080] max-w-lg">
                                        {feature.description}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>


                    {/* CTA */}
                    <button className="mt-8 px-6 py-3 rounded-lg bg-[#111a31] text-white text-sm font-semibold shadow-sm hover:bg-[#1e2945] transition">
                        Create Creator Profile&nbsp; →
                    </button>

                </div>

            </div>

        </section>
    );
}

export default ForCreator;