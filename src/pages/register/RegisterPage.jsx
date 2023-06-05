import { Link } from 'react-router-dom';
import { useState } from 'react';

import MainContainer from '@/components/containers/MainContainer';

import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
	const [formValue, setFormValue] = useState({
		name: '',
		phone: '',
		email: '',
		password: '',
	});

	const handleOnChange = e => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,
		});
	};

	const handleRegister = e => {
		e.preventDefault();
		console.log(formValue);
	};

	return (
		<MainContainer className="mt-[100px]">
			<div className="flexCenter h-[calc(100vh-100px)]">
				<div className="bg-white p-6 border border-borderPrimary w-full lg:w-[500px] rounded-2xl shadow-lg hover:shadow duration-200">
					<header className="pt-3 pb-4 border-b border-borderPrimary">
						<h1 className="text-2xl font-bold">Daftar</h1>
					</header>

					<main className="my-5 mt-8">
						<form className="flex flex-col gap-4" onSubmit={handleRegister}>
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-sm font-medium sm:text-base"
								>
									Nama
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="inputSecondary"
									placeholder="Masukkan nama anda..."
									required
									onChange={handleOnChange}
									value={formValue.name}
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="phone"
									className="text-sm font-medium sm:text-base"
								>
									No. Hanphone
								</label>
								<input
									type="text"
									name="phone"
									id="phone"
									className="inputSecondary"
									placeholder="Masukkan nomor handphone anda..."
									required
									onChange={handleOnChange}
									value={formValue.phone}
								/>
							</div>

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
									required
									onChange={handleOnChange}
									value={formValue.email}
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
									required
									onChange={handleOnChange}
									value={formValue.password}
								/>
							</div>

							<div>
								<button
									type="submit"
									className="mt-6 text-sm btnPrimary md:text-base"
								>
									Daftar
								</button>
							</div>
						</form>
					</main>

					<footer>
						<div className="relative mt-10 mb-6 flexCenter">
							<span className="w-full h-[1px] bg-borderPrimary"></span>
							<span className="absolute px-3 text-sm -translate-y-1/2 bg-white text-secondary top-1/2">
								Atau login dengan
							</span>
						</div>

						<button className="w-full gap-3 mt-8 btnSecondary border-borderPrimary flexCenter">
							<FcGoogle size={24} />
							<span className="text-base font-semibold md:text-lg">Google</span>
						</button>

						<p className="mt-6 text-sm text-center text-secondary md:text-base">
							Sudah punya akun ?{' '}
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
