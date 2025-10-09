import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  HomeIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UserIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const mainNavigation = [
    { 
      name: 'Dashboard', 
      href: '/app/dashboard', 
      icon: HomeIcon,
      description: 'Overview and quick actions'
    },
    { 
      name: 'Report Phishing', 
      href: '/app/report-phishing', 
      icon: ExclamationTriangleIcon,
      description: 'Submit suspicious emails',
      highlight: true
    },
    { 
      name: 'My Reports', 
      href: '/app/my-reports', 
      icon: DocumentTextIcon,
      description: 'View your submitted reports'
    },
    { 
      name: 'Education Center', 
      href: '/app/education', 
      icon: AcademicCapIcon,
      description: 'Learn about phishing threats'
    },
    { 
      name: 'Profile', 
      href: '/app/profile', 
      icon: UserIcon,
      description: 'Manage your account'
    },
  ];

  const adminNavigation = [
    { 
      name: 'Admin Dashboard', 
      href: '/app/admin/dashboard', 
      icon: ChartBarIcon,
      description: 'System overview and analytics'
    },
    { 
      name: 'Manage Reports', 
      href: '/app/admin/reports', 
      icon: DocumentTextIcon,
      description: 'Review and manage all reports'
    },
    { 
      name: 'Manage Users', 
      href: '/app/admin/users', 
      icon: UsersIcon,
      description: 'User management and permissions'
    },
  ];

  const superAdminNavigation = [
    { 
      name: 'System Settings', 
      href: '/app/admin/settings', 
      icon: Cog6ToothIcon,
      description: 'Configure system settings'
    },
    { 
      name: 'Security Logs', 
      href: '/app/admin/security', 
      icon: ShieldCheckIcon,
      description: 'View security audit logs'
    },
  ];

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-900">Navigation</span>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {user?.role?.replace('_', ' ').toUpperCase()}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-3 py-4 space-y-2">
              {/* Main Navigation */}
              <div className="space-y-1">
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Main Menu
                  </h3>
                </div>
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleLinkClick}
                    className={`${
                      isActive(item.href)
                        ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    } ${
                      item.highlight ? 'ring-1 ring-red-200 hover:ring-red-300' : ''
                    } group flex items-center px-3 py-2.5 text-sm font-medium rounded-l-md transition-all duration-200 relative`}
                  >
                    <item.icon
                      className={`${
                        isActive(item.href) 
                          ? 'text-blue-500' 
                          : item.highlight 
                            ? 'text-red-500 group-hover:text-red-600'
                            : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-5 w-5`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 truncate">{item.description}</div>
                    </div>
                    {isActive(item.href) && (
                      <ChevronRightIcon className="w-4 h-4 text-blue-500" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Admin Navigation */}
              {(user?.role === 'admin' || user?.role === 'super_admin') && (
                <div className="mt-6">
                  <div className="px-3 mb-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Administration
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {adminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={handleLinkClick}
                        className={`${
                          isActive(item.href)
                            ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700 shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        } group flex items-center px-3 py-2.5 text-sm font-medium rounded-l-md transition-all duration-200 relative`}
                      >
                        <item.icon
                          className={`${
                            isActive(item.href) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                          } mr-3 flex-shrink-0 h-5 w-5`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500 truncate">{item.description}</div>
                        </div>
                        {isActive(item.href) && (
                          <ChevronRightIcon className="w-4 h-4 text-blue-500" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Super Admin Navigation */}
              {user?.role === 'super_admin' && (
                <div className="mt-6">
                  <div className="px-3 mb-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      System
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {superAdminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={handleLinkClick}
                        className={`${
                          isActive(item.href)
                            ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700 shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        } group flex items-center px-3 py-2.5 text-sm font-medium rounded-l-md transition-all duration-200 relative`}
                      >
                        <item.icon
                          className={`${
                            isActive(item.href) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                          } mr-3 flex-shrink-0 h-5 w-5`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500 truncate">{item.description}</div>
                        </div>
                        {isActive(item.href) && (
                          <ChevronRightIcon className="w-4 h-4 text-blue-500" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-500 text-center">
                <div className="font-medium">GUARDBULLDOG v1.0</div>
                <div>Bowie State University</div>
                <div className="mt-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  System Online
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
