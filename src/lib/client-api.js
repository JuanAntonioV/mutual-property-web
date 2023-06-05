import axios from 'axios';

const APP_ENV = import.meta.env.VITE_APP_ENV;
const LOCAL_URL = import.meta.env.VITE_LOCAL_API_URL;
const PROD_URL = import.meta.env.VITE_PRODUCTION_API_URL;

const api = axios.create({
	baseURL: APP_ENV === 'production' ? PROD_URL : LOCAL_URL,
	headers: {
		'Content-type': 'application/json',
	},
});

export default api;
