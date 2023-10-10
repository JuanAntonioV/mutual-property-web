import api from '@/lib/client-api';

export const getAllHeroImages = async () => {
	try {
		const res = await api.get('/hero-images');
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
