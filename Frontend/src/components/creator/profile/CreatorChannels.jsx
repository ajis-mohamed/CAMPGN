import React, { useState } from 'react';
import { Link2, Camera, Video, CheckCircle2, Plus, X } from 'lucide-react';

export default function CreatorChannels() {
    // Modal open/close state
    const [isEditOpen, setIsEditOpen] = useState(false);

    // List of connected channels stored locally in state
    const [channels, setChannels] = useState([]);

    // Form input state for Instagram and YouTube links
    const [formData, setFormData] = useState({
        instagramHandle: "",
        instagramFollowers: "",
        instagramUrl: "",
        youtubeHandle: "",
        youtubeSubscribers: "",
        youtubeUrl: ""
    });

    const handleSave = (e) => {
        e.preventDefault();

        const newChannels = [];

        // Add Instagram if handle is provided
        if (formData.instagramHandle.trim()) {
            newChannels.push({
                platform: "Instagram",
                handle: formData.instagramHandle.startsWith('@') ? formData.instagramHandle : `@${formData.instagramHandle}`,
                metrics: formData.instagramFollowers ? `${formData.instagramFollowers} Followers` : "Followers",
                icon: <Camera className="w-5 h-5 text-pink-600" />,
                bgColor: "bg-pink-50/60",
                borderColor: "border-pink-100/60",
                url: formData.instagramUrl || "#"
            });
        }

        // Add YouTube if handle is provided
        if (formData.youtubeHandle.trim()) {
            newChannels.push({
                platform: "YouTube",
                handle: formData.youtubeHandle.startsWith('@') ? formData.youtubeHandle : `@${formData.youtubeHandle}`,
                metrics: formData.youtubeSubscribers ? `${formData.youtubeSubscribers} Subscribers` : "Subscribers",
                icon: <Video className="w-5 h-5 text-red-600" />,
                bgColor: "bg-red-50/60",
                borderColor: "border-red-100/60",
                url: formData.youtubeUrl || "#"
            });
        }

        setChannels(newChannels);
        setIsEditOpen(false);
    };

    const hasChannels = channels.length > 0;

    return (
        <div className="profile-channels-card w-full min-w-0 bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 sm:p-6 transition-all">

            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <h2 className="text-sm font-bold tracking-tight text-slate-900 uppercase">
                        Connected Verified Channels
                    </h2>
                </div>

                {hasChannels && (
                    <button
                        type="button"
                        onClick={() => setIsEditOpen(true)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5 text-slate-500" />
                        <span>Manage Channels</span>
                    </button>
                )}
            </div>

            {/* Conditional Rendering: Empty State vs Filled Grid */}
            {!hasChannels ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center text-center py-8 px-4 bg-slate-50/60 border border-dashed border-slate-200 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-2xs">
                        <Link2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">No Channels Connected Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mb-5 leading-relaxed">
                        Connect your Instagram and YouTube accounts to showcase your verified audience reach to brands.
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsEditOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Connect Channels</span>
                    </button>
                </div>
            ) : (
                /* Filled State Grid */
                <div className="grid grid-cols-1 content-center gap-4 items-stretch">
                    {channels.map((channel, index) => (
                        <div
                            key={index}
                            className="min-w-0 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 transition-all hover:border-slate-300"
                        >
                            {/* Left Side: Icon + Handle + Follower Stats */}
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                <div className={`w-12 h-12 rounded-xl ${channel.bgColor} ${channel.borderColor} border flex items-center justify-center shrink-0 shadow-2xs`}>
                                    {channel.icon}
                                </div>

                                <div className="space-y-0.5 min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        {/* Clickable link opening in a new tab */}
                                        <a
                                            href={channel.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-bold text-slate-900 truncate hover:underline"
                                        >
                                            {channel.handle}
                                        </a>
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-50 shrink-0" title="Verified Channel" />
                                    </div>
                                    <div className="flex min-w-0 items-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap">
                                        <span className="truncate">{channel.metrics}</span>
                                        <span>•</span>
                                        <span className="truncate">{channel.platform}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Live Sync Status Badge */}
                            <div className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100/80 shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>Live Sync</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* CONNECT CHANNELS MODAL POPUP */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Connect Social Channels</h3>
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="mt-6 space-y-5">
                            {/* Instagram Section */}
                            <div className="space-y-3 p-4 bg-slate-50/60 rounded-xl border border-slate-200/60">
                                <h4 className="text-xs font-bold text-pink-600 uppercase tracking-wide flex items-center gap-1.5">
                                    <Camera size={15} /> Instagram Details
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-medium text-gray-700 mb-1">Handle</label>
                                        <input
                                            type="text"
                                            placeholder="@username"
                                            value={formData.instagramHandle}
                                            onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-medium text-gray-700 mb-1">Followers Count</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 48.2K"
                                            value={formData.instagramFollowers}
                                            onChange={(e) => setFormData({ ...formData, instagramFollowers: e.target.value })}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium text-gray-700 mb-1">Profile Link</label>
                                    <input
                                        type="url"
                                        placeholder="https://instagram.com/username"
                                        value={formData.instagramUrl}
                                        onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* YouTube Section */}
                            <div className="space-y-3 p-4 bg-slate-50/60 rounded-xl border border-slate-200/60">
                                <h4 className="text-xs font-bold text-red-600 uppercase tracking-wide flex items-center gap-1.5">
                                    <Video size={15} /> YouTube Details
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-medium text-gray-700 mb-1">Handle</label>
                                        <input
                                            type="text"
                                            placeholder="@channel"
                                            value={formData.youtubeHandle}
                                            onChange={(e) => setFormData({ ...formData, youtubeHandle: e.target.value })}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-medium text-gray-700 mb-1">Subscribers Count</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 16.6K"
                                            value={formData.youtubeSubscribers}
                                            onChange={(e) => setFormData({ ...formData, youtubeSubscribers: e.target.value })}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium text-gray-700 mb-1">Channel Link</label>
                                    <input
                                        type="url"
                                        placeholder="https://youtube.com/@channel"
                                        value={formData.youtubeUrl}
                                        onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Modal Footer Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditOpen(false)}
                                    className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 cursor-pointer"
                                >
                                    Save Channels
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}