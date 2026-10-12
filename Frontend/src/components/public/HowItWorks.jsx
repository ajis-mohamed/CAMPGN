import React from "react";

function HowItWorks() {
    const steps = [
        {
            number: "1.",
            icon: "♧",
            title: "Find the right creators",
            description:
                "Regional discovery filters by metro, audience demographics, local micro-niches, and verified audience engagement ratios.",
            link: "Verified Audiences",
        },
        {
            number: "2.",
            icon: "▣",
            title: "Create structured campaigns",
            description:
                "Define deliverables, clear rights usage windows, strict production guidelines, and escrow-backed milestone structures.",
            link: "Standardized Briefs",
        },
        {
            number: "3.",
            icon: "☷",
            title: "Manage collaboration",
            description:
                "Centralized video proofing, real-time revision logs, integrated agreements, and secure automatic escrow disbursements.",
            link: "Proofing Hub",
        },
        {
            number: "4.",
            icon: "▥",
            title: "Track campaign results",
            description:
                "Real-time attribution measuring click traffic, redemption codes, store orders, and true customer acquisition cost.",
            link: "Direct Revenue ROI",
        },
    ];

    return (
        <section className="w-full bg-[#f5f6ff] px-6 py-24 sm:py-28" id="how-it-works">

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center">

                <p className="text-xs font-bold tracking-wider text-[#315cff] uppercase">
                    Simple, structured workflow
                </p>

                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#111827]">
                    One workspace for the entire
                    <br />
                    collaboration.
                </h2>

                <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed text-[#525b6c]">
                    Say goodbye to messy DM threads, untracked spreadsheets,
                    and lost content deliverables. CAPGN replaces manual
                    friction with predictable execution.
                </p>

            </div>


            {/* Cards */}
            <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="group bg-white border border-[#e5e7f0] rounded-xl p-5 sm:p-6 flex flex-col min-h-[260px] hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                    >

                        {/* Icon */}
                        <div className="w-10 h-10 rounded-lg bg-[#e4edff] text-[#315cff] flex items-center justify-center text-base mb-5">
                            {step.icon}
                        </div>


                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-bold text-[#202938]">
                            {step.number} {step.title}
                        </h3>


                        {/* Description */}
                        <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#687080]">
                            {step.description}
                        </p>


                        {/* Bottom Link */}
                        <div className="mt-auto pt-4 border-t border-[#edf0f5]">

                            <button className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold text-[#315cff]">
                                <span>{step.link}</span>

                                <span className="text-base">
                                    →
                                </span>
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default HowItWorks;