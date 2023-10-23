import { useState } from 'react';

import MainContainer from '@/components/containers/MainContainer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorAlert from '../../components/alerts/ErrorAlert';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordApi } from '../../api/auth-api';
import { PulseLoader } from 'react-spinners';
import SuccessAlert from '../../components/alerts/SuccessAlert';
import CountdownTimer from '../../components/timers/CountdownTimer';

export default function ResetPasswordPage() {
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState('');

	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const email = searchParams.get('email');
	const ref = searchParams.get('ref');

	const navigate = useNavigate();

	const [formValue, setFormValue] = useState({
		password: '',
		passwordConfirmation: '',
	});

	const handleOnChange = e => {
		const { name, value } = e.target;

		setFormValue({
			...formValue,
			[name]: value,
		});
	};

	const {
		mutate: resetPasswordAction,
		isLoading: isResetPasswordLoading,
		isError: isResetPasswordError,
		error: resetPasswordError,
		isSuccess: isResetPasswordSuccess,
		data: resetPasswordData,
	} = useMutation(payload => resetPasswordApi(payload), {
		onSuccess: () => {
			setError({
				isError: false,
				message: null,
			});
			setFormValue({
				password: '',
				passwordConfirmation: '',
			});
			navigate(`/login${marketingRef ? `?ref=${marketingRef}` : ''}`);
		},
	});

	const handleResetPassword = e => {
		e.preventDefault();
		setError('');
		setIsSending(false);

		if (formValue.password !== formValue.passwordConfirmation) {
			setError({
				isError: true,
				message: 'Password dan konfirmasi password tidak sama',
			});
			return;
		}

		const data = {
			token: token,
			email: email,
			password: formValue.password,
			password_confirmation: formValue.passwordConfirmation,
		};

		setIsSending(true);
		resetPasswordAction(data);
	};

	return (
		<MainContainer className="mt-[100px]">
			<div className="flexCenter h-[calc(100vh-100px)]">
				<div className="bg-white p-6 border border-borderPrimary w-full lg:w-[500px] rounded-2xl shadow-lg hover:shadow duration-200">
					<header className="pt-3 pb-4 border-b border-borderPrimary">
						<h1 className="text-2xl font-bold">Reset password</h1>
					</header>

					<main className="my-5 mt-8">
						<ErrorAlert isError={error?.isError} error={error} />
						<ErrorAlert
							isError={isResetPasswordError}
							error={resetPasswordError}
						/>
						<SuccessAlert
							isSuccess={isResetPasswordSuccess}
							success={resetPasswordData}
						/>

						<form
							className="flex flex-col gap-4"
							onSubmit={handleResetPassword}
						>
							<div className="space-y-2">
								<label
									htmlFor="password"
									className="text-sm font-medium sm:text-base"
								>
									Password baru
								</label>
								<input
									type="password"
									name="password"
									id="password"
									className="inputSecondary"
									placeholder="Password baru"
									onChange={handleOnChange}
									value={formValue.password}
									required
								/>
							</div>

							<div className="flex justify-center">
								<CountdownTimer resendAction={handleResetPassword} />
							</div>

							<div className="space-y-2">
								<label
									htmlFor="passwordConfirmation"
									className="text-sm font-medium sm:text-base"
								>
									Konfirmasi password
								</label>
								<input
									type="password"
									name="passwordConfirmation"
									id="passwordConfirmation"
									className="inputSecondary"
									placeholder="Konfirmasi password baru"
									onChange={handleOnChange}
									value={formValue.passwordConfirmation}
									required
								/>
							</div>

							<div>
								<button
									type="submit"
									className="mt-6 text-sm btnPrimary md:text-base"
									disabled={isResetPasswordLoading}
								>
									{isResetPasswordLoading ? (
										<PulseLoader size={8} color="#fff" />
									) : (
										'Ganti password'
									)}
								</button>
							</div>
						</form>
					</main>
				</div>
			</div>
		</MainContainer>
	);
}
