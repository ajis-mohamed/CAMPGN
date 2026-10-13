import React, { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import Sidebar from '../../components/shared/Sidebar';
import CreatorDetails from '../../components/creator/profile/CreatorDetails';
import { useNavigate } from 'react-router-dom';
import CreatorInsights from '../../components/creator/profile/CreatorInsights';
import CreatorChannels from '../../components/creator/profile/CreatorChannels';
import CreatorDemographics from '../../components/creator/profile/CreatorDemographics';
import CreatorCollabEmptyState from '../../components/creator/profile/CreatorCollabEmptyState';
import CreatorWork from '../../components/creator/profile/CreatorWork';
import CreatorCollab from '../../components/creator/profile/CreatorCollab';
import { logoutUser } from '../../services/authService';
import CreatorNarratives from '../../components/creator/profile/CreatorNarratives';

function CreatorProfile() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Parent state to keep track of work items sent from CreatorWork child
    const [myWorks, setMyWorks] = useState([]);
    const [myCollab, setMyCollab] = useState([]);

    async function handleLogOut() {
        try {
            await logoutUser();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-x-clip">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={handleLogOut}
            />

            <div className="w-full pl-0 lg:pl-16 lg:peer-hover:pl-64 transition-[padding] duration-300 ease-in-out flex flex-col min-h-screen">
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    onMenuToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
                />

                <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 @container/dashboard">
                    <CreatorDetails />
                    <CreatorInsights />
                    <CreatorNarratives />
                    <CreatorWork />
                    <CreatorCollab />

                    <div className="grid grid-cols-1 @min-[700px]/dashboard:grid-cols-2 items-stretch gap-6">
                        <CreatorChannels />
                        <CreatorDemographics />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CreatorProfile;