import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  // Custom breadcrumb names
  const breadcrumbNameMap = {
    'app': 'Home',
    'dashboard': 'Dashboard',
    'report-phishing': 'Report Phishing',
    'my-reports': 'My Reports',
    'reports': 'Report Details',
    'profile': 'Profile',
    'education': 'Education',
    'modules': 'Module',
    'admin': 'Admin',
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link to="/app/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </li>
        {pathnames.slice(1).map((value, index) => {
          const last = index === pathnames.length - 2;
          const to = `/${pathnames.slice(0, index + 2).join('/')}`;
          const name = breadcrumbNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRightIcon className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                {last ? (
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">{name}</span>
                ) : (
                  <Link to={to} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">
                    {name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
