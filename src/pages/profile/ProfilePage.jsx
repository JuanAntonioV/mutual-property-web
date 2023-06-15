import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { PulseLoader } from 'react-spinners';

import AuthContext from '../../contexts/AuthProvider';
import { logoutApi } from '../../api/auth-api';

import MainContainer from '@/components/containers/MainContainer';

import FavoriteSection from './partials/FavoriteSection';
import FormSection from './partials/FormSection';
import SideMenuSection from './partials/SideMenuSection';

export default function ProfilePage() {
	const navigate = useNavigate();
	const { auth, setAuth } = useContext(AuthContext);
	const [selectedTab, setSelectedTab] = useState('akun-saya');

	const { mutate: logoutAction, isLoading: isLogoutLoading } = useMutation(
		payload => logoutApi(payload),
		{
			onSuccess: () => {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				setAuth({});
				navigate('/');
			},
		}
	);

	const handleLogout = () => {
		logoutAction(auth?.token);
	};

	return (
		<div className="bg-gradient-to-b from-white via-indigo-50 via-80% to-white">
			<MainContainer className="mt-[100px]">
				<section className="grid grid-cols-1 gap-10 py-20 md:grid-cols-3 xl:grid-cols-4">
					<div className="items-start col-span-1 md:col-span-1 xl:col-span-1 flexCenter">
						<SideMenuSection
							selectedTab={selectedTab}
							onChangeTab={value => setSelectedTab(value)}
							logoutAction={handleLogout}
							isLogoutLoading={isLogoutLoading}
						/>
					</div>
					<div className="items-start col-span-1 md:col-span-2 xl:col-span-3 flexCenter">
						{selectedTab === 'akun-saya' && <FormSection />}
						{selectedTab === 'favorit' && <FavoriteSection />}
					</div>
				</section>
			</MainContainer>
		</div>
	);
}
