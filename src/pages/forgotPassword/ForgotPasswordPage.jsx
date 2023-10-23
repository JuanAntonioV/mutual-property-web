import { useState } from 'react';

import MainContainer from '@/components/containers/MainContainer';
import { Link, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordApi } from '../../api/auth-api';
import { PulseLoader } from 'react-spinners';
import ErrorAlert from '../../components/alerts/ErrorAlert';
import SuccessAlert from '../../components/alerts/SuccessAlert';

export default function ForgotPasswordPage() {
	const [searchParams] = useSearchParams();
	const marketingRef = searchParams.get('ref');

	const [formValue, setFormValue] = useState({
		email: '',
	});

	const handleOnChange = e => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,
		});
	};

	const {
		mutate: forgotPasswordAction,
		data: forgotPasswordData,
		isLoading: isForgotPasswordLoading,
		isError: isForgotPasswordError,
		error: forgotPasswordError,
		isSuccess: isForgotPasswordSuccess,
	} = useMutation(payload => forgotPasswordApi(payload));

	const handleForgotPassword = e => {
		e.preventDefault();
		forgotPasswordAction(formValue);
	};

	return (
		<MainContainer className="mt-[100px]">
			<div className="flexCenter h-[calc(100vh-100px)]">
				<div className="bg-white p-6 border border-borderPrimary w-full lg:w-[500px] rounded-2xl shadow-lg hover:shadow duration-200">
					<header className="pt-3 pb-4 border-b border-borderPrimary">
						<h1 className="text-2xl font-bold">Lupa password</h1>
					</header>

					<main className="my-5 mt-8">
						<ErrorAlert
							isError={isForgotPasswordError}
							error={forgotPasswordError}
						/>
						<SuccessAlert
							isSuccess={isForgotPasswordSuccess}
							success={forgotPasswordData}
						/>
						<p className="pb-6 text-sm text-secondary md:text-base">
							Silahkan masukkan email yang terdaftar. Kami akan mengirimkan link
							untuk mengatur ulang password.
						</p>

						<form
							className="flex flex-col gap-4"
							onSubmit={handleForgotPassword}
						>
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium sm:text-base"
								>
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="inputSecondary"
									placeholder="Masukkan email anda..."
									onChange={handleOnChange}
									value={formValue.email}
									required
								/>
							</div>
							<div>
								<button
									type="submit"
									className="mt-6 text-sm btnPrimary md:text-base"
									disabled={isForgotPasswordLoading}
								>
									{isForgotPasswordLoading ? (
										<PulseLoader color="#fff" size={8} />
									) : (
										'Kirim'
									)}
								</button>
							</div>
						</form>
					</main>

					<footer className="pb-2">
						<p className="mt-6 text-sm text-center text-secondary md:text-base">
							Sudah ingat password?{' '}
							<Link
								to={`/login${marketingRef ? `?ref=${marketingRef}` : ''}`}
								className="textLink"
							>
								Masuk
							</Link>
						</p>
					</footer>
				</div>
			</div>
		</MainContainer>
	);
}
