import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { getAllCategoriesApi } from '../api/category-api';

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
	const [category, setCategory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const {
		isLoading: isCategoryLoading,
		isError: isCategoryError,
		error: categoryError,
	} = useQuery(['categories'], getAllCategoriesApi, {
		refetchOnWindowFocus: false,
		select: res => res.results,
		onSuccess: data => {
			setCategory(data);
		},
	});

	useEffect(() => {
		if (isCategoryLoading) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [isCategoryLoading]);

	useEffect(() => {
		if (isCategoryError) {
			setIsError(true);
			setErrorMessage(categoryError.message);
		} else {
			setIsError(false);
			setErrorMessage('');
		}
	}, [isCategoryError, categoryError]);

	return (
		<StoreContext.Provider
			value={{ category, setCategory, isLoading, isError, errorMessage }}
		>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreContext;
