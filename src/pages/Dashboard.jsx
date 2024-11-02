import { useState, useEffect } from 'react';
import { 
  DocumentIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  BellAlertIcon,
  PlusIcon,
  TableCellsIcon,
  PhotoIcon,
  DocumentTextIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    console.log('Dashboard mounted');
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getDocumentIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return DocumentTextIcon;
      case 'excel':
        return TableCellsIcon;
      case 'image':
        return PhotoIcon;
      default:
        return DocumentIcon;
    }
  };

  const pendingDocuments = [
    {
      id: 1,
      name: 'Q4 Financial Report.pdf',
      type: 'pdf',
      priority: 'high',
      deadline: '2024-03-15',
      assignee: {
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: 2,
      name: 'Marketing Budget 2024.xlsx',
      type: 'excel',
      priority: 'medium',
      deadline: '2024-03-10',
      assignee: {
        name: 'Jane Smith',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: 3,
      name: 'Product Launch Banner.jpg',
      type: 'image',
      priority: 'medium',
      deadline: '2024-03-08',
      assignee: {
        name: 'Mike Johnson',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: 4,
      name: 'Legal Contract Draft.pdf',
      type: 'pdf',
      priority: 'high',
      deadline: '2024-03-12',
      assignee: {
        name: 'Sarah Wilson',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: 5,
      name: 'Sales Report Q1.xlsx',
      type: 'excel',
      priority: 'low',
      deadline: '2024-03-20',
      assignee: {
        name: 'Tom Brown',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-lg';
      case 'medium':
        return 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg';
      case 'low':
        return 'text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg';
      default:
        return '';
    }
  };

  const getIconColorClass = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'text-rose-500 dark:text-rose-400';
      case 'excel':
        return 'text-emerald-500 dark:text-emerald-400';
      case 'image':
        return 'text-blue-500 dark:text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card card-neumorphic bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Here's what's happening with your documents today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-xl bg-white/50 dark:bg-navy-800/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="btn-primary bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5" />
              Upload Document
            </button>
          </div>
        </div>
      </div>

      {/* Pending Documents Section */}
      <div className="card card-neumorphic bg-white dark:bg-gray-800/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-6 w-6 text-amber-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Pending Documents
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BellAlertIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {pendingDocuments.map((doc) => {
            const DocIcon = getDocumentIcon(doc.type);
            return (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-white/50 dark:bg-navy-800/50 rounded-xl hover:bg-white/80 dark:hover:bg-navy-800/80 transition-all duration-200 group">
                <div className="flex items-center gap-4">
                  <DocIcon className={`h-8 w-8 ${getIconColorClass(doc.type)} group-hover:scale-110 transition-transform`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{doc.name}</h4>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`text-xs font-medium ${getPriorityClass(doc.priority)}`}>
                        {doc.priority.charAt(0).toUpperCase() + doc.priority.slice(1)} Priority
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Due {new Date(doc.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="h-8 w-8 rounded-lg ring-2 ring-white dark:ring-navy-900 shadow-lg transition-transform group-hover:scale-110"
                    src={doc.assignee.image}
                    alt={doc.assignee.name}
                  />
                  <div className="flex gap-2">
                    <button className="btn-approve">
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button className="btn-reject">
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
