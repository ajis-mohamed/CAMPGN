import { useState } from 'react';
import {
    Search,
    Bell,
    Sparkles,
    Menu,
    ChevronDown,
    SlidersHorizontal,
    X
} from 'lucide-react';
import useUserStore from '../../zustand/useUserStore';

export default function Navbar({ onMenuToggle, isSidebarOpen = false }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [hasUnread, setHasUnread] = useState(true);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const user = useUserStore((state) => state.user);
    const displayName = user?.name || user?.email || 'User';
    const initials = displayName
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200/80 shadow-sm transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between h-16 px-3 sm:px-4 md:px-6 gap-2">

                {/* Left Section: Sidebar Toggle & Search */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl">
                    {/* Sidebar Toggle Button */}
                    <button
                        onClick={onMenuToggle}
                        className="lg:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-xl transition-all duration-200"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    {/* Search Input Container with Hover/Focus Expansion */}
                    <div className="hidden sm:relative sm:block w-full max-w-md group/search">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-hover/search:text-blue-600 group-focus-within/search:text-blue-600 transition-colors duration-200">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search campaigns, brands, or messages..."
                            className="w-full pl-10 pr-10 py-2 bg-slate-50 hover:bg-blue-50/50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 hover:placeholder-blue-400 rounded-xl border border-slate-200/80 hover:border-blue-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                        />
                        <button
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-blue-600 transition-colors duration-200"
                            title="Search options"
                        >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Mobile Search Toggle Icon */}
                    <button
                        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                        className="sm:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                        aria-label="Open search"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                {/* Right Section: Creator Actions & User Info */}
                <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

                    {/* Primary Action Button - White BG to Blue hover transformation */}
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:bg-blue-700 text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                        <Sparkles className="w-4 h-4" />
                        <span>Discover Campaigns</span>
                    </button>

                    {/* Mobile Icon Action Button */}
                    <button
                        className="md:hidden p-2 bg-white text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200"
                        title="Discover Campaigns"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>

                    <div className="h-6 w-[1px] bg-slate-200/80 mx-0.5 sm:mx-1 hidden sm:block" />

                    {/* Notifications Button */}
                    <button
                        onClick={() => setHasUnread(false)}
                        className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-xl transition-all duration-200"
                        aria-label="View notifications"
                    >
                        <Bell className="w-5 h-5" />
                        {hasUnread && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
                        )}
                    </button>

                    {/* Profile Section with Full Row Hover */}
                    <div className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-blue-50/80 active:bg-blue-100/80 cursor-pointer transition-all duration-200 group/user">
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-transparent group-hover/user:ring-blue-300 group-hover/user:scale-105 transition-all duration-200 shrink-0">
                            {initials}
                        </div>
                        <div className="hidden lg:flex flex-col text-left">
                            <span className="text-xs font-semibold text-slate-800 group-hover/user:text-blue-700 transition-colors duration-200 leading-tight">
                                {displayName}
                            </span>
                            <span className="text-[11px] text-slate-500 group-hover/user:text-blue-500 font-medium transition-colors duration-200">
                                @{user?.email || displayName}
                            </span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover/user:text-blue-600 hidden lg:block transition-all duration-200 group-hover/user:translate-y-0.5" />
                    </div>
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {isMobileSearchOpen && (
                <div className="sm:hidden px-3 py-2 bg-blue-50/50 border-t border-slate-200/80 flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search campaigns..."
                            autoFocus
                            className="w-full pl-9 pr-3 py-1.5 bg-white text-sm text-slate-800 placeholder-slate-400 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <button
                        onClick={() => setIsMobileSearchOpen(false)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}
        </header>
    );
}