import MainContainer from '@/components/containers/MainContainer';
import ContactSection from '@/components/sections/ContactSection';
import { useMutation } from '@tanstack/react-query';

import { FaQuoteLeft } from 'react-icons/fa';
import { sendContactApi } from '@/api/contact-api';
import { PulseLoader } from 'react-spinners';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function TentangKamiPage() {
	const [contactForm, setContactForm] = useState({
		full_name: '',
		email: '',
		message: '',
	});

	const handleOnChange = e => {
		const { name, value } = e.target;

		setContactForm(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const { mutate: sendMessage, isLoading: isSendMessageLoading } = useMutation(
		payload => sendContactApi(payload),
		{
			onSuccess: data => {
				toast.success('Pesan berhasil dikirim');
			},
			onError: err => {
				toast.error(err.message);
			},
		}
	);

	const handleSendMessage = e => {
		e.preventDefault();
		sendMessage(contactForm);
	};

	return (
		<>
			<MainContainer className="mt-[100px]">
				<section className="grid grid-cols-1 lg:grid-cols-2 h-full lg:h-[420px] place-content-center pt-14 md:p-0">
					<div className="flex-col order-2 pt-16 flexCenter lg:order-1 md:pt-0">
						<div className="space-y-6 text-center md:text-left">
							<h1 className="text-3xl font-bold">
								<span className="text-4xl">👋</span> Tentang Kami
							</h1>
							<p className="md:text-lg w-full md:w-[600px] text-gray-600">
								Mutual Property adalah platform untuk membeli, menjual, atau
								bahkan menyewakan properti Anda dengan mudah dan terpercaya.
								Kami menyediakan berbagai macam properti yang dapat Anda pilih
								sesuai dengan kebutuhan Anda. Kami juga menyediakan layanan
								titip jual properti Anda dengan komisi yang sangat terjangkau.
							</p>
						</div>
					</div>
					<div className="order-1 flexCenter lg:order-2 lg:flexEnd">
						<div className="w-[600px] h-[300px] bg-gray-200 rounded-xl"></div>
					</div>
				</section>

				<section className="py-20 space-y-6">
					<header>
						<h1 className="text-2xl font-bold text-center">Visi & Misi</h1>
					</header>

					<p className="md:text-lg text-center mx-auto w-full md:w-[800px] text-gray-600">
						Mutual Property memiliki visi untuk menjadi platform yang dapat
						memberikan kemudahan bagi masyarakat dalam membeli, menjual, atau
						menyewakan properti. Kami juga memiliki misi untuk menjadi platform
						yang dapat memberikan keuntungan bagi masyarakat dalam bertransaksi
						properti.
					</p>
				</section>

				<section className="py-20 space-y-6">
					<header className="pb-10">
						<h1 className="text-2xl font-bold text-center">
							Para Pendiri Kami
						</h1>
					</header>

					<main className="flex-wrap w-full flexCenter gap-x-32 gap-y-14">
						<div className="flexCenter">
							<div className="flex-col flexCenter">
								<div className="w-[200px] h-[200px] bg-gray-200 rounded-full"></div>

								<div className="mt-4">
									<h1 className="text-lg font-semibold text-center">
										John Doe
									</h1>
									<p className="text-sm text-center text-gray-600">
										Co-Founder
									</p>
								</div>
							</div>
						</div>
						<div className="flexCenter">
							<div className="flex-col flexCenter">
								<div className="w-[200px] h-[200px] bg-gray-200 rounded-full"></div>

								<div className="mt-4">
									<h1 className="text-lg font-semibold text-center">
										John Doe
									</h1>
									<p className="text-sm text-center text-gray-600">Founder</p>
								</div>
							</div>
						</div>
						<div className="flexCenter">
							<div className="flex-col flexCenter">
								<div className="w-[200px] h-[200px] bg-gray-200 rounded-full"></div>

								<div className="mt-4">
									<h1 className="text-lg font-semibold text-center">
										John Doe
									</h1>
									<p className="text-sm text-center text-gray-600">
										Co-Founder
									</p>
								</div>
							</div>
						</div>
					</main>
				</section>
			</MainContainer>

			<div className="bg-gradient-to-b from-white via-indigo-50 via-80% to-white">
				<MainContainer>
					<section className="py-10 space-y-10">
						<header className="space-y-1">
							<h1 className="text-2xl font-bold text-center text-primary">
								Titip Jual Property Anda!
							</h1>
							<p className="w-full text-center text-secondary md:text-lg">
								Hubungi kami sekarang juga dengan mengisi form dibawah ini.
							</p>
						</header>

						<main className="flexCenter">
							<div className="p-6 duration-200 border shadow-xl bg-bgSoft rounded-xl hover:shadow-md border-borderPrimary">
								<form className="space-y-6" onSubmit={handleSendMessage}>
									<div className="space-y-2">
										<label
											htmlFor="full_name"
											className="font-semibold text-secondary"
										>
											Nama
										</label>
										<input
											type="text"
											name="full_name"
											id="full_name"
											placeholder="Masukkan nama Anda"
											className="inputSecondary"
											required
											onChange={handleOnChange}
										/>
									</div>
									<div className="space-y-2">
										<label
											htmlFor="email"
											className="font-semibold text-secondary"
										>
											Email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											placeholder="Masukkan email Anda"
											className="inputSecondary"
											required
											onChange={handleOnChange}
										/>
									</div>

									<div className="space-y-2">
										<label
											htmlFor="message"
											className="font-semibold text-secondary"
										>
											Pesan
										</label>
										<textarea
											name="message"
											id="message"
											placeholder="Masukkan pesan Anda"
											className="inputSecondary"
											required
											onChange={handleOnChange}
											rows="5"
										></textarea>
									</div>

									<button
										type="submit"
										className="btnPrimary"
										disabled={isSendMessageLoading}
									>
										{isSendMessageLoading ? (
											<PulseLoader size={8} color={'#fff'} />
										) : (
											'Kirim'
										)}
									</button>

									<div>
										<p className="mt-4 text-xs text-gray-500">
											Kami akan menghubungi Anda melalui email yang Anda
											berikan. Kami tidak akan membagikan informasi Anda kepada
											pihak ketiga.
										</p>
									</div>
								</form>
							</div>
						</main>
					</section>

					<section className="py-20">
						<header>
							<h1 className="text-2xl font-bold text-center text-primary">
								Testimonial
							</h1>
						</header>

						<main className="grid grid-cols-1 mt-16 gap-x-4 gap-y-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							<div className="w-full flexCenter">
								<div className="lg:w-[320px] h-[400px] flexBetween flex-col items-start bg-white rounded-xl border border-borderPrimary p-8">
									<header>
										<FaQuoteLeft size={32} color={'#213D77'} />
									</header>

									<main className="py-10">
										<p className={'text-gray-600'}>
											I want thank you for creating such an amazing platform
											which has the capability to help new entrepreneurs like me
											to take their product to next level. Thank you for helping
											me & supporting me during the entire journey.
										</p>
									</main>

									<footer className="w-full pt-3 border-t border-borderPrimary">
										<p className="text-sm text-secondary">
											Diposting oleh{' '}
											<span className="font-semibold">John Doe</span>
										</p>
									</footer>
								</div>
							</div>
							<div className="w-full flexCenter">
								<div className="lg:w-[320px] h-[400px] flexBetween flex-col items-start bg-white rounded-xl border border-borderPrimary p-8">
									<header>
										<FaQuoteLeft size={32} color={'#213D77'} />
									</header>

									<main className="py-10">
										<p className={'text-gray-600'}>
											I want thank you for creating such an amazing platform
											which has the capability to help new entrepreneurs like me
											to take their product to next level. Thank you for helping
											me & supporting me during the entire journey.
										</p>
									</main>

									<footer className="w-full pt-3 border-t border-borderPrimary">
										<p className="text-sm text-secondary">
											Diposting oleh{' '}
											<span className="font-semibold">John Doe</span>
										</p>
									</footer>
								</div>
							</div>
							<div className="w-full flexCenter">
								<div className="lg:w-[320px] h-[400px] flexBetween flex-col items-start bg-white rounded-xl border border-borderPrimary p-8">
									<header>
										<FaQuoteLeft size={32} color={'#213D77'} />
									</header>

									<main className="py-10">
										<p className={'text-gray-600'}>
											I want thank you for creating such an amazing platform
											which has the capability to help new entrepreneurs like me
											to take their product to next level. Thank you for helping
											me & supporting me during the entire journey.
										</p>
									</main>

									<footer className="w-full pt-3 border-t border-borderPrimary">
										<p className="text-sm text-secondary">
											Diposting oleh{' '}
											<span className="font-semibold">John Doe</span>
										</p>
									</footer>
								</div>
							</div>
							<div className="w-full flexCenter">
								<div className="lg:w-[320px] h-[400px] flexBetween flex-col items-start bg-white rounded-xl border border-borderPrimary p-8">
									<header>
										<FaQuoteLeft size={32} color={'#213D77'} />
									</header>

									<main className="py-10">
										<p className={'text-gray-600'}>
											I want thank you for creating such an amazing platform
											which has the capability to help new entrepreneurs like me
											to take their product to next level. Thank you for helping
											me & supporting me during the entire journey.
										</p>
									</main>

									<footer className="w-full pt-3 border-t border-borderPrimary">
										<p className="text-sm text-secondary">
											Diposting oleh{' '}
											<span className="font-semibold">John Doe</span>
										</p>
									</footer>
								</div>
							</div>
						</main>
					</section>
				</MainContainer>
			</div>

			<MainContainer>
				<ContactSection />
			</MainContainer>
		</>
	);
}
