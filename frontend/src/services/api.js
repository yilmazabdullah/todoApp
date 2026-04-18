import axios from 'axios';

// API URL çevresel değişkenden alınır (Vite.js) docker'dan gelirse o, yoksa localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Yeni ekleyeceğiniz servisleri bu mantıkla genişletebilirsiniz:
// export const userService = { getUsers: () => api.get('/users/').then(r=>r.data) };

export const todoService = {
  getTodos: () => api.get('/todos/').then(res => res.data),
  createTodo: (todo) => api.post('/todos/', todo).then(res => res.data),
  updateTodo: (id, todo) => api.put(`/todos/${id}`, todo).then(res => res.data),
  deleteTodo: (id) => api.delete(`/todos/${id}`).then(res => res.data),
};

export default api;
