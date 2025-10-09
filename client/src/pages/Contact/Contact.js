import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600">
            We're here to help. Reach out to the BSU IT Security Team.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <EnvelopeIcon className="w-12 h-12 mx-auto text-secondary" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Email</h3>
            <p className="mt-2 text-gray-600">For general inquiries and support:</p>
            <a href="mailto:security@bowie.edu" className="text-primary hover:text-secondary font-medium">security@bowie.edu</a>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <PhoneIcon className="w-12 h-12 mx-auto text-secondary" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Phone</h3>
            <p className="mt-2 text-gray-600">For urgent security matters:</p>
            <a href="tel:301-860-4000" className="text-primary hover:text-secondary font-medium">(301) 860-4000</a>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <MapPinIcon className="w-12 h-12 mx-auto text-secondary" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Location</h3>
            <p className="mt-2 text-gray-600">Bowie State University</p>
            <p className="text-gray-500">IT Security Department</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
