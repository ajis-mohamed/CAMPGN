import React from 'react';
import {
    Sparkles,
    Eye,
    MapPin,
    ArrowUpRight
} from 'lucide-react';

export default function BrandApplications() {
    // Static application items
    const applications = [
        {
            id: 1,
            initials: 'ES',
            name: 'Elena Santos',
            handle: '@elanafoodie',
            match: '98% Match',
            bio: 'Sustainable Lifestyle & Regional Culinary',
            instagram: '28.4K Instagram',
            views: '45.2K avg Reel views',
            location: 'Chennai • Tamil, English',
            pitch: '“Pitch: Authentic styling Reel showcasing organic morning routines in Aara handloom linen...”',
            status: 'Pending Review',
            statusStyle: 'bg-amber-50 text-amber-700 border border-amber-200/60',
            actionButtons: [
                { label: 'Shortlist', class: 'bg-slate-100 hover:bg-slate-200 text-slate-700' },
                { label: 'View Pitch', class: 'bg-slate-100 hover:bg-slate-200 text-slate-700' },
                { label: 'Accept & Escrow', class: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20' }
            ]
        },
        {
            id: 2,
            initials: 'RV',
            name: 'Rahul Verma',
            handle: '@rahulcreates',
            match: '92% Match',
            bio: 'Minimalist Fashion & Handloom Design',
            instagram: '18.2K Instagram',
            views: '24.8K views',
            location: 'Bangalore, Karnataka',
            pitch: '“Pitch: Studio lookbook aesthetic comparing hand-spun texture versus factory cotton...”',
            status: 'Shortlisted',
            statusStyle: 'bg-blue-50 text-blue-700 border border-blue-200/60',
            actionButtons: [
                { label: 'View Pitch', class: 'bg-slate-100 hover:bg-slate-200 text-slate-700' },
                { label: 'Send Contract', class: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20' }
            ]
        },
        {
            id: 3,
            initials: 'AI',
            name: 'Ananya Iyer',
            handle: '@ananyacrafts',
            match: '89% Match',
            bio: 'Terracotta & Interior Aesthetics',
            instagram: '34.1K Instagram',
            views: '62K views',
            location: 'Pondicherry',
            pitch: '“Contract dispatched via Escrow Vault. Awaiting creator signature and onboarding form.”',
            status: 'Contract Sent',
            statusStyle: 'bg-purple-50 text-purple-700 border border-purple-200/60',
            actionButtons: [
                { label: 'Message', class: 'bg-slate-100 hover:bg-slate-200 text-slate-700' },
                { label: 'Track Escrow', class: 'bg-slate-100 hover:bg-slate-200 text-slate-700' }
            ]
        }
    ];

    return (
        <div className="w-full bg-slate-50/60 py-8 px-4 md:px-8">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                        Recent Applications
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 font-normal">
                        Profiles submitted within the last 48 hours for immediate review
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto group cursor-pointer"
                >
                    <span>Review All (19)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </div>

            {/* Applications List Container */}
            <div className="space-y-4">
                {applications.map((app) => (
                    <div
                        key={app.id}
                        className="bg-white rounded-2xl border border-slate-200/85 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col gap-4"
                    >
                        {/* Top Row: Avatar, Info, Status Badge */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                            {/* Left: Profile Meta */}
                            <div className="flex items-start gap-3.5">
                                {/* Avatar Initials */}
                                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm shrink-0 shadow-2xs">
                                    {app.initials}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-base font-bold text-slate-900 tracking-tight">
                                            {app.name}
                                        </h3>
                                        <span className="text-xs font-medium text-slate-400">
                                            {app.handle}
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                                            <Sparkles className="w-3 h-3 text-emerald-600" />
                                            {app.match}
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-600 font-medium">
                                        {app.bio}
                                    </p>

                                    {/* Stats & Location */}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-0.5">
                                        <span className="inline-flex items-center gap-1">
                                            {/* Inline Instagram SVG */}
                                            <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                            </svg>
                                            {app.instagram}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                                            {app.views}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                            {app.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Status Badge */}
                            <div className="self-start md:self-center">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-2xs ${app.statusStyle}`}>
                                    {app.status}
                                </span>
                            </div>
                        </div>

                        {/* Middle: Pitch Quote */}
                        <div className="bg-slate-50/70 border border-slate-100 rounded-xl px-4 py-3">
                            <p className="text-xs text-slate-600 italic leading-relaxed">
                                {app.pitch}
                            </p>
                        </div>

                        {/* Bottom Row: Static Action Buttons */}
                        <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-slate-100">
                            {app.actionButtons.map((btn, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${btn.class}`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}