import api from '../lib/client-api';

export const getAllAboutInfo = async () => {
	try {
		const res = await api.get('/about');
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const getContactInfo = async () => {
	try {
		const res = await api.get('/about-contact');
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
