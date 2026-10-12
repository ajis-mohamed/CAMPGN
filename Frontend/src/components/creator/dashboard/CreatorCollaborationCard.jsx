import React from 'react';
import {
    MapPin,
    Truck,
    Calendar,
    CheckCircle2,
    FileEdit,
    Upload,
    ArrowRight,
    Check
} from 'lucide-react';

const mockCollaborations = [
    {
        id: '1',
        initials: 'AC',
        brandName: 'Austin Craft Brew Co.',
        location: 'Austin, TX',
        title: 'Fall Nitro Cold Brew Launch',
        deliverables: '1x 60s TikTok Video, 2x IG Stories (Swipe-up UTM)',
        status: 'In Revision',
        statusColor: 'orange',
        dueDate: 'Due Oct 28 (in 2 days)',
        stepText: 'Step 3 of 4: Content Review & Revisions',
        progress: 70,
        steps: [
            { label: 'Script Approved', completed: true },
            { label: 'Draft Uploaded', completed: true },
            { label: 'Revisions (Current)', current: true },
            { label: 'Escrow Release', pending: true }
        ],
        escrowAmount: '$650.00 Locked',
        secondaryActionLabel: 'View Notes (1)',
        primaryActionLabel: 'Upload Revisions',
        primaryActionColor: 'bg-amber-700 hover:bg-amber-800 text-white',
        progressBarColor: 'bg-amber-700'
    },
    {
        id: '2',
        initials: 'PB',
        brandName: 'Prairie Bakehouse',
        location: 'Hill Country, TX',
        title: 'Winter Artisan Sourdough Spotlight',
        deliverables: '1x IG Reel (9:16 HD) + Raw B-Roll Assets',
        status: 'Draft Ready',
        statusColor: 'blue',
        dueDate: 'Due Nov 04, 2025',
        stepText: 'Step 2 of 4: Video Draft Submission',
        progress: 45,
        steps: [
            { label: 'Concept Ok', completed: true },
            { label: 'Draft Submission', current: true },
            { label: 'Brand Review', pending: true },
            { label: 'Disbursement', pending: true }
        ],
        escrowAmount: '$500.00 Locked',
        secondaryActionLabel: 'Guidelines',
        primaryActionLabel: 'Submit Draft',
        primaryActionColor: 'bg-blue-600 hover:bg-blue-700 text-white',
        progressBarColor: 'bg-blue-600'
    },
    {
        id: '3',
        initials: 'TH',
        brandName: 'Terraform Home Goods',
        isShipped: true,
        title: 'Eco-Friendly Ceramic Mug Series',
        deliverables: '2x TikTok UGC Videos (Organic + Spark Code)',
        status: 'Payout Pending',
        statusColor: 'green',
        dueDate: 'Approved Today',
        isApprovedDate: true,
        stepText: 'Step 4 of 4: Escrow Auto-Disbursement',
        progress: 95,
        steps: [],
        escrowLabel: 'Releasing to Deposit:',
        escrowAmount: '$700.00 Direct Transfer',
        escrowColor: 'bg-blue-50 text-blue-700',
        primaryActionLabel: 'View Details',
        primaryActionColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
        progressBarColor: 'bg-emerald-600'
    }
];

