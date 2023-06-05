import { Link } from 'react-router-dom';

import MainContainer from '../containers/MainContainer';
import BrandLogo from '../brands/BrandLogo';

import { MdEmail } from 'react-icons/md';
import { HiPhone } from 'react-icons/hi';
import { IoIosArrowUp } from 'react-icons/io';
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai';

export default function MainFooter() {
	const scrollToTop = () => {
		const c = document.documentElement.scrollTop || document.body.scrollTop;
		if (c > 0) {
			window.requestAnimationFrame(scrollToTop);
			window.scrollTo(0, c - c / 8);
		}
	};

	return (
		<footer className="pt-20 border-t-2 pb-14 border-borderPrimary bg-white">
			<MainContainer>
				<div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-y-6">
					<div className="col-span-1 space-y-6 lg:pr-8">
						<BrandLogo width={160} />
						<p className="text-sm">
							Situs teknologi yang kini hadir untuk melayani anda dan membuat
							jual, beli dan sewa properti lebih mudah dengan dukungan developer
							serta agen yang profesional.
						</p>
					</div>
					<div className="col-span-1 space-y-4 lg:px-8">
						<h1 className="text-lg font-semibold text-primary">Tautan</h1>
						<ul className="text-sm">
							<li className="py-2">
								<Link to="/">Dijual</Link>
							</li>
							<li className="py-2">
								<Link to="/">Disewa</Link>
							</li>
							<li className="py-2">
								<Link to="/">Property Baru</Link>
							</li>
							<li className="py-2">
								<Link to="/">KPR</Link>
							</li>
							<li className="py-2">
								<Link to="/">Tentang Kami</Link>
							</li>
						</ul>
					</div>
					<div className="col-span-1 space-y-4 lg:px-8">
						<h1 className="text-lg font-semibold text-primary">Hubungi Kami</h1>
						<ul className="text-sm">
							<li className="flex py-2 space-x-2 item-center">
								<MdEmail size={22} color={'#213D77'} />
								<span>infoproperty@gmail.com</span>
							</li>
							<li className="flex py-2 space-x-2 item-center">
								<HiPhone size={22} color={'#213D77'} />
								<span>+62 2992 2202</span>
							</li>
						</ul>
					</div>
					<div className="col-span-1 space-y-4 xl:px-8">
						<h1 className="text-lg font-semibold text-primary">Ikuti Kami</h1>

						<ul className="text-sm">
							<li className="flex py-2 space-x-2 item-center">
								<AiFillInstagram size={22} color={'#213D77'} />
								<span>mutuapropertymedan.id</span>
							</li>
							<li className="flex py-2 space-x-2 item-center">
								<AiFillFacebook size={22} color={'#213D77'} />
								<span>mutualpropertymedan</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-6 mt-10 text-sm border-t border-borderPrimary flexBetween text-secondary">
					<p>
						&copy; 2023 Mutual Property. <br className="block md:hidden" /> All
						rights reserved
					</p>

					<button className="py-2 space-x-2 flexEnd" onClick={scrollToTop}>
						<span className="font-medium">Kembali ke atas</span>
						<IoIosArrowUp size={18} />
					</button>
				</div>
			</MainContainer>
		</footer>
	);
}
