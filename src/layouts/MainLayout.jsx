import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  // Apply theme class to body
  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.remove('light');
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gradient-to-b dark:from-navy-900 dark:to-navy-950">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="max-w-7xl mx-auto pt-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-violet-500/5 pointer-events-none" />
    </div>
  );
};

export default MainLayout;
