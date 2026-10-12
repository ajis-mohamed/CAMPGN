import React from "react";

function About() {
    return (
        <section className="w-full bg-[#faf9ff] px-6 py-20">

            <div className="max-w-7xl mx-auto">

                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left */}
                    <div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e5edff] text-[#315cff] text-[10px] font-semibold uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#315cff]" />
                            About CAPGN
                        </div>


                        {/* Heading */}
                        <h2 className="mt-5 text-4xl sm:text-5xl lg:text-[46px] leading-[1.08] font-bold tracking-tight text-[#172033]">
                            Making creator
                            <br />
                            collaborations
                            <br />
                            <span className="text-[#315cff]">
                                simpler.
                            </span>
                        </h2>


                        {/* Description */}
                        <p className="mt-6 max-w-xl text-[13px] leading-6 text-[#687080]">
                            CAPGN is built to make creator marketing more
                            transparent, structured, and accessible for
                            growing brands and regional creators.
                        </p>

                        <p className="mt-3 max-w-xl text-[13px] leading-6 text-[#687080]">
                            Instead of scattered messages, spreadsheets, and
                            complicated workflows, CAPGN brings discovery,
                            collaboration, approvals, payments, and campaign
                            tracking into one workspace.
                        </p>


                        {/* CTA */}
                        <button className="mt-7 px-5 py-3 rounded-md bg-[#1557d6] text-white text-[12px] font-semibold shadow-sm hover:bg-[#1049b7] transition">
                            Discover CAPGN →
                        </button>

                    </div>


                    {/* Right - Mission Card */}
                    <div className="relative">

                        {/* Background decoration */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#dfe8ff] blur-2xl opacity-70" />

                        <div className="relative bg-white border border-[#e4e7ef] rounded-xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(40,50,90,0.10)]">

                            {/* Icon */}
                            <div className="w-12 h-12 rounded-lg bg-[#e6eeff] text-[#315cff] flex items-center justify-center text-xl">
                                ✦
                            </div>

                            <p className="mt-6 text-[10px] font-semibold uppercase tracking-wider text-[#315cff]">
                                Our Mission
                            </p>

                            <h3 className="mt-2 text-xl sm:text-2xl font-bold leading-tight text-[#172033]">
                                Turn local influence into
                                <br />
                                meaningful growth.
                            </h3>

                            <p className="mt-4 text-[12px] leading-5 text-[#687080]">
                                We believe great creator partnerships shouldn't
                                depend on who has the biggest audience. CAPGN
                                helps brands discover relevant voices and gives
                                creators better opportunities to build lasting
                                partnerships.
                            </p>


                            {/* Divider */}
                            <div className="my-6 h-px bg-[#edf0f5]" />


                            {/* Values */}
                            <div className="grid grid-cols-2 gap-4">

                                <div className="bg-[#f5f7ff] rounded-lg p-4">

                                    <div className="text-[#315cff] text-xl">
                                        ◈
                                    </div>

                                    <h4 className="mt-2 text-[11px] font-bold text-[#202938]">
                                        Transparency
                                    </h4>

                                    <p className="mt-1 text-[9px] leading-4 text-[#737b8a]">
                                        Clear terms, pricing, and campaign
                                        expectations.
                                    </p>

                                </div>


                                <div className="bg-[#f5f7ff] rounded-lg p-4">

                                    <div className="text-[#315cff] text-xl">
                                        ◎
                                    </div>

                                    <h4 className="mt-2 text-[11px] font-bold text-[#202938]">
                                        Trust
                                    </h4>

                                    <p className="mt-1 text-[9px] leading-4 text-[#737b8a]">
                                        Protected work, reliable payments,
                                        and accountability.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Bottom Stats */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 border border-[#e5e8f0] rounded-xl bg-white overflow-hidden">

                    <div className="p-6 text-center border-b lg:border-b-0 lg:border-r border-[#e5e8f0]">

                        <p className="text-[28px] font-bold text-[#172033]">
                            1,200+
                        </p>

                        <p className="mt-1 text-[10px] text-[#737b8a]">
                            Brands
                        </p>

                    </div>


                    <div className="p-6 text-center border-b lg:border-b-0 lg:border-r border-[#e5e8f0]">

                        <p className="text-[28px] font-bold text-[#172033]">
                            8,500+
                        </p>

                        <p className="mt-1 text-[10px] text-[#737b8a]">
                            Regional Creators
                        </p>

                    </div>


                    <div className="p-6 text-center border-r border-[#e5e8f0]">

                        <p className="text-[28px] font-bold text-[#315cff]">
                            24/7
                        </p>

                        <p className="mt-1 text-[10px] text-[#737b8a]">
                            Collaboration
                        </p>

                    </div>


                    <div className="p-6 text-center">

                        <p className="text-[28px] font-bold text-[#20a96b]">
                            100%
                        </p>

                        <p className="mt-1 text-[10px] text-[#737b8a]">
                            Transparent
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;