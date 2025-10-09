import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import QuickStats from '../../components/Features/QuickStats';
import RecentActivity from '../../components/Features/RecentActivity';
import QuickActions from '../../components/Features/QuickActions';

const fetchDashboardStats = async () => {
  const { data } = await axios.get('/api/dashboard-stats');
  return data;
};

const fetchRecentActivity = async () => {
  const { data } = await axios.get('/api/recent-activity');
  return data;
};

const Dashboard = () => {
  const { user } = useAuth();

  const { data: stats, isLoading: isLoadingStats } = useQuery('dashboardStats', fetchDashboardStats);
  const { data: activities, isLoading: isLoadingActivities } = useQuery('recentActivity', fetchRecentActivity);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="mt-1 text-blue-100">
              Help protect Bowie State University from phishing threats
            </p>
          </div>
          <div className="hidden sm:block">
            <ShieldCheckIcon className="h-16 w-16 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {isLoadingStats ? <LoadingSpinner /> : <QuickStats stats={stats} />}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions - Takes 2 columns */}
        <div className="lg:col-span-2">
          <QuickActions userRole={user?.role} />
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          {isLoadingActivities ? <LoadingSpinner /> : <RecentActivity activities={activities} />}
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <ShieldCheckIcon className="h-5 w-5 mr-2" />
          Security Tip of the Day
        </h2>
        <p className="text-blue-800">
          Always verify the sender's email address before clicking any links. Legitimate organizations 
          will never ask for sensitive information via email. When in doubt, contact the organization 
          directly through their official website or phone number.
        </p>
      </div>

      {/* Admin Quick Access */}
      {(user?.role === 'admin' || user?.role === 'super_admin') && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ChartBarIcon className="h-5 w-5 mr-2 text-purple-600" />
            Administration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/app/admin/dashboard"
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow group border border-gray-200"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                  <ChartBarIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Admin Dashboard</h3>
                  <p className="text-sm text-gray-500">View system statistics and reports</p>
                </div>
              </div>
            </Link>
            <Link
              to="/app/admin/reports"
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow group border border-gray-200"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-orange-100 group-hover:bg-orange-200 transition-colors">
                  <DocumentTextIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Manage Reports</h3>
                  <p className="text-sm text-gray-500">Review and process phishing reports</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
