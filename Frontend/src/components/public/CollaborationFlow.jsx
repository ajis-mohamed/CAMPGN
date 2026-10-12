import React from "react";

function CollaborationFlow() {
    const steps = [
        {
            number: "01",
            title: "Create Campaign",
            description:
                "Set objectives, target region, deliverable scope, and fund the escrow milestone balance safely.",
        },
        {
            number: "02",
            title: "Match Creators",
            description:
                "Invite vetted creators with local demographic alignment, or review incoming custom pitch proposals.",
        },
        {
            number: "03",
            title: "Lock Terms",
            description:
                "Standard agreements bind timeline, deliverable drafts, content rights, and escrow protection automatically.",
        },
        {
            number: "04",
            title: "Proof & Approve",
            description:
                "Preview HD drafts directly in-app, request pin-point revisions, and provide immediate release approvals.",
        },
        {
            number: "05",
            title: "Measure ROI",
            description:
                "Real-time link tracking, attribution dashboards, promo code redemption, and instant creator payout.",
        },
    ];

    return (
        <section className="w-full bg-[#faf9ff] px-6 py-20">

            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto">

                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#315cff]">
                    End-to-end orchestration
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#172033]">
                    How collaborations flow on CAPGN
                </h2>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#687080]">
                    From first pitch to final payout, every touchpoint follows
                    a structured, friction-free timeline.
                </p>

            </div>


            {/* Timeline */}
            <div className="relative max-w-7xl mx-auto mt-12">

                {/* Connecting Line */}
                <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-px bg-[#cbd7f5]" />


                {/* Cards */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative bg-white border border-[#e5e8f0] rounded-lg p-5 min-h-[180px] hover:shadow-md transition-shadow duration-200 flex flex-col"
                        >

                            {/* Number */}
                            <div
                                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                                    index === steps.length - 1
                                        ? "bg-[#0ca678]"
                                        : "bg-[#0757c9]"
                                }`}
                            >
                                {step.number}
                            </div>


                            {/* Content */}
                            <h3 className="mt-4 text-base font-bold text-[#202938]">
                                {step.title}
                            </h3>

                            <p className="mt-2 text-xs leading-5 text-[#687080]">
                                {step.description}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}

export default CollaborationFlow;