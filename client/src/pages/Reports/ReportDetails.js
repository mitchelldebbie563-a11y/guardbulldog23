import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const ReportDetails = () => {
  const { reportId } = useParams();

  const { data: report, isLoading, error } = useQuery(
    ['report', reportId],
    () => axios.get(`/api/reports/${reportId}`).then(res => res.data),
    {
      enabled: !!reportId
    }
  );

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-pending',
      investigating: 'badge-investigating',
      confirmed: 'badge-confirmed',
      resolved: 'badge-resolved',
      false_positive: 'badge-false-positive'
    };
    return badges[status] || 'badge-pending';
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      low: 'badge-low',
      medium: 'badge-medium',
      high: 'badge-high',
      critical: 'badge-critical'
    };
    return badges[severity] || 'badge-medium';
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading report details..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Report</h3>
        <p className="text-gray-500 mb-4">
          {error.response?.status === 404 ? 'Report not found' : 'Unable to load report details'}
        </p>
        <Link to="/app/my-reports" className="btn-primary">
          Back to My Reports
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/app/my-reports"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
            <p className="text-gray-600">Report ID: {report._id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={getStatusBadge(report.status)}>
            {report.status.replace('_', ' ')}
          </span>
          <span className={getSeverityBadge(report.severity)}>
            {report.severity}
          </span>
        </div>
      </div>

      {/* Report Overview */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Report Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
              <p className="text-gray-900">{report.emailSubject}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sender Email</label>
              <p className="text-gray-900 font-mono text-sm">{report.senderEmail}</p>
            </div>
            {report.senderName && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sender Name</label>
                <p className="text-gray-900">{report.senderName}</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <p className="text-gray-900 capitalize">{report.reportType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
              <p className="text-gray-900">{new Date(report.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
              <p className="text-gray-900">{new Date(report.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {report.analysisResults && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Analysis Results
            </h2>
          </div>
          <div className="space-y-4">
            {report.analysisResults.riskScore !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Score</label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        report.analysisResults.riskScore >= 80 ? 'bg-red-500' :
                        report.analysisResults.riskScore >= 60 ? 'bg-orange-500' :
                        report.analysisResults.riskScore >= 30 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${report.analysisResults.riskScore}%` }}
                    />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {report.analysisResults.riskScore}/100
                  </span>
                </div>
              </div>
            )}

            {report.analysisResults.verdict && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Verdict</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  report.analysisResults.verdict === 'malicious' ? 'bg-red-100 text-red-800' :
                  report.analysisResults.verdict === 'suspicious' ? 'bg-orange-100 text-orange-800' :
                  report.analysisResults.verdict === 'safe' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {report.analysisResults.verdict}
                </span>
              </div>
            )}

            {report.analysisResults.indicators && report.analysisResults.indicators.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Threat Indicators</label>
                <div className="space-y-2">
                  {report.analysisResults.indicators.map((indicator, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        indicator.severity === 'critical' ? 'bg-red-500' :
                        indicator.severity === 'high' ? 'bg-orange-500' :
                        indicator.severity === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {indicator.type.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-gray-600">{indicator.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        indicator.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        indicator.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        indicator.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {indicator.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {report.analysisResults.analyzedAt && (
              <div className="text-sm text-gray-500">
                Analyzed {report.analysisResults.analyzedBy === 'system' ? 'automatically' : `by ${report.analysisResults.analyzedBy}`} on {new Date(report.analysisResults.analyzedAt).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email Content */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Email Content
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Body</label>
            <div className="bg-gray-50 rounded-lg p-4 border">
              <pre className="whitespace-pre-wrap text-sm text-gray-900 font-mono">
                {report.emailContent}
              </pre>
            </div>
          </div>

          {report.emailHeaders && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Headers</label>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono">
                  {report.emailHeaders}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Attachments */}
      {report.attachments && report.attachments.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Attachments</h2>
          </div>
          <div className="space-y-2">
            {report.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{attachment.originalName}</p>
                    <p className="text-xs text-gray-500">
                      {attachment.mimetype} • {(attachment.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Secured</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Notes */}
      {report.adminNotes && report.adminNotes.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              Admin Notes
            </h2>
          </div>
          <div className="space-y-4">
            {report.adminNotes.map((note, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-4">
                <p className="text-sm text-gray-900">{note.note}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {new Date(note.addedAt).toLocaleString()}
                  {note.addedBy && (
                    <>
                      <span className="mx-1">•</span>
                      <UserIcon className="h-3 w-3 mr-1" />
                      {note.addedBy.firstName} {note.addedBy.lastName}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <Link
          to="/reports/my-reports"
          className="btn-secondary"
        >
          Back to My Reports
        </Link>
      </div>
    </div>
  );
};

export default ReportDetails;
