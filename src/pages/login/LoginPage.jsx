import { Link } from 'react-router-dom';
import { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';

import MainContainer from '@/components/containers/MainContainer';

export default function LoginPage() {
	const [formValue, setFormValue] = useState({
		email: '',
		password: '',
	});

	const handleOnChange = e => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = e => {
		e.preventDefault();
		console.log(formValue);
	};

	return (
		<MainContainer className="mt-[100px]">
			<div className="flexCenter h-[calc(100vh-100px)]">
				<div className="bg-white p-6 border border-borderPrimary w-full lg:w-[500px] rounded-2xl shadow-lg hover:shadow duration-200">
					<header className="pt-3 pb-4 border-b border-borderPrimary">
						<h1 className="text-2xl font-bold">Masuk</h1>
					</header>

					<main className="my-5 mt-8">
						<form className="flex flex-col gap-4" onSubmit={handleLogin}>
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

							<div className="space-y-2">
								<label
									htmlFor="password"
									className="text-sm font-medium sm:text-base"
								>
									Password
								</label>
								<input
									type="text"
									name="password"
									id="password"
									className="inputSecondary"
									placeholder="Password"
									onChange={handleOnChange}
									value={formValue.password}
									required
								/>
							</div>

							<Link
								to={'/forgot-password'}
								className="mr-auto text-sm text-link sm:text-base"
							>
								Lupa password?
							</Link>

							<div>
								<button
									type="submit"
									className="mt-6 text-sm btnPrimary md:text-base"
								>
									Masuk
								</button>
							</div>
						</form>
					</main>

					<footer>
						<div className="relative mt-10 mb-6 flexCenter">
							<span className="w-full h-[1px] bg-borderPrimary"></span>
							<span className="absolute px-3 text-sm -translate-y-1/2 bg-white text-secondary top-1/2">
								Atau masuk dengan
							</span>
						</div>

						<button className="w-full gap-3 mt-8 btnSecondary border-borderPrimary flexCenter">
							<FcGoogle size={24} />
							<span className="text-base font-semibold md:text-lg">Google</span>
						</button>

						<p className="mt-6 text-sm text-center text-secondary md:text-base">
							Belum punya akun ?{' '}
							<Link to={'/register'} className="textLink">
								Register
							</Link>
						</p>
					</footer>
				</div>
			</div>
		</MainContainer>
	);
}
