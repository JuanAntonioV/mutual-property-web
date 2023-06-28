import { BsTelephoneFill, BsWhatsapp } from 'react-icons/bs';
import { dateFormater } from '../../utils/formaters';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

export default function MarketingInfo({ data }) {
	const [viewPhone, setViewPhone] = useState(false);

	const handlePhoneClicked = () => {
		setViewPhone(true);
	};

	const handleWhatsappClicked = () => {
		const url = `https://api.whatsapp.com/send?phone=${data?.staff?.detail?.phone_number}&text=Halo%20${data?.staff?.detail?.full_name}%2C%20saya%20ingin%20bertanya%20tentang%20properti%20${data?.title}%20dengan%20kode%20${data?.id}%20di%20${data?.address}%20`;
		window.open(url, '_blank');
	};

	return (
		<>
			<div className="p-4 bg-white border border-borderPrimary rounded-xl">
				<header className="gap-5 pt-2 flexCenter">
					<div className="w-20 h-20 overflow-hidden bg-gray-200 rounded-full">
						<img
							src={data?.staff?.photo}
							alt={data?.staff?.detail?.full_name}
							className="object-cover w-full h-full"
						/>
					</div>

					<div className="space-y-1">
						<p className="text-lg font-bold md:text-xl">
							{data?.staff?.detail?.full_name}
						</p>

						<p className="text-sm text-secondary">
							#{data?.id} • Diposting {dateFormater(data?.created_at)}
						</p>
					</div>
				</header>

				<main className="gap-4 pt-6 pb-2 mt-6 border-t md:gap-5 border-borderPrimary flexCenter">
					<button
						className="gap-2 px-6 py-2 w-fit sm:w-full btnSecondary flexCenter"
						onClick={handlePhoneClicked}
					>
						<BsTelephoneFill size={20} color="#213D77" />
						<span className="text-sm text-primary sm:text-base">Telepon</span>
					</button>

					<button
						className="gap-2 px-6 py-2 w-fit sm:w-full btnSecondary flexCenter"
						onClick={handleWhatsappClicked}
					>
						<BsWhatsapp size={20} color="#213D77" />
						<span className="text-sm text-primary sm:text-base">Whatsapp</span>
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
								<p className="text-lg font-bold ">
									{data?.staff?.detail?.phone_number}
								</p>
								<p className="text-sm text-secondary">
									{data?.staff?.detail?.full_name}
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
