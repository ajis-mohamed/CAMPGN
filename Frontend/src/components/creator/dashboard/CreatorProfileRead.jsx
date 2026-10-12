import React from 'react';
import { CheckCircle2, AlertCircle, SlidersHorizontal } from 'lucide-react';

const mockReadinessData = {
    score: 85,
    description:
        'Complete your profile to increase your visibility to verified brands and auto-qualify for VIP rate campaigns.',
    checklist: [
        {
            id: '1',
            text: 'Instagram & TikTok accounts connected',
            completed: true
        },
        {
            id: '2',
            text: 'Deliverable rate card configured ($350 - $800)',
            completed: true
        },
        {
            id: '3',
            text: 'Texas creator location & niche verified',
            completed: true
        },
        {
            id: '4',
            text: 'Upload 2 verified case studies (+15% score)',
            completed: false
        }
    ]
};

const CreatorProfileRead = ({ data = mockReadinessData }) => {
    return (
        <div className="w-full max-w-md bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm text-slate-800">
            {/* Top Header Row */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                        Profile Readiness
                    </h3>
                    <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full">
                        {data.score}%
                    </span>
                </div>
                <button
                    aria-label="Settings"
                    className="text-blue-600 hover:text-blue-700 p-1 rounded-md hover:bg-blue-50 transition-colors"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-blue-50 h-2 rounded-full overflow-hidden mb-4">
                <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${data.score}%` }}
                />
            </div>

            {/* Description Text */}
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {data.description}
            </p>

            {/* Checklist Items */}
            <div className="space-y-2.5 mb-5">
                {data.checklist.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 text-xs">
                        {item.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <span
                            className={`font-medium ${item.completed ? 'text-slate-600' : 'text-amber-800 font-semibold'
                                }`}
                        >
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* Action Button */}
            <button className="w-full py-2.5 px-4 text-xs font-bold text-blue-700 bg-blue-100/70 hover:bg-blue-100 active:bg-blue-200 rounded-xl transition-colors duration-150">
                Complete Profile & Case Studies
            </button>
        </div>
    );
};

export default CreatorProfileRead;