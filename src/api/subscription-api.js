import api from '../lib/client-api';

export const sendSubscriptionApi = async data => {
	try {
		const res = await api.post('/subscriptions', data);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
