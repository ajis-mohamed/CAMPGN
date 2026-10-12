import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect } from "react";

function CreatorCollab({ onLoadWorks }) {
    // Sample data for previous collaborations matching the reference image
    const collaborations = [
        {
            id: 1,
            brand: "Nykaa",
            logoBg: "bg-pink-600",
            logoText: "N",
            campaign: "Skincare Campaign",
            dateRange: "Mar 2025 – Apr 2025",
            contentCount: "5 content pieces",
        },
        {
            id: 2,
            brand: "boAt",
            logoBg: "bg-black",
            logoText: "boAt",
            isTextLogo: true,
            campaign: "Tech Review",
            dateRange: "Jan 2025 – Feb 2025",
            contentCount: "3 content pieces",
        },
        {
            id: 3,
            brand: "Roadster",
            logoBg: "bg-amber-900",
            logoText: "R",
            campaign: "Fashion Campaign",
            dateRange: "Nov 2024 – Dec 2024",
            contentCount: "4 content pieces",
        },
        {
            id: 4,
            brand: "The Man Company",
            logoBg: "bg-zinc-800",
            logoText: "TM",
            campaign: "Grooming Campaign",
            dateRange: "Sep 2024 – Oct 2024",
            contentCount: "3 content pieces",
        },
    ];

    useEffect(() => {
        if (onLoadWorks) {
            onLoadWorks(collaborations);
        }
    }, []);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Header & View All link */}
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Previous Collaborations
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Brands I've worked with and the campaigns I've been a part of.
                    </p>
                </div>
                <button
                    type="button"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                >
                    <span>View All</span>
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>

            {/* Grid of Collaboration Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {collaborations.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
                    >
                        <div>
                            {/* Brand Logo & Name Header */}
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white font-bold shadow-sm ${item.logoBg}`}
                                >
                                    <span className={item.isTextLogo ? "text-[11px] tracking-tighter" : "text-sm"}>
                                        {item.logoText}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                                        {item.brand}
                                    </h3>
                                    <p className="text-xs text-gray-500 truncate">
                                        {item.campaign}
                                    </p>
                                </div>
                            </div>

                            {/* Campaign Meta details */}
                            <div className="mt-4 space-y-1 text-xs text-gray-500">
                                <p>{item.dateRange}</p>
                                <p>{item.contentCount}</p>
                            </div>
                        </div>

                        {/* Verified Badge Footer */}
                        <div className="mt-5 pt-3 border-t border-gray-100 flex items-center">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                Verified
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreatorCollab;