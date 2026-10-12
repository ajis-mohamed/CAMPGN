import React from 'react';
import { Link2, Camera, Video, CheckCircle2 } from 'lucide-react';

export default function CreatorChannels({
    channels = [
        {
            platform: "Instagram",
            handle: "@rahulcreates",
            metrics: "48.2K Followers",
            icon: <Camera className="w-5 h-5 text-pink-600" />,
            bgColor: "bg-pink-50/60",
            borderColor: "border-pink-100/60",
            url: "#"
        },
        {
            platform: "YouTube",
            handle: "@rahulcooks",
            metrics: "16.6K Subscribers",
            icon: <Video className="w-5 h-5 text-red-600" />,
            bgColor: "bg-red-50/60",
            borderColor: "border-red-100/60",
            url: "#"
        }
    ]
}) {
    return (
        <div className="profile-channels-card w-full min-w-0 h-96 flex flex-col overflow-hidden bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 sm:p-6 transition-all">

            {/* Section Header */}
            <div className="flex items-center gap-2 mb-4">
                <Link2 className="w-4 h-4 text-blue-600 shrink-0" />
                <h2 className="text-sm font-bold tracking-tight text-slate-900 uppercase">
                    Connected Verified Channels
                </h2>
            </div>

            {/* Channels Grid */}
            <div className="min-h-0 flex-1 grid grid-cols-1 content-center gap-4 items-stretch">
                {channels.map((channel, index) => (
                    <div
                        key={index}
                        className="min-w-0 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 transition-all hover:border-slate-300"
                    >
                        {/* Left Side: Icon + Handle + Follower Stats */}
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            {/* Platform Icon Box */}
                            <div className={`w-12 h-12 rounded-xl ${channel.bgColor} ${channel.borderColor} border flex items-center justify-center shrink-0 shadow-2xs`}>
                                {channel.icon}
                            </div>

                            {/* Details */}
                            <div className="space-y-0.5 min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="text-sm font-bold text-slate-900 truncate">
                                        {channel.handle}
                                    </span>
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

        </div>
    );
}