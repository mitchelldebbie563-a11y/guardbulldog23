import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  ExclamationTriangleIcon,
  DocumentArrowUpIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const ReportPhishing = () => {
  const [formData, setFormData] = useState({
    emailSubject: '',
    senderEmail: '',
    senderName: '',
    emailContent: '',
    emailHeaders: '',
    reportType: 'phishing',
    severity: 'medium'
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submitReportMutation = useMutation(
    (reportData) => {
      const formDataToSend = new FormData();
      Object.keys(reportData).forEach(key => {
        if (key !== 'attachments') {
          formDataToSend.append(key, reportData[key]);
        }
      });
      files.forEach(file => {
        formDataToSend.append('attachments', file);
      });
      return axios.post('/api/reports/submit', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    {
      onSuccess: (response) => {
        toast.success('Report submitted successfully!');
        navigate('/app/my-reports');
      },
      onError: (error) => {
        const message = error.response?.data?.message || 'Failed to submit report';
        toast.error(message);
      }
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailSubject.trim()) {
      newErrors.emailSubject = 'Email subject is required';
    }

    if (!formData.senderEmail.trim()) {
      newErrors.senderEmail = 'Sender email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.senderEmail)) {
      newErrors.senderEmail = 'Please enter a valid email address';
    }

    if (!formData.emailContent.trim()) {
      newErrors.emailContent = 'Email content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    submitReportMutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Report Phishing Email</h1>
        </div>
        <p className="text-gray-600">
          Help protect the Bowie State University community by reporting suspicious emails.
          Your report will be analyzed and used to improve our security measures.
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <InformationCircleIcon className="h-5 w-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Important Guidelines</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Do not forward the suspicious email to others</li>
                <li>Do not click any links or download attachments from the suspicious email</li>
                <li>Provide as much detail as possible to help our analysis</li>
                <li>If urgent, also contact IT Security at security@bowie.edu</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Report Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Email Details</h2>
          </div>

          <div className="space-y-4">
            {/* Email Subject */}
            <div>
              <label htmlFor="emailSubject" className="block text-sm font-medium text-gray-700 mb-1">
                Email Subject *
              </label>
              <input
                type="text"
                id="emailSubject"
                name="emailSubject"
                value={formData.emailSubject}
                onChange={handleChange}
                className={`form-input ${errors.emailSubject ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="Enter the subject line of the suspicious email"
              />
              {errors.emailSubject && (
                <p className="mt-1 text-sm text-red-600">{errors.emailSubject}</p>
              )}
            </div>

            {/* Sender Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Email Address *
                </label>
                <input
                  type="email"
                  id="senderEmail"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  className={`form-input ${errors.senderEmail ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="suspicious@example.com"
                />
                {errors.senderEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.senderEmail}</p>
                )}
              </div>
              <div>
                <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Name (if shown)
                </label>
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Display name of sender"
                />
              </div>
            </div>

            {/* Email Content */}
            <div>
              <label htmlFor="emailContent" className="block text-sm font-medium text-gray-700 mb-1">
                Email Content *
              </label>
              <textarea
                id="emailContent"
                name="emailContent"
                rows={8}
                value={formData.emailContent}
                onChange={handleChange}
                className={`form-textarea ${errors.emailContent ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="Copy and paste the full email content here..."
              />
              {errors.emailContent && (
                <p className="mt-1 text-sm text-red-600">{errors.emailContent}</p>
              )}
            </div>

            {/* Email Headers */}
            <div>
              <label htmlFor="emailHeaders" className="block text-sm font-medium text-gray-700 mb-1">
                Email Headers (Optional)
              </label>
              <textarea
                id="emailHeaders"
                name="emailHeaders"
                rows={4}
                value={formData.emailHeaders}
                onChange={handleChange}
                className="form-textarea"
                placeholder="If available, paste the email headers here for detailed analysis..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Email headers provide technical information that helps with analysis. 
                Most email clients allow you to view headers in the email options.
              </p>
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Classification</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select
                id="reportType"
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="phishing">Phishing</option>
                <option value="spam">Spam</option>
                <option value="malware">Malware</option>
                <option value="suspicious">Suspicious</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                Severity Level
              </label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* File Attachments */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Attachments (Optional)</h2>
          </div>

          <div>
            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Email Files
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="attachments"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="attachments"
                      name="attachments"
                      type="file"
                      multiple
                      accept=".eml,.msg,.txt,.pdf,.png,.jpg,.jpeg,.gif"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  EML, MSG, TXT, PDF, PNG, JPG up to 10MB each
                </p>
              </div>
            </div>
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected files:</p>
                <ul className="text-sm text-gray-500">
                  {files.map((file, index) => (
                    <li key={index}>• {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/app/dashboard')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitReportMutation.isLoading}
            className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitReportMutation.isLoading ? (
              <>
                <div className="spinner mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                Submit Report
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportPhishing;
