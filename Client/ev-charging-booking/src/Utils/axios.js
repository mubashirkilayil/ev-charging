import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:2000/api',
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('user')}`,
  },
});
// Add Authorization only when user is logged in
// instance.interceptors.request.use(config => {
//   const userData = localStorage.getItem('user');
//   if (userData) {
//     const parsed = JSON.parse(userData);
//     if (parsed.token) {
//       config.headers.Authorization = `Bearer ${parsed.token}`;
//     }
//   }
//   return config;
// });
export default instance;
