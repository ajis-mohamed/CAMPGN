import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/shared/Sidebar';
import Navbar from '../../components/shared/Navbar';
import { logoutUser } from '../../services/authService';
import Welcomes from '../../components/creator/dashboard/Welcomes'
import CreatorCollaborationCard from '../../components/creator/dashboard/CreatorCollaborationCard'
import CreatorDashboardCard from '../../components/creator/dashboard/CreatorDashboardCard'
import CreatorRecommendedCampaign from '../../components/creator/dashboard/CreatorRecommendedCampaign'
import CreatorProfileRead from '../../components/creator/dashboard/CreatorProfileRead'
import CreatorWallet from '../../components/creator/dashboard/CreatorWallet'

function CreatorDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      {/* Responsive Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogOut}
      />

      {/* Main Container offset */}
      <div className="w-full pl-0 lg:pl-16 lg:peer-hover:pl-64 transition-[padding] duration-300 ease-in-out flex flex-col min-h-screen">

        {/* The navbar follows the desktop sidebar's smooth width transition. */}
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onMenuToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-1 sm:p-6 md:p-3 @container/dashboard">
          <Welcomes />
          <CreatorDashboardCard />
          <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">

            {/* Top Grid Area: Main Col (Left) + Sidebar Widgets (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Left Column (8 cols out of 12 on Desktop) */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-6 min-w-0">
                <CreatorCollaborationCard />
              </div>

              {/* Right Sidebar Column (5 cols out of 12 on Desktop) */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6 min-w-0">
                <CreatorWallet />
                <CreatorProfileRead />
              </div>

            </div>

            {/* Bottom Section: Spans Full Width */}
            <div className="w-full pt-4 border-t border-slate-200/80 min-w-0">
              <CreatorRecommendedCampaign />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default CreatorDashboard;