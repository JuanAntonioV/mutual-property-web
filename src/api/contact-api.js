import api from '../lib/client-api';

export const sendContactApi = async data => {
	try {
		const res = await api.post('/contacts', data);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
