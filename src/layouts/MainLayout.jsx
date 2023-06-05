import React from 'react';
import MainHeader from '../components/headers/MainHeader';
import MainFooter from '../components/footers/MainFooter';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
	return (
		<>
			<MainHeader />
			<Outlet />
			<MainFooter />
		</>
	);
}
