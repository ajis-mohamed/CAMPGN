import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const categories = [
    'All Categories',
    'Food & Beverage',
    'Lifestyle',
    'Texas Metro'
];

const mockCampaigns = [
    {
        id: '1',
        matchScore: '98% Match',
        daysLeft: '14d left',
        brandName: 'Roast & Co. Artisans',
        location: 'Austin Metro, TX',
        title: 'Holiday Batch Single-Origin Tasting',
        categoryTag: 'Food & Beverage',
        subTag: 'English',
        description: '1x 4K IG Reel, 3x High-Res Product Photos showcasing morning kitchen routine.',
        compensation: '$800.00',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
        category: 'Food & Beverage'
    },
    {
        id: '2',
        matchScore: '94% Match',
        daysLeft: '17d left',
        brandName: 'Nomad Wellness Co.',
        location: 'Dallas / Austin',
        title: 'Clean Energy Cold Brew Launch',
        categoryTag: 'Health & Lifestyle',
        subTag: 'Texas',
        description: '1x TikTok Video + 30-Day Spark Ads Rights highlighting workday productivity.',
        compensation: '$600 – $900',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
        category: 'Lifestyle'
    },
    {
        id: '3',
        matchScore: '91% Match',
        daysLeft: '20d left',
        brandName: 'South Congress Leather',
        location: 'In-store Austin Pickup',
        title: 'Everyday Carry Holiday Gift Guide',
        categoryTag: 'Fashion & Goods',
        subTag: 'Local Pick',
        description: '2x TikTok UGC Videos, 1x Reel showcasing local artisan shop walkthrough.',
        compensation: '$550 + $200 GC',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
        category: 'Texas Metro'
    }
];

const CreatorRecommendedCampaign = ({ campaigns = mockCampaigns }) => {
    const [activeCategory, setActiveCategory] = useState('All Categories');

    const filteredCampaigns = campaigns.filter((campaign) => {
        if (activeCategory === 'All Categories') return true;
        return campaign.category === activeCategory;
    });

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-50/50 rounded-2xl text-slate-800">
            {/* Header & Filter Controls */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
                <div className="shrink-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        Recommended Campaigns
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Matched with your regional niche, audience engagement, and creator rates.
                    </p>
                </div>

                {/* Filter Pills (Scrollable on small screens) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 xl:pb-0 scrollbar-none">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-150 ${isActive
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCampaigns.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col justify-between bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 group"
                    >
                        <div>
                            {/* Top Meta Info Header */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                                    {item.matchScore}
                                </span>
                                <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    {item.daysLeft}
                                </span>
                            </div>

                            {/* Cover Image Container with Overlay */}
                            <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Brand & Location Overlay Text */}
                                <div className="absolute bottom-3 left-3 right-3 text-white">
                                    <p className="text-[11px] font-medium text-slate-200 leading-tight">
                                        {item.brandName}
                                    </p>
                                    <p className="text-xs font-bold leading-tight">
                                        {item.location}
                                    </p>
                                </div>
                            </div>

                            {/* Campaign Title */}
                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                                {item.title}
                            </h3>

                            {/* Tags */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 rounded">
                                    {item.categoryTag}
                                </span>
                                <span className="text-[11px] font-medium text-slate-500">
                                    {item.subTag}
                                </span>
                            </div>

                            {/* Campaign Description / Deliverables */}
                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 min-h-[36px] mb-4">
                                {item.description}
                            </p>
                        </div>

                        {/* Bottom Compensation & Action */}
                        <div className="pt-3 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-slate-500">
                                    Compensation
                                </span>
                                <span className="text-sm font-extrabold text-slate-900">
                                    {item.compensation}
                                </span>
                            </div>

                            <button className="w-full py-2.5 px-4 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-xl transition-colors duration-150">
                                View Campaign
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreatorRecommendedCampaign;