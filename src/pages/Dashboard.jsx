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
import { api } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = async () => {
    try {
      console.log('Fetching documents...');
      setLoading(true);
      setError(null);
      const data = await api.getDocuments();
      console.log('Documents fetched:', data);
      setDocuments(data);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError(err.message || 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Dashboard mounted, fetching initial data...');
    fetchDocuments();
  }, []);

  const handleRefresh = async () => {
    console.log('Refreshing documents...');
    setIsRefreshing(true);
    await fetchDocuments();
    setIsRefreshing(false);
  };

  const handleStatusChange = async (documentId, newStatus) => {
    try {
      console.log('Updating document status:', { documentId, newStatus });
      await api.updateDocumentStatus(documentId, newStatus, user?.id);
      console.log('Status updated successfully');
      // Refresh documents after status update
      fetchDocuments();
    } catch (err) {
      console.error('Error updating document status:', err);
      setError('Failed to update document status');
    }
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

  const pendingDocuments = documents.filter(doc => doc.status === 'pending');

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

      {/* Error Message */}
      {error && (
        <div className="bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-4 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : (
        /* Pending Documents Section */
        <div className="card card-neumorphic bg-white dark:bg-gray-800/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-6 w-6 text-amber-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pending Documents ({pendingDocuments.length})
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
                      src={doc.assignee?.image}
                      alt={doc.assignee?.name}
                    />
                    <div className="flex gap-2">
                      <button 
                        className="btn-approve"
                        onClick={() => handleStatusChange(doc.id, 'approved')}
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => handleStatusChange(doc.id, 'rejected')}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {pendingDocuments.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No pending documents
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
