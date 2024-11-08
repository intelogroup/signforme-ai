import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  Cog6ToothIcon as CogIcon, 
  XMarkIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Documents', href: '/documents', icon: DocumentTextIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Team', href: '/team', icon: UserGroupIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  const NavLinks = () => (
    <nav className="flex-1 px-4 pb-4 space-y-1" aria-label="Main navigation">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`sidebar-link ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <item.icon className="h-6 w-6" aria-hidden="true" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-gray-600/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Sidebar panel */}
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-100/80 dark:bg-navy-900/80 backdrop-blur-xl transform transition duration-300 ease-in-out ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center px-6">
            <h1 className="text-xl font-bold">
              <span className="text-gray-900 dark:text-white">SignForMe</span>
              <span className="text-blue-600 dark:text-blue-400">.AI</span>
            </h1>
          </div>
          <div className="mt-8 flex-1 h-0 overflow-y-auto">
            <NavLinks />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-72">
          <div className="flex flex-col flex-grow pt-5 bg-gray-100/80 dark:bg-navy-900/80 backdrop-blur-xl overflow-y-auto border-r border-gray-200/20">
            <div className="flex items-center flex-shrink-0 px-6">
              <h1 className="text-xl font-bold">
                <span className="text-gray-900 dark:text-white">SignForMe</span>
                <span className="text-blue-600 dark:text-blue-400">.AI</span>
              </h1>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <NavLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
