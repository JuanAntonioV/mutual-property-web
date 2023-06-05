import { Route, Routes } from 'react-router-dom';

// Pages
import HomePage from '@pages/home/HomePage';
import MainLayout from '@layouts/MainLayout';
import NotFoundPage from '@/pages/notFound/NotFoundPage';
import LoginPage from '@/pages/login/LoginPage';
import RegisterPage from '@/pages/register/RegisterPage';
import ForgotPasswordPage from '@/pages/forgotPassword/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/resetPassword/ResetPasswordPage';

export default function Router() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />

				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />

				<Route path="*" element={<NotFoundPage />} />
			</Route>

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
