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
	pageParam: page = 1,
	category,
	subCategory,
	orderBy,
	search,
	userId,
	count = 8,
}) => {
	try {
		const res = await api.get(
			`/products?${category ? `category=${category}` : ''}${
				subCategory ? `&sub_category=${subCategory}` : ''
			}${orderBy ? `&order_by=${orderBy}` : ''}${
				search ? `&search=${search}` : ''
			}&page=${page}${userId ? `&user_id=${userId}` : ''}${
				count ? `&count=${count}` : ''
			}`
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
