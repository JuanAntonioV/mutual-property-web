import RouterScroll from '@/helpers/RouterScroll';
import Router from '@/routers/Router';
import { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileApi } from '../api/user-api';

export default function App() {
	const { auth, setAuth } = useContext(AuthContext);

	useQuery(['user'], () => getProfileApi(localStorage.getItem('token')), {
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		onSuccess: data => {
			const isAuth = true;
			localStorage.setItem('user', JSON.stringify(data.results));
			setAuth({
				...auth,
				user: data.results,
				isAuth,
			});
		},
		onError: err => {
			if (err.message == 'Unauthenticated') {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				setAuth({});
			}
		},
	});

	useEffect(() => {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');

		if (token) {
			setAuth({ token, user });
		} else {
			setAuth({});
		}
	}, []);

	return (
		<>
			<RouterScroll>
				<Router />
			</RouterScroll>
		</>
	);
}
