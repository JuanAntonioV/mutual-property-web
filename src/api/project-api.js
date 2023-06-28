import api from '../lib/client-api';

export const getProjectDetailApi = async ({ slug }) => {
	try {
		const response = await api.get(`/projects/${slug}`);
		return response.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
