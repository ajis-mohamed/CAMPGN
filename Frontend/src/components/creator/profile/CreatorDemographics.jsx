import React from 'react';
import { Globe } from 'lucide-react';

export default function CreatorDemographics({
    regions = [
        { name: "Tamil Nadu (Chennai, Coimbatore, Madurai)", percentage: 72, color: "bg-blue-600" },
        { name: "Karnataka (Bengaluru Tech Hub & Mysuru)", percentage: 14, color: "bg-slate-600" },
        { name: "Global NRI Diaspora (USA, UAE, Singapore)", percentage: 14, color: "bg-amber-700" }
    ],
    ageConcentration = "21 - 34 yrs (68%)",
    genderSplit = "54% M / 46% F",
    topDevice = "iOS & Android (94%)"
}) {
    return (
        <div className="profile-demographics-card w-full min-w-0 h-96 flex flex-col overflow-hidden bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 sm:p-6 transition-all">

            {/* Header */}
            <div className="flex min-w-0 items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
                <div className="flex min-w-0 items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                        <Globe className="w-4 h-4" />
                    </div>
                    <h2 className="min-w-0 truncate text-base font-bold text-slate-900 tracking-tight">Audience Core Demographics</h2>
                </div>
                <span className="shrink-0 text-xs font-medium text-slate-400">Updated Weekly</span>
            </div>

            {/* Regional Breakdown Progress Bars */}
            <div className="min-h-0 flex-1 flex flex-col justify-center space-y-4 mb-6">
                {regions.map((region, index) => (
                    <div key={index} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                            <span className="text-slate-800 truncate pr-2">{region.name}</span>
                            <span className="text-slate-900 font-bold shrink-0">{region.percentage}%</span>
                        </div>
                        {/* Progress Track */}
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${region.color} transition-all duration-500`}
                                style={{ width: `${region.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Metrics Bar */}
            <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3 sm:p-4 grid grid-cols-3 gap-2 sm:gap-4 text-center">

                {/* Age Concentration */}
                <div className="min-w-0 space-y-0.5">
                    <span className="block truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">Age Concentration</span>
                    <div className="truncate whitespace-nowrap text-xs font-bold text-slate-900" title={ageConcentration}>{ageConcentration}</div>
                </div>

                {/* Gender Split */}
                <div className="min-w-0 space-y-0.5 border-x border-slate-200/80 px-1 sm:px-2">
                    <span className="block truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">Gender Split</span>
                    <div className="truncate whitespace-nowrap text-xs font-bold text-slate-900" title={genderSplit}>{genderSplit}</div>
                </div>

                {/* Top Device */}
                <div className="min-w-0 space-y-0.5">
                    <span className="block truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">Top Device</span>
                    <div className="truncate whitespace-nowrap text-xs font-bold text-slate-900" title={topDevice}>{topDevice}</div>
                </div>

            </div>

        </div>
    );
}