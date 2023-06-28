import api from '../lib/client-api';

export const loginApi = async payload => {
	try {
		const res = await api.post('/auth/login', payload);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const registerApi = async payload => {
	try {
		const res = await api.post('/auth/register', payload);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
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
		throw new Error(err.response.data.message);
	}
};

export const forgotPasswordApi = async payload => {
	try {
		const res = await api.post('/auth/forgot-password', payload);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const resetPasswordApi = async payload => {
	try {
		const res = await api.post('/auth/reset-password', payload);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const changePasswordApi = async ({ data, token }) => {
	try {
		const res = await api.post('/auth/change-password', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