const CreatorCollaborationCard = ({ collaborations = mockCollaborations }) => {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-4 text-slate-800 px-3 sm:px-4">
            {/* Component Header */}
            <div className="flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">Active Collaborations</h2>
                    <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full shrink-0">
                        3 Active
                    </span>
                </div>
                <button className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 shrink-0">
                    <span>View All (4)</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
            </div>

            {/* Cards List */}
            <div className="space-y-4">
                {collaborations.map((item) => {
                    const isOrange = item.statusColor === 'orange';
                    const isBlue = item.statusColor === 'blue';
                    const isGreen = item.statusColor === 'green';

                    return (
                        <div
                            key={item.id}
                            className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Top Row Header & Info */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                                <div className="flex items-start gap-3 min-w-0">
                                    {/* Brand Avatar */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm shrink-0">
                                        {item.initials}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        {/* Brand Info & Location/Shipping */}
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 font-medium">
                                            <span className="truncate max-w-[150px] sm:max-w-none">{item.brandName}</span>
                                            <span className="hidden sm:inline">•</span>
                                            {item.isShipped ? (
                                                <span className="flex items-center gap-1 text-slate-500">
                                                    <Truck className="w-3.5 h-3.5 shrink-0" /> Product Shipped
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 truncate">
                                                    <MapPin className="w-3.5 h-3.5 shrink-0" /> {item.location}
                                                </span>
                                            )}
                                        </div>

                                        {/* Campaign Title */}
                                        <h3 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                                            {item.title}
                                        </h3>

                                        {/* Deliverables */}
                                        <p className="text-xs text-slate-500 mt-1 sm:mt-0.5 break-words">
                                            <span className="font-semibold text-slate-600">Deliverables:</span> {item.deliverables}
                                        </p>
                                    </div>
                                </div>

                                {/* Status Badge & Due Date */}
                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start shrink-0 gap-1.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                                    {isOrange && (
                                        <span className="px-2.5 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> In Revision
                                        </span>
                                    )}
                                    {isBlue && (
                                        <span className="px-2.5 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Draft Ready
                                        </span>
                                    )}
                                    {isGreen && (
                                        <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Payout Pending
                                        </span>
                                    )}

                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        {item.isApprovedDate ? (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                        ) : (
                                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                                        )}
                                        <span>{item.dueDate}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Step Progress Container */}
                            <div className="mt-4 p-3 rounded-lg bg-slate-50/70 border border-slate-100">
                                <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-semibold text-slate-700 mb-2">
                                    <span className="flex items-center gap-1.5 min-w-0">
                                        {isOrange && <FileEdit className="w-4 h-4 text-amber-700 shrink-0" />}
                                        {isBlue && <Upload className="w-4 h-4 text-blue-600 shrink-0" />}
                                        {isGreen && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                                        <span className="truncate">{item.stepText}</span>
                                    </span>
                                    <span className="text-slate-500 shrink-0 ml-auto">{item.progress}% Complete</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${item.progressBarColor}`}
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>

                                {/* Sub-steps Grid */}
                                {item.steps.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mt-3 text-[11px] font-medium text-slate-400">
                                        {item.steps.map((step, idx) => (
                                            <div key={idx} className="flex items-center justify-start sm:justify-center gap-1">
                                                {step.completed && <Check className="w-3 h-3 text-blue-600 shrink-0" />}
                                                {step.current && <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>}
                                                <span className={`truncate ${step.completed ? 'text-blue-600 font-semibold' :
                                                        step.current ? 'text-amber-800 font-semibold' : 'text-slate-400'
                                                    }`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Bottom Actions Row */}
                            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                {/* Escrow Badge */}
                                <div className="flex items-center justify-between sm:justify-start gap-2 text-xs">
                                    <span className="text-slate-500 font-medium">
                                        {item.escrowLabel || 'Escrow Security:'}
                                    </span>
                                    <span className={`px-2.5 py-1 rounded-md font-bold ${item.escrowColor || 'bg-blue-50 text-blue-800'}`}>
                                        {item.escrowAmount}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-end gap-2.5 sm:gap-3 w-full sm:w-auto">
                                    {item.secondaryActionLabel && (
                                        <button className="flex-1 sm:flex-none py-2 px-3 sm:px-0 text-center text-xs font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 sm:border-0 rounded-lg sm:rounded-none">
                                            {item.secondaryActionLabel}
                                        </button>
                                    )}
                                    <button className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-colors text-center ${item.primaryActionColor}`}>
                                        {item.primaryActionLabel}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CreatorCollaborationCard;