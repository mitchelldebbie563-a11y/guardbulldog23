import React from 'react';
import { 
  ExclamationTriangleIcon, 
  AcademicCapIcon, 
  ShieldCheckIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import Card from '../UI/Card';

const QuickStats = ({ stats = {} }) => {
  const defaultStats = {
    reportsSubmitted: 0,
    modulesCompleted: 0,
    threatsBlocked: 0,
    securityScore: 0,
    ...stats
  };

  const statItems = [
    {
      label: 'Reports Submitted',
      value: defaultStats.reportsSubmitted,
      icon: ExclamationTriangleIcon,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Modules Completed',
      value: defaultStats.modulesCompleted,
      icon: AcademicCapIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Threats Blocked',
      value: defaultStats.threatsBlocked,
      icon: ShieldCheckIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Security Score',
      value: `${defaultStats.securityScore}%`,
      icon: ChartBarIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
