import api from '../lib/client-api';

export const addPropertyToFavorites = propertyId => {
	try {
		const res = api.post(`/user/favorite-products/${propertyId}`);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const addProjectToFavorites = projectId => {
	try {
		const res = api.post(`/user/favorite-projects/${projectId}`);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
