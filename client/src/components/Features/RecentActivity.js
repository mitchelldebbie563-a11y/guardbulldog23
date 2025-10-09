import React from 'react';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  AcademicCapIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Badge from '../UI/Badge';

const RecentActivity = ({ activities = [] }) => {
  const defaultActivities = [
    {
      id: 1,
      type: 'module_completed',
      title: 'Completed "Email Security Basics" module',
      description: 'Scored 95% on the quiz',
      timestamp: '2 hours ago',
      icon: AcademicCapIcon,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'report_submitted',
      title: 'Reported suspicious email',
      description: 'From "security@fake-bank.com"',
      timestamp: '1 day ago',
      icon: ExclamationTriangleIcon,
      color: 'text-red-500'
    },
    {
      id: 3,
      type: 'security_check',
      title: 'Account security check completed',
      description: 'All security measures are up to date',
      timestamp: '3 days ago',
      icon: ShieldCheckIcon,
      color: 'text-blue-500'
    }
  ];

  const activityList = activities.length > 0 ? activities : defaultActivities;

  const getActivityBadge = (type) => {
    switch (type) {
      case 'module_completed':
        return <Badge variant="success" size="sm">Completed</Badge>;
      case 'report_submitted':
        return <Badge variant="warning" size="sm">Reported</Badge>;
      case 'security_check':
        return <Badge variant="info" size="sm">Verified</Badge>;
      default:
        return <Badge variant="default" size="sm">Activity</Badge>;
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activityList.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </p>
                {getActivityBadge(activity.type)}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {activityList.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No recent activity</p>
          <p className="text-sm text-gray-400 mt-1">
            Start by reporting a phishing email or taking a security module
          </p>
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
