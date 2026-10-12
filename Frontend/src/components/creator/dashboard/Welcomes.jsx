import useUserStore from '../../../zustand/useUserStore';

function Welcomes() {
    const user = useUserStore((state) => state.user);
    return (
        <div className="w-full px-4 py-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100 shadow-xs @container/welcome">
            <div className="flex flex-col gap-3 @4xl/welcome:flex-row @4xl/welcome:items-center @4xl/welcome:justify-between min-w-0">
                {/* Left Section: Greeting & Subtitle */}
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 flex items-center gap-2">
                        <span className="truncate">Welcome back, {user?.name?.trim().split(/\s+/)[0] || 'User'}</span>
                        <span className="inline-block hover:rotate-12 transition-transform duration-200 ease-out cursor-default select-none shrink-0">👋</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5 truncate sm:whitespace-normal">
                        Here’s an overview of your active campaigns.
                    </p>
                </div>

                {/* Right Section: Action Buttons */}
                <div className="flex flex-col @4xl/welcome:flex-row items-stretch @4xl/welcome:items-center gap-2.5 shrink-0 min-w-0">
                    {/* Secondary Button */}
                    <button
                        type="button"
                        className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-300/80 border border-slate-200/60 rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 cursor-pointer select-none whitespace-nowrap"
                    >
                        {/* Compass Icon */}
                        <svg className="w-4 h-4 text-slate-600 shrink-0 transition-transform duration-200 ease-out group-hover:rotate-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 13.5l1.5-4.5 4.5-1.5-1.5 4.5-4.5 1.5z" />
                        </svg>
                        <span>Explore New Campaigns</span>
                    </button>

                    {/* Primary Button */}
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer select-none whitespace-nowrap"
                    >
                        {/* Cloud Upload Icon */}
                        <svg className="w-4 h-4 text-white shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        <span>Submit Deliverable</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Welcomes;