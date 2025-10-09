import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';

const Home = () => {
  const features = [
    {
      icon: ExclamationTriangleIcon,
      title: 'Report Phishing',
      description: 'Quickly report suspicious emails and help protect the university community.',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: AcademicCapIcon,
      title: 'Security Education',
      description: 'Learn to identify and prevent phishing attacks through interactive modules.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: ChartBarIcon,
      title: 'Threat Analytics',
      description: 'View real-time statistics and trends about phishing threats.',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Advanced Protection',
      description: 'Comprehensive security measures to keep your data safe.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  const stats = [
    { label: 'Phishing Attempts blocked', value: '2,847' },
    { label: 'Users Trained', value: '1,234' },
    { label: 'Reports Processed', value: '456' },
    { label: 'Security Score', value: '98%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <ShieldCheckIcon className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              GUARD<span className="text-blue-600">BULLDOG</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Bowie State University's comprehensive phishing awareness and reporting system. 
              Protect yourself and the university community from cyber threats.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Phishing Protection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to stay safe from phishing attacks
              and contribute to university-wide cybersecurity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Enhance Your Security?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Bowie State students and faculty in creating a safer digital environment.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">GB</span>
                </div>
                <span className="text-xl font-bold">GUARDBULLDOG</span>
              </div>
              <p className="text-gray-400">
                Protecting Bowie State University from phishing threats through education and awareness.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
                <li><Link to="/register" className="hover:text-white">Register</Link></li>
                <li><button className="hover:text-white">Help Center</button></li>
                <li><button className="hover:text-white">Contact IT</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="text-gray-400 space-y-2">
                <p>Bowie State University</p>
                <p>IT Security Department</p>
                <p>security@bowie.edu</p>
                <p>(301) 860-4000</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bowie State University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
