import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Compass,
    FileText,
    Users,
    CreditCard,
    TrendingUp,
    User,
    Settings,
    LogOut,
    X
} from 'lucide-react';
import tabIcon from "../../assets/tabIconWhite.png";
import useUserStore from "../../zustand/useUserStore";
import { auth } from "../../config/firebaseConfig"
import axios from "axios"
import { useEffect } from 'react';

export default function Sidebar({ isOpen, onClose, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation(); // Tracks current URL path automatically

    // Fetch user info and account type from Zustand store
    const user = useUserStore((state) => state.user)
    const accountType = useUserStore((state) => state.accountType);

    const setUser = useUserStore((state) => state.setUser)
    const setAccountType = useUserStore((state) => state.setAccountType)

    // Generate user initials for avatar
    const displayName = user?.name || user?.email || '';
    const initials = displayName
        .split(/\s+/)
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    // Define all navigation items inside the component so we can use dynamic accountType
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: `/${accountType}/dashboard` },
        { name: 'Discover', icon: Compass, path: '/campaigns' },
        { name: 'Applications', icon: FileText, path: '/applications' },
        { name: 'Collaborations', icon: Users, path: '/collaborations' },
        { name: 'Payments', icon: CreditCard, path: '/payments' },
        { name: 'Performance', icon: TrendingUp, path: '/performance' },
        { name: 'Profile', icon: User, path: `/${accountType}/profile` },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    useEffect(() => {
        const fetchCreatorProfile = async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) return;

            try {
                const token = await currentUser.getIdToken();

                const response = await axios.get(
                    "http://localhost:5000/creator/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data.data);
            } catch (error) {
                console.error("Failed to fetch creator profile:", error);
            }
        };

        fetchCreatorProfile();
    }, []); // Add user to dependencies so it knows when it's already loaded

    console.log(user)
    // Handle navigation clicks safely
    const handleNavigation = (path) => {
        navigate(`${path}`);

        if (onClose) onClose();
    };

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`peer group fixed top-0 left-0 h-screen bg-white text-slate-700 border-r border-slate-200/80 flex flex-col justify-between p-2.5 z-50 transition-[width,transform] duration-300 ease-in-out select-none shadow-md
                w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:w-16 lg:hover:w-64`}
            >
                {/* Top Section */}
                <div className="w-full flex flex-col">

                    {/* Brand Header */}
                    <div className="w-full flex items-center justify-between h-11 px-1 overflow-hidden">
                        <div className="flex items-center">
                            <div className="w-9 h-9 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                                <img
                                    src={tabIcon}
                                    alt="Brand Logo"
                                    className="w-5 h-5 object-contain block"
                                />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-blue-900 ml-3 transition-all duration-300 ease-in-out overflow-hidden max-w-[150px] opacity-100 lg:max-w-0 lg:opacity-0 lg:group-hover:max-w-[150px] lg:group-hover:opacity-100 whitespace-nowrap">
                                CAMPGN
                            </span>
                        </div>

                        {/* Mobile Close Button */}
                        <button
                            onClick={onClose}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg lg:hidden transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="w-full h-[1px] bg-slate-100 my-2.5" />

                    {/* Navigation Items */}
                    <nav className="w-full space-y-1">
                        {navItems.map((item) => {
                            // Check if current URL matches the item path
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`w-full flex items-center justify-start p-2.5 rounded-xl transition-all duration-200 group/item relative overflow-hidden ${isActive
                                        ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-600/30'
                                        : 'text-slate-600 hover:bg-blue-50/80 hover:text-blue-600'
                                        }`}
                                >
                                    <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover/item:text-blue-600'} transition-colors duration-200`} />
                                    </div>

                                    <span className="text-sm font-medium whitespace-nowrap ml-3 transition-all duration-300 ease-in-out overflow-hidden max-w-[150px] opacity-100 lg:max-w-0 lg:opacity-0 lg:group-hover:max-w-[150px] lg:group-hover:opacity-100">
                                        {item.name}
                                    </span>

                                    {/* Desktop Tooltip */}
                                    <div className="hidden lg:block absolute left-16 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md shadow-lg opacity-0 pointer-events-none group-hover/item:opacity-100 group-hover:hidden transition-opacity duration-150 z-50 whitespace-nowrap">
                                        {item.name}
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Section: User Profile Card */}
                <div className="w-full border-t border-slate-100 pt-2.5">
                    <div
                        onClick={() => handleNavigation(`/${accountType}/profile`)}
                        className="w-full flex items-center p-1.5 rounded-xl hover:bg-blue-50/80 active:bg-blue-100/80 transition-all duration-200 cursor-pointer overflow-hidden group/profile"
                        title="View Profile"
                    >
                        <div className="w-9 h-9 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-transparent group-hover/profile:ring-blue-200 transition-all">
                            {initials}
                        </div>

                        <div className="text-left whitespace-nowrap ml-3 transition-all duration-300 ease-in-out overflow-hidden max-w-[120px] opacity-100 lg:max-w-0 lg:opacity-0 lg:group-hover:max-w-[120px] lg:group-hover:opacity-100">
                            <p className="text-sm font-semibold leading-tight text-slate-800 group-hover/profile:text-blue-700 transition-colors">
                                {displayName}
                            </p>
                            <p className="text-xs text-slate-400 group-hover/profile:text-blue-500 transition-colors">
                                {user?.email || ''}
                            </p>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents profile redirection when logging out
                                onLogout();
                            }}
                            aria-label="Log out"
                            className="ml-auto p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 ease-in-out overflow-hidden max-w-[32px] opacity-100 lg:max-w-0 lg:opacity-0 lg:group-hover:max-w-[32px] lg:group-hover:opacity-100"
                            title="Log out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}