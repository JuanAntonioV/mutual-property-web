import { Link, useNavigate } from 'react-router-dom';

import HeroImage from '@/assets/img/hero-image.png';
import HeroImageProperty from '@/assets/img/property.jpeg';
import HomePageStat from '../stats/HomePageStat';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllCategoriesApi } from '../../api/category-api';
import { PulseLoader } from 'react-spinners';
import { formatRupiah, parseRupiah } from '../../utils/helpers';
import { formatPrice } from '../../utils/formaters';

export default function HomePageHeroSection() {
	const navigate = useNavigate();
	const [formTitipJual, setFormTitipJual] = useState({
		fullName: '',
		email: '',
		phoneNumber: '',
		address: '',
		property: 0,
		price: '',
		description: '',
	});

	const handleFormTitipJual = e => {
		const { name, value } = e.target;
		const regexPhone = /^[0-9\b]+$/;
		const regexPrice = /^[a-zA-Z0-9.,-]*$/;

		if (name === 'property') {
			setFormTitipJual(prev => ({
				...prev,
				[name]: parseInt(value),
			}));
		} else if (name === 'price') {
			const formated = formatRupiah(value);
			if (value === '' || value.match(regexPrice)) {
				setFormTitipJual(prev => ({
					...prev,
					[name]: formated,
				}));
			} else {
				return;
			}
		} else if (name === 'phoneNumber') {
			if (value === '' || regexPhone.test(value)) {
				setFormTitipJual(prev => ({
					...prev,
					[name]: value,
				}));
			} else {
				return;
			}
		} else {
			setFormTitipJual(prev => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmitTitipJual = e => {
		e.preventDefault();

		const payload = {
			full_name: formTitipJual.fullName,
			email: formTitipJual.email,
			phone_number: formTitipJual.phoneNumber,
			address: formTitipJual.address,
			property: formTitipJual.property,
			price: parseRupiah(formTitipJual.price),
			description: formTitipJual.description,
		};

		console.log(payload);
	};

	const { data, isLoading } = useQuery(['category'], getAllCategoriesApi, {
		select: res => res.results,
	});

	const handleTitipJual = () => {
		window.titipJualModal.showModal();
	};

	const handleContactUsClicked = e => {
		e.preventDefault();
		window.location.replace('/#contact-us');
	};

	return (
		<>
			<dialog id="titipJualModal" className="modal">
				<div className="w-11/12 max-w-3xl modal-box">
					<form method="dialog">
						<header>
							<button className="absolute outline-none btn btn-sm btn-circle btn-ghost right-2 top-2">
								✕
							</button>
							<h3 className="text-lg font-bold">Titip Jual Property</h3>
							<p className="text-sm text-gray-500">
								Jual properti Anda dengan mudah
							</p>
						</header>
					</form>

					<form
						className="py-4 space-y-2"
						id="titipJualForm"
						onSubmit={handleSubmitTitipJual}
						method="get"
					>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Nama Lengkap</span>
							</label>
							<input
								name="fullName"
								type="text"
								placeholder="Masukkan nama lengkap"
								className="input input-bordered"
								value={formTitipJual.fullName}
								onChange={handleFormTitipJual}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								name="email"
								type="text"
								placeholder="Masukkan email Anda"
								className="input input-bordered"
								value={formTitipJual.email}
								onChange={handleFormTitipJual}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Nomor Telepon</span>
							</label>
							<input
								name="phoneNumber"
								type="text"
								placeholder="Masukkan nomor telepon Anda"
								className="input input-bordered"
								value={formTitipJual.phoneNumber}
								onChange={handleFormTitipJual}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Alamat</span>
							</label>
							<input
								name="address"
								type="text"
								placeholder="Masukkan alamat properti"
								className="input input-bordered"
								value={formTitipJual.address}
								onChange={handleFormTitipJual}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Properti</span>
							</label>
							<select
								name="property"
								className="w-full select select-bordered"
								value={formTitipJual.property}
								onChange={handleFormTitipJual}
								required
							>
								<option disabled value={0}>
									Pilih Tipe Properti
								</option>
								{data?.map((item, index) => (
									<option key={index} value={item.id}>
										{item.name}
									</option>
								))}
							</select>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Harga</span>
							</label>
							<input
								name="price"
								type="text"
								placeholder="Masukkan harga properti"
								className="input input-bordered"
								value={formTitipJual.price}
								onChange={handleFormTitipJual}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Deskripsi</span>
							</label>
							<textarea
								name="description"
								placeholder="Masukkan deskripsi properti"
								className="textarea textarea-bordered"
								value={formTitipJual.description}
								onChange={handleFormTitipJual}
								required
							></textarea>
						</div>
					</form>

					<div className="modal-action">
						<form method="dialog">
							<button className="outline-none btn">Close</button>
						</form>
						<button
							type="submit"
							className="px-8 outline-none btn btnPrimary w-fit"
							form="titipJualForm"
						>
							Kirim
						</button>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>

			<section className="grid grid-cols-1 lg:grid-cols-2 h-full lg:h-[600px] place-content-center pt-14 md:p-0">
				<div className="order-2 mt-10 text-center flexCenter lg:text-start lg:flexStart lg:order-1 lg:m-0">
					<div className="lg:w-[460px] space-y-10">
						<div className="space-y-4">
							<h1 className="text-3xl font-bold leading-normal xl:text-4xl">
								Jual, Beli, Sewa <br className="hidden lg:block" />
								properti Anda <br className="hidden sm:block lg:hidden" />{' '}
								dengan <br className="hidden lg:block" />
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
							<button
								className="w-full px-0 text-sm text-center btnSecondary md:text-base"
								onClick={handleTitipJual}
								disabled={isLoading}
							>
								{isLoading ? (
									<PulseLoader color="#213D77" size={8} />
								) : (
									'Titip Jual Properti Anda'
								)}
							</button>
							<button
								className="w-full px-0 text-sm text-center btnSecondary md:text-base"
								onClick={handleContactUsClicked}
							>
								Hubungi Kami
							</button>
						</div>
					</div>
				</div>

				<div className="order-1 flexCenter lg:flexEnd lg:order-2 lg:m-0">
					<img
						src={HeroImageProperty}
						alt="Mutual Property Hero Image"
						className="w-[600px] rounded-xl"
					/>
				</div>
			</section>
		</>
	);
}
