import { useState } from 'react';

import MainContainer from '../containers/MainContainer';
import SectionContainer from '../containers/SectionContainer';
import { useMutation } from '@tanstack/react-query';
import { sendSubscriptionApi } from '../../api/subscription-api';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function SubscriptionSection() {
	const [email, setEmail] = useState('');

	const { mutate: sendSubscription, isLoading: isSubscriptionLoading } =
		useMutation(sendSubscriptionApi, {
			onSuccess: data => {
				toast.success('Berhasil berlangganan');
			},
			onError: err => {
				toast.error('Gagal berlangganan');
			},
		});

	const handleSubcriptionSubmit = e => {
		e.preventDefault();

		const payload = {
			email: email,
		};

		sendSubscription(payload);
	};

	return (
		<SectionContainer className="py-24 mt-40 mb-0 bg-primary">
			<MainContainer className="text-center text-white">
				<header className="space-y-2">
					<h3 className="text-2xl font-bold">
						Ingin mendapatkan informasi terbaru?
					</h3>
					<p className="text-sm md:text-lg">
						Daftarkan email anda untuk mendapatkan informasi terbaru dari kami
					</p>
				</header>

				<main className="py-8">
					<div className="relative w-full lg:w-[600px] mx-auto">
						<form onSubmit={handleSubcriptionSubmit}>
							<input
								type="email"
								name="email"
								placeholder="Masukkan alamat email anda"
								className="w-full py-4 pl-4 text-black bg-white pr-28 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
								required
								onChange={e => setEmail(e.target.value)}
								value={email}
							/>
							<button
								type="submit"
								className="absolute px-5 py-2 -translate-y-1/2 btnPrimary bg-softBlue w-fit top-1/2 right-2"
								disabled={isSubscriptionLoading}
							>
								{isSubscriptionLoading ? (
									<PulseLoader size={8} color={'#fff'} />
								) : (
									'Kirim'
								)}
							</button>
						</form>
					</div>
				</main>

				<footer>
					<p className="text-sm text-cadetBlue md:text-base">
						Kami tidak akan mengirimkan spam dan Anda dapat berhenti
						berlangganan kapan saja.
					</p>
				</footer>
			</MainContainer>
		</SectionContainer>
	);
}
