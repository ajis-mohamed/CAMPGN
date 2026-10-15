import { useState } from 'react';
import {
    ChevronRight,
    Lock,
    Clock,
    UserPlus,
    ArrowUpRight
} from 'lucide-react';

export default function BrandActiveCampaign() {
    const [activeTab, setActiveTab] = useState('All');

    // Campaign data matching the exact UI spec
    const campaigns = [
        {
            id: 1,
            category: 'FASHION & HANDCRAFTED TEXTILES',
            categoryTag: 'Fashion & Textiles',
            title: 'Summer Solstice Linen Edit 2025',
            status: 'Active • In Review',
            statusBadgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
            timeRemaining: '4 days left',
            image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
            budget: '₹95,000',
            applied: '42',
            hiredCount: '8 / 10',
            hiredSubText: '',
            completion: 75,
            footerType: 'escrow',
            footerText: 'Escrow Locked',
            actionText: 'Manage Deliverables',
        },
        {
            id: 2,
            category: 'BEVERAGES & ORGANIC D2C',
            categoryTag: 'D2C Beverages',
            title: 'Artisanal Cold Brew Launch',
            status: 'Active • Drafting',
            statusBadgeBg: 'bg-blue-50 text-blue-700 border border-blue-200/60',
            timeRemaining: 'June 28, 2025',
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
            budget: '₹72,000',
            applied: '34',
            hiredCount: '6 / 6',
            hiredSubText: '(Filled)',
            completion: 40,
            footerType: 'draft',
            footerText: 'Draft Stage',
            actionText: 'Review Submissions',
        },
        {
            id: 3,
            category: 'HOME DECOR & CRAFTS',
            categoryTag: 'Home Decor',
            title: 'Handcrafted Terracotta Tableware',
            status: 'Active • Accepting',
            statusBadgeBg: 'bg-amber-50 text-amber-700 border border-amber-200/60',
            timeRemaining: 'July 10, 2025',
            image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
            budget: '₹65,000',
            applied: '28',
            hiredCount: '5 / 8',
            hiredSubText: '',
            completion: 20,
            footerType: 'slots',
            footerText: '3 Slots Open',
            actionText: 'View Applicants',
        }
    ];

    // Filter campaigns dynamically based on selected tab
    const filteredCampaigns = activeTab === 'All'
        ? campaigns
        : campaigns.filter(c => c.categoryTag === activeTab);

    return (
        <div className="w-full bg-slate-50/60 py-2 px-4 md:px-8">

            {/* Section Header */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">

                {/* Title & Running Count */}
                <div className="flex items-center gap-3 shrink-0">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                        Active Campaigns
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-200/80 text-slate-700">
                        4 running
                    </span>
                </div>

                {/* Interactive Filter Pills & View All Link */}
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                    {['All (4)', 'Fashion & Textiles', 'D2C Beverages', 'Home Decor'].map((tab) => {
                        const cleanName = tab.split(' ')[0] === 'All' ? 'All' : tab;
                        const isSelected = activeTab === cleanName;

                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(cleanName)}
                                type="button"
                                className={`px-3 py-1.5 md:px-4 md:py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer shadow-xs ${isSelected
                                    ? 'bg-slate-900 text-white shadow-sm scale-105'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                                    }`}
                            >
                                {tab}
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 pl-2 transition-colors group shrink-0"
                    >
                        <span>View All (4)</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Campaigns Grid with Smooth Layout Switch */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((camp) => (
                    <div
                        key={camp.id}
                        className="bg-white rounded-2xl border border-slate-200/85 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden group"
                    >
                        {/* Card Hero Image with Badges */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                            <img
                                src={camp.image}
                                alt={camp.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                            {/* Top Status Pill */}
                            <div className="absolute top-3 left-3">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs bg-white/95 ${camp.statusBadgeBg}`}>
                                    {camp.status}
                                </span>
                            </div>

                            {/* Top Right Duration Pill */}
                            <div className="absolute top-3 right-3">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/75 text-white backdrop-blur-md shadow-xs">
                                    {camp.timeRemaining}
                                </span>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1.5">
                                    {camp.category}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug mb-4 group-hover:text-blue-600 transition-colors">
                                    {camp.title}
                                </h3>

                                {/* Metrics Box */}
                                <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3.5 grid grid-cols-3 gap-2 text-center mb-5 shadow-2xs">
                                    <div>
                                        <span className="block text-[11px] text-slate-400 font-medium mb-0.5">Budget</span>
                                        <span className="text-xs md:text-sm font-bold text-slate-900">{camp.budget}</span>
                                    </div>
                                    <div className="border-x border-slate-200/60">
                                        <span className="block text-[11px] text-slate-400 font-medium mb-0.5">Applied</span>
                                        <span className="text-xs md:text-sm font-bold text-slate-900">{camp.applied}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[11px] text-slate-400 font-medium mb-0.5">Hired</span>
                                        <span className="text-xs md:text-sm font-bold text-blue-600 block">
                                            {camp.hiredCount}
                                        </span>
                                        {camp.hiredSubText && (
                                            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                                                {camp.hiredSubText}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar Section */}
                                <div className="space-y-1.5 mb-5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500 font-medium">Milestone Completion</span>
                                        <span className="font-semibold text-slate-900">{camp.completion}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-0.5">
                                        <div
                                            className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out shadow-xs"
                                            style={{ width: `${camp.completion}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer / Action Link */}
                            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">

                                {/* Footer State Icon + Text */}
                                <div className="flex items-center gap-1.5 text-slate-700">
                                    {camp.footerType === 'escrow' && (
                                        <>
                                            <Lock className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="text-emerald-700 font-medium">Escrow Locked</span>
                                        </>
                                    )}
                                    {camp.footerType === 'draft' && (
                                        <>
                                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                                            <span className="text-blue-700 font-medium">Draft Stage</span>
                                        </>
                                    )}
                                    {camp.footerType === 'slots' && (
                                        <>
                                            <UserPlus className="w-3.5 h-3.5 text-amber-600" />
                                            <span className="text-amber-700 font-medium">3 Slots Open</span>
                                        </>
                                    )}
                                </div>

                                {/* Action Trigger Button */}
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors group/btn cursor-pointer py-1"
                                >
                                    <span>{camp.actionText}</span>
                                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}