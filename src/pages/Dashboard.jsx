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
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    console.log('Dashboard mounted');
  }, []);

  const stats = [
    { 
      name: 'Pending Documents', 
      value: '12', 
      change: '+2',
      icon: ClockIcon, 
      trend: 'up',
      color: 'amber' 
    },
    { 
      name: 'Approved Documents', 
      value: '48', 
      change: '+5',
      icon: CheckCircleIcon, 
      trend: 'up',
      color: 'emerald' 
    },
    { 
      name: 'Rejected Documents', 
      value: '3', 
      change: '-1',
      icon: ExclamationTriangleIcon, 
      trend: 'down',
      color: 'rose' 
    },
    { 
      name: 'Total Documents', 
      value: '63', 
      change: '+6',
      icon: DocumentIcon, 
      trend: 'up',
      color: 'blue' 
    },
  ];

  const pendingDocuments = [
    {
      id: 1,
      name: 'Q4 Financial Report.pdf',
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
      priority: 'medium',
      deadline: '2024-03-10',
      assignee: {
        name: 'Jane Smith',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  ];

  const chatMessages = [
    {
      id: 1,
      user: 'John Doe',
      message: "I've uploaded the Q4 Financial Report for review.",
      timestamp: '2 min ago',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 2,
      user: 'Jane Smith',
      message: 'Marketing Budget has been approved.',
      timestamp: '5 min ago',
      userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      message: 'Please review the updated vendor contract.',
      timestamp: '10 min ago',
      userImage: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'upload',
      document: 'Q4 Financial Report',
      user: 'John Doe',
      timestamp: '2 hours ago',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 2,
      type: 'approve',
      document: 'Marketing Budget 2024',
      user: 'Jane Smith',
      timestamp: '4 hours ago',
      userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 3,
      type: 'reject',
      document: 'Vendor Contract',
      user: 'Mike Johnson',
      timestamp: '1 day ago',
      userImage: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
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

  return (
    <div className="space-y-8">
      {/* Welcome Section with Profile */}
      <div className="card card-neumorphic">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name || 'User'}
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Here's what's happening with your documents today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <ChartBarIcon className="h-16 w-16 text-blue-500/20" />
            </div>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="relative group"
            >
              <img
                className="h-12 w-12 rounded-xl ring-2 ring-white dark:ring-navy-900 shadow-lg transition-transform duration-200 group-hover:scale-105"
                src={user?.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                alt=""
              />
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-navy-800 shadow-lg ring-1 ring-black ring-opacity-5 p-4 z-50">
                  <div className="flex items-center gap-3 mb-4">
                    <UserCircleIcon className="h-6 w-6 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Profile</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Email: {user?.email || 'user@example.com'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Role: {user?.role || 'Manager'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Team: {user?.team || 'Executive'}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Pending Documents Section */}
      <div className="card card-neumorphic">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <ClockIcon className="h-6 w-6 text-amber-500" />
          Pending Documents
        </h3>
        <div className="space-y-4">
          {pendingDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 bg-white/50 dark:bg-navy-800/50 rounded-xl hover:bg-white/80 dark:hover:bg-navy-800/80 transition-all duration-200">
              <div className="flex items-center gap-4">
                <DocumentIcon className="h-8 w-8 text-gray-400" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</h4>
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
              <img
                className="h-8 w-8 rounded-lg ring-2 ring-white dark:ring-navy-900 shadow-lg"
                src={doc.assignee.image}
                alt={doc.assignee.name}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Feed */}
        <div className="lg:col-span-1">
          <div className="card card-neumorphic">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-500" />
              Chat Feed
            </h3>
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-4">
                  <img
                    className="h-8 w-8 rounded-lg ring-2 ring-white dark:ring-navy-900 shadow-lg"
                    src={message.userImage}
                    alt={message.user}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {message.user}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {message.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-0 focus:ring-0 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.name} className="card card-neumorphic group hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                  <div className={`stat-icon`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                        <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                        }`}>
                          {stat.trend === 'up' ? (
                            <ArrowTrendingUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                          ) : (
                            <ArrowTrendingDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
                          )}
                          <span className="ml-1">{stat.change}</span>
                        </p>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="card card-neumorphic">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivity.length - 1 ? (
                        <span
                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start space-x-3">
                        <div className="relative">
                          <img
                            className="h-10 w-10 rounded-xl ring-2 ring-white dark:ring-navy-900 shadow-lg"
                            src={activity.userImage}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <div className="text-sm">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {activity.user}
                              </span>{' '}
                              <span className="text-gray-500 dark:text-gray-400">
                                {activity.type === 'upload' && 'uploaded'}
                                {activity.type === 'approve' && 'approved'}
                                {activity.type === 'reject' && 'rejected'}
                              </span>{' '}
                              <span className="font-medium text-gray-900 dark:text-white">
                                {activity.document}
                              </span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
