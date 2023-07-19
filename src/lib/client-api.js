import axios from 'axios';

const APP_ENV = import.meta.env.VITE_APP_ENV;
const LOCAL_URL = import.meta.env.VITE_LOCAL_API_URL;
const PROD_URL = import.meta.env.VITE_PRODUCTION_API_URL;

const api = axios.create({
	baseURL: APP_ENV === 'production' ? PROD_URL : LOCAL_URL,
	withCredentials: true,
});

api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default api;
