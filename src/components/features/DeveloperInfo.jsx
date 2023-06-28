import { BsTelephoneFill, BsWhatsapp } from 'react-icons/bs';
import { MdOutlineSimCardDownload } from 'react-icons/md';

import { dateFormater } from '../../utils/formaters';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';

export default function DeveloperInfo({ data }) {
	const [viewPhone, setViewPhone] = useState(false);

	const handlePhoneClicked = () => {
		setViewPhone(true);
	};

	const handleWhatsappClicked = () => {
		const url = `https://api.whatsapp.com/send?phone=${data?.whatsapp_number}&text=Halo%20${data?.developer_name}%2C%20saya%20ingin%20bertanya%20tentang%20properti%20${data?.name}%20dengan%20kode%20${data?.id}%20di%20${data?.address}%20`;
		window.open(url, '_blank');
	};

	const handleDownloadBrochure = () => {
		const link = document.createElement('a');
		link.href = data?.detail?.brochure_file;
		link.setAttribute('download', `${data?.name}.pdf`);
		document.body.appendChild(link);
		link.click();
	};

	return (
		<>
			<div className="p-4 bg-white border border-borderPrimary rounded-xl">
				<header className="gap-5 pt-2 flexBetween">
					<div className="space-y-3">
						<p className="text-lg font-bold md:text-xl">
							{data?.developer_name}
						</p>
						<p className="text-sm text-secondary">
							#{data?.id} • Diposting {dateFormater(data?.created_at)}
						</p>
					</div>

					<div className="w-24 h-24 overflow-hidden">
						<img
							src={data?.logo}
							alt="Developer Logo"
							className="object-cover w-full h-full rounded-lg"
						/>
					</div>
				</header>

				<main className="flex-wrap gap-4 pt-6 pb-2 mt-6 border-t border-borderPrimary flexCenter">
					<button
						className="w-full gap-2 px-4 py-2 btnSecondary flexCenter"
						onClick={handlePhoneClicked}
					>
						<BsTelephoneFill size={16} color="#213D77" />
						<span className="text-sm text-primary">Telepon</span>
					</button>
					<button
						className="w-full gap-2 px-4 py-2 btnSecondary flexCenter"
						onClick={handleWhatsappClicked}
					>
						<BsWhatsapp size={16} color="#213D77" />
						<span className="text-sm text-primary">Whatsapp</span>
					</button>
					<button
						className="w-full gap-2 px-4 py-2 btnSecondary flexCenter"
						onClick={handleDownloadBrochure}
					>
						<MdOutlineSimCardDownload size={18} color="#213D77" />
						<span className="text-sm text-primary">E-brosur</span>
					</button>
				</main>
			</div>

			{viewPhone && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flexCenter">
					<div className="p-6 w-[500px] bg-white border border-borderPrimary rounded-xl">
						<header className="pb-4 border-b border-borderPrimary flexBetween">
							<p className="text-lg font-bold">Hubungi Marketing</p>

							<button onClick={() => setViewPhone(false)}>
								<IoClose size={30} color="#213D77" />
							</button>
						</header>
						<main className="flex items-center gap-4 mt-8">
							<BsTelephoneFill size={30} color="#213D77" />
							<div>
								<p className="text-lg font-bold ">{data?.phone_number}</p>
								<p className="text-sm text-secondary">
									{data?.developer_name} Developer
								</p>
							</div>
						</main>
						<footer>
							<button
								className="py-3 mt-12 btnPrimary"
								onClick={() => setViewPhone(false)}
							>
								<span className="text-sm text-white">Tutup</span>
							</button>
						</footer>
					</div>
				</div>
			)}
		</>
	);
}
