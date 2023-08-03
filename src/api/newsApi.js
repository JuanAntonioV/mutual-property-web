import api from '../lib/client-api';

export const getAllNews = async () => {
	try {
		const res = await api.get('/news');
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
