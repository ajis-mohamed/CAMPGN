import { Compass, UploadCloud } from 'lucide-react';
import useUserStore from '../../../zustand/useUserStore';

export default function Welcomes() {
    const user = useUserStore((state) => state.user);
    const userName = user?.name ? user.name.trim().split(/\s+/)[0] : "User";
    // Get time of day for dynamic greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="w-full bg-white border border-slate-100 rounded-2xl shadow-sm px-5 sm:px-6 py-4 sm:py-5 mb-5 transition-all">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* Left Section: Greeting & Subtitle */}
                <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <span>{getGreeting()}, {userName}</span>
                        <span className="text-lg sm:text-xl" role="img" aria-label="waving hand">👋</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                        Here’s an overview of your active campaigns.
                    </p>
                </div>

                {/* Right Section: Action Buttons (Stacks on mobile, horizontal on sm+ screens) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">

                    {/* Explore New Campaigns Button */}
                    <button
                        type="button"
                        className="inline-flex justify-center items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                    >
                        <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Explore New Campaigns</span>
                    </button>

                    {/* Submit Deliverable Primary Button */}
                    <button
                        type="button"
                        className="inline-flex justify-center items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98]"
                    >
                        <UploadCloud className="w-4 h-4 text-white shrink-0" />
                        <span>Submit Deliverable</span>
                    </button>

                </div>

            </div>
        </div>
    );
}