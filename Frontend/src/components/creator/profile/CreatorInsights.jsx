import React from 'react';
import { Users, PlayCircle, Zap, Handshake } from 'lucide-react';

export default function CreatorInsights({
    totalReach = "64.8K",
    reachGrowth = "+12%",
    reachSubtitle = "Across Instagram & YouTube this quarter",

    avgViews = "42.5K",
    retentionRate = "88% retention",
    viewsSubtitle = "Average 30-day reel/video plays",

    engagementRate = "5.4%",
    engagementBenchmark = "+2.6% vs benchmark",
    engagementSubtitle = "Industry regional standard is 2.8%",

    collaborationsCount = "28",
    rating = "4.9 / 5.0",
    collaborationsSubtitle = "100% on-time milestone delivery"
}) {
    return (
        <div className="w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            {/* CARD 1: Total Reach */}
            <div className="min-w-0 h-44 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all">
                <div className="flex items-center justify-between mb-3">
                    <span className="min-w-0 truncate text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Total Reach
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                        <Users className="w-4 h-4" />
                    </div>
                </div>

                <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{totalReach}</h2>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/60 whitespace-nowrap">
                            ↑{reachGrowth}
                        </span>
                    </div>
                    {/* Fixed line height and explicit height box to prevent vertical shifts */}
                    <p className="h-8 overflow-hidden text-xs text-slate-500 font-medium mt-1 leading-snug line-clamp-2">
                        {reachSubtitle}
                    </p>
                </div>
            </div>

            {/* CARD 2: Average Views */}
            <div className="min-w-0 h-44 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all">
                <div className="flex items-center justify-between mb-3">
                    <span className="min-w-0 truncate text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Average Views
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/60 shadow-2xs shrink-0">
                        <PlayCircle className="w-4 h-4" />
                    </div>
                </div>

                <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{avgViews}</h2>
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/60 whitespace-nowrap">
                            {retentionRate}
                        </span>
                    </div>
                    <p className="h-8 overflow-hidden text-xs text-slate-500 font-medium mt-1 leading-snug line-clamp-2">
                        {viewsSubtitle}
                    </p>
                </div>
            </div>

            {/* CARD 3: Engagement Rate */}
            <div className="min-w-0 h-44 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all">
                <div className="flex items-center justify-between mb-3">
                    <span className="min-w-0 truncate text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Engagement Rate
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100/60 shadow-2xs shrink-0">
                        <Zap className="w-4 h-4" />
                    </div>
                </div>

                <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{engagementRate}</h2>
                        <span className="text-xs font-semibold text-emerald-600 whitespace-nowrap">
                            {engagementBenchmark}
                        </span>
                    </div>
                    <p className="h-8 overflow-hidden text-xs text-slate-500 font-medium mt-1 leading-snug line-clamp-2">
                        {engagementSubtitle}
                    </p>
                </div>
            </div>

            {/* CARD 4: Collaborations */}
            <div className="min-w-0 h-44 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all">
                <div className="flex items-center justify-between mb-3">
                    <span className="min-w-0 truncate text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Collaborations
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60 shadow-2xs shrink-0">
                        <Handshake className="w-4 h-4" />
                    </div>
                </div>

                <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{collaborationsCount}</h2>
                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/60 whitespace-nowrap">
                            ★ {rating}
                        </span>
                    </div>
                    <p className="h-8 overflow-hidden text-xs text-slate-500 font-medium mt-1 leading-snug line-clamp-2">
                        {collaborationsSubtitle}
                    </p>
                </div>
            </div>

        </div>
    );
}