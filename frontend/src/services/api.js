import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add Basic Auth header if credentials exist
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    config.headers.Authorization = `Basic ${auth}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authService = {
  login: (username, password) => {
    const token = btoa(`${username}:${password}`);
    return axios.get(`${API_BASE_URL}/auth/login`, {
      headers: { Authorization: `Basic ${token}` }
    }).then(response => {
      localStorage.setItem('auth', token);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    });
  },
  logout: () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => JSON.parse(localStorage.getItem('user')),
};

export const bookService = {
  getAllBooks: () => api.get('/books'),
  getAvailableBooks: () => api.get('/books/available'),
  addBook: (bookData) => api.post('/books', bookData),
};

export const memberService = {
  getAllMembers: () => api.get('/members'),
  registerMember: (memberData) => api.post('/members', memberData),
  getMemberDetails: (memberId) => api.get(`/members/${memberId}`),
};

export const issueService = {
  getAllIssues: () => api.get('/issues'),
  issueBook: (issueData) => api.post('/issues/issue', issueData),
  returnBook: (issueId) => api.put(`/issues/return/${issueId}`),
};

export default api;
