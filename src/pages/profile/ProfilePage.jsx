import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropertyCard from '@/components/cards/PropertyCard';
import MainContainer from '@/components/containers/MainContainer';

import { MdKeyboardArrowRight } from 'react-icons/md';

export default function ProfilePage() {
	const navigate = useNavigate();
	const [selectedTab, setSelectedTab] = useState('akun-saya');
	const maxPage = 50;

	const handleLogout = () => {
		console.log('logout');
		navigate('/login');
	};

	return (
		<div className="bg-gradient-to-b from-white via-indigo-50 via-80% to-white">
			<MainContainer className="mt-[100px]">
				<section className="grid grid-cols-1 gap-10 py-20 md:grid-cols-3 xl:grid-cols-4">
					<div className="items-start col-span-1 md:col-span-1 xl:col-span-1 flexCenter">
						<div className="w-full bg-white border border-borderPrimary rounded-xl">
							<ul className="p-2 space-y-2">
								<li>
									<button
										className={`p-4 w-full text-left rounded-lg ${
											selectedTab === 'akun-saya' && 'bg-indigo-50'
										}`}
										onClick={() => setSelectedTab('akun-saya')}
									>
										Akun Saya
									</button>
								</li>
								<li>
									<button
										className={`p-4 w-full text-left rounded-lg ${
											selectedTab === 'favorit' && 'bg-indigo-50'
										}`}
										onClick={() => setSelectedTab('favorit')}
									>
										Favorit
									</button>
								</li>
							</ul>

							<div className="p-2 border-t rounded-lg border-borderPrimary">
								<button
									className={'p-4 w-full text-left'}
									onClick={handleLogout}
								>
									Keluar
								</button>
							</div>
						</div>
					</div>
					<div className="items-start col-span-1 md:col-span-2 xl:col-span-3 flexCenter">
						{selectedTab === 'akun-saya' && (
							<div className="flex flex-col w-full gap-10">
								<div className="w-full p-10 bg-white border border-borderPrimary rounded-xl">
									<form className="space-y-4">
										<div className="flex flex-col space-y-2">
											<label
												htmlFor="nama"
												className="text-sm font-medium md:text-base"
											>
												Nama Lengkap
											</label>
											<input
												type="text"
												placeholder="Masukkan nama lengkap"
												id="nama"
												className="inputSecondary"
											/>
										</div>
										<div className="gap-8 flexBetween">
											<div className="flex flex-col w-full space-y-2">
												<label
													htmlFor="email"
													className="text-sm font-medium md:text-base"
												>
													Email
												</label>
												<input
													type="text"
													placeholder="Masukkan email anda"
													id="email"
													className="inputSecondary"
												/>
											</div>
											<div className="flex flex-col w-full space-y-2">
												<label
													htmlFor="email"
													className="text-sm font-medium md:text-base"
												>
													Nomor Handphone
												</label>
												<input
													type="text"
													placeholder="Masukkan nomor handphone"
													id="email"
													className="inputSecondary"
												/>
											</div>
										</div>

										<div>
											<button className="px-10 py-3 mt-6 text-sm w-fit btnPrimary md:text-base">
												Simpan
											</button>
										</div>
									</form>
								</div>

								<div className="w-full p-10 bg-white border border-borderPrimary rounded-xl">
									<form className="space-y-4">
										<div className="flex flex-col space-y-2">
											<label
												htmlFor="nama"
												className="text-sm font-medium md:text-base"
											>
												Kata Sandi Lama
											</label>
											<input
												type="text"
												placeholder="Masukkan kata sandi lama"
												id="nama"
												className="inputSecondary"
											/>
										</div>
										<div className="gap-8 flexBetween">
											<div className="flex flex-col w-full space-y-2">
												<label
													htmlFor="email"
													className="text-sm font-medium md:text-base"
												>
													Kata Sandi Baru
												</label>
												<input
													type="text"
													placeholder="Masukkan Kata Sandi Baru"
													id="email"
													className="inputSecondary"
												/>
											</div>
											<div className="flex flex-col w-full space-y-2">
												<label
													htmlFor="email"
													className="text-sm font-medium md:text-base"
												>
													Konfirmasi Kata Sandi Baru
												</label>
												<input
													type="text"
													placeholder="Konfirmasi Kata Sandi Baru"
													id="email"
													className="inputSecondary"
												/>
											</div>
										</div>

										<div>
											<div className="flex items-center gap-6 mt-10">
												<button className="px-10 py-3 text-sm w-fit btnPrimary md:text-base">
													Ubah
												</button>
												<button className="px-8 py-3 text-sm w-fit btnSecondary md:text-base">
													Batalkan
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						)}

						{selectedTab === 'favorit' && (
							<div className="flex flex-col w-full gap-10">
								<div className="w-full rounded-xl">
									<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-8">
										{[...Array(6)].map((_, i) => (
											<div key={i} className="flexCenter">
												<PropertyCard key={i} />
											</div>
										))}
									</div>
								</div>

								<div className="flex justify-center">
									{Array.from({ length: maxPage }, (_, i) =>
										// show only 5 pages
										i < 4 ? (
											<button
												key={i}
												className={`px-4 py-2 mx-1 rounded-md border border-borderPrimary ${
													i === 0
														? 'bg-primary text-white'
														: 'bg-white text-primary'
												}`}
											>
												{i + 1}
											</button>
										) : null
									)}

									<button className="px-2.5 py-2 mx-1 text-white rounded-md bg-white border border-borderPrimary flexCenter">
										<MdKeyboardArrowRight size={24} color="#213D77" />
									</button>
								</div>
							</div>
						)}
					</div>
				</section>
			</MainContainer>
		</div>
	);
}
