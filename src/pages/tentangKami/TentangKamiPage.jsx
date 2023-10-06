import { getAllAboutInfo } from '@/api/about-api';
import MainContainer from '@/components/containers/MainContainer';
import ContactSection from '@/components/sections/ContactSection';
import { useQuery } from '@tanstack/react-query';

import { FaQuoteLeft } from 'react-icons/fa';

export default function TentangKamiPage() {
	const { data } = useQuery(['about'], getAllAboutInfo, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchIntervalInBackground: false,
		refetchInterval: false,
		select: data => data.results,
	});

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
								{data?.about?.about_us}
							</p>
						</div>
					</div>
					<div className="order-1 flexCenter lg:order-2 lg:flexEnd">
						<div className="w-[600px] h-[300px] rounded-xl">
							<img src={data?.about?.about_us_image} alt="about us" />
						</div>
					</div>
				</section>

				<section className="py-20 space-y-6">
					<header>
						<h1 className="text-2xl font-bold text-center">Visi & Misi</h1>
					</header>

					<p className="md:text-lg text-center mx-auto w-full md:w-[800px] text-gray-600">
						{data?.about?.vision}
					</p>
				</section>

				<section className="py-20 space-y-6">
					<header className="pb-10">
						<h1 className="text-2xl font-bold text-center">
							Para Pendiri Kami
						</h1>
					</header>

					<main className="flex-wrap w-full flexCenter gap-x-32 gap-y-14">
						{data?.founders?.map((founder, index) => (
							<div className="flexCenter" key={index}>
								<div className="flex-col flexCenter">
									<div className="w-[200px] h-[200px] rounded-full">
										<img
											src={founder?.image}
											alt="founder"
											className="w-full h-full rounded-full"
										/>
									</div>

									<div className="mt-4">
										<h1 className="text-lg font-semibold text-center">
											{founder?.name}
										</h1>
										<p className="text-sm text-center text-gray-600">
											{founder?.position}
										</p>
									</div>
								</div>
							</div>
						))}
					</main>
				</section>
			</MainContainer>

			<div className="bg-gradient-to-b from-white via-indigo-50 via-80% to-white">
				<MainContainer>
					<section className="py-20">
						<header>
							<h1 className="text-2xl font-bold text-center text-primary">
								Testimonial
							</h1>
						</header>

						<main className="grid grid-cols-1 mt-16 gap-x-4 gap-y-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{data?.testimonials?.map((testimonial, index) => (
								<div className="w-full flexCenter" key={index}>
									<div className="lg:w-[320px] h-[400px] flexBetween flex-col items-start bg-white rounded-xl border border-borderPrimary p-8">
										<header>
											<FaQuoteLeft size={32} color={'#213D77'} />
										</header>

										<main className="py-10">
											<p className={'text-gray-600'}>
												{testimonial?.testimoni}
											</p>
										</main>

										<footer className="w-full pt-3 border-t border-borderPrimary">
											<p className="text-sm text-secondary">
												Diposting oleh{' '}
												<span className="font-semibold">
													{testimonial?.name}
												</span>
											</p>
										</footer>
									</div>
								</div>
							))}
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
