import { useEffect } from 'react';
import { 
  DocumentIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

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
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
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
          <div className="hidden lg:block">
            <ChartBarIcon className="h-16 w-16 text-blue-500/20" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
  );
};

export default Dashboard;
