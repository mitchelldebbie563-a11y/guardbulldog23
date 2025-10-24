import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/.netlify/functions',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls - Using simple functions that work
export const authAPI = {
  login: (credentials) => api.post('/login-simple', credentials),
  register: (userData) => api.post('/register-simple', userData),
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  changePassword: (data) => api.put('/change-password', data),
  logout: () => api.post('/logout'),
};

// Reports API calls
export const reportsAPI = {
  submitReport: (reportData) => {
    const formData = new FormData();
    Object.keys(reportData).forEach(key => {
      if (key === 'attachments' && reportData[key]) {
        Array.from(reportData[key]).forEach(file => {
          formData.append('attachments', file);
        });
      } else {
        formData.append(key, reportData[key]);
      }
    });
    return api.post('/create-report', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getUserReports: (params) => api.get('/get-reports', { params }),
  getReportById: (id) => api.get(`/get-reports?id=${id}`),
  updateReportStatus: (id, status) => api.put(`/update-report`, { id, status }),
  addAdminNote: (id, note) => api.post(`/add-note`, { reportId: id, note }),
  getTrendingThreats: () => api.get('/dashboard-stats'),
};

// Education API calls
export const educationAPI = {
  getModules: (params) => api.get('/education/modules', { params }),
  getModuleById: (id) => api.get(`/education/modules/${id}`),
  submitQuiz: (moduleId, answers) => api.post(`/education/modules/${moduleId}/quiz`, { answers }),
  getUserProgress: () => api.get('/education/progress'),
  createModule: (moduleData) => api.post('/education/modules', moduleData),
  updateModule: (id, moduleData) => api.put(`/education/modules/${id}`, moduleData),
  deleteModule: (id) => api.delete(`/education/modules/${id}`),
};

// Admin API calls - Using simple functions
export const adminAPI = {
  getDashboardStats: () => api.get('/dashboard-simple'),
  getAllReports: (params) => api.get('/get-reports', { params }),
  bulkUpdateReports: (reportIds, updates) => api.put('/bulk-update-reports', { reportIds, updates }),
  exportReports: (params) => api.get('/export-reports', { params }),
  getAllUsers: (params) => api.get('/get-users', { params }),
  updateUserRole: (userId, role) => api.put(`/update-user-role`, { userId, role }),
  getSystemHealth: () => api.get('/health'),
  getAuditLogs: (params) => api.get('/recent-activity', { params }),
};

export default api;
