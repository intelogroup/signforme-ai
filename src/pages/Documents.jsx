import { useState } from 'react';
import { 
  Squares2X2Icon as GridIcon,
  ListBulletIcon as ListIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  DocumentMagnifyingGlassIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Documents = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const pendingDocuments = [
    {
      id: 1,
      name: 'Q4 Financial Report.pdf',
      status: 'pending',
      deadline: '2024-03-15',
      priority: 'high',
      assignee: {
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      type: 'PDF',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Marketing Budget 2024.xlsx',
      status: 'pending',
      deadline: '2024-03-10',
      priority: 'medium',
      assignee: {
        name: 'Jane Smith',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      type: 'Excel',
      size: '1.8 MB',
    }
  ];

  const otherDocuments = [
    {
      id: 3,
      name: 'Vendor Contract.docx',
      status: 'rejected',
      deadline: '2024-03-05',
      priority: 'low',
      assignee: {
        name: 'Mike Johnson',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      type: 'Word',
      size: '956 KB',
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400';
      case 'rejected':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400';
      default:
        return '';
    }
  };

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
    <div className="space-y-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Documents
        </h2>
        <div className="flex items-center gap-4">
          {/* View toggle */}
          <div className="card-neumorphic p-1 rounded-xl">
            <div className="flex">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="List view"
              >
                <ListIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <GridIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button 
            type="button" 
            className="btn-primary bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-200"
            aria-label="Upload new document"
          >
            <PlusIcon className="h-5 w-5" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Pending Documents Section */}
      {pendingDocuments.length > 0 && (
        <div className="card card-neumorphic">
          <div className="flex items-center gap-2 mb-6">
            <ClockIcon className="h-6 w-6 text-amber-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Pending Documents
            </h3>
          </div>
          <div className="space-y-4">
            {pendingDocuments.map((document) => (
              <div
                key={document.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/50 dark:bg-navy-800/50 rounded-xl hover:bg-white/80 dark:hover:bg-navy-800/80 transition-all duration-200 group gap-4"
              >
                <div className="flex items-center gap-4">
                  <DocumentMagnifyingGlassIcon className="h-8 w-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {document.name}
                    </h4>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className={`badge ${getStatusBadgeClass(document.status)} px-2.5 py-1 rounded-lg text-sm font-medium`}>
                        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityClass(document.priority)}`}>
                        {document.priority.charAt(0).toUpperCase() + document.priority.slice(1)} Priority
                      </span>
                      <span className="text-sm text-gray-500">
                        Due {new Date(document.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-8 w-8 rounded-lg ring-2 ring-white dark:ring-navy-900 shadow-lg"
                      src={document.assignee.image}
                      alt={document.assignee.name}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{document.assignee.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
                      aria-label="Approve document"
                    >
                      <CheckIcon className="h-5 w-5" />
                      <span>Approve</span>
                    </button>
                    <button 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors duration-200"
                      aria-label="Reject document"
                    >
                      <XMarkIcon className="h-5 w-5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Documents Grid/List View */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {otherDocuments.map((document) => (
          <div
            key={document.id}
            className="card card-neumorphic group hover:scale-[1.02] transition-all duration-300"
            onClick={() => setSelectedDocument(document)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {document.name}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={`badge ${getStatusBadgeClass(document.status)} px-2.5 py-1 rounded-lg text-sm font-medium`}>
                    {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                  </span>
                  <span className={`text-sm font-medium ${getPriorityClass(document.priority)}`}>
                    {document.priority.charAt(0).toUpperCase() + document.priority.slice(1)} Priority
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    className="h-8 w-8 rounded-lg ring-2 ring-white dark:ring-navy-900 shadow-lg"
                    src={document.assignee.image}
                    alt={document.assignee.name}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {document.assignee.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Due {new Date(document.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button 
                className="btn-secondary bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl flex items-center gap-2 flex-1 justify-center shadow-lg transition-all duration-200"
                aria-label="Preview document"
              >
                <EyeIcon className="h-5 w-5" />
                Preview
              </button>
              <button 
                className="btn-secondary bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl flex items-center gap-2 flex-1 justify-center shadow-lg transition-all duration-200"
                aria-label="Download document"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
