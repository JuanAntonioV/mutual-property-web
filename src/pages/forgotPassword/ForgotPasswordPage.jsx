import { useState } from 'react';

import MainContainer from '@/components/containers/MainContainer';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
	const [formValue, setFormValue] = useState({
		email: '',
	});

	const handleOnChange = e => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,
		});
	};

	const handleForgotPassword = e => {
		e.preventDefault();
		console.log(formValue);
	};

	return (
		<MainContainer className="mt-[100px]">
			<div className="flexCenter h-[calc(100vh-100px)]">
				<div className="bg-white p-6 border border-borderPrimary w-full lg:w-[500px] rounded-2xl shadow-lg hover:shadow duration-200">
					<header className="pt-3 pb-4 border-b border-borderPrimary">
						<h1 className="text-2xl font-bold">Lupa password</h1>
					</header>

					<main className="my-5 mt-8">
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
								>
									Kirim
								</button>
							</div>
						</form>
					</main>

					<footer className="pb-2">
						<p className="mt-6 text-sm text-center text-secondary md:text-base">
							Sudah ingat password?{' '}
							<Link to={'/login'} className="textLink">
								Masuk
							</Link>
						</p>
					</footer>
				</div>
			</div>
		</MainContainer>
	);
}
