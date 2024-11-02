import { useState } from 'react';
import {
  UserCircleIcon,
  BuildingOfficeIcon,
  ArrowPathRoundedSquareIcon,
  DocumentCheckIcon,
  DocumentIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const Team = () => {
  const [selectedTab, setSelectedTab] = useState('internal');

  const internalTeam = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Senior Document Manager',
      role: 'Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      description: 'Oversees document workflow and approval processes. Expert in contract management and compliance.',
      stats: {
        approved: 156,
        pending: 12,
        rejected: 8
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Document Reviewer',
      role: 'Referee',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      description: 'Specializes in financial document review and risk assessment. Background in corporate finance.',
      stats: {
        approved: 89,
        pending: 5,
        rejected: 3
      }
    },
    {
      id: 3,
      name: 'Mike Johnson',
      title: 'Legal Document Specialist',
      role: 'Referee',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      description: 'Focuses on legal document review and compliance. Expert in contract law and regulations.',
      stats: {
        approved: 112,
        pending: 8,
        rejected: 15
      }
    }
  ];

  const externalRequesters = [
    {
      id: 1,
      name: 'Tech Innovations Inc.',
      type: 'Technology',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&h=128&q=80',
      description: 'Leading technology company specializing in AI and machine learning solutions.',
      requesters: [
        {
          name: 'Sarah Wilson',
          role: 'Technical Lead',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          documentsSubmitted: 45
        },
        {
          name: 'Tom Brown',
          role: 'Project Manager',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          documentsSubmitted: 32
        }
      ]
    },
    {
      id: 2,
      name: 'Global Finance Corp',
      type: 'Finance',
      logo: 'https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&h=128&q=80',
      description: 'International financial services provider specializing in investment management.',
      requesters: [
        {
          name: 'Emily Chen',
          role: 'Financial Analyst',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          documentsSubmitted: 28
        }
      ]
    }
  ];

  const documentFlow = [
    {
      from: 'External Requester',
      to: 'Document Manager',
      description: 'Initial document submission and classification',
      icon: DocumentIcon
    },
    {
      from: 'Document Manager',
      to: 'Referee',
      description: 'Assignment to appropriate referee for review',
      icon: ArrowPathRoundedSquareIcon
    },
    {
      from: 'Referee',
      to: 'Document Manager',
      description: 'Review completion and recommendations',
      icon: DocumentCheckIcon
    }
  ];

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Team
        </h2>
        <div className="flex items-center gap-4">
          <div className="card-neumorphic p-1 rounded-xl">
            <div className="flex">
              <button
                type="button"
                onClick={() => setSelectedTab('internal')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedTab === 'internal'
                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Internal Team
              </button>
              <button
                type="button"
                onClick={() => setSelectedTab('external')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedTab === 'external'
                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                External Requesters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Flow */}
      <div className="card card-neumorphic bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Document Flow
        </h3>
        <div className="flex items-center justify-between">
          {documentFlow.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-white/50 dark:bg-navy-800/50 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{step.from}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
              {index < documentFlow.length - 1 && (
                <div className="w-24 h-0.5 bg-gray-200 dark:bg-gray-700 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedTab === 'internal' ? (
        /* Internal Team */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internalTeam.map((member) => (
            <div key={member.id} className="card card-neumorphic group hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-12 w-12 rounded-xl ring-2 ring-white dark:ring-navy-900 shadow-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {member.title}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400 mt-2">
                    {member.role}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                {member.description}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="text-2xl font-semibold text-emerald-500">{member.stats.approved}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Approved</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-semibold text-amber-500">{member.stats.pending}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-semibold text-rose-500">{member.stats.rejected}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rejected</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* External Requesters */
        <div className="space-y-8">
          {externalRequesters.map((org) => (
            <div key={org.id} className="card card-neumorphic">
              <div className="flex items-start gap-6">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {org.name}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400 mt-2">
                        {org.type}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {org.description}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Document Requesters
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {org.requesters.map((requester, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/50 dark:bg-navy-800/50 rounded-xl">
                      <img
                        src={requester.image}
                        alt={requester.name}
                        className="h-10 w-10 rounded-lg ring-2 ring-white dark:ring-navy-900 shadow-lg"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {requester.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {requester.role}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <DocumentIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {requester.documentsSubmitted} documents submitted
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;
