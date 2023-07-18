import api from '../lib/client-api';

export const getAllUserFavorites = async ({ type, page = 1 }) => {
	try {
		const res = await api.get(`/user/favorites?type=${type}&page=${page}`);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const addPropertyToFavorites = async payload => {
	try {
		const res = await api.post(`/user/favorite-products`, payload);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const addProjectToFavorites = async payload => {
	try {
		const res = await api.post(`/user/favorite-projects`, payload);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
