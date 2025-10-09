import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ExclamationTriangleIcon, 
  AcademicCapIcon, 
  DocumentTextIcon,
  UserIcon,
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';

const QuickActions = ({ userRole = 'user' }) => {
  const userActions = [
    {
      title: 'Report Suspicious Email',
      description: 'Quickly report phishing attempts to protect the community',
      icon: ExclamationTriangleIcon,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      href: '/app/report-phishing',
      priority: true
    },
    {
      title: 'Take Security Training',
      description: 'Learn about the latest phishing techniques and prevention',
      icon: AcademicCapIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      href: '/app/education'
    },
    {
      title: 'View My Reports',
      description: 'Check the status of your submitted phishing reports',
      icon: DocumentTextIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      href: '/app/my-reports'
    },
    {
      title: 'Update Profile',
      description: 'Manage your account settings and preferences',
      icon: UserIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      href: '/app/profile'
    }
  ];

  const adminActions = [
    ...userActions,
    {
      title: 'Admin Dashboard',
      description: 'View system statistics and manage reports',
      icon: ChartBarIcon,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      href: '/app/admin/dashboard'
    }
  ];

  const actions = userRole === 'admin' || userRole === 'super_admin' ? adminActions : userActions;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className={`block p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              action.priority 
                ? 'border-red-200 bg-red-50 hover:border-red-300' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Need Help?</h4>
            <p className="text-sm text-gray-600">Contact IT Support for assistance</p>
          </div>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
