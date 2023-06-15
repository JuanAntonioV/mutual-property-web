import api from '../lib/client-api';

export const loginApi = async payload => {
	try {
		const res = await api.post('/auth/login', payload);
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
};

export const logoutApi = async token => {
	try {
		const res = await api.post(
			'/auth/logout',
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
};
