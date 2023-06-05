import { BsTelephoneFill, BsWhatsapp } from 'react-icons/bs';
import { MdOutlineSimCardDownload } from 'react-icons/md';

import DeveloperLogo from '@assets/img/developer-logo.png';

export default function DeveloperInfo() {
	return (
		<div className="p-4 bg-white border border-borderPrimary rounded-xl">
			<header className="gap-5 pt-2 flexBetween">
				<div className="space-y-3">
					<p className="text-lg font-bold md:text-xl">
						Sentosa Park <br /> Sunggal
					</p>
					<p className="text-sm text-secondary">
						#1 • Diposting 12 Agustus 2022
					</p>
				</div>

				<div className="h-24">
					<img
						src={DeveloperLogo}
						alt="Developer Logo"
						className="w-full h-full object-contain"
					/>
				</div>
			</header>

			<main className="flex-wrap gap-4 pt-6 pb-2 mt-6 border-t border-borderPrimary flexCenter">
				<button className="w-full gap-2 px-4 py-2 btnSecondary flexCenter">
					<BsTelephoneFill size={16} color="#213D77" />
					<span className="text-sm text-primary">Telepon</span>
				</button>
				<button className="w-full gap-2 px-4 py-2 btnSecondary flexCenter">
					<BsWhatsapp size={16} color="#213D77" />
					<span className="text-sm text-primary">Whatsapp</span>
				</button>
				<button className="w-full gap-2 px-4 py-2 btnSecondary flexCenter">
					<MdOutlineSimCardDownload size={18} color="#213D77" />
					<span className="text-sm text-primary">E-brosur</span>
				</button>
			</main>
		</div>
	);
}
