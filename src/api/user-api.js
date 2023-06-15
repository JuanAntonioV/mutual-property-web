import api from '../lib/client-api';

export const getProfileApi = async token => {
	try {
		const res = await api.get('/user/profile', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
};

export const updateProfileApi = async ({ token, data }) => {
	try {
		const res = await api.patch('/user/profile', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
};
