import { Link, useNavigate } from 'react-router-dom';

import HeroImage from '@/assets/img/hero-image.png';
import HomePageStat from '../stats/HomePageStat';

export default function HomePageHeroSection() {
	const navigate = useNavigate();

	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 h-full lg:h-[600px] place-content-center pt-14 md:p-0">
			<div className="order-2 mt-10 text-center flexCenter lg:text-start lg:flexStart lg:order-1 lg:m-0">
				<div className="lg:w-[460px] space-y-10">
					<div className="space-y-4">
						<h1 className="text-3xl font-bold leading-normal xl:text-4xl">
							Jual, Beli, Sewa <br className="hidden lg:block" />
							properti Anda <br className="hidden sm:block lg:hidden" /> dengan{' '}
							<br className="hidden lg:block" />
							mudah
						</h1>

						<p className="text-sm text-medium lg:text-base">
							Kami hadir agar pembeli, penjual dan perantara
							<br className="hidden md:block lg:hidden xl:block" />
							dapat bertransaksi properti dengan mudah
						</p>
					</div>

					<div className="flex items-center justify-center gap-4 lg:justify-start">
						<HomePageStat
							value={'1000'}
							detail={'Properti Disewa'}
							onClick={() => navigate('/property?category=dijual&type=rumah')}
						/>
						<HomePageStat
							value={'1000'}
							detail={'Properti Dijual'}
							onClick={() => navigate('/property?category=disewa&type=rumah')}
						/>
					</div>

					<div className="flex flex-col items-center gap-5 lg:flex-row">
						<Link
							to={'/tentang-kami/#contact'}
							className="w-full px-0 text-sm text-center btnSecondary md:text-base"
						>
							Titip Jual Properti Anda
						</Link>
						<Link
							to={'/tentang-kami/#contact'}
							className="w-full px-0 text-sm text-center btnSecondary md:text-base"
						>
							Hubungi Kami
						</Link>
					</div>
				</div>
			</div>

			<div className="order-1 flexCenter lg:flexEnd lg:order-2 lg:m-0">
				<img
					src={HeroImage}
					alt="Mutual Property Hero Image"
					className="w-[600px]"
				/>
			</div>
		</section>
	);
}
