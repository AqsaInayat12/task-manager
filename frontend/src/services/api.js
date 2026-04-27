import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); 

export const getAllTasks = () => API.get('/tasks');
export const createTask = (newTask) => API.post('/tasks', newTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);