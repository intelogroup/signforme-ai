import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  DocumentIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  ChartPieIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const Analytics = () => {
  const metrics = [
    {
      name: 'Total Documents',
      value: '2,367',
      change: '+12%',
      changeType: 'increase',
      icon: DocumentIcon,
      color: 'blue'
    },
    {
      name: 'Average Processing Time',
      value: '1.8 days',
      change: '-8%',
      changeType: 'decrease',
      icon: ClockIcon,
      color: 'violet'
    },
    {
      name: 'Approval Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: CheckCircleIcon,
      color: 'emerald'
    },
    {
      name: 'Rejection Rate',
      value: '5.8%',
      change: '-2.1%',
      changeType: 'decrease',
      icon: XCircleIcon,
      color: 'rose'
    },
  ];

  const topUsers = [
    { 
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      documents: 145,
      approvalRate: '97%',
      trend: 'up'
    },
    { 
      name: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      documents: 132,
      approvalRate: '95%',
      trend: 'up'
    },
    { 
      name: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      documents: 98,
      approvalRate: '92%',
      trend: 'down'
    },
    { 
      name: 'Sarah Wilson',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      documents: 87,
      approvalRate: '94%',
      trend: 'up'
    },
  ];

  return (
    <div className="space-y-8 py-8">
      {/* Header with Period Selector */}
      <div className="card card-neumorphic">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Track your document processing metrics and team performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn btn-secondary">
              <CalendarIcon className="h-5 w-5" />
              Last 30 Days
            </button>
            <button className="btn btn-primary">
              <ChartBarIcon className="h-5 w-5" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="card card-neumorphic group hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center">
              <div className={`stat-icon`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                    {metric.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {metric.value}
                    </p>
                    <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metric.changeType === 'increase' ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      {metric.changeType === 'increase' ? (
                        <ArrowTrendingUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
                      )}
                      <span className="ml-1">{metric.change}</span>
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Document Status Distribution */}
        <div className="card card-neumorphic">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ChartPieIcon className="h-6 w-6 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Document Status Distribution
              </h3>
            </div>
            <button className="btn btn-secondary">
              <ChartBarIcon className="h-5 w-5" />
              Details
            </button>
          </div>
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 rounded-xl border border-white/10">
            <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
          </div>
        </div>

        {/* Processing Time Trend */}
        <div className="card card-neumorphic">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-violet-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Processing Time Trend
              </h3>
            </div>
            <button className="btn btn-secondary">
              <ChartBarIcon className="h-5 w-5" />
              Details
            </button>
          </div>
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 rounded-xl border border-white/10">
            <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
          </div>
        </div>
      </div>

      {/* Top Users Table */}
      <div className="card card-neumorphic">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <UserGroupIcon className="h-6 w-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Top Performing Users
            </h3>
          </div>
          <button className="btn btn-secondary">
            View All Users
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">User</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Documents Processed</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Approval Rate</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700/50">
              {topUsers.map((user) => (
                <tr key={user.name} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-8 w-8 rounded-lg ring-2 ring-white dark:ring-navy-900 shadow-lg"
                        src={user.image}
                        alt={user.name}
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {user.documents}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {user.approvalRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center text-sm font-medium ${
                      user.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      {user.trend === 'up' ? (
                        <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                      )}
                      {user.trend === 'up' ? 'Improving' : 'Declining'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
