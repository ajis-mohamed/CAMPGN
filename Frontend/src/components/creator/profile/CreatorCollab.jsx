import React, { useState, useEffect } from "react";
import { CheckCircle2, ChevronRight, Plus, X, Award } from "lucide-react";

function CreatorCollab({ onLoadWorks }) {
    // Modal state
    const [isEditOpen, setIsEditOpen] = useState(false);

    // List of collaborations stored locally in state
    const [collaborations, setCollaborations] = useState([]);

    // Form input state
    const [formData, setFormData] = useState({
        brand: "",
        campaign: "",
        dateRange: "",
        contentCount: "",
        isVerified: true
    });

    const handleSave = (e) => {
        e.preventDefault();

        if (!formData.brand.trim()) return;

        const newItem = {
            id: Date.now(),
            brand: formData.brand,
            campaign: formData.campaign || "Brand Campaign",
            dateRange: formData.dateRange || "Recent",
            contentCount: formData.contentCount || "1 content piece",
            logoBg: "bg-indigo-600",
            logoText: formData.brand.charAt(0).toUpperCase(),
            isVerified: formData.isVerified
        };

        setCollaborations([...collaborations, newItem]);
        setIsEditOpen(false);
        setFormData({
            brand: "",
            campaign: "",
            dateRange: "",
            contentCount: "",
            isVerified: true
        });
    };

    const hasCollaborations = collaborations.length > 0;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Header & Action Button */}
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Previous Collaborations
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Brands I've worked with and the campaigns I've been a part of.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {hasCollaborations && (
                        <button
                            type="button"
                            onClick={() => setIsEditOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all cursor-pointer"
                        >
                            <Plus size={15} />
                            <span>Add Collaboration</span>
                        </button>
                    )}
                    <button
                        type="button"
                        className="group inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                    >
                        <span>View All</span>
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>

            {/* Conditional Rendering: Empty State vs Filled Grid */}
            {!hasCollaborations ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center text-center py-10 px-4 bg-slate-50/60 border border-dashed border-slate-200 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-2xs">
                        <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">No Collaborations Added Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mb-5 leading-relaxed">
                        Showcase the brands you've collaborated with and build immediate trust with prospective partners.
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsEditOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-500/20 active:scale-[0.98] cursor-pointer"
                    >
                        <Plus size={16} />
                        <span>Add Your First Collaboration</span>
                    </button>
                </div>
            ) : (
                /* Filled Grid of Collaboration Cards */
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
                                        <span className="text-sm">{item.logoText}</span>
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
                                {item.isVerified ? (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                        <CheckCircle2 size={13} className="text-emerald-600" />
                                        Verified
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                        Unverified
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ADD COLLABORATION MODAL POPUP */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Add Collaboration</h3>
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Brand Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Nykaa, boAt"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Campaign Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Skincare Campaign"
                                    value={formData.campaign}
                                    onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Date Range (From – To)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Mar 2025 – Apr 2025"
                                    value={formData.dateRange}
                                    onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Content Count</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 5 content pieces"
                                    value={formData.contentCount}
                                    onChange={(e) => setFormData({ ...formData, contentCount: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="verifiedCheck"
                                    checked={formData.isVerified}
                                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 accent-indigo-600 cursor-pointer"
                                />
                                <label htmlFor="verifiedCheck" className="text-xs font-medium text-gray-700 cursor-pointer">
                                    Mark as Verified Collaboration
                                </label>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditOpen(false)}
                                    className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                                >
                                    Save Collaboration
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreatorCollab;