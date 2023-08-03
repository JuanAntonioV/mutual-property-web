import api from '../lib/client-api';

export const getNewestProductsApi = async () => {
	try {
		const res = await api.get('/newest-products');
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const getListingProductsApi = async () => {
	try {
		const res = await api.get('/listing-products');
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const getAllProductsApi = async ({
	page = 1,
	category,
	subCategory,
	orderBy,
	search,
	userId,
}) => {
	try {
		const res = await api.get(
			`/products?${category ? `category=${category}` : ''}${
				subCategory ? `&sub_category=${subCategory}` : ''
			}${orderBy ? `&order_by=${orderBy}` : ''}${
				search ? `&search=${search}` : ''
			}&page=${page}${userId ? `&user_id=${userId}` : ''}`
		);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};

export const getProductDetailApi = async ({ slug }) => {
	try {
		const res = await api.get(`/products/${slug}`);
		return res.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
};
