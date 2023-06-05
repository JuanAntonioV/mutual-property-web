import { Route, Routes } from 'react-router-dom';

// Pages
import HomePage from '@pages/home/HomePage';
import MainLayout from '@layouts/MainLayout';

export default function Router() {
	return (
		<Routes>
			<Route Component={MainLayout}>
				<Route path="/" Component={HomePage} />
			</Route>
		</Routes>
	);
}
