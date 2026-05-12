import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Adjust based on your backend config

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  getAllBooks: () => api.get('/books'),
  getAvailableBooks: () => api.get('/books/available'),
  addBook: (bookData) => api.post('/books', bookData),
};

export const memberService = {
  getAllMembers: () => api.get('/members'),
  registerMember: (memberData) => api.post('/members'),
  getMemberDetails: (memberId) => api.get(`/members/${memberId}`),
};

export const issueService = {
  getAllIssues: () => api.get('/issues'),
  issueBook: (issueData) => api.post('/issues/issue', issueData),
  returnBook: (issueId) => api.put(`/issues/return/${issueId}`),
};

export default api;
