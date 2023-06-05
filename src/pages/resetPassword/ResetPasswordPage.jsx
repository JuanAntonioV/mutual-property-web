import { useState } from 'react';

import MainContainer from '@/components/containers/MainContainer';

export default function ResetPasswordPage() {
	const [formValue, setFormValue] = useState({
		password: '',
		passwordConfirmation: '',
	});

	const handleOnChange = e => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,
		});
	};

	const handleResetPassword = e => {
		e.preventDefault();
		console.log(formValue);
	};

	return (
		<MainContainer className="mt-[100px]">
			<div className="flexCenter h-[calc(100vh-100px)]">
				<div className="bg-white p-6 border border-borderPrimary w-full lg:w-[500px] rounded-2xl shadow-lg hover:shadow duration-200">
					<header className="pt-3 pb-4 border-b border-borderPrimary">
						<h1 className="text-2xl font-bold">Reset password</h1>
					</header>

					<main className="my-5 mt-8">
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

							<div className="space-y-2">
								<label
									htmlFor="password_confirmation"
									className="text-sm font-medium sm:text-base"
								>
									Konfirmasi password
								</label>
								<input
									type="password"
									name="password_confirmation"
									id="password_confirmation"
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
								>
									Ganti password
								</button>
							</div>
						</form>
					</main>
				</div>
			</div>
		</MainContainer>
	);
}
