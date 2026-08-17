import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row antialiased font-sans">
      {/* Left Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Top Header */}
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Dynamic Nested Route Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet key={location.pathname} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
