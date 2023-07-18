import { Route, Routes } from 'react-router-dom';

// Pages
import HomePage from '@/pages/home/HomePage';
import MainLayout from '@/layouts/MainLayout';
import NotFoundPage from '@/pages/notFound/NotFoundPage';
import LoginPage from '@/pages/login/LoginPage';
import RegisterPage from '@/pages/register/RegisterPage';
import ForgotPasswordPage from '@/pages/forgotPassword/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/resetPassword/ResetPasswordPage';
import TentangKamiPage from '@/pages/tentangKami/TentangKamiPage';
import HitungKprPage from '@/pages/kpr/HitungKprPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import PropertyPage from '@/pages/property/PropertyPage';
import PropertyDetailPage from '@/pages/propertyDetail/PropertyDetailPage';
import ProjectDetailPage from '../pages/projects/ProjectDetailPage';
import SearchPropertyPage from '../pages/searchProperty/SearchPropertyPage';

export default function Router() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />

				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />

				<Route path="/kpr" element={<HitungKprPage />} />
				<Route path="/akun-saya" element={<ProfilePage />} />
				<Route path="/tentang-kami" element={<TentangKamiPage />} />

				<Route path="/property" element={<PropertyPage />} />
				<Route path="/property/search" element={<SearchPropertyPage />} />
				<Route path="/projects/:slug" element={<ProjectDetailPage />} />
				<Route path="/property/:slug" element={<PropertyDetailPage />} />

				<Route path="*" element={<NotFoundPage />} />
			</Route>

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
