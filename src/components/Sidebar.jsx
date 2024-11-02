import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  Cog6ToothIcon as CogIcon, 
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  KeyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Documents', href: '/documents', icon: DocumentTextIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Team', href: '/team', icon: UserGroupIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
  { name: 'API Keys', href: '/api-keys', icon: KeyIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  const NavLinks = () => (
    <nav className="flex-1 px-4 pb-4 space-y-1">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`sidebar-link ${isActive ? 'active' : ''}`}
          >
            <item.icon
              className="h-6 w-6"
              aria-hidden="true"
            />
            {item.name}
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
        />

        {/* Sidebar panel */}
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl transform transition duration-300 ease-in-out ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-xl"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center px-6">
            <h1 className="logo">
              SignForMe<span className="logo-ai">.AI</span>
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
          <div className="flex flex-col flex-grow pt-5 bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl overflow-y-auto border-r border-gray-200/20">
            <div className="flex items-center flex-shrink-0 px-6">
              <h1 className="logo">
                SignForMe<span className="logo-ai">.AI</span>
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
