import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import Sidebar from '../../components/shared/Sidebar';
import Navbar from '../../components/shared/Navbar';
import Welcomes from '../../components/brand/dashboard/Welcomes';
import BrandActiveCampaign from '../../components/brand/dashboard/BrandActiveCampaign';
import BrandApplication from '../../components/brand/dashboard/BrandApplication';


function BrandDashboard() {
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
        <main className="flex-1 p-1 sm:p-6 md:p-3">
          <Welcomes />
          <BrandActiveCampaign />
          <BrandApplication />
        </main>
      </div>
    </div>
  );
}

export default BrandDashboard;